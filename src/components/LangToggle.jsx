import { LANGS, useLang } from '../i18n'

// ҚАЗ / РУС тіл ауыстырғыш — сегментті toggle панель.
export default function LangToggle({ className = '' }) {
  const lang = useLang((s) => s.lang)
  const setLang = useLang((s) => s.setLang)

  return (
    <div className={`inline-flex rounded-lg border border-slate-200 bg-white p-0.5 ${className}`}>
      {LANGS.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          className={`rounded-md px-2.5 py-1 text-xs font-semibold transition ${
            lang === l.code
              ? 'bg-slate-900 text-white'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}
