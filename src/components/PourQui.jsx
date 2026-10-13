import { useEffect, useState } from 'react'
import { PROFILS } from '../data'
import { useVu } from '../useVu'

// Décalages verticaux de la constellation (bureau) : le portrait central monte, les côtés descendent.
const DECALAGE = ['lg:mt-28', 'lg:mt-0', 'lg:mt-44']

export default function PourQui() {
  const [actif, setActif] = useState(0)
  const [main, setMain] = useState(false)
  const [ref, vu] = useVu('0px 0px -30% 0px')

  // Le repère ambre passe d'un profil à l'autre tant que personne ne choisit.
  useEffect(() => {
    if (!vu || main || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setActif((a) => (a + 1) % PROFILS.length), 3600)
    return () => clearInterval(t)
  }, [vu, main])

  const choisir = (i) => { setMain(true); setActif(i) }

  return (
    <section className="trame relative overflow-hidden bg-foret-900 py-24 text-papier sm:py-32">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <h2 className="titre text-[clamp(2.6rem,6vw,5rem)] font-extrabold">Pour qui&#8239;?</h2>
          <p className="max-w-md text-lg leading-relaxed text-papier/75">
            Trois points de départ, une même envie&#8239;: être vue, et vendre plus loin que sa rue.
          </p>
        </div>

        <ul ref={ref} className="mt-16 grid gap-14 sm:grid-cols-3 sm:gap-6 lg:mt-20 lg:gap-10">
          {PROFILS.map((p, i) => {
            const on = i === actif
            return (
              <li key={p.id} className={DECALAGE[i]}>
                <button
                  type="button"
                  onMouseEnter={() => choisir(i)}
                  onFocus={() => choisir(i)}
                  onClick={() => choisir(i)}
                  aria-pressed={on}
                  className="group block w-full text-left focus-visible:outline-none"
                >
                  <Cadre on={on}>
                    <img
                      src={p.image}
                      alt={p.alt}
                      loading="lazy"
                      width="800"
                      height="1067"
                      className={`aspect-[3/4] w-full object-cover transition-[filter,transform] duration-700 ease-sortie ${on ? 'scale-100 saturate-100' : 'scale-[1.03] saturate-[.55] brightness-[.8]'}`}
                    />
                  </Cadre>

                  {/* Filet de rappel : du cadre à l'étiquette, terminé par un point. */}
                  <div className="relative ml-6 h-10" aria-hidden="true">
                    <span className={`absolute left-0 top-0 h-full w-px transition-colors duration-500 ${on ? 'bg-ambre' : 'bg-papier/30'}`} />
                    <span className={`absolute -left-[3px] bottom-0 size-[7px] rounded-full transition-colors duration-500 ${on ? 'bg-ambre' : 'bg-papier/40'}`} />
                  </div>

                  <div className={`ml-6 border-l pl-5 transition-colors duration-500 ${on ? 'border-ambre' : 'border-papier/20'}`}>
                    <p className="flex items-baseline justify-between gap-4">
                      <span className="titre text-2xl font-bold">{p.nom}</span>
                      <span className="text-sm text-papier/55">{p.lieu}</span>
                    </p>
                    <p className={`mt-3 max-w-[34ch] leading-relaxed transition-colors duration-500 ${on ? 'text-papier/90' : 'text-papier/60'}`}>
                      {p.texte}
                    </p>
                  </div>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

// Cadre biseauté avec repères d'angle, comme un viseur posé sur la photo.
export function Cadre({ on, children, className = '' }) {
  const c = on ? 'border-ambre' : 'border-papier/40'
  return (
    <div className={`relative p-3 ${className}`}>
      <div className="grain biseau overflow-hidden">
        {children}
      </div>
      <span aria-hidden="true" className={`absolute left-0 top-0 size-5 border-l border-t transition-colors duration-500 ${c}`} />
      <span aria-hidden="true" className={`absolute right-0 bottom-0 size-5 border-b border-r transition-colors duration-500 ${c}`} />
    </div>
  )
}
