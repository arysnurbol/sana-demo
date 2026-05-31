import { useMemo } from 'react'
import { useT } from '../../i18n'
import useStore from '../../store/useStore.js'
import { formatPrice } from '../../utils/format.js'
import { computeStats } from '../../utils/stats.js'
import useCrossTabSync from '../../hooks/useCrossTabSync.js'
import Icon from '../../components/Icon.jsx'
import EmptyState from '../../components/EmptyState.jsx'

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

// Gradient прогресс-бар жолы.
function BarRow({ label, display, ratio, gradient }) {
  return (
    <div>
      <div className="flex justify-between text-sm">
        <span className="font-medium text-slate-700">{label}</span>
        <span className="font-semibold text-slate-500">{display}</span>
      </div>
      <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${gradient}`}
          style={{ width: `${Math.max(4, ratio * 100)}%` }}
        />
      </div>
    </div>
  )
}

function Card({ title, icon, tint, children }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="mb-4 flex items-center gap-2.5">
        <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${tint}`}>
          <Icon name={icon} className="h-[18px] w-[18px]" />
        </span>
        <h2 className="font-bold text-slate-900">{title}</h2>
      </div>
      {children}
    </div>
  )
}

export default function Analytics() {
  const t = useT()
  const orders = useStore((s) => s.orders)
  const products = useStore((s) => s.products)
  const categories = useStore((s) => s.categories)
  const company = useStore((s) => s.company)
  useCrossTabSync()

  const stats = useMemo(() => computeStats(orders), [orders])
  const byCat = useMemo(
    () => revenueByCategory(orders, products, categories),
    [orders, products, categories],
  )

  const maxCat = Math.max(1, ...byCat.map((c) => c.value))
  const maxSource = Math.max(1, stats.online, stats.offline)
  const statusList = [
    { key: 'new', gradient: 'from-sky-400 to-sky-500' },
    { key: 'cooking', gradient: 'from-amber-400 to-amber-500' },
    { key: 'ready', gradient: 'from-emerald-400 to-emerald-500' },
    { key: 'done', gradient: 'from-slate-400 to-slate-500' },
  ]
  const maxStatus = Math.max(1, ...Object.values(stats.byStatus))

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">{t.analytics.title}</h1>
      <p className="mt-1 text-sm text-slate-500">{company}</p>

      {orders.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white">
          <EmptyState title={t.emptyState.dashboardTitle} text={t.analytics.noData} />
        </div>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Категория бойынша сатылым */}
          <Card
            title={t.analytics.revenueByCategory}
            icon="analytics"
            tint="bg-emerald-50 text-emerald-600"
          >
            <div className="space-y-3.5">
              {byCat.map((c) => (
                <BarRow
                  key={c.name}
                  label={c.name}
                  display={formatPrice(c.value)}
                  ratio={c.value / maxCat}
                  gradient="from-emerald-500 to-teal-600"
                />
              ))}
            </div>
          </Card>

          {/* Көзі бойынша */}
          <Card
            title={t.analytics.ordersBySource}
            icon="orders"
            tint="bg-violet-50 text-violet-600"
          >
            <div className="space-y-3.5">
              <BarRow
                label={t.order.source.online}
                display={stats.online}
                ratio={stats.online / maxSource}
                gradient="from-violet-500 to-purple-600"
              />
              <BarRow
                label={t.order.source.pos}
                display={stats.offline}
                ratio={stats.offline / maxSource}
                gradient="from-slate-600 to-slate-800"
              />
            </div>
          </Card>

          {/* Статус бойынша */}
          <Card
            title={t.analytics.statusBreakdown}
            icon="kitchen"
            tint="bg-amber-50 text-amber-600"
          >
            <div className="space-y-3.5">
              {statusList.map((s) => (
                <BarRow
                  key={s.key}
                  label={t.order.status[s.key]}
                  display={stats.byStatus[s.key]}
                  ratio={stats.byStatus[s.key] / maxStatus}
                  gradient={s.gradient}
                />
              ))}
            </div>
          </Card>

          {/* Қорытынды KPI */}
          <Card title={t.dashboard.revenue} icon="revenue" tint="bg-sky-50 text-sky-600">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-medium text-slate-500">{t.dashboard.ordersCount}</p>
                <p className="mt-1 text-2xl font-extrabold text-slate-900">{stats.ordersCount}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-medium text-slate-500">{t.dashboard.avgCheck}</p>
                <p className="mt-1 text-2xl font-extrabold text-slate-900">
                  {formatPrice(stats.avgCheck)}
                </p>
              </div>
              <div className="col-span-2 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 p-4 text-white">
                <p className="text-xs font-medium text-emerald-50">{t.dashboard.revenue}</p>
                <p className="mt-1 text-3xl font-extrabold">{formatPrice(stats.revenue)}</p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
