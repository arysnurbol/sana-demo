import { useT } from '../i18n'
import Badge from './Badge.jsx'

// Hero-дағы тірі product mockup: браузер-фрейм ішінде POS + Kitchen split.
// Статикалық, бірақ нақты UI-ды бейнелейді (TapLead стилінде).
export default function HeroMockup() {
  const t = useT()
  const m = t.landing.mockup

  return (
    <div className="relative">
      {/* Безендіру дақтары */}
      <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-emerald-200/40 blur-3xl" />
      <div className="absolute -bottom-10 -left-6 h-40 w-40 rounded-full bg-teal-200/40 blur-3xl" />

      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-300/40">
        {/* Браузер topbar */}
        <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-rose-400" />
          <span className="h-3 w-3 rounded-full bg-amber-400" />
          <span className="h-3 w-3 rounded-full bg-emerald-400" />
          <span className="ml-3 rounded-md bg-white px-3 py-1 text-xs text-slate-400 ring-1 ring-slate-200">
            app.sana.kz
          </span>
        </div>

        {/* Split: POS | Kitchen */}
        <div className="grid grid-cols-2 divide-x divide-slate-100">
          {/* POS жағы */}
          <div className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700">{m.tabPos}</span>
              <Badge tone="slate">{m.table}</Badge>
            </div>
            <div className="space-y-2">
              {[
                { n: 'Латте', p: '1 200 ₸' },
                { n: 'Круассан', p: '800 ₸' },
              ].map((it) => (
                <div
                  key={it.n}
                  className="flex items-center justify-between rounded-lg border border-slate-100 bg-white px-3 py-2 text-xs"
                >
                  <span className="font-medium text-slate-700">{it.n}</span>
                  <span className="text-slate-400">{it.p}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-lg bg-slate-900 px-3 py-2 text-center text-xs font-semibold text-white">
              {m.newOrder} →
            </div>
          </div>

          {/* Kitchen жағы (қара тақта) */}
          <div className="bg-slate-900 p-4 text-white">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-200">{m.tabKitchen}</span>
              <span className="flex items-center gap-1 text-[10px] text-emerald-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                realtime
              </span>
            </div>
            <div className="rounded-lg border-t-2 border-t-emerald-400 bg-slate-800 p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold">#102</span>
                <span className="text-[10px] text-slate-400">{m.table}</span>
              </div>
              <div className="mt-2 space-y-1 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Латте</span>
                  <span className="text-slate-500">×1</span>
                </div>
                <div className="flex justify-between">
                  <span>Круассан</span>
                  <span className="text-slate-500">×1</span>
                </div>
              </div>
              <div className="mt-3 rounded-md bg-emerald-500 py-1.5 text-center text-xs font-semibold">
                {m.ready}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
