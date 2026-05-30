import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useT } from '../../i18n'
import useStore from '../../store/useStore.js'
import { formatPrice, minutesSince } from '../../utils/format.js'
import { computeStats } from '../../utils/stats.js'
import useCrossTabSync from '../../hooks/useCrossTabSync.js'

const STATUS_STYLES = {
  new: 'bg-sky-100 text-sky-700',
  cooking: 'bg-amber-100 text-amber-700',
  ready: 'bg-emerald-100 text-emerald-700',
  done: 'bg-slate-100 text-slate-500',
}

function StatCard({ label, value, accent }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-sm text-slate-500">{label}</p>
      <p className={`mt-1 text-2xl font-bold ${accent || 'text-slate-900'}`}>{value}</p>
    </div>
  )
}

export default function Dashboard() {
  const t = useT()
  const orders = useStore((s) => s.orders)
  const customers = useStore((s) => s.customers)
  useCrossTabSync() // жаңа заказдар realtime есепке кіреді

  const stats = useMemo(() => computeStats(orders, customers), [orders, customers])
  const recent = orders.slice(0, 5)
  const maxTop = stats.topProducts[0]?.qty || 1

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">{t.nav.dashboard}</h1>

      {/* Stat карталары */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-3">
        <StatCard label={t.dashboard.revenue} value={formatPrice(stats.revenue)} />
        <StatCard label={t.dashboard.ordersCount} value={stats.ordersCount} />
        <StatCard label={t.dashboard.avgCheck} value={formatPrice(stats.avgCheck)} />
        <StatCard label={t.dashboard.online} value={stats.online} accent="text-violet-600" />
        <StatCard label={t.dashboard.offline} value={stats.offline} accent="text-slate-700" />
        <StatCard label={t.dashboard.customersCount} value={stats.customersCount} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Ең көп сатылған */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="font-semibold text-slate-900">{t.dashboard.topProducts}</h2>
          {stats.topProducts.length === 0 ? (
            <p className="mt-4 text-sm text-slate-400">{t.dashboard.noData}</p>
          ) : (
            <div className="mt-4 space-y-3">
              {stats.topProducts.map((p) => (
                <div key={p.name}>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-700">{p.name}</span>
                    <span className="text-slate-500">
                      {p.qty} {t.dashboard.sold}
                    </span>
                  </div>
                  <div className="mt-1 h-2 rounded-full bg-slate-100">
                    <div
                      className="h-2 rounded-full bg-slate-900"
                      style={{ width: `${(p.qty / maxTop) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Соңғы заказдар */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">{t.dashboard.recentOrders}</h2>
            <Link to="/demo/admin/orders" className="text-sm font-medium text-slate-500 hover:text-slate-900">
              {t.nav.orders} →
            </Link>
          </div>
          {recent.length === 0 ? (
            <p className="mt-4 text-sm text-slate-400">{t.dashboard.noData}</p>
          ) : (
            <ul className="mt-4 divide-y divide-slate-100">
              {recent.map((o) => {
                const mins = minutesSince(o.createdAt)
                return (
                  <li key={o.id} className="flex items-center justify-between py-2.5">
                    <div>
                      <span className="font-medium text-slate-900">#{o.number}</span>
                      <span className="ml-2 text-sm text-slate-500">{formatPrice(o.total)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[o.status]}`}>
                        {t.order.status[o.status]}
                      </span>
                      <span className="text-xs text-slate-400">
                        {mins === 0 ? t.kitchen.justNow : `${mins} ${t.kitchen.minutesAgo}`}
                      </span>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
