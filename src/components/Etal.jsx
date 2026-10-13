import { useEffect, useRef, useState } from 'react'

// Charge le noyau Hairline puis la figure « étal », une seule fois pour la page.
let figure = null
const script = (url) => new Promise((ok, ko) => {
  const s = document.createElement('script')
  s.src = url
  s.onload = ok
  s.onerror = ko
  document.head.append(s)
})
const chargerFigure = () => (figure ??= new Promise((ok, ko) => {
  window.hairline = (def) => ok(def)
  script('/hairline/kernel.js').then(() => script('/hairline/etal.js')).catch(ko)
}))

// La figure lit sa portée en cellules ; le texte de la page la dit en mots.
const nommer = (r) =>
  r === 'rest' ? (matchMedia('(pointer: fine)').matches ? 'Survolez l’étal' : 'Touchez l’étal') : r.replace('pot', 'Pot')

export default function Etal() {
  const stage = useRef(null)
  const [lecture, setLecture] = useState('rest')

  useEffect(() => {
    const el = stage.current
    let handle, visite, io, fini = false
    chargerFigure().then((def) => {
      if (fini) return
      const HL = window.HL
      HL.inject(document)
      el.setAttribute('data-hairline', def.name)
      const svg = HL.mk('svg', { viewBox: '0 0 400 320', 'aria-hidden': 'true' }, el)
      const read = { set textContent(v) { setLecture(String(v ?? '')) }, get textContent() { return '' } }
      handle = def.mount({ stage: el, svg, read }, def.range[1])
      // La visite guidée joue une fois quand l'étal entre à l'écran, puis cède la main.
      if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
        io = new IntersectionObserver(([e]) => {
          if (e.isIntersecting) { visite = HL.tour(el, def.tour, () => {}); io.disconnect() }
        }, { threshold: 0.6 })
        io.observe(el)
      }
    })
    return () => {
      fini = true
      io?.disconnect()
      visite?.stop()
      handle?.destroy()
      el.replaceChildren()
    }
  }, [])

  return (
    <figure className="etal">
      <div
        ref={stage}
        role="img"
        aria-label="Un étal de vingt pots : ceux qui sont proches du pointeur se soulèvent, le plus proche le plus haut."
        className="-my-[8%] w-full lg:-mr-[6%] lg:w-[112%]"
      />
      <figcaption className="relative mt-2 text-right lg:-mt-[10%] text-sm tabular-nums text-papier/70" aria-live="polite">
        {nommer(lecture)}
      </figcaption>
    </figure>
  )
}
