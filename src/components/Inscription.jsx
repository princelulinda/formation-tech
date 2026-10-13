import { useState } from 'react'
import { MODULES, PROGRAMME } from '../data'

const VIDE = { nom: '', email: '', telephone: '', ville: '', niveau: '', module: '', motivation: '', accord: false }

const valider = (f) => {
  const e = {}
  if (!f.nom.trim()) e.nom = 'Indiquez votre nom complet.'
  if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = 'Cette adresse e-mail ne semble pas valide. Exemple : aline@gmail.com'
  if (f.telephone.replace(/\D/g, '').length < 8) e.telephone = 'Indiquez un numéro d’au moins 8 chiffres, avec l’indicatif si possible.'
  if (!f.ville.trim()) e.ville = 'Indiquez votre ville.'
  if (!f.niveau) e.niveau = 'Choisissez votre niveau.'
  if (!f.module) e.module = 'Choisissez le module qui vous intéresse le plus.'
  if (f.motivation.trim().length < 20) e.motivation = 'Deux ou trois phrases suffisent (20 caractères minimum).'
  if (!f.accord) e.accord = 'Cochez cette case pour que nous puissions traiter votre candidature.'
  return e
}

export default function Inscription() {
  const [form, setForm] = useState(VIDE)
  const [erreurs, setErreurs] = useState({})
  const [etat, setEtat] = useState('saisie') // saisie | envoi | envoye

  const changer = (e) => {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
    if (erreurs[name]) setErreurs((x) => ({ ...x, [name]: undefined }))
  }

  const soumettre = async (e) => {
    e.preventDefault()
    const errs = valider(form)
    setErreurs(errs)
    const premiere = Object.keys(errs)[0]
    if (premiere) {
      document.getElementById(`c-${premiere}`)?.focus()
      return
    }
    setEtat('envoi')
    // TODO : brancher l'envoi vers le backend ou un formulaire externe.
    await new Promise((r) => setTimeout(r, 700))
    console.log('Inscription :', form)
    setEtat('envoye')
  }

  if (etat === 'envoye') {
    return (
      <div className="biseau bg-papier p-8 text-encre sm:p-12" role="status">
        <svg width="56" height="56" viewBox="0 0 56 56" aria-hidden="true">
          <circle cx="28" cy="28" r="26" fill="none" stroke="#16a34a" strokeWidth="3" />
          <path d="M17 29l7 7 15-16" fill="none" stroke="#16a34a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h3 className="titre mt-6 text-4xl font-extrabold">Merci {form.nom.trim().split(' ')[0]}, c'est reçu.</h3>
        <p className="mt-4 max-w-md text-lg leading-relaxed text-mousse">
          Nous lisons chaque candidature. Vous aurez une réponse à <strong className="text-encre">{form.email}</strong> après la clôture du {PROGRAMME.clotureCourte}
        </p>
        <button
          type="button"
          onClick={() => { setForm(VIDE); setEtat('saisie') }}
          className="mt-8 font-semibold text-foret underline decoration-ambre decoration-2 underline-offset-4 hover:decoration-foret"
        >
          Inscrire une autre personne
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={soumettre} noValidate className="grid gap-x-5 gap-y-6 biseau bg-papier p-6 text-encre sm:grid-cols-2 sm:p-10">
      <Champ id="nom" label="Nom complet" erreur={erreurs.nom}>
        <input id="c-nom" name="nom" autoComplete="name" value={form.nom} onChange={changer} className={champ(erreurs.nom)} />
      </Champ>
      <Champ id="email" label="E-mail" erreur={erreurs.email}>
        <input id="c-email" name="email" type="email" autoComplete="email" inputMode="email" value={form.email} onChange={changer} className={champ(erreurs.email)} />
      </Champ>
      <Champ id="telephone" label="Téléphone (WhatsApp de préférence)" erreur={erreurs.telephone}>
        <input id="c-telephone" name="telephone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+257 …" value={form.telephone} onChange={changer} className={champ(erreurs.telephone)} />
      </Champ>
      <Champ id="ville" label="Ville" erreur={erreurs.ville}>
        <input id="c-ville" name="ville" autoComplete="address-level2" value={form.ville} onChange={changer} className={champ(erreurs.ville)} />
      </Champ>

      <fieldset className="sm:col-span-2">
        <legend className="mb-2 text-sm font-semibold">Votre niveau avec le numérique</legend>
        <div className="grid grid-cols-3 gap-2" id="c-niveau" tabIndex={-1}>
          {['Débutante', 'Intermédiaire', 'Avancée'].map((n) => (
            <label key={n} className={`cursor-pointer rounded-xl border px-1.5 py-3 text-center text-sm font-medium transition-colors has-[:checked]:border-foret has-[:checked]:bg-foret has-[:checked]:text-papier has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ambre ${erreurs.niveau ? 'border-red-600' : 'border-trait hover:border-mousse'}`}>
              <input type="radio" name="niveau" value={n} checked={form.niveau === n} onChange={changer} className="sr-only" />
              {n}
            </label>
          ))}
        </div>
        {erreurs.niveau && <Erreur>{erreurs.niveau}</Erreur>}
      </fieldset>

      <Champ id="module" label="Le module qui vous intéresse le plus" erreur={erreurs.module} large>
        <select id="c-module" name="module" value={form.module} onChange={changer} className={champ(erreurs.module)}>
          <option value="">Choisir un module</option>
          {MODULES.map((m) => <option key={m.id}>{m.titre}</option>)}
        </select>
      </Champ>
      <Champ id="motivation" label="Pourquoi voulez-vous suivre cette formation ?" erreur={erreurs.motivation} large>
        <textarea id="c-motivation" name="motivation" rows="4" value={form.motivation} onChange={changer} placeholder="Parlez-nous de votre activité ou de votre projet." className={`${champ(erreurs.motivation)} resize-y`} />
      </Champ>

      <div className="sm:col-span-2">
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-mousse">
          <input id="c-accord" type="checkbox" name="accord" checked={form.accord} onChange={changer} className="mt-0.5 size-5 shrink-0 accent-foret" />
          J'accepte que mes informations soient utilisées uniquement pour l'organisation de la formation.
        </label>
        {erreurs.accord && <Erreur>{erreurs.accord}</Erreur>}
      </div>

      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button
          type="submit"
          disabled={etat === 'envoi'}
          className="inline-flex items-center gap-3 rounded-full bg-foret px-8 py-4 font-bold text-papier transition-colors hover:bg-foret-900 disabled:cursor-wait disabled:opacity-70"
        >
          {etat === 'envoi' ? 'Envoi en cours…' : 'Envoyer ma candidature'}
        </button>
        <span className="text-sm text-mousse">Environ 3 minutes.</span>
      </div>
    </form>
  )
}

const champ = (err) =>
  `w-full rounded-xl border bg-white px-4 py-3 text-base text-encre placeholder:text-mousse/70 transition-colors focus:border-foret focus:outline-2 focus:outline-offset-0 focus:outline-foret/25 ${err ? 'border-red-600' : 'border-trait hover:border-mousse'}`

function Champ({ id, label, erreur, large, children }) {
  return (
    <div className={large ? 'sm:col-span-2' : ''}>
      <label htmlFor={`c-${id}`} className="mb-2 block text-sm font-semibold">{label}</label>
      {children}
      {erreur && <Erreur>{erreur}</Erreur>}
    </div>
  )
}

function Erreur({ children }) {
  return <p className="mt-2 text-sm text-red-700" role="alert">{children}</p>
}
