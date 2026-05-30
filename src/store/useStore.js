import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// 1-этап: Firebase-сіз. State localStorage-та сақталады (persist).
// POS пен Kitchen бөлек табтарда ашылғанда, олар бір localStorage-ты
// бөліседі — табтар арасындағы realtime синхрон келесі қадамда
// (storage event / BroadcastChannel) қосылады.

const seedCategories = [
  { id: 'c1', name: 'Кофе', order: 1 },
  { id: 'c2', name: 'Выпечка', order: 2 },
  { id: 'c3', name: 'Сусын', order: 3 },
]

const seedProducts = [
  { id: 'p1', categoryId: 'c1', name: 'Латте', price: 1200, available: true },
  { id: 'p2', categoryId: 'c1', name: 'Капучино', price: 1200, available: true },
  { id: 'p3', categoryId: 'c1', name: 'Американо', price: 900, available: true },
  { id: 'p4', categoryId: 'c2', name: 'Круассан', price: 800, available: true },
  { id: 'p5', categoryId: 'c2', name: 'Чизкейк', price: 1500, available: true },
  { id: 'p6', categoryId: 'c3', name: 'Су', price: 300, available: true },
]

const seedCustomers = [
  { id: 'u1', name: 'Айдос', phone: '+7 700 000 00 01', ordersCount: 12, totalSpent: 32400 },
  { id: 'u2', name: 'Мадина', phone: '+7 701 000 00 02', ordersCount: 8, totalSpent: 21700 },
  { id: 'u3', name: 'Ержан', phone: '+7 705 000 00 03', ordersCount: 4, totalSpent: 9800 },
]

const initialState = {
  categories: seedCategories,
  products: seedProducts,
  customers: seedCustomers,
  orders: [],
  orderCounter: 101,
}

export const useStore = create(
  persist(
    (set, get) => ({
      ...initialState,

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

      // Демоны бастапқы күйге қайтару.
      resetDemo: () => set({ ...initialState }),
    }),
    { name: 'sana-demo-store' },
  ),
)

export default useStore
