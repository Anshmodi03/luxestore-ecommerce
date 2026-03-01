import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import MobileMenu from '../components/common/MobileMenu'
import Footer from '../components/common/Footer'
import ProductGallery from '../components/product/ProductGallery'
import ProductInfo from '../components/product/ProductInfo'
import ProductFeatures from '../components/product/ProductFeatures'
import ProductSpecs from '../components/product/ProductSpecs'
import ProductReviews from '../components/product/ProductReviews'
import PageTransition from '../components/common/PageTransition'
import CartDrawer from '../components/common/CartDrawer'
import { collectionProducts } from '../data/products'
import { useCart } from '../context/CartContext'

export default function ProductDetailsPage() {
  const { id } = useParams()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const { openCart } = useCart()

  // Find product by id, or default to the first one for the Stitch baseline
  const product = collectionProducts.find(p => p.id.toString() === id) || collectionProducts[0]

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  return (
    <PageTransition>
      <div className={`min-h-screen ${isDarkMode ? 'dark bg-background-dark text-white' : 'bg-background-light text-gray-900'} transition-colors duration-300 font-sans antialiased selection:bg-primary/20 selection:text-primary`}>
        <Navbar 
          isDark={isDarkMode} 
          onToggleDark={() => setIsDarkMode(!isDarkMode)} 
          onMenuOpen={() => setIsMobileMenuOpen(true)} 
        />
        
        <MobileMenu 
          isOpen={isMobileMenuOpen} 
          onClose={() => setIsMobileMenuOpen(false)} 
        />
        
        <CartDrawer />

        {/* Breadcrumbs */}
        <header className="w-full pt-32 pb-6 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
          <nav className="flex text-xs tracking-widest uppercase text-gray-400 dark:text-gray-500">
            <ol className="inline-flex items-center space-x-3">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><span className="text-gray-300 dark:text-gray-700">/</span></li>
              <li><Link to="/collection" className="hover:text-primary transition-colors">Collection</Link></li>
              <li><span className="text-gray-300 dark:text-gray-700">/</span></li>
              <li className="text-gray-900 dark:text-white font-medium truncate max-w-[150px] sm:max-w-none">{product.name}</li>
            </ol>
          </nav>
        </header>

        <main className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 pb-24">
          <div className="grid lg:grid-cols-2 gap-16 xl:gap-32 mt-8 items-center">
            {/* We pass an array of images. Since dummy data only has 1, we simulate thumbnails using the same image */}
            <ProductGallery images={[product.image, product.image, product.image]} />
            
            <ProductInfo 
              title={product.name}
              subtitle={product.category}
              description="Immerse yourself in silence. Industry-leading noise cancellation meets high-fidelity audio for a listening experience that transforms your environment."
              price={product.price}
              oldPrice={product.oldPrice}
              onAddToCart={() => openCart()}
            />
          </div>

          <ProductFeatures />
          <ProductSpecs />
          <ProductReviews />
        </main>

        <Footer />
      </div>
    </PageTransition>
  )
}
