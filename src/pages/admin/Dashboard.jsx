import { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useT } from '../../i18n'
import useStore from '../../store/useStore.js'
import { formatPrice, minutesSince } from '../../utils/format.js'
import { computeStats } from '../../utils/stats.js'
import useCrossTabSync from '../../hooks/useCrossTabSync.js'
import Icon from '../../components/Icon.jsx'
import Badge from '../../components/Badge.jsx'
import EmptyState from '../../components/EmptyState.jsx'

const STATUS_TONE = { new: 'sky', cooking: 'amber', ready: 'emerald', done: 'slate' }

// Stat карта: иконка оң жақ бұрышта (TapLead стилінде).
function StatCard({ label, value, icon, accent, tint }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${tint}`}>
          <Icon name={icon} className="h-[18px] w-[18px]" />
        </span>
      </div>
      <p className={`mt-2 text-3xl font-extrabold tracking-tight ${accent || 'text-slate-900'}`}>
        {value}
      </p>
    </div>
  )
}

export default function Dashboard() {
  const t = useT()
  const navigate = useNavigate()
  const orders = useStore((s) => s.orders)
  const customers = useStore((s) => s.customers)
  const products = useStore((s) => s.products)
  const company = useStore((s) => s.company)
  useCrossTabSync() // жаңа заказдар realtime есепке кіреді

  const stats = useMemo(
    () => computeStats(orders, customers, products),
    [orders, customers, products],
  )
  const recent = orders.slice(0, 5)
  const maxTop = stats.topProducts[0]?.qty || 1

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">{t.nav.dashboard}</h1>
      <p className="mt-1 text-sm text-slate-500">{company}</p>

      {/* Stat карталары */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-3">
        <StatCard
          label={t.dashboard.revenue}
          value={formatPrice(stats.revenue)}
          icon="revenue"
          tint="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          label={t.dashboard.ordersCount}
          value={stats.ordersCount}
          icon="orders"
          tint="bg-sky-50 text-sky-600"
        />
        <StatCard
          label={t.dashboard.avgCheck}
          value={formatPrice(stats.avgCheck)}
          icon="cart"
          tint="bg-amber-50 text-amber-600"
        />
        <StatCard
          label={t.dashboard.online}
          value={stats.online}
          icon="onlineMenu"
          accent="text-violet-600"
          tint="bg-violet-50 text-violet-600"
        />
        <StatCard
          label={t.dashboard.offline}
          value={stats.offline}
          icon="pos"
          tint="bg-slate-100 text-slate-600"
        />
        <StatCard
          label={t.dashboard.customersCount}
          value={stats.customersCount}
          icon="customers"
          tint="bg-rose-50 text-rose-600"
        />
      </div>

      {/* Пайда мен маржа — кофехана иесінің басты метрикасы */}
      {orders.length > 0 && (
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {/* Таза пайда — көрнекті gradient карта */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 p-5 text-white">
            <div className="flex items-start justify-between">
              <p className="text-sm font-medium text-emerald-50">{t.dashboard.profit}</p>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
                <Icon name="revenue" className="h-[18px] w-[18px]" />
              </span>
            </div>
            <p className="mt-2 text-3xl font-extrabold">{formatPrice(stats.profit)}</p>
            <p className="mt-1 text-xs text-emerald-50/80">{t.dashboard.profitHint}</p>
          </div>

          {/* Маржа % */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-start justify-between">
              <p className="text-sm font-medium text-slate-500">{t.dashboard.margin}</p>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Icon name="analytics" className="h-[18px] w-[18px]" />
              </span>
            </div>
            <p className="mt-2 text-3xl font-extrabold text-slate-900">{stats.marginPct}%</p>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-600"
                style={{ width: `${stats.marginPct}%` }}
              />
            </div>
          </div>

          {/* Материал шығыны */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-start justify-between">
              <p className="text-sm font-medium text-slate-500">{t.dashboard.materialCost}</p>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-50 text-rose-500">
                <Icon name="cart" className="h-[18px] w-[18px]" />
              </span>
            </div>
            <p className="mt-2 text-3xl font-extrabold text-slate-900">
              {formatPrice(stats.materialCost)}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              {stats.revenue ? Math.round((stats.materialCost / stats.revenue) * 100) : 0}% ·{' '}
              {t.dashboard.revenue.toLowerCase()}
            </p>
          </div>
        </div>
      )}

      {orders.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white">
          <EmptyState
            title={t.emptyState.dashboardTitle}
            text={t.emptyState.dashboardText}
            action={
              <button
                onClick={() => navigate('/demo/pos')}
                className="mt-5 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
              >
                {t.emptyState.openPos} →
              </button>
            }
          />
        </div>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Ең көп сатылған */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="font-bold text-slate-900">{t.dashboard.topProducts}</h2>
            <div className="mt-4 space-y-3">
              {stats.topProducts.map((p) => (
                <div key={p.name}>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-slate-700">{p.name}</span>
                    <span className="text-slate-500">
                      {p.qty} {t.dashboard.sold}
                    </span>
                  </div>
                  <div className="mt-1 h-2 rounded-full bg-slate-100">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600"
                      style={{ width: `${(p.qty / maxTop) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Соңғы заказдар */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-slate-900">{t.dashboard.recentOrders}</h2>
              <Link
                to="/demo/admin/orders"
                className="text-sm font-medium text-slate-500 hover:text-slate-900"
              >
                {t.nav.orders} →
              </Link>
            </div>
            <ul className="mt-4 divide-y divide-slate-100">
              {recent.map((o) => {
                const mins = minutesSince(o.createdAt)
                return (
                  <li key={o.id} className="flex items-center justify-between py-2.5">
                    <div>
                      <span className="font-bold text-slate-900">#{o.number}</span>
                      <span className="ml-2 text-sm text-slate-500">{formatPrice(o.total)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge tone={STATUS_TONE[o.status]}>{t.order.status[o.status]}</Badge>
                      <span className="text-xs text-slate-400">
                        {mins === 0 ? t.kitchen.justNow : `${mins} ${t.kitchen.minutesAgo}`}
                      </span>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
