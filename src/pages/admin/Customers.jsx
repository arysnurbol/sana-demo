import kk from '../../i18n/kk.js'
import useStore from '../../store/useStore.js'
import { formatPrice } from '../../utils/format.js'

export default function Customers() {
  const customers = useStore((s) => s.customers)

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">{kk.customers.title}</h1>
      <p className="mt-1 text-sm text-slate-500">{kk.customers.note}</p>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-left text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">{kk.customers.name}</th>
              <th className="px-4 py-3 font-medium">{kk.customers.phone}</th>
              <th className="px-4 py-3 text-right font-medium">{kk.customers.orders}</th>
              <th className="px-4 py-3 text-right font-medium">{kk.customers.total}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {customers.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-900">{c.name}</td>
                <td className="px-4 py-3 text-slate-600">{c.phone}</td>
                <td className="px-4 py-3 text-right text-slate-600">{c.ordersCount}</td>
                <td className="px-4 py-3 text-right font-medium text-slate-900">
                  {formatPrice(c.totalSpent)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
