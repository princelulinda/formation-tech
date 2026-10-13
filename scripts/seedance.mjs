// Génère un plan Seedance 2.5 (texte -> vidéo, son compris) via l'API Higgsfield.
//
//   node scripts/seedance.mjs <job.json>         estime le coût, ne dépense rien
//   node scripts/seedance.mjs <job.json> --go    génère et télécharge dans public/clips/
//
// job.json : { "id": "...", "prompt": "...", "duration": 15, "aspect_ratio": "9:16", ... }
// Tout champ autre que "id" part tel quel dans la requête.
// Clés dans .env : HF_API_KEY_ID + HF_API_KEY_SECRET, ou HF_API_KEY_ID="id:secret".

import { randomUUID } from "node:crypto";
import dns from "node:dns";
import fs from "node:fs";
import net from "node:net";
import path from "node:path";

dns.setDefaultResultOrder("ipv4first");
net.setDefaultAutoSelectFamilyAttemptTimeout(5000);

const API = "https://api.higgsfield.ai";
const MODEL = "bytedance/seedance-2.5/text-to-video";
const ROOT = path.resolve(import.meta.dirname, "..");
const [jobFile] = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const go = process.argv.includes("--go");
if (!jobFile) {
  console.error("Usage : node scripts/seedance.mjs <job.json> [--go]");
  process.exit(1);
}

process.loadEnvFile(path.join(ROOT, ".env"));
const { HF_API_KEY_ID = "", HF_API_KEY_SECRET = "" } = process.env;
const credentials = HF_API_KEY_SECRET ? `${HF_API_KEY_ID}:${HF_API_KEY_SECRET}` : HF_API_KEY_ID;
if (!credentials.includes(":")) {
  console.error("Clés Higgsfield incomplètes dans .env (il faut l'identifiant et le secret)");
  process.exit(1);
}

const api = async (url, init = {}) => {
  const res = await fetch(url.startsWith("http") ? url : API + url, {
    ...init,
    headers: { Authorization: `Key ${credentials}`, "Content-Type": "application/json", ...init.headers },
  });
  const body = await res.text();
  if (!res.ok) throw new Error(`${res.status} ${url} : ${body}`);
  return body ? JSON.parse(body) : {};
};

const { id, ...input } = JSON.parse(fs.readFileSync(path.resolve(jobFile), "utf8"));
const target = path.join(ROOT, "sources/media", `${id}.mp4`);
const stateFile = path.join(ROOT, "out", `${id}.request.json`);

const est = await api(`/estimate/${MODEL}`, { method: "POST", body: JSON.stringify(input) });
// Seedance renvoie un barème par seconde plutôt qu'un montant chiffré.
console.log(`Estimation ${id} : ${est.usd !== undefined ? `${est.credits} crédits (${est.usd} $)` : est.pricing_description}`);
if (!go) process.exit(0);
if (fs.existsSync(target)) {
  console.log(`Déjà généré : ${path.relative(ROOT, target)} (le supprimer pour refaire)`);
  process.exit(0);
}

// Une requête déjà soumise est reprise plutôt que payée deux fois.
let req = fs.existsSync(stateFile) ? JSON.parse(fs.readFileSync(stateFile, "utf8")) : null;
if (!req) {
  req = await api(`/${MODEL}`, {
    method: "POST",
    headers: { "Idempotency-Key": randomUUID() },
    body: JSON.stringify(input),
  });
  fs.mkdirSync(path.dirname(stateFile), { recursive: true });
  fs.writeFileSync(stateFile, JSON.stringify(req, null, 2));
  console.log(`Soumis : ${req.request_id}`);
}

let delay = 3000;
let result;
for (;;) {
  result = await api(req.status_url);
  if (["completed", "failed", "nsfw", "canceled"].includes(result.status)) break;
  process.stdout.write(`… ${result.status}\n`);
  await new Promise((r) => setTimeout(r, delay));
  delay = Math.min(delay * 1.5, 15000);
}
fs.rmSync(stateFile);
if (result.status !== "completed") {
  console.error(`Échec : ${result.status} ${JSON.stringify(result.error ?? "")}`);
  process.exit(1);
}

fs.mkdirSync(path.dirname(target), { recursive: true });
const video = await fetch(result.video.url);
fs.writeFileSync(target, Buffer.from(await video.arrayBuffer()));
console.log(`✓ ${path.relative(ROOT, target)}`);
