// Барлық интерфейс мәтіндері осы жерде жиналады.
// Болашақта ru.js / en.js қосу оңай болуы үшін hardcode шашпаймыз.

export const kk = {
  brand: 'Sana',
  company: 'Sana Coffee',
  demoMode: 'Demo Mode',

  nav: {
    dashboard: 'Басты бет',
    orders: 'Заказдар',
    menu: 'Меню',
    customers: 'Клиенттер',
    analytics: 'Аналитика',
  },

  roles: {
    pos: 'POS / Кассир',
    kitchen: 'Кухня / Бариста',
    onlineMenu: 'Online QR Menu',
    admin: 'Admin панель',
  },

  actions: {
    open: 'Ашу',
    viewDemo: 'Демо көру',
    contact: 'Байланысу',
    openDemo: 'Демо жүйені ашу',
    createOrder: 'Заказ жасау',
    resetDemo: 'Демоны бастапқы күйге қайтару',
    roleSwitch: 'Рөл ауыстыру',
    clear: 'Тазалау',
    back: 'Артқа',
  },

  kitchen: {
    title: 'Кухня / Бариста',
    columns: {
      new: 'Жаңа',
      cooking: 'Дайындалуда',
      ready: 'Дайын',
    },
    empty: 'Заказ жоқ',
    startCooking: 'Дайындауды бастау',
    markReady: 'Дайын',
    complete: 'Берілді',
    waiting: 'POS немесе онлайн заказды күтуде…',
    minutesAgo: 'мин бұрын',
    justNow: 'жаңа ғана',
  },

  pos: {
    title: 'POS / Кассир',
    cart: 'Себет',
    emptyCart: 'Себет бос. Өнім таңдаңыз.',
    orderType: 'Заказ түрі',
    table: 'Стол',
    tablePlaceholder: 'Стол нөмірі',
    payment: 'Төлем',
    total: 'Барлығы',
    qty: 'саны',
    notAvailable: 'Жоқ',
    orderCreated: 'Заказ жасалды',
    paymentMethods: {
      kaspi: 'Kaspi',
      cash: 'Қолма-қол',
      card: 'Карта',
    },
  },

  order: {
    status: {
      new: 'Жаңа',
      cooking: 'Дайындалып жатыр',
      ready: 'Дайын',
      done: 'Берілді',
    },
    type: {
      dine_in: 'Залда ішу',
      takeaway: 'Өзімен алып кету',
      delivery: 'Жеткізу',
    },
    source: {
      pos: 'Офлайн',
      online: 'Онлайн',
    },
  },
}

export default kk
