import { useT } from '../i18n'

// Жылжымалы сегмент лентасы (TapLead стилінде).
// Тізімді екі рет қайталап, шексіз жылжу әсерін береді.
export default function Marquee() {
  const t = useT()
  const items = t.marquee

  return (
    <div className="overflow-hidden border-y border-slate-100 bg-slate-50 py-4">
      <div className="flex w-max animate-marquee gap-3 whitespace-nowrap">
        {[...items, ...items].map((label, i) => (
          <span
            key={i}
            className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-500"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}
