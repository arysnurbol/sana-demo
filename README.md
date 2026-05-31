# Sana — кофехана мен наубайхана басқару жүйесінің демосы

Кофехана және наубайхана бизнесіне арналған басқару жүйесінің **интерактивті демо-прототипі**.

POS, онлайн QR меню, кухня экраны, клиент базасы және аналитика — бәрі бір жүйеде, бір-бірімен realtime байланысқан.

## Негізгі идея

```
Клиент сайтқа кіреді → «Демо көру» → POS-та заказ жасайды
  → Kitchen экранында realtime пайда болады → Dashboard статистикасы жаңарады
```

## Технологиялар

- **React 18 + Vite 5** — UI
- **Tailwind CSS v4** — стиль
- **React Router 6** — навигация
- **Zustand** (localStorage persist) — state, демо деректері
- **Playwright** — автоматты тексеру скрипттері

Деректер `localStorage`-та сақталады. POS пен Kitchen бөлек браузер табтарында ашылғанда `storage` event арқылы realtime синхрондалады (`src/hooks/useCrossTabSync.js`).

## Маршруттар

| Route | Бет |
| ----- | --- |
| `/` | Landing page |
| `/demo` | Демо басты бет (рөл таңдау) |
| `/demo/pos` | POS / Кассир |
| `/demo/kitchen` | Кухня экраны (канбан, realtime) |
| `/demo/menu` | Online QR меню (мобайл) |
| `/demo/admin` | Admin Dashboard |
| `/demo/admin/orders` | Заказдар |
| `/demo/admin/menu` | Меню басқару |
| `/demo/admin/customers` | Клиенттер |
| `/demo/admin/analytics` | Аналитика |

## Іске қосу

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # production build → dist/
npm run preview      # build-ты локалды қарау
```

## Демоны көрсету

```bash
npm run dev          # бір терминалда
npm run demo         # басқа терминалда — браузер ашылып сценарийді өзі ойнатады
```

POS → Kitchen realtime-ды қолмен көру үшін: екі бөлек табта `/demo/pos` және `/demo/kitchen` ашыңыз, POS-та заказ жасаңыз — Kitchen-де бірден пайда болады.

## Тексеру скрипттері

```bash
node scripts/verify-realtime.mjs   # POS → Kitchen realtime (headless)
node scripts/verify-online.mjs     # Online menu → Orders (headless)
```

## Deploy (Vercel)

`vercel.json` SPA routing rewrite-пен дайын. Vercel-ге GitLab репозиторийін қосып, build командасы `npm run build`, output каталогы `dist`.

---

Бұл — дайын боевой система емес, **интерактивті прототип**. Логика мен интерфейс ұнаса, толық нұсқасы бизнеске бейімделіп жасалады.
