import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useT } from '../i18n'
import Logo from '../components/Logo.jsx'
import Badge from '../components/Badge.jsx'
import LangToggle from '../components/LangToggle.jsx'
import Marquee from '../components/Marquee.jsx'
import HeroMockup from '../components/HeroMockup.jsx'
import useScrollSpy from '../hooks/useScrollSpy.js'

const ANCHOR_IDS = ['problems', 'solution', 'flow']

export default function Landing() {
  const t = useT()
  const L = t.landing
  const active = useScrollSpy(ANCHOR_IDS)
  const [mobileOpen, setMobileOpen] = useState(false)

  const anchors = [
    { id: 'problems', label: L.anchors.problems },
    { id: 'solution', label: L.anchors.solution },
    { id: 'flow', label: L.anchors.flow },
  ]

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Logo />

          {/* Desktop anchor nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {anchors.map((a) => (
              <a
                key={a.id}
                href={`#${a.id}`}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  active === a.id
                    ? 'text-emerald-600'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {a.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <LangToggle className="hidden sm:inline-flex" />
            <Link
              to="/demo"
              className="hidden rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 sm:block"
            >
              {t.actions.viewDemo}
            </Link>
            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 md:hidden"
              aria-label="menu"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {mobileOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="border-t border-slate-100 bg-white px-6 py-4 md:hidden">
            <nav className="flex flex-col gap-1">
              {anchors.map((a) => (
                <a
                  key={a.id}
                  href={`#${a.id}`}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  {a.label}
                </a>
              ))}
            </nav>
            <div className="mt-3 flex items-center justify-between gap-3 border-t border-slate-100 pt-3">
              <LangToggle />
              <Link
                to="/demo"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
              >
                {t.actions.viewDemo}
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero — split: мәтін + product mockup */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <Badge tone="emerald" dot>
              {L.badge}
            </Badge>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              {L.hero.title}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-600">{L.hero.subtitle}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/demo"
                className="rounded-xl bg-slate-900 px-7 py-3.5 text-center font-semibold text-white shadow-sm transition hover:bg-slate-700"
              >
                {t.actions.viewDemo} →
              </Link>
              <a
                href="#contact"
                className="rounded-xl border border-slate-300 px-7 py-3.5 text-center font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                {t.actions.contact}
              </a>
            </div>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="text-emerald-500">✓</span> {L.hero.point1}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-emerald-500">✓</span> {L.hero.point2}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-emerald-500">✓</span> {L.hero.point3}
              </span>
            </div>
          </div>

          <HeroMockup />
        </div>
      </section>

      {/* Marquee — сегменттер */}
      <Marquee />

      {/* Problems */}
      <section id="problems" className="py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center text-3xl font-bold">{L.problems.title}</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {L.problems.items.map((p, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5"
              >
                <span className="text-2xl">{p.icon}</span>
                <p className="text-slate-700">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution / Modules */}
      <section id="solution" className="bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold">{L.solution.title}</h2>
            <p className="mt-2 text-slate-600">{L.solution.subtitle}</p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {L.solution.modules.map((m, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-slate-900 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-2xl">
                  {m.icon}
                </div>
                <h3 className="mt-4 text-lg font-semibold">{m.title}</h3>
                <p className="mt-1 text-slate-600">{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How demo works */}
      <section id="flow" className="bg-slate-900 py-20 text-white">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center text-3xl font-bold">{L.flow.title}</h2>
          <div className="mt-12 flex flex-col items-stretch gap-4 md:flex-row md:items-center">
            {L.flow.steps.map((step, i) => (
              <div key={i} className="flex flex-1 items-center gap-4 md:flex-col md:text-center">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-500 font-bold">
                  {i + 1}
                </div>
                <p className="font-medium md:mt-3">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Development offer */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-10 text-center">
            <h2 className="text-2xl font-bold text-amber-900">{L.offer.title}</h2>
            <p className="mt-4 text-amber-800">{L.offer.text}</p>
          </div>
        </div>
      </section>

      {/* CTA + slogan */}
      <section id="contact" className="bg-slate-900 py-20 text-white">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
            {L.slogan}
          </p>
          <h2 className="mt-3 text-3xl font-bold">{L.cta.title}</h2>
          <p className="mt-3 text-slate-300">{L.cta.subtitle}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/demo"
              className="rounded-xl bg-emerald-500 px-8 py-4 font-semibold text-white transition hover:bg-emerald-600"
            >
              {t.actions.openDemo} →
            </Link>
            <a
              href="mailto:amit.nurbol@gmail.com"
              className="rounded-xl border border-slate-600 px-8 py-4 font-semibold text-slate-200 transition hover:bg-slate-800"
            >
              {t.actions.contact}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-10">
        <div className="mx-auto max-w-6xl px-6 text-center text-sm text-slate-400">
          <div className="flex justify-center">
            <Logo />
          </div>
          <p className="mt-3 text-base font-semibold text-slate-700">{L.slogan}</p>
          <p className="mt-2">{L.footer}</p>
          <p className="mt-3">© 2026 {t.brand}</p>
        </div>
      </footer>
    </div>
  )
}
