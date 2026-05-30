import { useT } from '../i18n'

// Sana логотипі: gradient иконка + бренд аты.
export default function Logo({ size = 'md', sub }) {
  const t = useT()
  const icon = size === 'lg' ? 'h-9 w-9' : 'h-8 w-8'
  const text = size === 'lg' ? 'text-2xl' : 'text-xl'

  return (
    <span className="inline-flex items-center gap-2">
      <span
        className={`${icon} flex items-center justify-center rounded-[10px] bg-gradient-to-br from-emerald-500 to-teal-700 text-white shadow-sm`}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <path
            d="M16 9.2c0-1.49-1.21-2.7-2.7-2.7H7v6.5h6.3c1.49 0 2.7-1.21 2.7-2.7"
            stroke="currentColor"
            strokeWidth="2.1"
            strokeLinecap="round"
          />
          <path
            d="M7 13h7c1.66 0 3 1.34 3 3s-1.34 3-3 3H7"
            stroke="currentColor"
            strokeWidth="2.1"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className={`${text} font-extrabold tracking-tight text-slate-900`}>
        {t.brand}
        <span className="text-emerald-500">.</span>
      </span>
      {sub && <span className="ml-1 text-xs font-normal text-slate-400">{sub}</span>}
    </span>
  )
}
