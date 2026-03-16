import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/common/Navbar'
import MobileMenu from './components/common/MobileMenu'
import LandingPage from './pages/LandingPage'
import Preloader from './components/common/Preloader'
import CartDrawer from './components/common/CartDrawer'
import ErrorBoundary from './components/common/ErrorBoundary'
import ProtectedRoute from './components/common/ProtectedRoute'
import { ProductModalProvider } from './context/ProductModalContext'

// Lazy-loaded pages (code splitting)
const AboutPage = lazy(() => import('./pages/AboutPage'))
const CollectionPage = lazy(() => import('./pages/CollectionPage'))
const EditorialPage = lazy(() => import('./pages/EditorialPage'))
const ClientServicesPage = lazy(() => import('./pages/ClientServicesPage'))
const ProductDetailsPage = lazy(() => import('./pages/ProductDetailsPage'))
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'))
const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('luxestore_theme')
    if (stored) return stored === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  const [loading, setLoading] = useState(true)
  const location = useLocation()
  const hideNav = location.pathname === '/checkout'

  const lenisRef = useRef<Lenis | null>(null)

  // Lenis smooth scroll setup
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    })
    lenisRef.current = lenis

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // Scroll to top on route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [location.pathname])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('luxestore_theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <ProductModalProvider>
      <div className="bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100 transition-colors duration-500 font-body relative">
        {/* Global Navigation */}
        {!hideNav && <Navbar onMenuOpen={() => setMenuOpen(true)} onToggleDark={() => setDark(prev => !prev)} isDark={dark} />}
        {!hideNav && <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />}
        <CartDrawer />
        
        {/* Dynamic Routes wrapped with AnimatePresence for transitions */}
        <ErrorBoundary>
          <Suspense fallback={null}>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/collection" element={<CollectionPage />} />
                <Route path="/editorial" element={<EditorialPage />} />
                <Route path="/services" element={<ClientServicesPage />} />
                <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
                <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                <Route path="/product/:id" element={<ProductDetailsPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </AnimatePresence>
          </Suspense>
        </ErrorBoundary>
        
        {/* Initial Page Loading Animation */}
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </div>
    </ProductModalProvider>
  )
}
