import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import kk from '../i18n/kk.js'
import useStore from '../store/useStore.js'
import { minutesSince } from '../utils/format.js'
import useCrossTabSync from '../hooks/useCrossTabSync.js'

// Канбан бағандары: статус → келесі статус + батырма мәтіні.
const COLUMNS = [
  { status: 'new', next: 'cooking', action: kk.kitchen.startCooking, accent: 'sky' },
  { status: 'cooking', next: 'ready', action: kk.kitchen.markReady, accent: 'amber' },
  { status: 'ready', next: 'done', action: kk.kitchen.complete, accent: 'emerald' },
]

const ACCENTS = {
  sky: 'border-t-sky-400',
  amber: 'border-t-amber-400',
  emerald: 'border-t-emerald-400',
}

const BTN = {
  sky: 'bg-sky-500 hover:bg-sky-600',
  amber: 'bg-amber-500 hover:bg-amber-600',
  emerald: 'bg-emerald-500 hover:bg-emerald-600',
}

export default function Kitchen() {
  const navigate = useNavigate()
  const orders = useStore((s) => s.orders)
  const setOrderStatus = useStore((s) => s.setOrderStatus)

  // Бөлек табтан (POS) келген заказдарды realtime көру.
  useCrossTabSync()

  // Картадағы "X мин бұрын" жаңарып тұруы үшін минут сайын қайта рендер.
  const [, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 30000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex h-screen flex-col bg-slate-900 text-slate-100">
      {/* Topbar */}
      <header className="flex items-center justify-between border-b border-slate-700 px-5 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/demo')}
            className="text-sm font-medium text-slate-400 hover:text-white"
          >
            ← {kk.actions.back}
          </button>
          <span className="rounded-md bg-amber-500/20 px-2 py-1 text-xs font-semibold text-amber-300">
            {kk.demoMode}
          </span>
          <span className="font-semibold">{kk.kitchen.title}</span>
        </div>
        <span className="text-sm text-slate-500">{kk.company}</span>
      </header>

      {/* Канбан бағандары */}
      <div className="grid flex-1 grid-cols-1 gap-4 overflow-y-auto p-4 md:grid-cols-3">
        {COLUMNS.map((col) => {
          const colOrders = orders.filter((o) => o.status === col.status)
          return (
            <section key={col.status} className="flex flex-col">
              <div className="mb-3 flex items-center justify-between px-1">
                <h2 className="font-semibold text-slate-200">
                  {kk.kitchen.columns[col.status]}
                </h2>
                <span className="rounded-full bg-slate-700 px-2 py-0.5 text-xs text-slate-300">
                  {colOrders.length}
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-3">
                {colOrders.length === 0 ? (
                  <p className="rounded-xl border border-dashed border-slate-700 px-4 py-8 text-center text-sm text-slate-600">
                    {col.status === 'new' ? kk.kitchen.waiting : kk.kitchen.empty}
                  </p>
                ) : (
                  colOrders.map((o) => (
                    <OrderCard
                      key={o.id}
                      order={o}
                      accent={col.accent}
                      action={col.action}
                      onAdvance={() => setOrderStatus(o.id, col.next)}
                    />
                  ))
                )}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}

function OrderCard({ order, accent, action, onAdvance }) {
  const mins = minutesSince(order.createdAt)
  const timeLabel = mins === 0 ? kk.kitchen.justNow : `${mins} ${kk.kitchen.minutesAgo}`

  return (
    <div className={`rounded-xl border-t-4 bg-slate-800 p-4 shadow ${ACCENTS[accent]}`}>
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold">#{order.number}</span>
        <span className="text-xs text-slate-400">{timeLabel}</span>
      </div>

      <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
        <span className="rounded bg-slate-700 px-1.5 py-0.5">
          {kk.order.source[order.source]}
        </span>
        <span>{kk.order.type[order.type]}</span>
        {order.table && order.table !== '—' && (
          <span>· {kk.pos.table} {order.table}</span>
        )}
      </div>

      <ul className="mt-3 space-y-1">
        {order.items.map((it, idx) => (
          <li key={idx} className="flex justify-between text-sm">
            <span>{it.name}</span>
            <span className="text-slate-400">×{it.qty}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={onAdvance}
        className={`mt-4 w-full rounded-lg py-2 text-sm font-semibold text-white transition ${BTN[accent]}`}
      >
        {action}
      </button>
    </div>
  )
}
