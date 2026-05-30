// Браузерді КӨРІНЕТІН түрде ашып, POS → Kitchen realtime сценарийін
// автоматты ойнататын демо-скрипт.
//
// Іске қосу:
//   1) терминалда:  npm run dev        (dev сервер 5173 портта тұруы керек)
//   2) басқа терминалда:  npm run demo
//
// Не көрсетеді:
//   - Kitchen табын ашамыз (бос)
//   - POS табында заказ жасаймыз
//   - Kitchen табына қайтып келгенде заказ realtime пайда болады
//   - статусты жылжытамыз (Жаңа → Дайындалуда → Дайын)

import { chromium } from 'playwright'

const BASE = process.env.BASE_URL || 'http://localhost:5173'
const pause = (ms) => new Promise((r) => setTimeout(r, ms))

const browser = await chromium.launch({
  headless: false, // браузер КӨРІНЕДІ
  slowMo: 700, // әр әрекет баяу — көзбен көру үшін
  args: ['--window-size=1280,820', '--window-position=80,40'],
})

// БІР контекст = екі таб localStorage-ты бөліседі (cross-tab realtime осыдан жұмыс істейді)
const context = await browser.newContext({ viewport: { width: 1280, height: 760 } })

// ---- Kitchen табын алдымен ашамыз (бос күйі) ----
const kitchen = await context.newPage()
await kitchen.goto(`${BASE}/demo/kitchen`)
// Таза бастау үшін демо деректерін тазалаймыз
await kitchen.evaluate(() => localStorage.clear())
await kitchen.reload()
await kitchen.bringToFront()
console.log('① Kitchen табы ашылды — әзірге бос, заказ күтуде')
await pause(2000)

// ---- POS табын ашамыз ----
const pos = await context.newPage()
await pos.goto(`${BASE}/demo/pos`)
await pos.bringToFront()
console.log('② POS табы ашылды — кассир заказ жасайды')
await pause(1500)

// Кофе → Латте
await pos.getByRole('button', { name: 'Кофе' }).click()
await pos.getByRole('button', { name: /Латте/ }).click()
console.log('   • Латте қосылды')
await pause(800)

// Выпечка → Круассан
await pos.getByRole('button', { name: 'Выпечка' }).click()
await pos.getByRole('button', { name: /Круассан/ }).click()
console.log('   • Круассан қосылды')
await pause(800)

// Заказ түрі: Залда ішу + стол нөмірі
await pos.getByRole('button', { name: 'Залда ішу' }).click()
await pos.getByPlaceholder('Стол нөмірі').fill('4')
console.log('   • Залда ішу, Стол 4')
await pause(800)

// Төлем: Kaspi
await pos.getByRole('button', { name: 'Kaspi' }).click()
await pause(600)

// Заказ жасау
await pos.getByRole('button', { name: 'Заказ жасау' }).click()
console.log('③ Заказ жасалды! (растау модалы шықты)')
await pause(2500)

// Модалды жабамыз (жаңа заказ батырмасы)
await pos.getByRole('button', { name: 'Заказ жасау' }).last().click()
await pause(800)

// ---- Kitchen табына қайтамыз — заказ realtime пайда болды ----
await kitchen.bringToFront()
console.log('④ Kitchen табы — заказ #102 REALTIME пайда болды! 🎉')
await pause(2500)

// Статусты жылжытамыз: Жаңа → Дайындалуда
await kitchen.getByRole('button', { name: 'Дайындауды бастау' }).click()
console.log('   • Статус: Дайындалуда')
await pause(2000)

// Дайындалуда → Дайын
await kitchen.getByRole('button', { name: 'Дайын', exact: true }).click()
console.log('   • Статус: Дайын')
await pause(2500)

console.log('\n✅ Демо аяқталды. Браузер 10 секундтан кейін жабылады…')
await pause(10000)

await browser.close()
