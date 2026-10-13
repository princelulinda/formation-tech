import { useEffect, useRef, useState } from 'react'
import { MODULES } from '../data'
import { Cadre } from './PourQui'

// Chaque module couvre deux semaines : la piste du viseur en compte huit.
const SEMAINES = MODULES.length * 2

export default function Programme() {
  const [actif, setActif] = useState(0)
  const lignes = useRef([])

  useEffect(() => {
    const io = new IntersectionObserver((entrees) => {
      entrees.forEach((e) => { if (e.isIntersecting) setActif(Number(e.target.dataset.i)) })
    }, { rootMargin: '-45% 0px -45% 0px' })
    lignes.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  const m = MODULES[actif]

  return (
    <section id="programme" className="trame trame-foret trame-gauche relative scroll-mt-4 overflow-hidden border-t border-trait py-24 sm:py-32">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        <h2 className="titre max-w-[18ch] text-[clamp(2.3rem,5vw,4rem)] font-extrabold text-foret">
          Quatre modules, de la vitrine à la commande.
        </h2>

        <div className="mt-16 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* Le viseur reste en place ; l'image et la piste des semaines suivent le module lu. */}
          <div className="hidden lg:block">
            <div className="sticky top-[10vh]">
              <Cadre on>
                <div className="relative aspect-[3/4] bg-foret">
                  {MODULES.map((x, i) => (
                    <img
                      key={x.id}
                      src={x.image}
                      alt={i === actif ? x.alt : ''}
                      aria-hidden={i !== actif}
                      loading="lazy"
                      width="900"
                      height="1200"
                      className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform,clip-path] duration-[900ms] ease-sortie ${i === actif ? 'scale-100 opacity-100 [clip-path:inset(0_0_0_0)]' : 'scale-[1.04] opacity-0 [clip-path:inset(8%_8%_8%_8%)]'}`}
                    />
                  ))}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(to_top,rgba(12,58,30,.85),rgba(12,58,30,0))]" />
                  <div className="absolute inset-x-5 bottom-5 text-papier">
                    <p className="titre text-2xl font-bold">{m.titre}</p>
                    <div className="mt-3 flex gap-1.5" aria-hidden="true">
                      {Array.from({ length: SEMAINES }, (_, s) => {
                        const on = Math.floor(s / 2) === actif
                        const fait = Math.floor(s / 2) < actif
                        return (
                          <span
                            key={s}
                            className={`h-1 flex-1 transition-colors duration-500 ${on ? 'bg-ambre' : fait ? 'bg-papier/70' : 'bg-papier/25'}`}
                          />
                        )
                      })}
                    </div>
                    <p className="mt-2 flex justify-between text-sm text-papier/75">
                      <span>{m.semaines}</span>
                      <span className="tabular-nums">{actif * 2 + 2}/{SEMAINES}</span>
                    </p>
                  </div>
                </div>
              </Cadre>
            </div>
          </div>

          {/* Rail des modules : un nœud par module, le nœud actif tire un filet vers le viseur. */}
          <ol className="relative">
            <span aria-hidden="true" className="absolute bottom-2 left-[7px] top-2 w-px bg-foret/20" />
            {MODULES.map((x, i) => {
              const on = i === actif
              return (
                <li
                  key={x.id}
                  ref={(el) => (lignes.current[i] = el)}
                  data-i={i}
                  className="relative pb-14 pl-10 last:pb-0 lg:min-h-[44vh] lg:last:min-h-0"
                >
                  <span aria-hidden="true" className={`absolute left-0 top-3 size-[15px] rounded-full border-2 transition-[background-color,border-color,box-shadow] duration-500 ${on ? 'border-ambre bg-ambre shadow-[0_0_0_5px_rgba(251,191,36,.22)]' : 'border-foret/40 bg-papier'}`} />
                  <span
                    aria-hidden="true"
                    className={`absolute right-[calc(100%-7px)] top-[18px] hidden h-px origin-right bg-ambre transition-transform duration-700 ease-sortie lg:block ${on ? 'w-[5.5rem] scale-x-100' : 'w-[5.5rem] scale-x-0'}`}
                  />

                  <div className="mb-6 lg:hidden">
                    <Cadre on={on}>
                      <img src={x.image} alt={x.alt} loading="lazy" width="900" height="1200" className="aspect-[4/3] w-full object-cover" />
                    </Cadre>
                  </div>
                  <h3 className={`titre text-[clamp(2rem,4vw,3.25rem)] font-extrabold transition-colors duration-500 ${on ? 'text-foret' : 'text-foret lg:text-foret/55'}`}>
                    {x.titre}
                  </h3>
                  <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-mousse">{x.texte}</p>
                  <p className={`mt-4 text-sm font-semibold transition-colors duration-500 ${on ? 'text-foret' : 'text-mousse'}`}>{x.semaines}</p>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
