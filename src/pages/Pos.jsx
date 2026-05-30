import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useT } from '../i18n'
import useStore from '../store/useStore.js'
import { formatPrice } from '../utils/format.js'

const ORDER_TYPES = ['dine_in', 'takeaway', 'delivery']
const PAYMENTS = ['kaspi', 'cash', 'card']

export default function Pos() {
  const t = useT()
  const navigate = useNavigate()
  const categories = useStore((s) => s.categories)
  const products = useStore((s) => s.products)
  const addOrder = useStore((s) => s.addOrder)

  const sortedCategories = useMemo(
    () => [...categories].sort((a, b) => a.order - b.order),
    [categories],
  )

  const [activeCat, setActiveCat] = useState(sortedCategories[0]?.id ?? null)
  const [cart, setCart] = useState([]) // { id, name, price, qty }
  const [orderType, setOrderType] = useState('dine_in')
  const [table, setTable] = useState('')
  const [payment, setPayment] = useState('kaspi')
  const [confirmation, setConfirmation] = useState(null)

  const visibleProducts = products.filter((p) => p.categoryId === activeCat)
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0)

  function addToCart(product) {
    if (!product.available) return
    setCart((prev) => {
      const found = prev.find((i) => i.id === product.id)
      if (found) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i))
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, qty: 1 }]
    })
  }

  function changeQty(id, delta) {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0),
    )
  }

  function clearCart() {
    setCart([])
  }

  function createOrder() {
    if (cart.length === 0) return
    const order = addOrder({
      type: orderType,
      table: orderType === 'dine_in' ? table || '—' : null,
      payment,
      items: cart.map((i) => ({ name: i.name, qty: i.qty, price: i.price })),
      total,
      source: 'pos',
    })
    setConfirmation(order)
    setCart([])
    setTable('')
  }

  return (
    <div className="flex h-screen flex-col bg-slate-50">
      {/* Topbar */}
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/demo')}
            className="text-sm font-medium text-slate-500 hover:text-slate-900"
          >
            ← {t.actions.back}
          </button>
          <span className="rounded-md bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700">
            {t.demoMode}
          </span>
          <span className="font-semibold text-slate-800">{t.pos.title}</span>
        </div>
        <span className="text-sm text-slate-400">{t.company}</span>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Сол жақ: категориялар + өнімдер */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Категория табтары */}
          <div className="flex gap-2 overflow-x-auto border-b border-slate-200 bg-white px-5 py-3">
            {sortedCategories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCat(c.id)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition ${
                  activeCat === c.id
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Өнім торы */}
          <div className="grid flex-1 auto-rows-min grid-cols-2 gap-3 overflow-y-auto p-5 sm:grid-cols-3 lg:grid-cols-4">
            {visibleProducts.map((p) => (
              <button
                key={p.id}
                onClick={() => addToCart(p)}
                disabled={!p.available}
                className={`flex flex-col items-start rounded-xl border p-4 text-left transition ${
                  p.available
                    ? 'border-slate-200 bg-white hover:border-slate-900 hover:shadow-sm'
                    : 'cursor-not-allowed border-slate-100 bg-slate-50 opacity-50'
                }`}
              >
                <span className="font-medium text-slate-900">{p.name}</span>
                <span className="mt-1 text-sm text-slate-500">{formatPrice(p.price)}</span>
                {!p.available && (
                  <span className="mt-2 rounded bg-rose-100 px-1.5 py-0.5 text-xs text-rose-600">
                    {t.pos.notAvailable}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Оң жақ: себет */}
        <aside className="flex w-80 shrink-0 flex-col border-l border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3">
            <h2 className="font-semibold text-slate-900">{t.pos.cart}</h2>
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs font-medium text-rose-500 hover:text-rose-700"
              >
                {t.actions.clear}
              </button>
            )}
          </div>

          {/* Себет тізімі */}
          <div className="flex-1 overflow-y-auto px-5 py-3">
            {cart.length === 0 ? (
              <p className="mt-6 text-center text-sm text-slate-400">{t.pos.emptyCart}</p>
            ) : (
              <ul className="space-y-3">
                {cart.map((i) => (
                  <li key={i.id} className="flex items-center justify-between">
                    <div className="min-w-0">
                      <p className="truncate font-medium text-slate-800">{i.name}</p>
                      <p className="text-xs text-slate-500">{formatPrice(i.price)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => changeQty(i.id, -1)}
                        className="h-7 w-7 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200"
                      >
                        −
                      </button>
                      <span className="w-5 text-center text-sm font-medium">{i.qty}</span>
                      <button
                        onClick={() => changeQty(i.id, 1)}
                        className="h-7 w-7 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200"
                      >
                        +
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Заказ параметрлері */}
          <div className="border-t border-slate-200 px-5 py-4">
            {/* Заказ түрі */}
            <label className="text-xs font-medium text-slate-500">{t.pos.orderType}</label>
            <div className="mt-1 flex gap-1.5">
              {ORDER_TYPES.map((ty) => (
                <button
                  key={ty}
                  onClick={() => setOrderType(ty)}
                  className={`flex-1 rounded-lg px-2 py-1.5 text-xs font-medium transition ${
                    orderType === ty
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {t.order.type[ty]}
                </button>
              ))}
            </div>

            {/* Стол (тек залда ішу) */}
            {orderType === 'dine_in' && (
              <div className="mt-3">
                <label className="text-xs font-medium text-slate-500">{t.pos.table}</label>
                <input
                  value={table}
                  onChange={(e) => setTable(e.target.value)}
                  placeholder={t.pos.tablePlaceholder}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-1.5 text-sm focus:border-slate-900 focus:outline-none"
                />
              </div>
            )}

            {/* Төлем */}
            <label className="mt-3 block text-xs font-medium text-slate-500">
              {t.pos.payment}
            </label>
            <div className="mt-1 flex gap-1.5">
              {PAYMENTS.map((p) => (
                <button
                  key={p}
                  onClick={() => setPayment(p)}
                  className={`flex-1 rounded-lg px-2 py-1.5 text-xs font-medium transition ${
                    payment === p
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {t.pos.paymentMethods[p]}
                </button>
              ))}
            </div>

            {/* Итог + заказ жасау */}
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-slate-500">{t.pos.total}</span>
              <span className="text-lg font-bold text-slate-900">{formatPrice(total)}</span>
            </div>
            <button
              onClick={createOrder}
              disabled={cart.length === 0}
              className="mt-3 w-full rounded-xl bg-slate-900 py-3 font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {t.actions.createOrder}
            </button>
          </div>
        </aside>
      </div>

      {/* Заказ жасалды модалы */}
      {confirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl">
              ✓
            </div>
            <h3 className="mt-4 text-lg font-bold text-slate-900">{t.pos.orderCreated}</h3>
            <p className="mt-1 text-2xl font-bold text-slate-900">#{confirmation.number}</p>
            <p className="mt-1 text-sm text-slate-500">
              {formatPrice(confirmation.total)} · {t.order.type[confirmation.type]}
            </p>
            <div className="mt-5 flex gap-2">
              <button
                onClick={() => setConfirmation(null)}
                className="flex-1 rounded-xl border border-slate-200 py-2.5 font-medium text-slate-700 hover:bg-slate-50"
              >
                {t.actions.createOrder}
              </button>
              <button
                onClick={() => navigate('/demo/kitchen')}
                className="flex-1 rounded-xl bg-slate-900 py-2.5 font-medium text-white hover:bg-slate-700"
              >
                {t.roles.kitchen} →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
