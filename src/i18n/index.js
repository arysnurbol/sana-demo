import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import kk from './kk.json'
import ru from './ru.json'

// Қолжетімді тілдер.
export const LANGS = [
  { code: 'kk', label: 'ҚАЗ' },
  { code: 'ru', label: 'РУС' },
]

const dict = { kk, ru }

// Таңдалған тіл localStorage-та сақталады (persist).
export const useLang = create(
  persist(
    (set) => ({
      lang: 'kk',
      setLang: (lang) => set({ lang }),
    }),
    { name: 'sana-lang' },
  ),
)

// Компоненттерде ағымдағы тілдің сөздігін қайтарады.
// Тіл ауысқанда useLang өзгеретіндіктен компонент қайта рендерленеді.
export function useT() {
  const lang = useLang((s) => s.lang)
  return dict[lang]
}
