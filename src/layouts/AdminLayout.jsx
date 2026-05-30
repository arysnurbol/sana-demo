import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useT } from '../i18n'
import Logo from '../components/Logo.jsx'
import DemoTopbar from '../components/DemoTopbar.jsx'

export default function AdminLayout() {
  const t = useT()
  const [collapsed, setCollapsed] = useState(false)

  const links = [
    { to: '/demo/admin', end: true, label: t.nav.dashboard, icon: '▦' },
    { to: '/demo/admin/orders', label: t.nav.orders, icon: '🧾' },
    { to: '/demo/admin/menu', label: t.nav.menu, icon: '📋' },
    { to: '/demo/admin/customers', label: t.nav.customers, icon: '👥' },
    { to: '/demo/admin/analytics', label: t.nav.analytics, icon: '📊' },
  ]

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`shrink-0 border-r border-slate-200 bg-white transition-all duration-200 ${
          collapsed ? 'w-16' : 'w-60'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4">
          {collapsed ? (
            <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-[10px] bg-gradient-to-br from-emerald-500 to-teal-700 text-sm font-extrabold text-white">
              S
            </span>
          ) : (
            <Logo sub="admin" />
          )}
        </div>

        <nav className="flex flex-col gap-1 px-3">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              title={collapsed ? l.label : undefined}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                } ${collapsed ? 'justify-center' : ''}`
              }
            >
              <span className="text-base leading-none">{l.icon}</span>
              {!collapsed && <span>{l.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="mx-3 mt-3 flex w-[calc(100%-1.5rem)] items-center justify-center rounded-lg border border-slate-200 py-2 text-slate-400 transition hover:bg-slate-50 hover:text-slate-700"
          title="Sidebar"
        >
          {collapsed ? '»' : '«'}
        </button>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col">
        <DemoTopbar />
        <main className="flex-1 bg-slate-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
