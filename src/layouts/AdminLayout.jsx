import { NavLink, Outlet } from 'react-router-dom'
import kk from '../i18n/kk.js'
import DemoTopbar from '../components/DemoTopbar.jsx'

const links = [
  { to: '/demo/admin', end: true, label: kk.nav.dashboard },
  { to: '/demo/admin/orders', label: kk.nav.orders },
  { to: '/demo/admin/menu', label: kk.nav.menu },
  { to: '/demo/admin/customers', label: kk.nav.customers },
  { to: '/demo/admin/analytics', label: kk.nav.analytics },
]

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 border-r border-slate-200 bg-white">
        <div className="px-5 py-4 text-lg font-bold text-slate-900">
          {kk.brand}
          <span className="ml-2 text-xs font-normal text-slate-400">admin</span>
        </div>
        <nav className="flex flex-col gap-1 px-3">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col">
        <DemoTopbar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
