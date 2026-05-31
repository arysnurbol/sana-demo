import { useT } from '../../i18n'
import useStore from '../../store/useStore.js'
import Icon from '../../components/Icon.jsx'

// Штамп прогресі: толған/бос нүктелер.
function Stamps({ count, target }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {Array.from({ length: target }).map((_, i) => (
        <span
          key={i}
          className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
            i < count
              ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white'
              : 'border border-dashed border-slate-300 text-slate-300'
          }`}
        >
          {i < count ? '✓' : '○'}
        </span>
      ))}
    </div>
  )
}

function KpiCard({ label, value, icon, tint }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${tint}`}>
          <Icon name={icon} className="h-[18px] w-[18px]" />
        </span>
      </div>
      <p className="mt-2 text-2xl font-extrabold text-slate-900">{value}</p>
    </div>
  )
}

export default function Loyalty() {
  const t = useT()
  const customers = useStore((s) => s.customers)
  const loyalty = useStore((s) => s.loyalty)
  const addStamp = useStore((s) => s.addStamp)
  const target = loyalty?.stampsTarget || 6

  const totalStamps = customers.reduce((sum, c) => sum + (c.stamps || 0), 0)
  const totalFree = customers.reduce((sum, c) => sum + (c.freeEarned || 0), 0)
  // "Қайта оралу" — демо метрика (2+ заказы бар клиенттер үлесі).
  const repeat = customers.length
    ? Math.round((customers.filter((c) => c.ordersCount >= 2).length / customers.length) * 100)
    : 0

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">{t.loyalty.title}</h1>
      <p className="mt-1 text-sm text-slate-500">{t.loyalty.subtitle}</p>

      {/* Бағдарлама картасы + KPI */}
      <div className="mt-6 grid gap-4 lg:grid-cols-4">
        {/* Gradient бағдарлама картасы */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 p-5 text-white">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-300">
            {t.loyalty.programCard}
          </p>
          <p className="mt-2 text-xl font-bold leading-snug">
            {t.loyalty.rule.replace('{n}', target)}
          </p>
          <span className="absolute -bottom-3 -right-2 text-6xl opacity-20">☕</span>
        </div>

        <KpiCard label={t.loyalty.members} value={customers.length} icon="customers" tint="bg-sky-50 text-sky-600" />
        <KpiCard label={t.loyalty.stampsIssued} value={totalStamps} icon="check" tint="bg-emerald-50 text-emerald-600" />
        <KpiCard label={t.loyalty.repeatRate} value={`${repeat}%`} icon="analytics" tint="bg-violet-50 text-violet-600" />
      </div>

      {/* Клиенттер прогресі */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="hidden grid-cols-[1.5fr_2fr_1fr_auto] gap-4 border-b border-slate-200 bg-slate-50 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400 sm:grid">
          <span>{t.loyalty.client}</span>
          <span>{t.loyalty.progress}</span>
          <span>{t.loyalty.freeEarned}</span>
          <span></span>
        </div>
        <div className="divide-y divide-slate-100">
          {customers.map((c) => {
            const stamps = c.stamps || 0
            const left = target - stamps
            const ready = stamps === 0 && (c.freeEarned || 0) > 0 // жаңа ғана сыйлық алды дегендей емес — қарапайым: 0 болса толмаған
            return (
              <div
                key={c.id}
                className="grid grid-cols-1 gap-3 px-5 py-4 sm:grid-cols-[1.5fr_2fr_1fr_auto] sm:items-center sm:gap-4"
              >
                <div>
                  <p className="font-semibold text-slate-900">{c.name}</p>
                  <p className="text-xs text-slate-400">{c.phone}</p>
                </div>

                <div>
                  <Stamps count={stamps} target={target} />
                  <p className="mt-1.5 text-xs text-slate-500">
                    {left} {t.loyalty.left} · {t.loyalty.reward}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-sm text-slate-600">
                  <span className="text-amber-500">★</span>
                  <span className="font-semibold">{c.freeEarned || 0}</span>
                </div>

                <button
                  onClick={() => addStamp(c.id)}
                  className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-700"
                >
                  + {t.loyalty.addStamp}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
