import { Link } from 'react-router-dom'

// Әлі жасалмаған экрандар үшін уақытша қаңқа.
export default function ScreenPlaceholder({ title, note }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 p-6 text-center">
      <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
      {note && <p className="max-w-md text-slate-500">{note}</p>}
      <Link to="/demo" className="mt-4 text-sm font-medium text-slate-900 underline">
        ← Демо басына
      </Link>
    </div>
  )
}
