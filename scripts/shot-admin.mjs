// Бірнеше заказ жасап (POS+online), сосын admin беттердің скриншотын алады.
import { chromium } from 'playwright'

const BASE = process.env.BASE_URL || 'http://localhost:5173'
const pause = (ms) => new Promise((r) => setTimeout(r, ms))

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({ viewport: { width: 1280, height: 900 } })

// Seed: localStorage-қа бірнеше заказ тікелей саламыз
const seed = await context.newPage()
await seed.goto(`${BASE}/demo/admin`)
await seed.evaluate(() => {
  const raw = JSON.parse(localStorage.getItem('sana-demo-store') || '{}')
  const s = raw.state || {}
  const now = Date.now()
  s.orders = [
    { id: 'o102', number: 102, status: 'cooking', createdAt: new Date(now - 2 * 60000).toISOString(),
      type: 'dine_in', table: '4', payment: 'kaspi', source: 'pos',
      items: [{ name: 'Латте', qty: 2, price: 1200 }, { name: 'Круассан', qty: 1, price: 800 }], total: 3200 },
    { id: 'o103', number: 103, status: 'new', createdAt: new Date(now - 5 * 60000).toISOString(),
      type: 'takeaway', table: null, payment: 'online', source: 'online',
      items: [{ name: 'Капучино', qty: 1, price: 1200 }, { name: 'Чизкейк', qty: 1, price: 1500 }], total: 2700 },
    { id: 'o104', number: 104, status: 'done', createdAt: new Date(now - 20 * 60000).toISOString(),
      type: 'dine_in', table: '2', payment: 'cash', source: 'pos',
      items: [{ name: 'Американо', qty: 3, price: 900 }], total: 2700 },
    { id: 'o105', number: 105, status: 'ready', createdAt: new Date(now - 1 * 60000).toISOString(),
      type: 'delivery', table: null, payment: 'online', source: 'online',
      items: [{ name: 'Латте', qty: 1, price: 1200 }, { name: 'Су', qty: 2, price: 300 }], total: 1800 },
  ]
  s.orderCounter = 105
  localStorage.setItem('sana-demo-store', JSON.stringify({ ...raw, state: s }))
})

async function shoot(route, file) {
  const p = await context.newPage()
  const errs = []
  p.on('pageerror', (e) => errs.push(String(e)))
  await p.goto(`${BASE}${route}`, { waitUntil: 'networkidle' })
  await pause(400)
  await p.screenshot({ path: file, fullPage: true })
  await p.close()
  console.log(`${file}  (${route})  errors: ${errs.length}`)
  errs.forEach((e) => console.log('  ', e))
}

await shoot('/demo/admin', 'a-dashboard.png')
await shoot('/demo/admin/orders', 'a-orders.png')
await shoot('/demo/admin/analytics', 'a-analytics.png')
await shoot('/demo/admin/menu', 'a-menu.png')
await shoot('/demo/admin/customers', 'a-customers.png')

await browser.close()
console.log('done')
