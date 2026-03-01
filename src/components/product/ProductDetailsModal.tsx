import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from '@phosphor-icons/react'
import { useProductModal } from '../../context/ProductModalContext'
import { useCart } from '../../context/CartContext'
import { getExpandedProductDetails } from '../../data/productDetails'
import ProductGallery from './ProductGallery'
import ProductInfo from './ProductInfo'
import ProductFeatures from './ProductFeatures'
import ProductSpecs from './ProductSpecs'
import ProductReviews from './ProductReviews'

export default function ProductDetailsModal() {
  const { isOpen, activeProduct, closeProductModal } = useProductModal()
  const { openCart } = useCart()
  const modalRef = useRef<HTMLDivElement>(null)

  // Close on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeProductModal()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleEsc)
    }
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, closeProductModal])

  // Reset scroll when opened
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.scrollTo(0, 0)
    }
  }, [isOpen, activeProduct])

  if (!activeProduct) return null

  // Generate dynamic tailored details depending on the clicked product category
  const details = getExpandedProductDetails(activeProduct)

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center">
          
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeProductModal}
            className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div 
            ref={modalRef}
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full h-dvh md:h-[90vh] md:max-w-[95vw] lg:max-w-7xl md:rounded-4xl bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100 overflow-y-auto shadow-2xl safe-area-pt scroll-smooth"
          >
            {/* Sticky Close Button */}
            <div className="sticky top-0 z-50 flex justify-end p-4 md:p-6 pointer-events-none">
              <button 
                onClick={closeProductModal}
                className="w-12 h-12 bg-white/80 dark:bg-black/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg pointer-events-auto hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white group"
              >
                <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Modal Content Wrapper */}
            <div className="px-6 pb-24 sm:px-12 md:px-16 -mt-12 md:-mt-8">
              
              {/* Top Hero Section */}
              <div className="grid lg:grid-cols-2 gap-12 xl:gap-24 items-center mb-24">
                <ProductGallery images={details.images} />
                
                <ProductInfo 
                  title={activeProduct.name}
                  subtitle={activeProduct.category}
                  description={activeProduct.description}
                  price={activeProduct.price}
                  oldPrice={activeProduct.oldPrice}
                  rating={details.rating}
                  reviewsCount={details.reviewCount}
                  onAddToCart={() => openCart()}
                />
              </div>

              {/* Dynamic Feature Cards */}
              <ProductFeatures features={details.features} />
              
              {/* Technical Specifications Grid */}
              <ProductSpecs specs={details.specs} />
              
              {/* Masonry Review Block */}
              <ProductReviews 
                reviews={details.reviews} 
                rating={details.rating} 
                reviewCount={details.reviewCount} 
              />

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
