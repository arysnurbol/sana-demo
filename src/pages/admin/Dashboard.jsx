import kk from '../../i18n/kk.js'

// 8-қадам: нақты статистика (orders негізінде есептеледі).
export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">{kk.nav.dashboard}</h1>
      <p className="mt-2 text-slate-500">Dashboard статистикасы 8-қадамда жасалады.</p>
    </div>
  )
}
