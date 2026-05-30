import { useMemo } from 'react'
import { useT } from '../../i18n'
import useStore from '../../store/useStore.js'
import { formatPrice } from '../../utils/format.js'
import { computeStats } from '../../utils/stats.js'
import useCrossTabSync from '../../hooks/useCrossTabSync.js'

// Категория бойынша сатылым (₸).
function revenueByCategory(orders, products, categories) {
  const priceCat = {}
  for (const p of products) priceCat[p.name] = p.categoryId
  const map = {}
  for (const o of orders) {
    for (const it of o.items || []) {
      const catId = priceCat[it.name]
      if (catId) map[catId] = (map[catId] || 0) + it.price * it.qty
    }
  }
  return categories
    .map((c) => ({ name: c.name, value: map[c.id] || 0 }))
    .sort((a, b) => b.value - a.value)
}

function Bar({ label, value, max, color }) {
  return (
    <div>
      <div className="flex justify-between text-sm">
        <span className="text-slate-700">{label}</span>
        <span className="text-slate-500">{value}</span>
      </div>
      <div className="mt-1 h-2.5 rounded-full bg-slate-100">
        <div
          className={`h-2.5 rounded-full ${color}`}
          style={{ width: `${max ? (rawValue(value) / max) * 100 : 0}%` }}
        />
      </div>
    </div>
  )
}

// "1 200 ₸" немесе санды бірдей өңдеу үшін
function rawValue(v) {
  if (typeof v === 'number') return v
  return Number(String(v).replace(/[^\d]/g, '')) || 0
}

export default function Analytics() {
  const t = useT()
  const orders = useStore((s) => s.orders)
  const products = useStore((s) => s.products)
  const categories = useStore((s) => s.categories)
  useCrossTabSync()

  const stats = useMemo(() => computeStats(orders), [orders])
  const byCat = useMemo(
    () => revenueByCategory(orders, products, categories),
    [orders, products, categories],
  )

  const maxCat = Math.max(1, ...byCat.map((c) => c.value))
  const maxSource = Math.max(1, stats.online, stats.offline)
  const statusList = [
    { key: 'new', color: 'bg-sky-400' },
    { key: 'cooking', color: 'bg-amber-400' },
    { key: 'ready', color: 'bg-emerald-400' },
    { key: 'done', color: 'bg-slate-400' },
  ]
  const maxStatus = Math.max(1, ...Object.values(stats.byStatus))

  if (orders.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{t.analytics.title}</h1>
        <p className="mt-6 text-slate-400">{t.analytics.noData}</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">{t.analytics.title}</h1>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Категория бойынша сатылым */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="font-semibold text-slate-900">{t.analytics.revenueByCategory}</h2>
          <div className="mt-4 space-y-3">
            {byCat.map((c) => (
              <Bar
                key={c.name}
                label={c.name}
                value={formatPrice(c.value)}
                max={maxCat}
                color="bg-slate-900"
              />
            ))}
          </div>
        </div>

        {/* Көзі бойынша */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="font-semibold text-slate-900">{t.analytics.ordersBySource}</h2>
          <div className="mt-4 space-y-3">
            <Bar label={t.order.source.online} value={stats.online} max={maxSource} color="bg-violet-500" />
            <Bar label={t.order.source.pos} value={stats.offline} max={maxSource} color="bg-slate-700" />
          </div>
        </div>

        {/* Статус бойынша */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="font-semibold text-slate-900">{t.analytics.statusBreakdown}</h2>
          <div className="mt-4 space-y-3">
            {statusList.map((s) => (
              <Bar
                key={s.key}
                label={t.order.status[s.key]}
                value={stats.byStatus[s.key]}
                max={maxStatus}
                color={s.color}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
