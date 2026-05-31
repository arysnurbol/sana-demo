// Заказдар тізімінен dashboard/analytics статистикасын есептейді.
// Барлығы store-дағы нақты orders-тен — fake емес.

export function computeStats(orders, customers = [], products = []) {
  const ordersCount = orders.length
  const revenue = orders.reduce((sum, o) => sum + (o.total || 0), 0)
  const avgCheck = ordersCount ? Math.round(revenue / ordersCount) : 0
  const online = orders.filter((o) => o.source === 'online').length
  const offline = orders.filter((o) => o.source === 'pos').length

  // Себестоимость (материал шығыны) + маржа.
  // Әр заказ позициясының cost-ын өнім атауы арқылы табамыз.
  const costByName = {}
  for (const p of products) costByName[p.name] = p.cost || 0
  let materialCost = 0
  for (const o of orders) {
    for (const it of o.items || []) {
      materialCost += (costByName[it.name] || 0) * it.qty
    }
  }
  const profit = revenue - materialCost
  const marginPct = revenue ? Math.round((profit / revenue) * 100) : 0

  // Ең көп сатылған өнімдер (қанша дана сатылды)
  const productMap = {}
  for (const o of orders) {
    for (const it of o.items || []) {
      productMap[it.name] = (productMap[it.name] || 0) + it.qty
    }
  }
  const topProducts = Object.entries(productMap)
    .map(([name, qty]) => ({ name, qty }))
    .sort((a, b) => b.qty - a.qty)
    .slice(0, 5)

  // Статус бойынша бөліну
  const byStatus = { new: 0, cooking: 0, ready: 0, done: 0 }
  for (const o of orders) {
    if (byStatus[o.status] !== undefined) byStatus[o.status]++
  }

  return {
    revenue,
    ordersCount,
    avgCheck,
    online,
    offline,
    topProducts,
    byStatus,
    customersCount: customers.length,
    materialCost,
    profit,
    marginPct,
  }
}
