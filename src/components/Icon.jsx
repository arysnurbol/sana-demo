// Біртұтас SVG line-иконка жинағы (emoji орнына).
// Қолдану: <Icon name="dashboard" className="h-5 w-5" />
const PATHS = {
  dashboard: (
    <>
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </>
  ),
  orders: (
    <>
      <path d="M8 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2" />
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <path d="M8 11h8M8 15h5" />
    </>
  ),
  menu: (
    <>
      <path d="M4 5h16M4 12h16M4 19h10" />
    </>
  ),
  customers: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path d="M16 4.5a3 3 0 0 1 0 6M18 20c0-2.3-.9-4.4-2.4-5.9" />
    </>
  ),
  analytics: (
    <>
      <path d="M4 20V4" />
      <path d="M4 20h16" />
      <rect x="7" y="11" width="3" height="6" rx="0.5" />
      <rect x="12" y="7" width="3" height="10" rx="0.5" />
      <rect x="17" y="13" width="3" height="4" rx="0.5" />
    </>
  ),
  pos: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 7h8M8 11h8" />
      <rect x="8" y="15" width="8" height="3" rx="0.5" />
    </>
  ),
  kitchen: (
    <>
      <path d="M5 21h14" />
      <path d="M4 11h16a0 0 0 0 1 0 0 8 8 0 0 1-16 0 0 0 0 0 1 0 0Z" />
      <path d="M8 7c0-1.5 1-2 1-3M12 7c0-1.5 1-2 1-3M16 7c0-1.5 1-2 1-3" />
    </>
  ),
  onlineMenu: (
    <>
      <rect x="6" y="2" width="12" height="20" rx="2.5" />
      <path d="M11 18h2" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
    </>
  ),
  panel: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M9 4v16" />
    </>
  ),
  back: (
    <>
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </>
  ),
  reset: (
    <>
      <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
      <path d="M3 3v5h5" />
    </>
  ),
  revenue: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v10M9.5 9.5c0-1 1-1.7 2.5-1.7s2.5.7 2.5 1.7-1 1.5-2.5 1.7-2.5.7-2.5 1.7 1 1.7 2.5 1.7 2.5-.7 2.5-1.7" />
    </>
  ),
  cart: (
    <>
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="17" cy="20" r="1.5" />
      <path d="M3 4h2l2.4 12.4a1 1 0 0 0 1 .8h8.8a1 1 0 0 0 1-.8L21 8H6" />
    </>
  ),
  check: (
    <>
      <path d="M5 12l4.5 4.5L19 7" />
    </>
  ),
}

export default function Icon({ name, className = 'h-5 w-5', strokeWidth = 1.8 }) {
  const path = PATHS[name]
  if (!path) return null
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {path}
    </svg>
  )
}
