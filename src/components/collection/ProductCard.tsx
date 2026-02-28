import { motion, Variants } from 'framer-motion'
import { ShoppingBag } from '@phosphor-icons/react'
import { Product } from '../../data/products'
import { useCart } from '../../context/CartContext'

interface ProductCardProps {
  product: Product
  onQuickView: (product: Product) => void
}

// Framer motion variants for the staggered grid animation
export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { openCart } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    // Logic to add to cart would go here in a real app
    openCart()
  }

  return (
    <motion.div 
      variants={itemVariants}
      className="group"
    >
      <div className="relative overflow-hidden aspect-[4/5] rounded-2xl mb-6 bg-gray-50 dark:bg-white/5">
        <img
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:scale-105"
          src={product.image}
        />
        
        {/* Quick Add Button */}
        <button 
          onClick={handleAddToCart}
          className="absolute bottom-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm text-gray-900 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl hover:bg-primary hover:text-white"
        >
          <ShoppingBag weight="fill" size={20} />
        </button>
      </div>
      
      <div className="flex flex-col items-start text-center md:text-left">
        <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-2 font-medium">
          {product.category}
        </span>
        <h3 className="text-lg text-gray-900 dark:text-white font-serif font-medium tracking-wide mb-1 group-hover:text-primary transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm font-light tracking-wide">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </motion.div>
  )
}
