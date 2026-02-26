import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/common/Navbar'
import MobileMenu from './components/common/MobileMenu'
import LandingPage from './pages/LandingPage'
import AboutPage from './pages/AboutPage'
import Preloader from './components/common/Preloader'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dark, setDark] = useState(false)
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <div className="bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100 transition-colors duration-500 font-body relative">
      {/* Global Navigation */}
      <Navbar onMenuOpen={() => setMenuOpen(true)} onToggleDark={() => setDark(prev => !prev)} isDark={dark} />
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      {/* Dynamic Routes wrapped with AnimatePresence for transitions */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </AnimatePresence>
      
      {/* Initial Page Loading Animation */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}
    </div>
  )
}
