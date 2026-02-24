import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import MobileMenu from './components/MobileMenu'
import HeroSection from './components/HeroSection'
import ShopTheLook from './components/ShopTheLook'
import Product360 from './components/Product360'
import AtelierGallery from './components/AtelierGallery'
import FeaturesStrip from './components/FeaturesStrip'
import TrendingProducts from './components/TrendingProducts'
import WhyChooseUs from './components/WhyChooseUs'
import BrandMarquee from './components/BrandMarquee'
import Testimonial from './components/Testimonial'
import Footer from './components/Footer'

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
