import { useVu } from '../useVu'

// Un mot souligné d'un trait de marqueur ambre, tracé quand il entre à l'écran.
export default function Marqueur({ children }) {
  const [ref, vu] = useVu()
  return (
    <span ref={ref} className={`marqueur ${vu ? 'vu' : ''}`}>
      {children}
      <svg viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">
        <path pathLength="1" d="M2 6.5C22 3.2 48 2.8 70 4.2c9 .6 18 1.4 28 .4" />
      </svg>
    </span>
  )
}
