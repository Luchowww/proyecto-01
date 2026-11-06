import { Outlet, ScrollRestoration } from 'react-router'
import Navbar from './Navbar'
import Footer from './Footer'
import ToastContainer from './ToastContainer'
import StreakModal from './StreakModal'

export default function Layout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-full focus:bg-volt focus:px-4 focus:py-2 focus:text-tinta"
      >
        Saltar al contenido
      </a>
      <Navbar />
      <main id="contenido" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer />
      <StreakModal />
      <ScrollRestoration />
    </div>
  )
}
