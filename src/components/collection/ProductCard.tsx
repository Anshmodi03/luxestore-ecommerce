import { motion, Variants } from 'framer-motion'
import { ShoppingBag } from '@phosphor-icons/react'
import { Product } from '../../data/products'
import { useCart } from '../../context/CartContext'
import { useNavigate } from 'react-router-dom'

interface ProductCardProps {
  product: Product
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

export default function ProductCard({ product }: ProductCardProps) {
  const { openCart } = useCart()
  const navigate = useNavigate()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    openCart()
  }

  return (
    <motion.div 
      variants={itemVariants}
      className="group hover-lift"
    >
      <div 
        onClick={() => navigate(`/product/${product.id}`)} 
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate(`/product/${product.id}`) }}
        className="block relative w-full text-left cursor-pointer"
      >
        <div className="relative overflow-hidden aspect-4/5 rounded-2xl mb-6 bg-gray-50 dark:bg-white/5">
          <img
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:scale-105"
            src={product.image}
          />
          
          {/* Unified Badge */}
          {product.badge && (
            <div className={`absolute top-4 left-4 ${product.badgeClass || 'bg-primary text-white'} text-xs font-bold px-3 py-1.5 uppercase tracking-wider rounded-sm shadow-sm`}>
              {product.badge}
            </div>
          )}

          {/* Quick Add Button */}
          <button 
            title="Add to Cart"
            onClick={handleAddToCart}
            className="absolute z-20 bottom-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm text-gray-900 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl hover:bg-primary hover:text-white"
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
          <div className="flex items-center gap-3">
            <p className="text-gray-900 dark:text-white text-sm font-bold tracking-wide">
              ${product.price.toFixed(2)}
            </p>
            {product.oldPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${product.oldPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
