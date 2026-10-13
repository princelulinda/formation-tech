import { useEffect, useRef, useState } from 'react'

// Passe à true la première fois que l'élément entre dans l'écran.
export function useVu(marge = '0px 0px -12% 0px') {
  const ref = useRef(null)
  const [vu, setVu] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || vu) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVu(true); io.disconnect() }
    }, { rootMargin: marge })
    io.observe(el)
    return () => io.disconnect()
  }, [vu, marge])
  return [ref, vu]
}
