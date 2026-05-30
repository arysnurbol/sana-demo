import { Link } from 'react-router-dom'
import { useT } from '../i18n'
import Logo from '../components/Logo.jsx'
import Badge from '../components/Badge.jsx'
import LangToggle from '../components/LangToggle.jsx'

export default function DemoHome() {
  const t = useT()

  const roleCards = [
    { to: '/demo/pos', title: t.roles.pos, desc: t.demoHome.cards.pos },
    { to: '/demo/kitchen', title: t.roles.kitchen, desc: t.demoHome.cards.kitchen },
    { to: '/demo/menu', title: t.roles.onlineMenu, desc: t.demoHome.cards.menu },
    { to: '/demo/admin', title: t.roles.admin, desc: t.demoHome.cards.admin },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Topbar: басты бетке қайту + тіл */}
      <header className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link to="/" className="transition hover:opacity-70">
            <Logo />
          </Link>
          <div className="flex items-center gap-3">
            <LangToggle />
            <Link
              to="/"
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              ← {t.common.backHome}
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 py-16">
        <Badge tone="amber" dot>
          {t.demoMode} · {t.company}
        </Badge>
        <h1 className="mt-4 text-3xl font-bold text-slate-900">{t.demoHome.title}</h1>
        <p className="mt-2 text-slate-600">{t.demoHome.subtitle}</p>

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
                {t.actions.open} →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
