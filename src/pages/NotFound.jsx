import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3">
      <h1 className="text-3xl font-bold text-slate-900">404</h1>
      <p className="text-slate-500">Бұндай бет табылмады.</p>
      <Link to="/" className="text-sm font-medium text-slate-900 underline">
        ← Басты бетке
      </Link>
    </div>
  )
}
