import { useEffect } from 'react'
import useStore from '../store/useStore.js'

// POS пен Kitchen бөлек браузер табтарында ашылады.
// Zustand persist localStorage-ты бөліседі, бірақ бір табтағы өзгерісті
// екінші таб автоматты қабылдамайды. `storage` event арқылы екінші табта
// store-ды қайта оқимыз (rehydrate) — осылай POS→Kitchen realtime болады.
export function useCrossTabSync() {
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'sana-demo-store') {
        useStore.persist.rehydrate()
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])
}

export default useCrossTabSync
