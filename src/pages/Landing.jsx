import { Link } from 'react-router-dom'
import kk from '../i18n/kk.js'

// Қаңқа. Толық секциялар (Hero/Problems/Solution/...) 6-қадамда жасалады.
export default function Landing() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 text-center">
      <h1 className="text-4xl font-bold text-slate-900">
        Ресторан мен кофеханаға арналған ақылды басқару жүйесі
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        POS, онлайн меню, кухня экраны, клиент базасы және аналитика — бәрі бір
        жүйеде.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link
          to="/demo"
          className="rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-700"
        >
          {kk.actions.viewDemo}
        </Link>
        <a
          href="#contact"
          className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
        >
          {kk.actions.contact}
        </a>
      </div>
      <p className="mt-12 text-sm text-slate-400">[Landing page қаңқасы — толық версия кейін]</p>
    </div>
  )
}
