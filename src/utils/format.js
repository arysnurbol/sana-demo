// Ақшаны қазақстандық форматта көрсету: 1200 → "1 200 ₸"
export function formatPrice(value) {
  return new Intl.NumberFormat('ru-RU').format(value) + ' ₸'
}

// ISO уақыттан бері өткен минут саны (Kitchen картасында көрсету үшін).
export function minutesSince(iso) {
  const diffMs = Date.now() - new Date(iso).getTime()
  return Math.max(0, Math.floor(diffMs / 60000))
}
