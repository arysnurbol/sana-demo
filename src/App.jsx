import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import DemoHome from './pages/DemoHome.jsx'
import Pos from './pages/Pos.jsx'
import Kitchen from './pages/Kitchen.jsx'
import OnlineMenu from './pages/OnlineMenu.jsx'
import AdminLayout from './layouts/AdminLayout.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import Orders from './pages/admin/Orders.jsx'
import MenuManage from './pages/admin/MenuManage.jsx'
import Customers from './pages/admin/Customers.jsx'
import Loyalty from './pages/admin/Loyalty.jsx'
import Analytics from './pages/admin/Analytics.jsx'
import Shift from './pages/admin/Shift.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Landing />} />

      {/* Demo — бизнес-рөлдер (бөлек толық экрандар) */}
      <Route path="/demo" element={<DemoHome />} />
      <Route path="/demo/pos" element={<Pos />} />
      <Route path="/demo/kitchen" element={<Kitchen />} />
      <Route path="/demo/menu" element={<OnlineMenu />} />

      {/* Demo — admin (ортақ layout: sidebar + topbar) */}
      <Route path="/demo/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="orders" element={<Orders />} />
        <Route path="menu" element={<MenuManage />} />
        <Route path="customers" element={<Customers />} />
        <Route path="loyalty" element={<Loyalty />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="shift" element={<Shift />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
