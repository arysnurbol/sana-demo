import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import kk from '../i18n/kk.js'
import useStore from '../store/useStore.js'
import { formatPrice } from '../utils/format.js'

// Мобайл-first QR меню. Клиент телефоннан көргендей.
export default function OnlineMenu() {
  const navigate = useNavigate()
  const categories = useStore((s) => s.categories)
  const products = useStore((s) => s.products)
  const addOrder = useStore((s) => s.addOrder)

  const sortedCategories = useMemo(
    () => [...categories].sort((a, b) => a.order - b.order),
    [categories],
  )

  const [cart, setCart] = useState([]) // { id, name, price, qty }
  const [view, setView] = useState('menu') // 'menu' | 'checkout'
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [confirmation, setConfirmation] = useState(null)

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0)
  const count = cart.reduce((sum, i) => sum + i.qty, 0)

  function addToCart(p) {
    if (!p.available) return
    setCart((prev) => {
      const found = prev.find((i) => i.id === p.id)
      if (found) return prev.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i))
      return [...prev, { id: p.id, name: p.name, price: p.price, qty: 1 }]
    })
  }

  function changeQty(id, delta) {
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i)).filter((i) => i.qty > 0),
    )
  }

  function submitOrder() {
    if (!name.trim() || !phone.trim()) {
      setError(kk.menu.required)
      return
    }
    const order = addOrder({
      type: 'takeaway',
      table: null,
      payment: 'online',
      items: cart.map((i) => ({ name: i.name, qty: i.qty, price: i.price })),
      total,
      source: 'online',
      customer: { name: name.trim(), phone: phone.trim() },
    })
    setConfirmation(order)
    setCart([])
    setName('')
    setPhone('')
    setError('')
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col bg-white shadow-xl">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-slate-100 bg-white px-5 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => (view === 'checkout' ? setView('menu') : navigate('/demo'))}
            className="text-sm font-medium text-slate-400"
          >
            ← {kk.actions.back}
          </button>
          <span className="text-xs font-semibold text-emerald-600">{kk.company}</span>
        </div>
        <h1 className="mt-2 text-2xl font-bold text-slate-900">{kk.menu.title}</h1>
        {view === 'menu' && <p className="text-sm text-slate-500">{kk.menu.subtitle}</p>}
      </header>

      {view === 'menu' ? (
        <>
          {/* Меню тізімі */}
          <main className="flex-1 overflow-y-auto px-5 py-4 pb-28">
            {sortedCategories.map((cat) => (
              <section key={cat.id} className="mb-6">
                <h2 className="mb-3 text-lg font-bold text-slate-900">{cat.name}</h2>
                <div className="space-y-3">
                  {products
                    .filter((p) => p.categoryId === cat.id)
                    .map((p) => (
                      <div
                        key={p.id}
                        className={`flex items-center justify-between rounded-2xl border border-slate-100 p-4 ${
                          !p.available ? 'opacity-50' : ''
                        }`}
                      >
                        <div>
                          <p className="font-medium text-slate-900">{p.name}</p>
                          <p className="text-sm text-slate-500">{formatPrice(p.price)}</p>
                        </div>
                        <button
                          onClick={() => addToCart(p)}
                          disabled={!p.available}
                          className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:bg-slate-300"
                        >
                          {p.available ? kk.menu.add : kk.pos.notAvailable}
                        </button>
                      </div>
                    ))}
                </div>
              </section>
            ))}
          </main>

          {/* Себет батырмасы (floating) */}
          {count > 0 && (
            <div className="fixed inset-x-0 bottom-0 mx-auto max-w-md p-4">
              <button
                onClick={() => setView('checkout')}
                className="flex w-full items-center justify-between rounded-2xl bg-slate-900 px-5 py-4 font-semibold text-white shadow-lg"
              >
                <span className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs">
                    {count}
                  </span>
                  {kk.menu.viewCart}
                </span>
                <span>{formatPrice(total)}</span>
              </button>
            </div>
          )}
        </>
      ) : (
        /* Checkout */
        <main className="flex-1 overflow-y-auto px-5 py-4">
          <h2 className="mb-3 text-lg font-bold text-slate-900">{kk.menu.yourOrder}</h2>

          {cart.length === 0 ? (
            <p className="py-10 text-center text-slate-400">{kk.menu.emptyCart}</p>
          ) : (
            <>
              <ul className="space-y-3">
                {cart.map((i) => (
                  <li key={i.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-800">{i.name}</p>
                      <p className="text-xs text-slate-500">{formatPrice(i.price)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => changeQty(i.id, -1)}
                        className="h-8 w-8 rounded-full bg-slate-100 text-slate-700"
                      >
                        −
                      </button>
                      <span className="w-5 text-center text-sm font-medium">{i.qty}</span>
                      <button
                        onClick={() => changeQty(i.id, 1)}
                        className="h-8 w-8 rounded-full bg-slate-100 text-slate-700"
                      >
                        +
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="my-4 flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="text-slate-500">{kk.menu.total}</span>
                <span className="text-xl font-bold text-slate-900">{formatPrice(total)}</span>
              </div>

              {/* Клиент деректері */}
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-slate-600">{kk.menu.name}</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={kk.menu.namePlaceholder}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">{kk.menu.phone}</label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={kk.menu.phonePlaceholder}
                    inputMode="tel"
                    className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-slate-900 focus:outline-none"
                  />
                </div>
                {error && <p className="text-sm text-rose-500">{error}</p>}
              </div>

              <button
                onClick={submitOrder}
                className="mt-5 w-full rounded-2xl bg-emerald-500 py-4 font-semibold text-white hover:bg-emerald-600"
              >
                {kk.menu.submit}
              </button>
            </>
          )}
        </main>
      )}

      {/* Сәтті заказ модалы */}
      {confirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl">
              ✓
            </div>
            <h3 className="mt-4 text-lg font-bold text-slate-900">{kk.menu.success}</h3>
            <p className="mt-1 text-sm text-slate-500">{kk.menu.successText}</p>
            <p className="mt-3 text-sm text-slate-400">
              {kk.menu.orderNumber}: <span className="font-bold text-slate-900">#{confirmation.number}</span>
            </p>
            <div className="mt-5 flex gap-2">
              <button
                onClick={() => {
                  setConfirmation(null)
                  setView('menu')
                }}
                className="flex-1 rounded-xl border border-slate-200 py-2.5 font-medium text-slate-700 hover:bg-slate-50"
              >
                {kk.menu.newOrder}
              </button>
              <button
                onClick={() => navigate('/demo/kitchen')}
                className="flex-1 rounded-xl bg-slate-900 py-2.5 font-medium text-white hover:bg-slate-700"
              >
                {kk.roles.kitchen} →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
