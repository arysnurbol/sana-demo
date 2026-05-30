import { useEffect, useState } from 'react'

// Берілген секция id-лерінің қайсысы экранда көрініп тұрғанын қайтарады.
// Landing-тегі anchor nav-тың активін белгілеу үшін.
export function useScrollSpy(ids, offset = 100) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const onScroll = () => {
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= offset) {
          current = id
        }
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ids, offset])

  return active
}

export default useScrollSpy
