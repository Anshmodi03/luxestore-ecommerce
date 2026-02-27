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
      className="group cursor-pointer"
      onClick={() => onQuickView(product)}
    >
      <div className="relative overflow-hidden aspect-[3/4] mb-6 bg-gray-50 dark:bg-white/5 rounded-sm">
        <img
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:scale-105"
          src={product.image}
        />
        
        {/* Overlay Hover State */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center">
          <button 
            onClick={handleAddToCart}
            className="w-14 h-14 rounded-full flex items-center justify-center text-white transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-75 bg-white/20 dark:bg-black/30 backdrop-blur-md border border-white/30 shadow-xl hover:bg-white/40 dark:hover:bg-black/50"
          >
            <ShoppingBag weight="fill" size={20} />
          </button>
        </div>
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
