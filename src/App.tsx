import { useState, useEffect } from 'react'
import Navbar from './components/landing/Navbar'
import MobileMenu from './components/landing/MobileMenu'
import HeroSection from './components/landing/HeroSection'
import ShopTheLook from './components/landing/ShopTheLook'
import Product360 from './components/landing/Product360'
import AtelierGallery from './components/landing/AtelierGallery'
import FeaturesStrip from './components/landing/FeaturesStrip'
import TrendingProducts from './components/landing/TrendingProducts'
import WhyChooseUs from './components/landing/WhyChooseUs'
import BrandMarquee from './components/landing/BrandMarquee'
import Testimonial from './components/landing/Testimonial'
import Footer from './components/landing/Footer'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dark, setDark] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <div className="bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100 transition-colors duration-500 font-body">
      <Navbar onMenuOpen={() => setMenuOpen(true)} onToggleDark={() => setDark(prev => !prev)} isDark={dark} />
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <HeroSection />
      <ShopTheLook />
      <Product360 />
      <AtelierGallery />
      <FeaturesStrip />
      <TrendingProducts />
      <WhyChooseUs />
      <BrandMarquee />
      <Testimonial />
      <Footer />
    </div>
  )
}
