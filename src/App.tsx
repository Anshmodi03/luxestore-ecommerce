import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/common/Navbar'
import MobileMenu from './components/common/MobileMenu'
import LandingPage from './pages/LandingPage'
import AboutPage from './pages/AboutPage'
import CollectionPage from './pages/CollectionPage'
import EditorialPage from './pages/EditorialPage'
import Preloader from './components/common/Preloader'
import CartDrawer from './components/common/CartDrawer'
import ClientServicesPage from './pages/ClientServicesPage'
import ProductDetailsModal from './components/product/ProductDetailsModal'
import CheckoutPage from './pages/CheckoutPage'
import AuthPage from './pages/AuthPage'
import { ProductModalProvider } from './context/ProductModalContext'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dark, setDark] = useState(false)
  const [loading, setLoading] = useState(true)
  const location = useLocation()
  const isCheckout = location.pathname === '/checkout'
  const isAuth = location.pathname === '/auth'
  const hideNav = isCheckout || isAuth

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <ProductModalProvider>
      <div className="bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100 transition-colors duration-500 font-body relative">
        {/* Global Navigation */}
        {!hideNav && <Navbar onMenuOpen={() => setMenuOpen(true)} onToggleDark={() => setDark(prev => !prev)} isDark={dark} />}
        {!hideNav && <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />}
        <CartDrawer />
        
        {/* Global Modals */}
        <ProductDetailsModal />
        
        {/* Dynamic Routes wrapped with AnimatePresence for transitions */}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/collection" element={<CollectionPage />} />
            <Route path="/editorial" element={<EditorialPage />} />
            <Route path="/services" element={<ClientServicesPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
        </AnimatePresence>
        
        {/* Initial Page Loading Animation */}
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </div>
    </ProductModalProvider>
  )
}
