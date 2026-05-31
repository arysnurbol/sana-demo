import { useMemo, useState } from 'react'
import { useT } from '../../i18n'
import useStore from '../../store/useStore.js'
import { formatPrice } from '../../utils/format.js'
import useCrossTabSync from '../../hooks/useCrossTabSync.js'
import Icon from '../../components/Icon.jsx'
import EmptyState from '../../components/EmptyState.jsx'

const PAY_TINT = {
  kaspi: 'bg-rose-50 text-rose-600',
  cash: 'bg-emerald-50 text-emerald-600',
  card: 'bg-sky-50 text-sky-600',
}

export default function Shift() {
  const t = useT()
  const orders = useStore((s) => s.orders)
  useCrossTabSync()

  // Ауысым — тек POS (офлайн) заказдар. Онлайн бөлек жүреді.
  const posOrders = useMemo(() => orders.filter((o) => o.source === 'pos'), [orders])

  // Төлем бойынша бөліну.
  const byPayment = useMemo(() => {
    const map = { kaspi: 0, cash: 0, card: 0 }
    for (const o of posOrders) {
      if (map[o.payment] !== undefined) map[o.payment] += o.total || 0
    }
    return map
  }, [posOrders])

  const expectedCash = byPayment.cash // жүйе күтетін қолма-қол
  const [counted, setCounted] = useState('') // кассир санаған нақты ақша

  const countedNum = counted === '' ? expectedCash : Number(counted) || 0
  const diff = countedNum - expectedCash
  const diffState = diff === 0 ? 'match' : diff < 0 ? 'shortage' : 'surplus'
  const diffStyle = {
    match: 'text-emerald-600',
    shortage: 'text-rose-600',
    surplus: 'text-amber-600',
  }[diffState]

  if (posOrders.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">{t.shift.title}</h1>
        <p className="mt-1 text-sm text-slate-500">{t.shift.subtitle}</p>
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white">
          <EmptyState title={t.shift.current} text={t.shift.noData} />
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">{t.shift.title}</h1>
      <p className="mt-1 text-sm text-slate-500">{t.shift.subtitle}</p>

      {/* Ауысым мәліметі */}
      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm">
        <span className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
          <span className="font-semibold text-slate-700">{t.shift.current}</span>
        </span>
        <span className="text-slate-500">
          {t.shift.cashier}: <span className="font-medium text-slate-700">{t.shift.cashierName}</span>
        </span>
        <span className="text-slate-500">
          {t.shift.openedAt}: <span className="font-medium text-slate-700">08:00</span>
        </span>
        <span className="text-slate-500">
          {t.shift.ordersInShift}: <span className="font-medium text-slate-700">{posOrders.length}</span>
        </span>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Сол жақ: касса сверкасы */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="mb-4 flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Icon name="revenue" className="h-[18px] w-[18px]" />
            </span>
            <h2 className="font-bold text-slate-900">{t.shift.cashDrawer}</h2>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">{t.shift.expected}</span>
              <span className="font-semibold text-slate-900">{formatPrice(expectedCash)}</span>
            </div>

            <div>
              <label className="text-sm text-slate-500">{t.shift.countLabel}</label>
              <input
                value={counted}
                onChange={(e) => setCounted(e.target.value)}
                inputMode="numeric"
                placeholder={String(expectedCash)}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
              />
            </div>

            {/* Айырма */}
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
              <span className="text-sm font-medium text-slate-600">{t.shift.difference}</span>
              <span className={`font-bold ${diffStyle}`}>
                {diff > 0 ? '+' : ''}
                {formatPrice(diff)} · {t.shift[diffState]}
              </span>
            </div>
          </div>

          <button className="mt-5 w-full rounded-xl bg-slate-900 py-3 font-semibold text-white transition hover:bg-slate-700">
            {t.shift.close}
          </button>
        </div>

        {/* Оң жақ: төлем бойынша */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="mb-4 flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
              <Icon name="analytics" className="h-[18px] w-[18px]" />
            </span>
            <h2 className="font-bold text-slate-900">{t.shift.byPayment}</h2>
          </div>

          <div className="space-y-3">
            {['kaspi', 'cash', 'card'].map((p) => (
              <div key={p} className="flex items-center justify-between">
                <span className="flex items-center gap-2.5">
                  <span className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold ${PAY_TINT[p]}`}>
                    {t.pos.paymentMethods[p].slice(0, 1)}
                  </span>
                  <span className="text-sm text-slate-700">{t.pos.paymentMethods[p]}</span>
                </span>
                <span className="font-semibold text-slate-900">{formatPrice(byPayment[p])}</span>
              </div>
            ))}

            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
              <span className="text-sm text-slate-500">{t.shift.returns}</span>
              <span className="font-medium text-slate-700">0 · {formatPrice(0)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
