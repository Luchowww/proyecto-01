import { createBrowserRouter, RouterProvider } from 'react-router'
import { FavoritesProvider } from './context/FavoritesContext'
import { ThemeProvider } from './context/ThemeContext'
import { ToastProvider } from './context/ToastContext'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ExplorePage from './pages/ExplorePage'
import ShowDetailPage from './pages/ShowDetailPage'
import FavoritesPage from './pages/FavoritesPage'
import ContactPage from './pages/ContactPage'
import NotFoundPage from './pages/NotFoundPage'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/explorar', element: <ExplorePage /> },
      { path: '/serie/:id', element: <ShowDetailPage /> },
      { path: '/mi-maraton', element: <FavoritesPage /> },
      { path: '/contacto', element: <ContactPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

// Los providers envuelven al router: así favoritos, toasts y tema persisten entre rutas
export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <FavoritesProvider>
          <RouterProvider router={router} />
        </FavoritesProvider>
      </ToastProvider>
    </ThemeProvider>
  )
}
