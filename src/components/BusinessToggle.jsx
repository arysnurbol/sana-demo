import { useT } from '../i18n'
import useStore from '../store/useStore.js'

// Кофехана / Наубайхана ауыстырғыш — сегментті toggle панель.
// Ауысқанда store seed-ті толық алмастырады (өнім, категория, заказдар).
const TYPES = ['coffee', 'bakery']

export default function BusinessToggle({ className = '' }) {
  const t = useT()
  const businessType = useStore((s) => s.businessType)
  const setBusinessType = useStore((s) => s.setBusinessType)

  return (
    <div className={`inline-flex rounded-lg border border-slate-200 bg-white p-0.5 ${className}`}>
      {TYPES.map((type) => (
        <button
          key={type}
          onClick={() => setBusinessType(type)}
          className={`rounded-md px-3 py-1 text-xs font-semibold transition ${
            businessType === type
              ? 'bg-emerald-500 text-white'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          {t.business[type]}
        </button>
      ))}
    </div>
  )
}
