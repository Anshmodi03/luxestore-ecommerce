import { motion, Variants } from 'framer-motion'
import { ShoppingBag, Heart } from '@phosphor-icons/react'
import { Product } from '../../services/product.service'
import { useCart } from '../../context/CartContext'
import { useToast } from '../../context/ToastContext'
import { useWishlist } from '../../context/WishlistContext'
import { useFirebaseAuth } from '../../context/FirebaseAuthContext'
import { Link } from 'react-router-dom'

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
  const { openCart, addItem } = useCart()
  const { showToast } = useToast()
  const { isWishlisted, toggleWishlist } = useWishlist()
  const { isAuthenticated, triggerLogin } = useFirebaseAuth()
  const wishlisted = isWishlisted(product._id)

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isAuthenticated) { triggerLogin(); return }
    toggleWishlist(product._id, product.name)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
    showToast(`${product.name} added to bag`)
    openCart()
  }

  return (
    <motion.div
      variants={itemVariants}
      className="group hover-lift"
    >
      <Link
        to={`/product/${product.slug}`}
        className="block relative w-full text-left cursor-pointer"
      >
        <div className="relative overflow-hidden aspect-4/5 rounded-2xl mb-6 bg-gray-50 dark:bg-white/5">
          <img
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:scale-105"
            src={product.images?.[0]?.url || ''}
          />

          {/* Unified Badge */}
          {product.badge && (
            <div className={`absolute top-4 left-4 ${product.badgeClass || 'bg-primary text-white'} text-xs font-bold px-3 py-1.5 uppercase tracking-wider rounded-sm shadow-sm`}>
              {product.badge}
            </div>
          )}

          {/* Wishlist Button */}
          <button
            type="button"
            title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            onClick={handleWishlist}
            className={`absolute z-20 top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-md
              ${wishlisted
                ? 'bg-primary text-white opacity-100 scale-100'
                : 'bg-white/90 backdrop-blur-sm text-gray-600 opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 hover:text-primary'
              }`}
          >
            <Heart weight={wishlisted ? 'fill' : 'regular'} size={16} />
          </button>

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
      </Link>
    </motion.div>
  )
}
