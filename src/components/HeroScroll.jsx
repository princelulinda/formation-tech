import { useEffect, useRef, useState } from 'react'
import { PROGRAMME } from '../data'
import Marqueur from './Marqueur'

const TOTAL = 121
const src = (set, i) => `/frames/${set}/${String(i + 1).padStart(3, '0')}.webp`
// Les images mobiles sont un recadrage central de 432 px dans la vidéo de 1280 × 720.
const CADRAGE = { d: { x0: 0, w: 1280 }, m: { x0: 424, w: 432 } }

// Quatre chapitres du film, chacun sur une tranche de la progression du scroll.
const CHAPITRES = [
  { de: 0, a: 0.22, nom: 'Au marché' },
  { de: 0.22, a: 0.48, nom: 'Son étal', texte: 'Au marché, tout le quartier la connaît.' },
  { de: 0.48, a: 0.74, nom: 'Son téléphone', texte: 'Avec son téléphone, toute la ville peut la découvrir.' },
  { de: 0.74, a: 1.01, nom: 'Votre tour' },
]

// La mire suit le sujet du film : position dans la vidéo (0–1) selon la progression, et ce qu'elle vise.
const MIRE = [
  { t: 0, x: 0.51, y: 0.44, vise: 'Vitrine' },
  { t: 0.35, x: 0.42, y: 0.46, vise: 'Publication' },
  { t: 0.6, x: 0.32, y: 0.4, vise: 'Publication' },
  { t: 0.9, x: 0.49, y: 0.4, vise: 'Confiance' },
  { t: 1, x: 0.49, y: 0.4, vise: 'Confiance' },
]
const viser = (t) => {
  let k = 0
  while (k < MIRE.length - 2 && t > MIRE[k + 1].t) k++
  const a = MIRE[k], b = MIRE[k + 1]
  const u = Math.min(1, Math.max(0, (t - a.t) / (b.t - a.t)))
  const e = u * u * (3 - 2 * u)
  return { x: a.x + (b.x - a.x) * e, y: a.y + (b.y - a.y) * e, vise: u < 0.5 ? a.vise : b.vise }
}

