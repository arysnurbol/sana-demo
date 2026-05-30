import { useState } from 'react'
import { useT } from '../../i18n'
import useStore from '../../store/useStore.js'
import { formatPrice, minutesSince } from '../../utils/format.js'
import useCrossTabSync from '../../hooks/useCrossTabSync.js'

const STATUS_STYLES = {
  new: 'bg-sky-100 text-sky-700',
  cooking: 'bg-amber-100 text-amber-700',
  ready: 'bg-emerald-100 text-emerald-700',
  done: 'bg-slate-100 text-slate-500',
}

const FILTERS = ['all', 'pos', 'online']

export default function Orders() {
  const t = useT()
  const orders = useStore((s) => s.orders)
  useCrossTabSync() // POS/онлайн заказдар realtime түседі

  const [filter, setFilter] = useState('all')
  const filtered = filter === 'all' ? orders : orders.filter((o) => o.source === filter)

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">{t.nav.orders}</h1>
        <div className="flex gap-1.5">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                filter === f
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f === 'all' ? 'Барлығы' : t.order.source[f]}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-slate-400">Заказдар әлі жоқ.</p>
      ) : (
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-left text-slate-500">
              <tr>
                <th className="px-4 py-3 font-medium">#</th>
                <th className="px-4 py-3 font-medium">Тауарлар</th>
                <th className="px-4 py-3 font-medium">Көзі</th>
                <th className="px-4 py-3 font-medium">Түрі</th>
                <th className="px-4 py-3 font-medium">Сумма</th>
                <th className="px-4 py-3 font-medium">Статус</th>
                <th className="px-4 py-3 font-medium">Уақыт</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((o) => {
                const mins = minutesSince(o.createdAt)
                return (
                  <tr key={o.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-bold text-slate-900">#{o.number}</td>
                    <td className="px-4 py-3 text-slate-600">
                      {o.items.map((i) => `${i.name}×${i.qty}`).join(', ')}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded px-2 py-0.5 text-xs font-medium ${
                          o.source === 'online'
                            ? 'bg-violet-100 text-violet-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {t.order.source[o.source]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{t.order.type[o.type]}</td>
                    <td className="px-4 py-3 font-medium text-slate-900">{formatPrice(o.total)}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[o.status]}`}>
                        {t.order.status[o.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-400">
                      {mins === 0 ? t.kitchen.justNow : `${mins} ${t.kitchen.minutesAgo}`}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
