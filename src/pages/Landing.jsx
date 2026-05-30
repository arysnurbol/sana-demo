import { Link } from 'react-router-dom'
import { useT } from '../i18n'
import Logo from '../components/Logo.jsx'
import Badge from '../components/Badge.jsx'
import LangToggle from '../components/LangToggle.jsx'
import Marquee from '../components/Marquee.jsx'
import HeroMockup from '../components/HeroMockup.jsx'

export default function Landing() {
  const t = useT()
  const L = t.landing

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Nav */}
      <header className="sticky top-0 z-30 border-b border-slate-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Logo />
          <div className="flex items-center gap-3">
            <LangToggle />
            <Link
              to="/demo"
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
            >
              {t.actions.viewDemo}
            </Link>
          </div>
        </div>
      </header>

      {/* Hero — split: мәтін + product mockup */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:py-24">
          {/* Сол жақ: мәтін */}
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

          {/* Оң жақ: тірі product mockup */}
          <HeroMockup />
        </div>
      </section>

      {/* Marquee — сегменттер */}
      <Marquee />

      {/* Problems */}
      <section className="py-20">
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
      <section className="bg-slate-50 py-20">
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
      <section className="bg-slate-900 py-20 text-white">
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

      {/* CTA */}
      <section id="contact" className="bg-slate-50 py-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-3xl font-bold">{L.cta.title}</h2>
          <p className="mt-3 text-slate-600">{L.cta.subtitle}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/demo"
              className="rounded-xl bg-slate-900 px-8 py-4 font-semibold text-white transition hover:bg-slate-700"
            >
              {t.actions.openDemo} →
            </Link>
            <a
              href="mailto:amit.nurbol@gmail.com"
              className="rounded-xl border border-slate-300 px-8 py-4 font-semibold text-slate-700 transition hover:bg-white"
            >
              {t.actions.contact}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-8">
        <div className="mx-auto max-w-6xl px-6 text-center text-sm text-slate-400">
          <div className="flex justify-center">
            <Logo />
          </div>
          <p className="mt-3">{L.footer}</p>
          <p className="mt-3">© 2026 {t.brand}</p>
        </div>
      </footer>
    </div>
  )
}
