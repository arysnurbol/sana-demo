// Ақшаны қазақстандық форматта көрсету: 1200 → "1 200 ₸"
export function formatPrice(value) {
  return new Intl.NumberFormat('ru-RU').format(value) + ' ₸'
}
