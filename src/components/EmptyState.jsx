// Бос күй көрінісі: безендірілген иллюстрация + мәтін + (опц.) әрекет.
// dark — қара фон (Kitchen) үшін.
export default function EmptyState({ title, text, action, dark = false }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
      {/* Иллюстрация */}
      <div
        className={`relative flex h-24 w-24 items-center justify-center rounded-2xl ${
          dark ? 'bg-slate-800' : 'bg-slate-100'
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`h-11 w-11 ${dark ? 'text-slate-600' : 'text-slate-300'}`}
        >
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M3 9h18M8 14h8" />
        </svg>
        <span
          className={`absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold ${
            dark ? 'bg-emerald-500 text-white' : 'bg-emerald-100 text-emerald-600'
          }`}
        >
          +
        </span>
      </div>

      <h3 className={`mt-5 text-base font-semibold ${dark ? 'text-slate-200' : 'text-slate-700'}`}>
        {title}
      </h3>
      <p className={`mt-1 max-w-xs text-sm ${dark ? 'text-slate-500' : 'text-slate-400'}`}>{text}</p>

      {action}
    </div>
  )
}
