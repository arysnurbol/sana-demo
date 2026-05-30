# Sana Demo — жобаның жоспары (тех-задание)

Ресторан, кафе және кофехана бизнесіне арналған **басқару жүйесінің интерактивті демо-прототипі**.

Бұл құжат — жобаның бірыңғай жоспары. Барлық даму осы құжаттан басталады.

---

## 0. Негізгі идея (бір сөйлеммен)

> Клиент сайтқа кіреді → **«Демо көру»** батырмасын басады → POS-та заказ жасайды → Kitchen экранында сол заказ realtime пайда болады → Dashboard-та статистика жаңарады.

Демоның басты күші — **бір экраннан жасалған заказдың екінші экранда realtime көрінуі**.

Маңызды ескерту клиентке:

> Бұл — дайын боевой система емес, **интерактивті прототип**. Біз болашақ жүйенің қалай жұмыс істейтінін көрсетеміз. Логика мен интерфейс ұнаса, 3–4 ай ішінде бизнеске бейімделген толық нұсқасын жасап береміз.

---

## 1. Жоба құрылымы (жоғары деңгей)

```text
Landing Page
   ↓ [Демо көру]
Demo Home (/demo)
   ├── POS / Cashier        (/demo/pos)
   ├── Kitchen / Barista    (/demo/kitchen)
   ├── Online QR Menu       (/demo/menu)
   └── Admin                (/demo/admin)
        ├── Dashboard       (/demo/admin)
        ├── Orders          (/demo/admin/orders)
        ├── Menu            (/demo/admin/menu)
        ├── Customers       (/demo/admin/customers)
        └── Analytics       (/demo/admin/analytics)
```

---

## 2. Routing (бірыңғай, түпкілікті)

> **Маңызды:** бұрынғы нұсқада route стилі араласқан болатын (`/demo/orders` ↔ `/demo/admin/orders`).
> Енді ереже біреу: **бизнес-рөлдер** жоғарғы деңгейде, **админ-бөлімдер** `/demo/admin/*` астында.

| Route                      | Бет                         | Рөл / құрылғы          |
| -------------------------- | --------------------------- | ---------------------- |
| `/`                        | Landing page                | Барлығы (десктоп/моб.) |
| `/demo`                    | Demo home (рөл таңдау)      | Барлығы                |
| `/demo/pos`                | POS / Кассир                | Кассир (планшет/деск.) |
| `/demo/kitchen`            | Kitchen / Бариста экраны    | Кухня (планшет/деск.)  |
| `/demo/menu`               | Online QR Menu              | Клиент (мобайл)        |
| `/demo/admin`              | Admin Dashboard             | Менеджер (десктоп)     |
| `/demo/admin/orders`       | Заказдар тізімі             | Менеджер               |
| `/demo/admin/menu`         | Меню басқару                | Менеджер               |
| `/demo/admin/customers`    | Клиент базасы               | Менеджер               |
| `/demo/admin/analytics`    | Аналитика / графиктер       | Менеджер               |

Ескертулер:

- `/demo/pos`, `/demo/kitchen`, `/demo/menu` — бөлек толық экрандар (admin layout-сыз), себебі олар бөлек құрылғыларда ашылады.
- `/demo/admin/*` — ортақ admin layout-та (sidebar + topbar).

---

## 3. Демо рөлдер (auth жоқ)

Демода нақты аутентификация **жоқ** — кез келген рөлді еркін ашуға болады.

`/demo` бетінде рөлдер карточка ретінде көрсетіледі:

```text
[POS ашу]      [Kitchen ашу]
[Admin ашу]    [QR Menu ашу]
```

Әр карточкада қысқа сипаттама + «Ашу» батырмасы.
Demo layout-тың topbar-ында **role switch** (рөлдер арасында тез ауысу) болады.

---

## 4. State management (демоның жүрегі)

> Бұл — ең маңызды техникалық шешім. POS-та жасалған заказ Kitchen-де көріну үшін бөлек экрандар (бөлек браузер табтары) **ортақ state** бөлісуі керек.

### 1-этап: Firebase-сіз (mock)

POS пен Kitchen бөлек таб болғандықтан, React Context жеткіліксіз — табтар арасында data бөліну керек. Сондықтан:

```text
localStorage + storage event   (немесе BroadcastChannel API)
```

- Заказдар, өнімдер, клиенттер `localStorage`-та сақталады.
- Бір табта заказ жасалғанда, екінші таб `storage` event арқылы жаңарады.
- Global state үшін: **Zustand** (localStorage persist middleware-пен) — қарапайым әрі жеткілікті.

### 2-этап: Firebase

```text
onSnapshot(orders)  →  нағыз realtime, табтар автоматты синхрон
```

UI Zustand-пен жазылса, кейін Firebase-ке көшу оңай (бір data-слой ауысады).

---

## 5. Mock data модельдері

```text
categories  { id, name, order }
products    { id, categoryId, name, price, available }
orders      { id, number, type, table, items[], status, total, createdAt, source }
customers   { id, name, phone, ordersCount, totalSpent }
stats       { revenue, ordersCount, avgCheck, online, offline }
```

`order.status`: `new` → `cooking` → `ready` → `done`
`order.source`: `pos` | `online`
`order.type`: `dine_in` | `takeaway` | `delivery`

Бастапқы өнімдер:

```text
Латте, Капучино, Американо  (Кофе)
Круассан, Чизкейк           (Выпечка)
Су                          (Сусын)
```

---

## 6. Демо сценарийлер

### Сценарий 1 — Офлайн заказ (ЕҢ БАСТЫ)

POS (`/demo/pos`):

