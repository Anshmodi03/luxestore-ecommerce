import { X } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
import { Product } from '../../data/products'
import { useCart } from '../../context/CartContext'

interface QuickViewModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const { openCart } = useCart()

  if (!product) return null

  const handleAddToCart = () => {
    // In a real app, dispatch to a cart reducer here
    onClose()
    setTimeout(() => {
      openCart()
    }, 400) // Wait for modal to close before opening drawer
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            className="relative w-full max-w-5xl bg-white dark:bg-[#121212] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:max-h-[80vh]"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 dark:bg-black/50 hover:bg-white dark:hover:bg-black text-gray-900 dark:text-white transition-colors backdrop-blur-md"
            >
              <X size={20} weight="bold" />
            </button>

            {/* Image Section */}
            <div className="w-full md:w-1/2 bg-gray-100 dark:bg-white/5 relative h-[300px] md:h-auto">
              <img
                alt={product.name}
                className="w-full h-full object-cover"
                src={product.image}
              />
            </div>

            {/* Details Section */}
            <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col overflow-y-auto">
              <div className="mb-auto">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-3">
                  {product.category}
                </p>
                <h2 className="text-3xl md:text-5xl font-serif font-medium text-gray-900 dark:text-white mb-4 leading-tight">
                  {product.name}
                </h2>
                <div className="flex items-baseline gap-3 mb-8">
                  <span className="text-xl font-medium text-gray-900 dark:text-white">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-10 font-light">
                  {product.description}
                </p>
                
                <button 
                  onClick={handleAddToCart}
                  className="w-full py-4 bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-200 text-white dark:text-gray-900 font-medium text-xs uppercase tracking-[0.2em] rounded-none transition-colors flex items-center justify-center"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
