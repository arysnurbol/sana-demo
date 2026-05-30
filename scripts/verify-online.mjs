// Online menu → Orders/Kitchen flow тексеру (headless).
import { chromium } from 'playwright'

const BASE = process.env.BASE_URL || 'http://localhost:5173'
const pause = (ms) => new Promise((r) => setTimeout(r, ms))
let failures = 0
function check(name, ok) {
  console.log(`${ok ? 'PASS' : 'FAIL'}: ${name}`)
  if (!ok) failures++
}

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({ viewport: { width: 390, height: 800 } })

// Admin Orders табы (тыңдаушы)
const orders = await context.newPage()
await orders.goto(`${BASE}/demo/admin/orders`)
await orders.evaluate(() => localStorage.clear())
await orders.reload()
await pause(400)

// Клиент менюді ашады
const menu = await context.newPage()
await menu.goto(`${BASE}/demo/menu`)
check('Меню ашылды', (await menu.locator('text=Online меню').count()) >= 1)

// Латте + Чизкейк қосады (әр өнім қатарындағы "Қосу" батырмасы)
await menu.locator('div', { hasText: /^Латте/ }).getByRole('button', { name: 'Қосу' }).first().click()
await menu.locator('div', { hasText: /^Чизкейк/ }).getByRole('button', { name: 'Қосу' }).first().click()
await pause(300)

// Себетті көру
await menu.getByRole('button', { name: /Себетті көру/ }).click()
check('Checkout экраны ашылды', (await menu.locator('text=Сіздің заказ').count()) >= 1)

// Аты/телефонсыз жіберуге тырысу → қате
await menu.getByRole('button', { name: 'Заказды жіберу' }).click()
check('Бос форма валидациясы жұмыс істейді', (await menu.locator('text=Аты мен телефонды').count()) >= 1)

// Аты + телефон толтыру
await menu.getByPlaceholder('Атыңызды енгізіңіз').fill('Айдос')
await menu.getByPlaceholder('+7 ___ ___ __ __').fill('+7 700 123 45 67')
await menu.getByRole('button', { name: 'Заказды жіберу' }).click()
check('Заказ сәтті жіберілді', (await menu.locator('text=Заказыңыз қабылданды').count()) >= 1)

// Admin Orders табында заказ онлайн ретінде пайда болды ма
await orders.bringToFront()
await pause(500)
const onlineRow = orders.locator('table >> text=Онлайн')
await onlineRow.first().waitFor({ timeout: 4000 }).catch(() => {})
check('Orders бетінде онлайн заказ realtime пайда болды', (await onlineRow.count()) >= 1)
check('Заказда Латте бар', (await orders.locator('table >> text=Латте').count()) >= 1)

// Filter: тек онлайн
await orders.getByRole('button', { name: 'Онлайн' }).click()
await pause(300)
check('Онлайн фильтрі жұмыс істейді', (await orders.locator('table tbody tr').count()) >= 1)

await browser.close()
console.log(`\n${failures === 0 ? 'ALL PASSED' : failures + ' FAILED'}`)
process.exit(failures === 0 ? 0 : 1)
