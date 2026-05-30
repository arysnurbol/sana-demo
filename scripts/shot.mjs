// Берілген route-тың скриншотын алады (тексеру үшін).
// Қолдану: node scripts/shot.mjs /demo  out.png
import { chromium } from 'playwright'

const route = process.argv[2] || '/'
const out = process.argv[3] || 'shot.png'
const BASE = process.env.BASE_URL || 'http://localhost:5173'

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
const errors = []
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
page.on('pageerror', (e) => errors.push(String(e)))

await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle' })
await page.screenshot({ path: out, fullPage: true })
await browser.close()

console.log(`saved ${out} for ${route}`)
if (errors.length) {
  console.log('PAGE ERRORS:')
  errors.forEach((e) => console.log('  ', e))
  process.exit(1)
}
console.log('no console errors')
