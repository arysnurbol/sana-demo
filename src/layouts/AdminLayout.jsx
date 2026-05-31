import { useState } from 'react'
import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom'
import { useT } from '../i18n'
import Logo from '../components/Logo.jsx'
import Icon from '../components/Icon.jsx'
import Badge from '../components/Badge.jsx'
import LangToggle from '../components/LangToggle.jsx'
import useStore from '../store/useStore.js'

export default function AdminLayout() {
  const t = useT()
  const navigate = useNavigate()
  const resetDemo = useStore((s) => s.resetDemo)
  const [collapsed, setCollapsed] = useState(false) // desktop: жинау
  const [mobileOpen, setMobileOpen] = useState(false) // mobile: drawer

  const sections = [
    {
      title: t.nav.sectionMain,
      links: [
        { to: '/demo/admin', end: true, label: t.nav.dashboard, icon: 'dashboard' },
        { to: '/demo/admin/orders', label: t.nav.orders, icon: 'orders' },
        { to: '/demo/admin/menu', label: t.nav.menu, icon: 'menu' },
        { to: '/demo/admin/customers', label: t.nav.customers, icon: 'customers' },
        { to: '/demo/admin/loyalty', label: t.nav.loyalty, icon: 'loyalty' },
        { to: '/demo/admin/analytics', label: t.nav.analytics, icon: 'analytics' },
        { to: '/demo/admin/shift', label: t.nav.shift, icon: 'shift' },
      ],
    },
    {
      title: t.nav.sectionScreens,
      links: [
        { to: '/demo/pos', label: t.nav.pos, icon: 'pos' },
        { to: '/demo/kitchen', label: t.nav.kitchen, icon: 'kitchen' },
        { to: '/demo/menu', label: t.nav.onlineMenu, icon: 'onlineMenu' },
      ],
    },
  ]

  // Desktop: collapsed күйіне қарай ені. Mobile: drawer (translate).
  const asideWidth = collapsed ? 'lg:w-[68px]' : 'lg:w-60'
  const mainPad = collapsed ? 'lg:pl-[68px]' : 'lg:pl-60'

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-slate-200 bg-white transition-transform duration-200 lg:translate-x-0 ${asideWidth} ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Логотип — басты бетке өтеді */}
        <div className="flex h-16 items-center justify-between px-4">
          <Link to="/" className="transition hover:opacity-70" title={t.common.backHome}>
            {collapsed ? (
              <span className="hidden h-9 w-9 items-center justify-center rounded-[10px] bg-gradient-to-br from-emerald-500 to-teal-700 text-sm font-extrabold text-white lg:flex">
                S
              </span>
            ) : (
              <Logo />
            )}
          </Link>
          {/* Mobile-да жабу батырмасы */}
          <button
            onClick={() => setMobileOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 lg:hidden"
            aria-label="close"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {/* Навигация */}
        <nav className="flex-1 overflow-y-auto px-3 py-2">
          {sections.map((sec) => (
            <div key={sec.title} className="mb-4">
              <p className={`px-3 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 ${collapsed ? 'lg:hidden' : ''}`}>
                {sec.title}
              </p>
              <div className="flex flex-col gap-0.5">
                {sec.links.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    end={l.end}
                    onClick={() => setMobileOpen(false)}
                    title={collapsed ? l.label : undefined}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                        isActive
                          ? 'bg-slate-900 text-white shadow-sm'
                          : 'text-slate-600 hover:bg-slate-100'
                      } ${collapsed ? 'lg:justify-center' : ''}`
                    }
                  >
                    <Icon name={l.icon} className="h-[18px] w-[18px] shrink-0" />
                    <span className={collapsed ? 'lg:hidden' : ''}>{l.label}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Settings (төменде) */}
        <div className="border-t border-slate-100 px-3 py-3">
          <button
            title={collapsed ? t.nav.settings : undefined}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-100 ${
              collapsed ? 'lg:justify-center' : ''
            }`}
          >
            <Icon name="settings" className="h-[18px] w-[18px] shrink-0" />
            <span className={collapsed ? 'lg:hidden' : ''}>{t.nav.settings}</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className={`flex flex-1 flex-col transition-all duration-200 ${mainPad}`}>
        {/* Header */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-2 border-b border-slate-200 bg-white/90 px-3 backdrop-blur sm:px-5">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            {/* Mobile: drawer ашу / Desktop: sidebar жинау */}
            <button
              onClick={() => {
                if (window.innerWidth >= 1024) setCollapsed((c) => !c)
                else setMobileOpen(true)
              }}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              title="Sidebar"
            >
              <Icon name="panel" className="h-5 w-5" />
            </button>
            <Badge tone="amber" dot>
              {t.demoMode}
            </Badge>
            <span className="hidden truncate font-medium text-slate-700 sm:inline">{t.company}</span>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <LangToggle className="hidden sm:inline-flex" />
            <button
              onClick={() => navigate('/demo')}
              className="hidden rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 md:block"
            >
              {t.actions.roleSwitch}
            </button>
            <button
              onClick={() => {
                if (confirm(t.actions.resetDemo + '?')) resetDemo()
              }}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-rose-200 text-rose-500 transition hover:bg-rose-50"
              title={t.actions.resetDemo}
            >
              <Icon name="reset" className="h-[18px] w-[18px]" />
            </button>

            {/* Аккаунт — тіркелген сияқты */}
            <div className="ml-1 flex items-center gap-2.5 rounded-full border border-slate-200 py-1 pl-3 pr-1">
              <div className="hidden text-right leading-tight sm:block">
                <p className="text-xs font-semibold text-slate-700">{t.account.name}</p>
                <p className="flex items-center justify-end gap-1 text-[10px] text-emerald-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {t.account.status}
                </p>
              </div>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-slate-700 to-slate-900 text-xs font-bold text-white">
                {t.account.name.slice(0, 2)}
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