export default function HeroScroll() {
  const section = useRef(null)
  const canvas = useRef(null)
  const mire = useRef(null)
  const [p, setP] = useState(0)
  const [vise, setVise] = useState(MIRE[0].vise)

  useEffect(() => {
    const reduit = matchMedia('(prefers-reduced-motion: reduce)').matches
    const set = matchMedia('(max-aspect-ratio: 1/1)').matches ? 'm' : 'd'
    const images = new Array(TOTAL)
    const cv = canvas.current
    const ctx = cv.getContext('2d')
    let cible = 0, courant = 0, dessine = -1, raf = 0, vivant = true, derniereVise = ''

    const charger = (i) => {
      if (images[i]) return images[i]
      const img = new Image()
      img.decoding = 'async'
      img.src = src(set, i)
      img.onload = () => { if (vivant && Math.round(courant) === i) dessiner(i, true) }
      images[i] = img
      return img
    }

    const taille = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2)
      cv.width = Math.round(cv.clientWidth * dpr)
      cv.height = Math.round(cv.clientHeight * dpr)
      dessine = -1
      dessiner(Math.round(courant), true)
      placerMire()
    }

    // L'image la plus proche déjà chargée, pour ne jamais laisser l'écran vide.
    function dessiner(i, force) {
      if (i === dessine && !force) return
      let k = i
      for (let d = 0; d < TOTAL; d++) {
        if (images[i - d]?.complete && images[i - d].naturalWidth) { k = i - d; break }
        if (images[i + d]?.complete && images[i + d].naturalWidth) { k = i + d; break }
      }
      const img = images[k]
      if (!img?.complete || !img.naturalWidth) return
      const { width: w, height: h } = cv
      const r = Math.max(w / img.naturalWidth, h / img.naturalHeight)
      const iw = img.naturalWidth * r, ih = img.naturalHeight * r
      ctx.drawImage(img, (w - iw) / 2, (h - ih) * 0.4, iw, ih)
      dessine = i
    }

    // Même calcul de recadrage que le dessin, en pixels CSS, pour poser la mire sur le sujet.
    function placerMire() {
      const el = mire.current
      if (!el) return
      const W = cv.clientWidth, H = cv.clientHeight, c = CADRAGE[set]
      const r = Math.max(W / c.w, H / 720)
      const iw = c.w * r, ih = 720 * r
      const v = viser(courant / (TOTAL - 1))
      const x = (W - iw) / 2 + ((v.x * 1280 - c.x0) / c.w) * iw
      const y = (H - ih) * 0.4 + v.y * ih
      el.style.transform = `translate3d(${Math.min(W - 70, Math.max(70, x))}px, ${y}px, 0)`
      if (v.vise !== derniereVise) { derniereVise = v.vise; setVise(v.vise) }
    }

    const progression = () => {
      const r = section.current.getBoundingClientRect()
      const course = r.height - innerHeight
      return course > 0 ? Math.min(1, Math.max(0, -r.top / course)) : 0
    }

    const boucle = () => {
      courant += (cible - courant) * 0.18
      if (Math.abs(cible - courant) < 0.02) courant = cible
      dessiner(Math.round(courant))
      placerMire()
      raf = courant === cible ? 0 : requestAnimationFrame(boucle)
    }

    const onScroll = () => {
      const pr = progression()
      setP(pr)
      cible = reduit ? 0 : pr * (TOTAL - 1)
      if (!raf) raf = requestAnimationFrame(boucle)
    }

    charger(0)
    if (!reduit) {
      // Une image sur quatre d'abord, pour que tout le film soit vite parcourable, puis le reste.
      const ordre = []
      for (let i = 0; i < TOTAL; i += 4) ordre.push(i)
      for (let i = 0; i < TOTAL; i++) if (i % 4) ordre.push(i)
      let n = 0
      const attendre = (im) => new Promise((ok) => {
        if (im.complete) return ok()
        im.addEventListener('load', ok)
        im.addEventListener('error', ok)
      })
      const suite = () => {
        if (!vivant || n >= ordre.length) return
        const lot = ordre.slice(n, n + 8)
        n += 8
        Promise.all(lot.map((i) => attendre(charger(i)))).then(suite)
      }
      suite()
    }

    taille()
    onScroll()
    addEventListener('resize', taille)
    addEventListener('scroll', onScroll, { passive: true })
    return () => {
      vivant = false
      cancelAnimationFrame(raf)
      removeEventListener('resize', taille)
      removeEventListener('scroll', onScroll)
    }
  }, [])

  // Aller à un chapitre : on fait défiler jusqu'au milieu de sa tranche.
  const allerA = (c) => {
    const el = section.current
    const course = el.offsetHeight - innerHeight
    const t = c.de === 0 ? 0 : (c.de + Math.min(c.a, 1)) / 2
    scrollTo({ top: el.offsetTop + course * t, behavior: 'smooth' })
  }

  const chap = CHAPITRES.findIndex((c) => p >= c.de && p < c.a)
  const titreVisible = chap === 0
  const finVisible = chap === 3

  return (
    <section ref={section} className="relative h-[100svh] motion-safe:h-[340svh] bg-foret-900" aria-label="Présentation">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <canvas ref={canvas} className="absolute inset-0 h-full w-full" aria-hidden="true" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(12,58,30,.92)_0%,rgba(12,58,30,.55)_38%,rgba(12,58,30,0)_68%)]" />
        <div className="absolute inset-x-0 top-0 h-28 bg-[linear-gradient(to_bottom,rgba(12,58,30,.55),rgba(12,58,30,0))]" />
        <div className="trame trame-film absolute inset-x-0 bottom-0 h-[55%]" aria-hidden="true" />

        {/* Mire de mise au point : elle suit le sujet du film et nomme ce qu'elle vise. */}
        <div ref={mire} className="pointer-events-none absolute left-0 top-0 z-[5] motion-reduce:hidden" aria-hidden="true">
          <div className="relative -translate-x-1/2 -translate-y-1/2">
            <div className="mire relative size-[76px] sm:size-[96px]">
              <span className="absolute left-0 top-0 size-4 border-l border-t border-papier/90" />
              <span className="absolute right-0 top-0 size-4 border-r border-t border-papier/90" />
              <span className="absolute bottom-0 left-0 size-4 border-b border-l border-papier/90" />
              <span className="absolute bottom-0 right-0 size-4 border-b border-r border-papier/90" />
              <span className="absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ambre" />
              <span className="absolute left-1/2 top-[18%] h-[14%] w-px -translate-x-1/2 bg-papier/60" />
              <span className="absolute bottom-[18%] left-1/2 h-[14%] w-px -translate-x-1/2 bg-papier/60" />
            </div>
            <div className="absolute left-full top-0 flex items-center gap-2 pl-1">
              <span className="h-px w-6 bg-papier/60" />
              <span key={vise} className="mire-texte whitespace-nowrap rounded-sm bg-foret-900/70 px-2 py-1 text-xs font-semibold text-papier backdrop-blur-sm">
                {vise}
              </span>
            </div>
          </div>
        </div>

        {/* Repères d'angle de l'écran : le viseur de toute la page. */}
        <div className="pointer-events-none absolute inset-3 z-[6] sm:inset-5" aria-hidden="true">
          <span className="absolute left-0 top-0 size-6 border-l border-t border-papier/35 sm:size-8" />
          <span className="absolute right-0 top-0 size-6 border-r border-t border-papier/35 sm:size-8" />
          <span className="absolute bottom-0 left-0 size-6 border-b border-l border-papier/35 sm:size-8" />
          <span className="absolute bottom-0 right-0 size-6 border-b border-r border-ambre sm:size-8" />
        </div>

        <header className="absolute inset-x-0 top-0 z-10">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 sm:px-10" aria-label="Principale">
            <a href="#" className="titre text-xl font-extrabold text-papier">{PROGRAMME.nom}</a>
            <div className="flex items-center gap-6 text-sm text-papier/85">
              <a href="#programme" className="hidden hover:text-papier sm:inline">Programme</a>
              <a href="#calendrier" className="hidden hover:text-papier sm:inline">Calendrier</a>
              <a href="#questions" className="hidden hover:text-papier md:inline">Questions</a>
              <a href="#inscription" className="rounded-full border border-papier/40 px-4 py-2 font-semibold text-papier transition-colors hover:border-ambre hover:text-ambre">
                Candidater
              </a>
            </div>
          </nav>
        </header>

        {/* Rail des chapitres (bureau) : où l'on est dans le film, et un clic pour y aller. */}
        <ol className="absolute right-10 top-1/2 z-10 hidden -translate-y-1/2 lg:block" aria-label="Chapitres du film">
          <span className="absolute bottom-2 right-[3px] top-2 w-px bg-papier/25" aria-hidden="true" />
          {CHAPITRES.map((c, i) => {
            const on = i === chap
            return (
              <li key={c.nom}>
                <button
                  type="button"
                  onClick={() => allerA(c)}
                  aria-current={on ? 'step' : undefined}
                  className="group relative flex items-center justify-end gap-4 py-3 pr-5 text-sm"
                >
                  <span className={`transition-colors duration-500 ${on ? 'text-papier' : 'text-papier/45 group-hover:text-papier/80'}`}>{c.nom}</span>
                  <span className={`absolute right-0 size-[7px] rounded-full transition-[background-color,box-shadow] duration-500 ${on ? 'bg-ambre shadow-[0_0_0_4px_rgba(251,191,36,.25)]' : 'bg-papier/50'}`} />
                </button>
              </li>
            )
          })}
        </ol>

        <div className="absolute inset-x-0 bottom-0 z-10">
          <div className="relative mx-auto max-w-7xl px-6 pb-12 sm:px-10 sm:pb-16">
            <div className={`transition-all duration-700 ease-sortie ${titreVisible ? 'opacity-100' : 'pointer-events-none -translate-y-6 opacity-0'}`}>
              <h1 className="titre max-w-[14ch] text-[clamp(2.9rem,8.4vw,6rem)] font-extrabold text-papier">
                Votre commerce mérite d'être <Marqueur>vu</Marqueur>.
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-papier/85 sm:text-xl">
                Une formation de {PROGRAMME.duree} pour les femmes&nbsp;: marketing digital, outils numériques, vente en ligne et intelligence artificielle.
              </p>
              <Appel />
            </div>

            {CHAPITRES.filter((c) => c.texte).map((c) => {
              const on = p >= c.de && p < c.a
              return (
                <p
                  key={c.nom}
                  aria-hidden={!on}
                  className={`titre absolute bottom-14 left-6 right-6 max-w-[18ch] text-[clamp(2.2rem,6vw,4.4rem)] font-bold text-papier transition-all duration-700 ease-sortie sm:bottom-16 sm:left-10 ${on ? 'opacity-100' : 'translate-y-6 opacity-0'}`}
                >
                  {c.texte}
                </p>
              )
            })}

            <div className={`absolute bottom-12 left-6 right-6 transition-all duration-700 ease-sortie sm:bottom-16 sm:left-10 ${finVisible ? 'opacity-100' : 'pointer-events-none translate-y-6 opacity-0'}`} aria-hidden={!finVisible}>
              <p className="titre max-w-[16ch] text-[clamp(2.4rem,6.6vw,5rem)] font-extrabold text-papier">
                {PROGRAMME.duree} pour apprendre à <Marqueur>se montrer</Marqueur>.
              </p>
              <Appel tabIndex={finVisible ? 0 : -1} />
            </div>
          </div>
        </div>

        {/* Mobile : la progression du film en quatre segments, un par chapitre. */}
        <div className="absolute inset-x-6 bottom-5 z-10 flex gap-1.5 lg:hidden" aria-hidden="true">
          {CHAPITRES.map((c, i) => {
            const remplissage = Math.min(1, Math.max(0, (p - c.de) / (Math.min(c.a, 1) - c.de)))
            return (
              <span key={c.nom} className="h-[3px] flex-1 overflow-hidden bg-papier/20">
                <span className={`block h-full origin-left ${i === chap ? 'bg-ambre' : 'bg-papier/70'}`} style={{ transform: `scaleX(${remplissage})` }} />
              </span>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Appel({ tabIndex }) {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
      <a
        href="#inscription"
        tabIndex={tabIndex}
        className="group inline-flex items-center gap-3 rounded-full bg-ambre px-7 py-4 text-base font-bold text-encre shadow-[0_10px_30px_-10px_rgba(251,191,36,.7)] transition-transform duration-300 ease-sortie hover:-translate-y-0.5"
      >
        Je m'inscris
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" className="transition-transform duration-300 ease-sortie group-hover:translate-x-1">
          <path d="M3 9h11M10 4.5 14.5 9 10 13.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
      <p className="text-sm text-papier/80">
        Candidatures jusqu'au <strong className="font-semibold text-papier">{PROGRAMME.clotureCourte}</strong> · {PROGRAMME.places} places · {PROGRAMME.cout}
      </p>
    </div>
  )
}