1. «Кофе» → «Латте»
2. «Выпечка» → «Круассан»
3. Order type: «Залда ішу» → Стол 4
4. Payment: «Kaspi»
5. «Заказ жасау»

→ `Заказ #102 жасалды`

Сол сәтте Kitchen (`/demo/kitchen`) realtime көрсетеді:

```text
#102 · Стол 4
Латте x1
Круассан x1
[Дайындалып жатыр] [Дайын]
```

Status өзгергенде Admin Dashboard статистикасы жаңарады.

### Сценарий 2 — Онлайн QR menu

Online menu (`/demo/menu`, мобайл көрінісі):

1. меню → тағам таңдау → себет → checkout
2. телефон + аты енгізу → заказ жіберу

→ заказ `/demo/admin/orders` және `/demo/kitchen`-ге түседі (`source: online`).

Хабарлама: *«Онлайн заказ да, залдағы заказ да бір жүйеде жүреді.»*

### Сценарий 3 — Admin Dashboard (`/demo/admin`)

```text
Бүгінгі сатылым: 186 500 ₸
Заказ саны: 74      Орташа чек: 2 520 ₸
Online: 18          Offline: 56
+ ең көп сатылған өнімдер
+ соңғы заказдар
+ клиенттер саны
```

### Сценарий 4 — Меню басқару (`/demo/admin/menu`)

Категория/өнім қосу, баға өзгерту, «жоқ» деп белгілеу.
Мысалы: Латте 1200 → 1300 ₸ → POS пен Online menu-де бірден жаңарады.

### Сценарий 5 — Клиент базасы (`/demo/admin/customers`)

| Клиент | Телефон   | Заказ | Жалпы сумма |
| ------ | --------- | ----: | ----------: |
| Айдос  | +7 700... |    12 |    32 400 ₸ |
| Мадина | +7 701... |     8 |    21 700 ₸ |
| Ержан  | +7 705... |     4 |     9 800 ₸ |

---

## 7. UI / Layout талаптары

| Бет           | Layout                          | Құрылғы        |
| ------------- | ------------------------------- | -------------- |
| Landing       | толық бет, секциялар            | десктоп + моб. |
| `/demo`       | карточкалар торы                | барлығы        |
| POS           | сол жақ меню + оң жақ себет      | планшет/деск.  |
| Kitchen       | заказ карточкалары торы         | планшет/деск.  |
| Online menu   | **мобайл-first**, төменгі себет | мобайл         |
| Admin/*       | sidebar + topbar                | десктоп        |

Demo layout topbar:

```text
[Demo Mode]  Sana Coffee   [Role switch ▾]   [Demo data reset]
```

---

## 8. Demo data reset

Презентация алдында data-ны тазалау үшін admin-де батырма:

```text
[Демоны бастапқы күйге қайтару]
```

→ `localStorage` (немесе Firestore) бастапқы seed-пен қайта толтырылады.

---

## 9. i18n (тіл)

- Қазір интерфейс **қазақша**.
- Барлық мәтін бір жерге жиналсын (`src/i18n/kk.js`), hardcode шашылмасын.
- Болашақта орысша қосу оңай болу үшін осылай ұйымдастырамыз.

---

## 10. Технологиялар

```text
React + Vite
Tailwind CSS
React Router
Zustand (state + localStorage persist)
Firebase (2-этапта)
Vercel (deploy)
```

---

## 11. Даму реті (басымдылықпен)

> Өзгеріс: Landing page-ті кейінге жылжыттық. Алдымен негізгі demo flow
> (POS → Kitchen realtime) жұмыс істеп тұрғаны маңыздырақ — ол демоның жүрегі.

| # | Қадам                                             | Нәтиже                          |
| - | ------------------------------------------------- | ------------------------------- |
| 1 | Setup: Vite + Tailwind + Router + барлық route қаңқасы | бос беттер ашылады          |
| 2 | Mock data + Zustand (localStorage persist)        | data-слой дайын                 |
| 3 | Demo layout (sidebar, topbar, demo badge, role switch) | қаңқа дайын                |
| 4 | POS экраны                                         | заказ жасалады                  |
| 5 | **Kitchen экраны (POS→Kitchen ортақ state)**      | **realtime flow жұмыс істейді** |
| 6 | Landing page                                       | сайт презентацияға ұқсайды      |
| 7 | Online menu → Orders                               | онлайн заказ flow               |
| 8 | Admin Dashboard + Customers + Analytics           | статистика көрінеді             |
| 9 | Demo data reset                                    | презентацияға дайын             |
| 10| (Опц.) Firebase realtime                          | нағыз realtime                  |
| 11| Vercel deploy                                     | онлайн қолжетімді               |

---

## 12. Landing page структурасы

```text
/
├── Hero          (тақырып + [Демо көру] + [Байланысу])
├── Problems      (WhatsApp-та заказ жоғалады, базасы жоқ, аналитика жоқ...)
├── Solution      (5 модуль)
├── Modules       (POS, QR Menu, Kitchen, Customers, Analytics)
├── How Demo Works (Кассир → кухня → статус → аналитика)
├── UI preview    (скриншоттар)
├── Development offer (3–4 айда толық нұсқа уәдесі)
└── CTA           ([Демо жүйені ашу] → /demo)
```

Hero мысалы:

> **Ресторан мен кофеханаға арналған ақылды басқару жүйесі**
> POS, онлайн меню, кухня экраны, клиент базасы және аналитика — бәрі бір жүйеде.

---

## 13. Қорытынды — басты flow

```text
Клиент сайтқа кірді
  → «Демо көру» басты
  → POS-та заказ жасады
  → Kitchen-де сол заказды realtime көрді
  → Dashboard-та статистика өзгерді
```

Осы flow дайын болса — презентацияның негізгі күші дайын.
