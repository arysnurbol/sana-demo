// Барлық интерфейс мәтіндері осы жерде жиналады.
// Болашақта ru.js / en.js қосу оңай болуы үшін hardcode шашпаймыз.

export const kk = {
  brand: 'Sana',
  company: 'Aroma Coffee',
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
