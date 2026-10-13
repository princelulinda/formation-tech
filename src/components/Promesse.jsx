import { Cadre } from './PourQui'

// Le repère se lit sur la photo : chaque point montre ce que la formation apprend à faire.
// x, y : position du point sur la photo (en % de sa largeur et de sa hauteur) ; ly : hauteur de l'étiquette.
const REPERES = [
  { x: 13, y: 23, ly: 12, titre: 'Une vitrine en ligne', texte: 'Page Facebook, Instagram, catalogue WhatsApp.' },
  { x: 45, y: 45, ly: 46, titre: 'Des photos qui vendent', texte: 'Lumière, cadrage et retouche, au téléphone.' },
  { x: 29, y: 53, ly: 80, titre: 'Les commandes à distance', texte: 'Messages, mobile money, livraison.', cle: true },
]

// Géométrie du bloc annoté, en unités du viewBox : photo 420 × 525, puis la colonne d'étiquettes.
const PW = 420, PH = 525, GAP = 28, W = 664

export default function Promesse() {
  return (
    <section className="trame trame-foret relative overflow-hidden py-24 sm:py-32">
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div>
          <h2 className="titre text-[clamp(2.3rem,5vw,4rem)] font-extrabold text-foret">
            Vous savez déjà vendre. Apprenez à vendre là où vos clientes regardent&nbsp;: sur leur téléphone.
          </h2>
          <p className="mt-8 max-w-[56ch] text-lg leading-relaxed text-mousse">
            Huit semaines d'ateliers concrets, en petit groupe, sur votre propre activité. Aucun prérequis&nbsp;: un téléphone et l'envie d'apprendre suffisent.
          </p>
          <a href="#programme" className="mt-8 inline-flex items-center gap-2 font-semibold text-foret underline decoration-ambre decoration-2 underline-offset-[6px] hover:decoration-foret">
            Voir le programme
          </a>
        </div>

        <figure className="relative">
          {/* Bureau : la photo dans son viseur, les repères tirés jusqu'aux étiquettes à droite. */}
          <div className="relative hidden lg:block" style={{ aspectRatio: `${W} / ${PH}` }}>
            <div className="absolute inset-y-0 left-0" style={{ width: `${(PW / W) * 100}%` }}>
              <Cadre on className="h-full p-0!">
                <img src="/img/portrait.webp" alt="Une commerçante en foulard jaune sourit, téléphone à l'oreille, devant sa boutique." width="900" height="1200" loading="lazy" className="h-full w-full object-cover" />
              </Cadre>
            </div>
            <svg viewBox={`0 0 ${W} ${PH}`} className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
              {REPERES.map((r) => {
                const px = (r.x / 100) * PW, py = (r.y / 100) * PH, ly = (r.ly / 100) * PH
                const couleur = r.cle ? '#fbbf24' : '#f8fafc'
                return (
                  <g key={r.titre}>
                    {/* Sur la photo le filet est clair ; sur le papier il passe au vert forêt. */}
                    <polyline points={`${px},${py} ${PW},${py}`} fill="none" stroke={couleur} strokeOpacity={r.cle ? 1 : 0.85} strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
                    <polyline points={`${PW},${py} ${PW + GAP / 2},${py} ${PW + GAP},${ly} ${PW + GAP + 14},${ly}`} fill="none" stroke={r.cle ? '#d99a06' : '#14532d'} strokeOpacity={r.cle ? 1 : 0.5} strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
                    <circle cx={px} cy={py} r="9" fill="none" stroke={couleur} strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
                    <circle cx={px} cy={py} r="3.2" fill={couleur} />
                    <circle cx={PW + GAP + 14} cy={ly} r="2.6" fill={r.cle ? '#d99a06' : '#14532d'} />
                  </g>
                )
              })}
            </svg>
            {REPERES.map((r) => (
              <div
                key={r.titre}
                className="absolute -translate-y-1/2 pl-3"
                style={{ left: `${((PW + GAP + 18) / W) * 100}%`, right: 0, top: `${r.ly}%` }}
              >
                <p className={`titre text-xl font-bold ${r.cle ? 'text-foret' : 'text-encre'}`}>{r.titre}</p>
                <p className="mt-1 text-sm leading-snug text-mousse">{r.texte}</p>
              </div>
            ))}
          </div>

          {/* Mobile et tablette : la photo, puis les trois repères en liste. */}
          <div className="lg:hidden">
            <Cadre on>
              <img src="/img/portrait.webp" alt="Une commerçante en foulard jaune sourit, téléphone à l'oreille, devant sa boutique." width="900" height="1200" loading="lazy" className="aspect-[4/5] w-full object-cover" />
            </Cadre>
            <ul className="mt-6 grid gap-5 sm:grid-cols-3">
              {REPERES.map((r) => (
                <li key={r.titre} className={`border-l pl-4 ${r.cle ? 'border-ambre' : 'border-foret/25'}`}>
                  <p className="titre text-xl font-bold text-encre">{r.titre}</p>
                  <p className="mt-1 text-sm leading-snug text-mousse">{r.texte}</p>
                </li>
              ))}
            </ul>
          </div>
        </figure>
      </div>
    </section>
  )
}
