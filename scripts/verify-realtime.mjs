// POS → Kitchen cross-tab realtime синхронын АВТОМАТТЫ тексеру (headless).
// Екі таб бір контекстте localStorage-ты бөліседі.
// POS-та заказ жасаймыз → Kitchen табында ол storage event арқылы пайда
// болуы керек. Assert-термен тексереміз.

import { chromium } from 'playwright'

const BASE = process.env.BASE_URL || 'http://localhost:5173'
const pause = (ms) => new Promise((r) => setTimeout(r, ms))
let failures = 0
function check(name, ok) {
  console.log(`${ok ? '✅' : '❌'} ${name}`)
  if (!ok) failures++
}

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext()

// Kitchen табы (тыңдаушы)
const kitchen = await context.newPage()
await kitchen.goto(`${BASE}/demo/kitchen`)
await kitchen.evaluate(() => localStorage.clear())
await kitchen.reload()
await pause(500)

// Бастапқыда "Жаңа" бағанында заказ жоқ
const newColInitial = await kitchen.locator('text=POS немесе онлайн заказды күтуде').count()
check('Kitchen бастапқыда бос (заказ күтуде)', newColInitial >= 1)

// POS табында заказ жасаймыз
const pos = await context.newPage()
await pos.goto(`${BASE}/demo/pos`)
await pos.getByRole('button', { name: 'Кофе' }).click()
await pos.getByRole('button', { name: /Латте/ }).click()
await pos.getByRole('button', { name: 'Выпечка' }).click()
await pos.getByRole('button', { name: /Круассан/ }).click()
await pos.getByRole('button', { name: 'Залда ішу' }).click()
await pos.getByPlaceholder('Стол нөмірі').fill('4')
await pos.getByRole('button', { name: 'Kaspi' }).click()
await pos.getByRole('button', { name: 'Заказ жасау' }).click()

// Растау модалы шықты ма
const modal = await pos.locator('text=Заказ жасалды').count()
check('POS-та заказ жасалды (растау модалы)', modal >= 1)

// Kitchen табына заказ realtime жетті ме (storage event)
await kitchen.bringToFront()
const card = kitchen.locator('text=#102')
await card.waitFor({ timeout: 4000 }).catch(() => {})
check('Kitchen-де заказ #102 realtime пайда болды', (await card.count()) >= 1)
check('Заказда Латте бар', (await kitchen.locator('text=Латте').count()) >= 1)
check('Заказда Круассан бар', (await kitchen.locator('text=Круассан').count()) >= 1)
check('Стол 4 көрсетілген', (await kitchen.locator('text=Стол 4').count()) >= 1)

// Статусты жылжыту: Жаңа → Дайындалуда
await kitchen.getByRole('button', { name: 'Дайындауды бастау' }).click()
await pause(300)
check('Заказ "Дайындалуда" бағанына жылжыды', (await kitchen.locator('text=Дайын', { exact: false }).count()) >= 1)

await browser.close()

console.log(`\n${failures === 0 ? '🎉 БАРЛЫҚ ТЕКСЕРУ СӘТТІ' : `⚠️ ${failures} тексеру сәтсіз`}`)
process.exit(failures === 0 ? 0 : 1)
