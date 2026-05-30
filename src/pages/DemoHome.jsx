import { Link } from 'react-router-dom'
import kk from '../i18n/kk.js'

const roleCards = [
  { to: '/demo/pos', title: kk.roles.pos, desc: 'Залдағы заказды кассир енгізеді.' },
  { to: '/demo/kitchen', title: kk.roles.kitchen, desc: 'Заказдар realtime пайда болады.' },
  { to: '/demo/menu', title: kk.roles.onlineMenu, desc: 'Клиент телефоннан заказ береді.' },
  { to: '/demo/admin', title: kk.roles.admin, desc: 'Статистика, меню, клиент базасы.' },
]

export default function DemoHome() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <div className="mb-2 flex items-center gap-3">
        <span className="rounded-md bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700">
          {kk.demoMode}
        </span>
        <span className="text-slate-500">{kk.company}</span>
      </div>
      <h1 className="text-3xl font-bold text-slate-900">Демо жүйе</h1>
      <p className="mt-2 text-slate-600">Қай бөлімді көргіңіз келеді?</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {roleCards.map((c) => (
          <Link
            key={c.to}
            to={c.to}
            className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-slate-900 hover:shadow-md"
          >
            <h2 className="text-lg font-semibold text-slate-900">{c.title}</h2>
            <p className="mt-1 text-sm text-slate-500">{c.desc}</p>
            <span className="mt-4 inline-block text-sm font-medium text-slate-900 group-hover:underline">
              {kk.actions.open} →
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
