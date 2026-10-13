import HeroScroll from './components/HeroScroll'
import Etal from './components/Etal'
import Inscription from './components/Inscription'
import Marqueur from './components/Marqueur'
import PourQui from './components/PourQui'
import Promesse from './components/Promesse'
import Programme from './components/Programme'
import { CALENDRIER, PROGRAMME, QUESTIONS } from './data'
import { useVu } from './useVu'

const ANNEE = new Date().getFullYear()

export default function App() {
  return (
    <>
      <HeroScroll />
      <main>
        <Promesse />
        <Programme />
        <Portee />
        <Calendrier />
        <PourQui />
        <Questions />
        <section id="inscription" className="trame trame-claire relative scroll-mt-4 overflow-hidden bg-foret py-20 text-papier sm:py-28">
          <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div className="lg:sticky lg:top-10 lg:self-start">
              <h2 className="titre text-[clamp(2.6rem,6vw,4.6rem)] font-extrabold">
                Prête à <Marqueur>commencer</Marqueur> ?
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-papier/80">
                Remplissez ce formulaire avant le {PROGRAMME.clotureCourte} Nous vous répondons par e-mail et sur WhatsApp.
              </p>
              <dl className="mt-10 grid max-w-sm grid-cols-2 gap-y-5 border-t border-papier/15 pt-6 text-sm">
                <dt className="text-papier/60">Places</dt><dd className="font-semibold">{PROGRAMME.places}</dd>
                <dt className="text-papier/60">Durée</dt><dd className="font-semibold">{PROGRAMME.duree}</dd>
                <dt className="text-papier/60">Lieu</dt><dd className="font-semibold">{PROGRAMME.lieu}</dd>
                <dt className="text-papier/60">Coût</dt><dd className="font-semibold">{PROGRAMME.cout}</dd>
              </dl>
            </div>
            <div className="relative p-3">
              <span aria-hidden="true" className="absolute left-0 top-0 size-6 border-l border-t border-ambre" />
              <span aria-hidden="true" className="absolute right-0 bottom-0 size-6 border-b border-r border-papier/40" />
              <Inscription />
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-foret-900 text-papier/60">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-10 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span className="titre text-lg font-extrabold text-papier">{PROGRAMME.nom}</span>
          <span>© {ANNEE} {PROGRAMME.nom}. Formation des femmes au marketing et aux nouvelles technologies.</span>
        </div>
      </footer>
    </>
  )
}

function Portee() {
  return (
    <section className="overflow-hidden bg-foret py-24 text-papier sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <h2 className="titre text-[clamp(2.3rem,5vw,4rem)] font-extrabold">
            Au marché, on vous voit depuis l'allée. En ligne, on peut vous voir depuis <Marqueur>toute la ville</Marqueur>.
          </h2>
          <p className="mt-8 max-w-[52ch] text-lg leading-relaxed text-papier/80">
            Le marketing digital, c'est choisir ce que vous montrez, et à qui. <span className="pointer-fine:hidden">Touchez</span><span className="hidden pointer-fine:inline">Survolez</span> l'étal : chaque publication met quelques produits en avant, et atteint d'abord les personnes les plus proches.
          </p>
        </div>
        <Etal />
      </div>
    </section>
  )
}

function Calendrier() {
  const [ref, vu] = useVu('0px 0px -25% 0px')
  return (
    <section id="calendrier" className="scroll-mt-4 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <h2 className="titre max-w-[16ch] text-[clamp(2.3rem,5vw,4rem)] font-extrabold text-foret">
            Les dates à retenir.
          </h2>
          <p className="max-w-sm text-lg leading-relaxed text-mousse">
            {PROGRAMME.duree}, {PROGRAMME.rythme}. {PROGRAMME.lieu}.
          </p>
        </div>

        {/* La ligne se trace, puis chaque date s'allume ; la date limite en dernier, soulignée. */}
        <ol ref={ref} className={`relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6 ${vu ? 'vu' : ''}`}>
          <span
            aria-hidden="true"
            className={`absolute left-[7px] top-2 bottom-2 w-px origin-top bg-foret/30 transition-transform duration-[1200ms] ease-sortie lg:left-0 lg:right-0 lg:top-[7px] lg:bottom-auto lg:h-px lg:w-auto lg:origin-left motion-reduce:transition-none ${vu ? 'scale-100' : 'scale-y-0 lg:scale-y-100 lg:scale-x-0'}`}
          />
          {CALENDRIER.map((c, i) => {
            const cle = i === 1
            const delai = cle ? 1300 : 200 + i * 180
            return (
              <li key={c.titre} className="relative pl-10 lg:pl-0 lg:pt-10">
                <span
                  aria-hidden="true"
                  style={{ transitionDelay: `${delai}ms` }}
                  className={`absolute left-0 top-1 size-[15px] rounded-full border-2 transition-[background-color,border-color,transform] duration-500 ease-sortie lg:top-0 motion-reduce:transition-none ${cle ? (vu ? 'scale-125 border-ambre bg-ambre' : 'border-trait bg-papier') : (vu ? 'border-foret bg-papier' : 'border-trait bg-papier')}`}
                />
                <p className="titre text-2xl font-bold text-encre">
                  {cle ? <Marqueur>{c.date}</Marqueur> : c.date}
                </p>
                <p className="mt-2 text-mousse">{c.titre}{cle && <strong className="font-semibold text-foret"> · date limite</strong>}</p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

function Questions() {
  return (
    <section id="questions" className="scroll-mt-4 bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <h2 className="titre text-[clamp(2.3rem,5vw,4rem)] font-extrabold text-foret">
          Vos questions.
        </h2>
        <div>
          {QUESTIONS.map(({ q, r }) => (
            <details key={q} className="group border-b border-trait first:border-t">
              <summary className="flex items-center justify-between gap-6 py-6 text-xl font-semibold text-encre hover:text-foret">
                {q}
                <svg width="22" height="22" viewBox="0 0 22 22" className="plus shrink-0 transition-transform duration-300 ease-sortie" aria-hidden="true">
                  <path d="M11 4v14M4 11h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </summary>
              <p className="max-w-[60ch] pb-7 text-lg leading-relaxed text-mousse">{r}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
