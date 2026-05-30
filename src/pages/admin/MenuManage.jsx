import { useMemo, useState } from 'react'
import { useT } from '../../i18n'
import useStore from '../../store/useStore.js'
import { formatPrice } from '../../utils/format.js'

export default function MenuManage() {
  const t = useT()
  const categories = useStore((s) => s.categories)
  const products = useStore((s) => s.products)
  const updateProduct = useStore((s) => s.updateProduct)

  const catName = useMemo(() => {
    const m = {}
    for (const c of categories) m[c.id] = c.name
    return m
  }, [categories])

  const [editId, setEditId] = useState(null)
  const [draftPrice, setDraftPrice] = useState('')

  function startEdit(p) {
    setEditId(p.id)
    setDraftPrice(String(p.price))
  }

  function savePrice(id) {
    const price = Number(draftPrice)
    if (!Number.isNaN(price) && price >= 0) {
      updateProduct(id, { price })
    }
    setEditId(null)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">{t.menuManage.title}</h1>
      <p className="mt-1 text-sm text-slate-500">
        Баға өзгерсе — POS пен Online меню бірден жаңарады.
      </p>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-left text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">{t.menuManage.product}</th>
              <th className="px-4 py-3 font-medium">{t.menuManage.category}</th>
              <th className="px-4 py-3 font-medium">{t.menuManage.price}</th>
              <th className="px-4 py-3 font-medium">{t.menuManage.status}</th>
              <th className="px-4 py-3 text-right font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-900">{p.name}</td>
                <td className="px-4 py-3 text-slate-600">{catName[p.categoryId]}</td>
                <td className="px-4 py-3">
                  {editId === p.id ? (
                    <div className="flex items-center gap-1">
                      <input
                        value={draftPrice}
                        onChange={(e) => setDraftPrice(e.target.value)}
                        inputMode="numeric"
                        autoFocus
                        className="w-24 rounded-lg border border-slate-300 px-2 py-1 focus:border-slate-900 focus:outline-none"
                      />
                      <span className="text-slate-400">₸</span>
                    </div>
                  ) : (
                    <span className="text-slate-900">{formatPrice(p.price)}</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => updateProduct(p.id, { available: !p.available })}
                    className={`rounded-full px-2.5 py-1 text-xs font-medium transition ${
                      p.available
                        ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                        : 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                    }`}
                  >
                    {p.available ? t.menuManage.available : t.menuManage.unavailable}
                  </button>
                </td>
                <td className="px-4 py-3 text-right">
                  {editId === p.id ? (
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => savePrice(p.id)}
                        className="rounded-lg bg-slate-900 px-3 py-1 text-xs font-medium text-white hover:bg-slate-700"
                      >
                        {t.menuManage.save}
                      </button>
                      <button
                        onClick={() => setEditId(null)}
                        className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50"
                      >
                        {t.menuManage.cancel}
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => startEdit(p)}
                      className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50"
                    >
                      {t.menuManage.editPrice}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
