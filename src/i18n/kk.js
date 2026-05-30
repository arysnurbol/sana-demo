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

  landing: {
    hero: {
      title: 'Ресторан мен кофеханаға арналған ақылды басқару жүйесі',
      subtitle:
        'POS, онлайн меню, кухня экраны, клиент базасы және аналитика — бәрі бір жүйеде.',
    },
    problems: {
      title: 'Таныс мәселелер бар ма?',
      items: [
        { icon: '💬', text: 'Заказдар WhatsApp-та жоғалып кетеді' },
        { icon: '🔀', text: 'Кассир, кухня, менеджер бөлек жұмыс істейді' },
        { icon: '👤', text: 'Клиент базасы жиналмайды' },
        { icon: '📉', text: 'Сатылым аналитикасы көрінбейді' },
        { icon: '📦', text: 'Онлайн және офлайн заказдар бөлек жүреді' },
      ],
    },
    solution: {
      title: 'Біздің шешім',
      subtitle: 'Барлық процесс бір жүйеде біріктірілген',
      modules: [
        { icon: '🧾', title: 'POS касса', text: 'Залдағы заказды тез енгізу' },
        { icon: '📱', title: 'Online QR Menu', text: 'Клиент телефоннан заказ береді' },
        { icon: '👨‍🍳', title: 'Кухня экраны', text: 'Заказдар realtime көрінеді' },
        { icon: '🗂️', title: 'Клиент базасы', text: 'Әр клиент тарихы сақталады' },
        { icon: '📊', title: 'Аналитика', text: 'Сатылым мен есеп бір көзден' },
      ],
    },
    flow: {
      title: 'Демо қалай жұмыс істейді?',
      steps: [
        'Кассир заказ енгізеді',
        'Кухня экраны realtime көреді',
        'Статус өзгереді',
        'Аналитика жаңарады',
      ],
    },
    offer: {
      title: 'Бұл — интерактивті прототип',
      text:
        'Бұл дайын боевой система емес. Біз сізге болашақ жүйенің қалай жұмыс істейтінін көрсетеміз. Егер логика мен интерфейс ұнаса, 3–4 ай ішінде бизнесіңізге бейімделген толық нұсқасын жасап береміз.',
    },
    cta: {
      title: 'Жүйені өз көзіңізбен көріңіз',
      subtitle: 'Демо толық интерактивті — кез келген бөлімді тексере аласыз.',
    },
    footer: 'Ресторан, кафе және кофехана бизнесіне арналған басқару жүйесі.',
  },

  dashboard: {
    revenue: 'Бүгінгі сатылым',
    ordersCount: 'Заказ саны',
    avgCheck: 'Орташа чек',
    online: 'Online заказдар',
    offline: 'Offline заказдар',
    topProducts: 'Ең көп сатылған',
    recentOrders: 'Соңғы заказдар',
    customersCount: 'Клиенттер',
    noData: 'Дерек жоқ. Демода заказ жасап көріңіз.',
    sold: 'сатылды',
  },

  analytics: {
    title: 'Аналитика',
    revenueByCategory: 'Категория бойынша сатылым',
    ordersBySource: 'Көзі бойынша заказдар',
    statusBreakdown: 'Статус бойынша',
    noData: 'Аналитика үшін дерек жеткіліксіз.',
  },

  customers: {
    title: 'Клиенттер',
    name: 'Клиент',
    phone: 'Телефон',
    orders: 'Заказ саны',
    total: 'Жалпы сумма',
    note: 'Қазіргі клиент базаңызды осы жүйеге көшіруге болады.',
  },

  menuManage: {
    title: 'Меню басқару',
    product: 'Өнім',
    category: 'Категория',
    price: 'Баға',
    status: 'Күй',
    available: 'Бар',
    unavailable: 'Жоқ',
    editPrice: 'Бағаны өзгерту',
    toggle: 'Қолжетімділік',
    save: 'Сақтау',
    cancel: 'Болдырмау',
  },

  menu: {
    title: 'Online меню',
    subtitle: 'Сүйікті тағамыңызды таңдаңыз',
    add: 'Қосу',
    cart: 'Себет',
    viewCart: 'Себетті көру',
    emptyCart: 'Себет бос',
    checkout: 'Заказ беру',
    yourOrder: 'Сіздің заказ',
    name: 'Атыңыз',
    namePlaceholder: 'Атыңызды енгізіңіз',
    phone: 'Телефон',
    phonePlaceholder: '+7 ___ ___ __ __',
    submit: 'Заказды жіберу',
    total: 'Барлығы',
    success: 'Заказыңыз қабылданды!',
    successText: 'Біз заказыңызды дайындап жатырмыз. Рахмет!',
    orderNumber: 'Заказ нөмірі',
    newOrder: 'Жаңа заказ',
    required: 'Аты мен телефонды толтырыңыз',
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
