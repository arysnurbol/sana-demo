import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// 1-этап: Firebase-сіз. State localStorage-та сақталады (persist).
// POS пен Kitchen бөлек табтарда ашылғанда, олар бір localStorage-ты
// бөліседі — табтар арасындағы realtime синхрон storage event арқылы.

// ====== Бизнес түрлері ======
// Демо екі бизнеске арналған: кофехана (coffee) және наубайхана (bakery).
// Әр түрдің өз seed-і (категория, өнім, компания аты, лоялдылық сыйлығы).

const SEEDS = {
  coffee: {
    company: 'Sana Coffee',
    categories: [
      { id: 'c1', name: 'Кофе', order: 1 },
      { id: 'c2', name: 'Выпечка', order: 2 },
      { id: 'c3', name: 'Сусын', order: 3 },
    ],
    products: [
      { id: 'p1', categoryId: 'c1', name: 'Латте', price: 1200, cost: 360, available: true },
      { id: 'p2', categoryId: 'c1', name: 'Капучино', price: 1200, cost: 340, available: true },
      { id: 'p3', categoryId: 'c1', name: 'Американо', price: 900, cost: 200, available: true },
      { id: 'p4', categoryId: 'c2', name: 'Круассан', price: 800, cost: 320, available: true },
      { id: 'p5', categoryId: 'c2', name: 'Чизкейк', price: 1500, cost: 600, available: true },
      { id: 'p6', categoryId: 'c3', name: 'Су', price: 300, cost: 120, available: true },
    ],
    loyalty: { stampsTarget: 6, reward: 'Тегін кофе' },
  },

  bakery: {
    company: 'Sana Bakery',
    categories: [
      { id: 'b1', name: 'Нан', order: 1 },
      { id: 'b2', name: 'Тоқаш', order: 2 },
      { id: 'b3', name: 'Торт', order: 3 },
    ],
    products: [
      { id: 'q1', categoryId: 'b1', name: 'Бөлке нан', price: 250, cost: 80, available: true },
      { id: 'q2', categoryId: 'b1', name: 'Қара нан', price: 300, cost: 100, available: true },
      { id: 'q3', categoryId: 'b1', name: 'Багет', price: 400, cost: 130, available: true },
      { id: 'q4', categoryId: 'b2', name: 'Самса', price: 350, cost: 140, available: true },
      { id: 'q5', categoryId: 'b2', name: 'Бауырсақ (порц.)', price: 500, cost: 150, available: true },
      { id: 'q6', categoryId: 'b2', name: 'Пирожок', price: 250, cost: 90, available: true },
      { id: 'q7', categoryId: 'b3', name: 'Наполеон (кесек)', price: 700, cost: 280, available: true },
      { id: 'q8', categoryId: 'b3', name: 'Медовик (кесек)', price: 700, cost: 280, available: true },
      { id: 'q9', categoryId: 'b3', name: 'Эклер', price: 400, cost: 150, available: true },
    ],
    loyalty: { stampsTarget: 8, reward: 'Тегін нан' },
  },
}

// stamps — жинаған штамп. freeEarned — алған сыйлық саны.
const seedCustomers = [
  { id: 'u1', name: 'Айдос', phone: '+7 700 000 00 01', ordersCount: 12, totalSpent: 32400, stamps: 4, freeEarned: 2 },
  { id: 'u2', name: 'Мадина', phone: '+7 701 000 00 02', ordersCount: 8, totalSpent: 21700, stamps: 1, freeEarned: 1 },
  { id: 'u3', name: 'Ержан', phone: '+7 705 000 00 03', ordersCount: 4, totalSpent: 9800, stamps: 5, freeEarned: 0 },
  { id: 'u4', name: 'Әсем', phone: '+7 707 000 00 04', ordersCount: 21, totalSpent: 58200, stamps: 3, freeEarned: 4 },
  { id: 'u5', name: 'Дамир', phone: '+7 708 000 00 05', ordersCount: 6, totalSpent: 14600, stamps: 2, freeEarned: 1 },
]

// Берілген бизнес түрінің бастапқы state-ін құрады.
function buildState(businessType) {
  const seed = SEEDS[businessType] || SEEDS.coffee
  return {
    businessType,
    company: seed.company,
    categories: seed.categories,
    products: seed.products,
    customers: seedCustomers,
    loyalty: seed.loyalty,
    orders: [],
    orderCounter: 101,
  }
}

const initialState = buildState('coffee')

export const useStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      // Бизнес түрін ауыстыру. Өнімдер мен заказдар үйлеспейтіндіктен
      // (кофехана заказында "Латте", наубайханада ол жоқ), seed толық
      // алмасады әрі заказдар тазаланады.
      setBusinessType: (businessType) => {
        if (get().businessType === businessType) return
        set(buildState(businessType))
      },

      // Жаңа заказ қосу. POS пен Online menu осыны шақырады.
      addOrder: (order) => {
        const number = get().orderCounter + 1
        const newOrder = {
          id: `o${number}`,
          number,
          status: 'new',
          createdAt: new Date().toISOString(),
          ...order,
        }
        set((s) => ({ orders: [newOrder, ...s.orders], orderCounter: number }))
        return newOrder
      },

      // Заказ статусын өзгерту. Kitchen экраны осыны шақырады.
      setOrderStatus: (id, status) =>
        set((s) => ({
          orders: s.orders.map((o) => (o.id === id ? { ...o, status } : o)),
        })),

      // Меню басқару.
      updateProduct: (id, patch) =>
        set((s) => ({
          products: s.products.map((p) => (p.id === id ? { ...p, ...patch } : p)),
        })),

      // Лоялдылық: клиентке штамп беру. Мақсатқа жеткенде —
      // штамп нөлденіп, сыйлық (freeEarned) есепке қосылады.
      addStamp: (customerId) =>
        set((s) => {
          const target = s.loyalty?.stampsTarget || 6
          return {
            customers: s.customers.map((c) => {
              if (c.id !== customerId) return c
              const next = (c.stamps || 0) + 1
              if (next >= target) {
                return { ...c, stamps: 0, freeEarned: (c.freeEarned || 0) + 1 }
              }
              return { ...c, stamps: next }
            }),
          }
        }),

      // Демоны бастапқы күйге қайтару (ағымдағы бизнес түрімен).
      resetDemo: () => set(buildState(get().businessType || 'coffee')),
    }),
    {
      name: 'sana-demo-store',
      version: 2,
      // Ескі (businessType жоқ) persist деректерін жаңартады.
      migrate: (persisted) => {
        if (persisted && !persisted.businessType) {
          return { ...persisted, businessType: 'coffee', company: 'Sana Coffee' }
        }
        return persisted
      },
    },
  ),
)

export default useStore
