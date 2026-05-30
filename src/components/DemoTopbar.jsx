import { useNavigate } from 'react-router-dom'
import { useT } from '../i18n'
import useStore from '../store/useStore.js'
import Badge from './Badge.jsx'
import LangToggle from './LangToggle.jsx'

// Demo layout topbar: demo badge + компания + тіл + рөл ауыстыру + data reset.
export default function DemoTopbar() {
  const t = useT()
  const navigate = useNavigate()
  const resetDemo = useStore((s) => s.resetDemo)

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3">
      <div className="flex items-center gap-3">
        <Badge tone="amber" dot>
          {t.demoMode}
        </Badge>
        <span className="font-medium text-slate-700">{t.company}</span>
      </div>

      <div className="flex items-center gap-2">
        <LangToggle />
        <button
          onClick={() => navigate('/demo')}
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          {t.actions.roleSwitch}
        </button>
        <button
          onClick={() => {
            if (confirm(t.actions.resetDemo + '?')) resetDemo()
          }}
          className="rounded-lg border border-rose-200 px-3 py-1.5 text-sm font-medium text-rose-600 hover:bg-rose-50"
        >
          {t.actions.resetDemo}
        </button>
      </div>
    </header>
  )
}
