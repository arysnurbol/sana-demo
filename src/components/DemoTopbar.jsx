import { useNavigate } from 'react-router-dom'
import kk from '../i18n/kk.js'
import useStore from '../store/useStore.js'

// Demo layout topbar: demo badge + компания + рөл ауыстыру + data reset.
export default function DemoTopbar() {
  const navigate = useNavigate()
  const resetDemo = useStore((s) => s.resetDemo)

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3">
      <div className="flex items-center gap-3">
        <span className="rounded-md bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700">
          {kk.demoMode}
        </span>
        <span className="font-medium text-slate-700">{kk.company}</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate('/demo')}
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          {kk.actions.roleSwitch}
        </button>
        <button
          onClick={() => {
            if (confirm(kk.actions.resetDemo + '?')) resetDemo()
          }}
          className="rounded-lg border border-rose-200 px-3 py-1.5 text-sm font-medium text-rose-600 hover:bg-rose-50"
        >
          {kk.actions.resetDemo}
        </button>
      </div>
    </header>
  )
}
