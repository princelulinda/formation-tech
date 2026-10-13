// Génère des images via l'API Higgsfield (Z-Image Turbo : 0,015 $ l'image au 2026-10-09).
//
//   node scripts/image.mjs jobs/<nom>.images.json
//
// Fichier : { "model"?, "defaults": {...}, "images": [{ "id", "prompt", "seed"?, "refs"? }] }
// "refs" : images locales envoyées en image_urls (modèles d'édition comme alibaba/qwen-image-3/edit),
// pour garder le même personnage d'une image à l'autre.
// Résultat : public/<dossier du fichier sans .images.json>/<id>.png ; une image déjà là n'est pas refaite.

import { execFileSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import dns from "node:dns";
import fs from "node:fs";
import net from "node:net";
import path from "node:path";

dns.setDefaultResultOrder("ipv4first");
net.setDefaultAutoSelectFamilyAttemptTimeout(5000);

const API = "https://api.higgsfield.ai";
const ROOT = path.resolve(import.meta.dirname, "..");
const jobFile = path.resolve(process.argv[2]);
const job = JSON.parse(fs.readFileSync(jobFile, "utf8"));
const model = job.model ?? "z-image/turbo";
const outDir = path.join(ROOT, "sources", path.basename(jobFile).replace(/\.images\.json$/, ""));

process.loadEnvFile(path.join(ROOT, ".env"));
const { HF_API_KEY_ID = "", HF_API_KEY_SECRET = "" } = process.env;
const credentials = HF_API_KEY_SECRET ? `${HF_API_KEY_ID}:${HF_API_KEY_SECRET}` : HF_API_KEY_ID;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const api = async (url, init = {}) => {
  for (let attempt = 1; ; attempt++) {
    try {
      const res = await fetch(url.startsWith("http") ? url : API + url, {
        ...init,
        headers: { Authorization: `Key ${credentials}`, "Content-Type": "application/json", ...init.headers },
      });
      const body = await res.text();
      if (!res.ok) throw Object.assign(new Error(`${res.status} ${url} : ${body}`), { status: res.status });
      return body ? JSON.parse(body) : {};
    } catch (e) {
      if ((e.status && e.status < 500) || attempt >= 8) throw e;
      await sleep(3000 * attempt);
    }
  }
};

// Une référence n'est envoyée qu'une fois, même si plusieurs images la demandent en même temps.
const uploaded = new Map();
const upload = (file) => {
  if (!uploaded.has(file)) {
    uploaded.set(
      file,
      (async () => {
        const contentType = file.endsWith(".png") ? "image/png" : "image/jpeg";
        for (let attempt = 1; ; attempt++) {
          const slot = await api("/files/generate-upload-url", { method: "POST", body: JSON.stringify({ content_type: contentType }) });
          const res = await fetch(slot.upload_url, { method: "PUT", headers: slot.upload_headers, body: fs.readFileSync(path.join(ROOT, file)) }).catch(() => null);
          if (res?.ok) return slot.public_url;
          if (attempt >= 5) throw new Error(`upload ${file} : ${res?.status ?? "réseau"}`);
          await sleep(2000 * attempt);
        }
      })(),
    );
  }
  return uploaded.get(file);
};

fs.mkdirSync(outDir, { recursive: true });
const todo = job.images.filter((img) => !fs.existsSync(path.join(outDir, `${img.id}.png`)));

// Toutes les requêtes partent en même temps, puis on les suit.
const requests = await Promise.all(
  todo.map(async (img) => {
    const body = { ...job.defaults, prompt: img.prompt, ...(img.seed !== undefined && { seed: img.seed }) };
    if (img.refs) body.image_urls = await Promise.all(img.refs.map(upload));
    const req = await api(`/${model}`, { method: "POST", headers: { "Idempotency-Key": randomUUID() }, body: JSON.stringify(body) });
    console.log(`> ${img.id} : soumis`);
    return { img, req };
  }),
);

for (const { img, req } of requests) {
  let r;
  for (let delay = 2000; ; delay = Math.min(delay * 1.4, 10000)) {
    r = await api(req.status_url);
    if (["completed", "failed", "nsfw", "canceled"].includes(r.status)) break;
    await sleep(delay);
  }
  if (r.status !== "completed") {
    console.error(`! ${img.id} : ${r.status} ${JSON.stringify(r.error ?? "")}`);
    continue;
  }
  const url = r.images?.[0]?.url;
  const raw = path.join(outDir, `${img.id}.download`);
  execFileSync("curl", ["-s", "-f", "--retry", "8", "--retry-all-errors", "-o", raw, url]);
  // Toujours un PNG en sortie, quel que soit le format renvoyé.
  execFileSync("ffmpeg", ["-loglevel", "error", "-y", "-i", raw, path.join(outDir, `${img.id}.png`)]);
  fs.rmSync(raw);
  console.log(`✓ ${img.id} : sources/${path.basename(outDir)}/${img.id}.png`);
}
