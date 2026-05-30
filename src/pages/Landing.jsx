import { Link } from 'react-router-dom'
import kk from '../i18n/kk.js'

const L = kk.landing

export default function Landing() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Nav */}
      <header className="sticky top-0 z-30 border-b border-slate-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="text-xl font-bold">
            {kk.brand}
            <span className="text-emerald-500">.</span>
          </span>
          <Link
            to="/demo"
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
          >
            {kk.actions.viewDemo}
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center">
          <span className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
            {kk.company} · {kk.demoMode}
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl">
            {L.hero.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
            {L.hero.subtitle}
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/demo"
              className="rounded-xl bg-slate-900 px-7 py-3.5 font-semibold text-white shadow-sm transition hover:bg-slate-700"
            >
              {kk.actions.viewDemo} →
            </Link>
            <a
              href="#contact"
              className="rounded-xl border border-slate-300 px-7 py-3.5 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              {kk.actions.contact}
            </a>
          </div>
        </div>
      </section>

      {/* Problems */}
      <section className="bg-slate-50 py-20">
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
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold">{L.solution.title}</h2>
            <p className="mt-2 text-slate-600">{L.solution.subtitle}</p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {L.solution.modules.map((m, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 p-6 transition hover:border-slate-900 hover:shadow-md"
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
                {i < L.flow.steps.length - 1 && (
                  <span className="ml-auto text-slate-600 md:hidden">↓</span>
                )}
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
              {kk.actions.openDemo} →
            </Link>
            <a
              href="mailto:amit.nurbol@gmail.com"
              className="rounded-xl border border-slate-300 px-8 py-4 font-semibold text-slate-700 transition hover:bg-white"
            >
              {kk.actions.contact}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-8">
        <div className="mx-auto max-w-6xl px-6 text-center text-sm text-slate-400">
          <p className="font-semibold text-slate-600">{kk.brand}</p>
          <p className="mt-1">{L.footer}</p>
          <p className="mt-3">© 2026 {kk.brand}</p>
        </div>
      </footer>
    </div>
  )
}
