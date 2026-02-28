import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import ProductCard from './ProductCard'
import { Product } from '../../data/products'

interface ProductCarouselProps {
  products: Product[]
  title: string
  subtitle: string
  onShopAll: () => void
}

export default function ProductCarousel({ products, title, subtitle, onShopAll }: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  
  const { scrollXProgress } = useScroll({ container: scrollRef })

  // Fade out left/right arrows based on scroll position
  const leftOpacity = useTransform(scrollXProgress, [0, 0.05], [0, 1])
  const rightOpacity = useTransform(scrollXProgress, [0.95, 1], [1, 0])

  const scrollBy = (amount: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' })
    }
  }

  return (
    <div className="relative w-full group">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-end justify-between mb-8 md:mb-12"
      >
        <div>
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-gray-900 dark:text-white mb-2 md:mb-3">{title}</h2>
          <p className="text-gray-500 dark:text-gray-400 font-light max-w-xl">{subtitle}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-2 mr-4">
            <motion.button 
              style={{ opacity: leftOpacity }}
              onClick={() => scrollBy(-400)}
              className="w-10 h-10 rounded-full border border-gray-200 dark:border-zinc-800 flex items-center justify-center text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors disabled:opacity-30"
              aria-label="Scroll left"
            >
              <CaretLeft weight="bold" />
            </motion.button>
            <motion.button 
              style={{ opacity: rightOpacity }}
              onClick={() => scrollBy(400)}
              className="w-10 h-10 rounded-full border border-gray-200 dark:border-zinc-800 flex items-center justify-center text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors disabled:opacity-30"
              aria-label="Scroll right"
            >
              <CaretRight weight="bold" />
            </motion.button>
          </div>
          <button 
            onClick={onShopAll}
            className="hidden sm:inline-flex items-center gap-2 font-medium text-sm tracking-wide uppercase text-gray-900 dark:text-white hover:text-primary transition-colors group/btn shrink-0"
          >
            Shop All
            <motion.div
              className="group-hover/btn:translate-x-1 transition-transform"
            >
              <CaretRight weight="bold" className="text-lg" />
            </motion.div>
          </button>
        </div>
      </motion.div>

      <div className="relative -mx-4 sm:-mx-8 lg:-mx-16 px-4 sm:px-8 lg:px-16">
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-6 pb-8 pt-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: 'easeOut' }}
              className="w-[85vw] max-w-[320px] sm:w-[260px] md:w-[280px] lg:w-[320px] snap-start shrink-0"
            >
              <ProductCard product={product} onQuickView={() => {}} />
            </motion.div>
          ))}
          
          {/* Edge spacer to allow overscroll padding at the end */}
          <div className="min-w-[20px] shrink-0" aria-hidden="true" />
        </div>
      </div>
      
      {/* Mobile-only View All Button attached to bottom inside layout */}
      <button 
        onClick={onShopAll}
        className="w-full sm:hidden mt-4 py-3 border border-gray-200 dark:border-zinc-800 rounded-xl font-medium text-sm tracking-wide uppercase text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors"
      >
        Shop All {title}
      </button>

      {/* Global strict hide scrollbar style injections */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `}</style>
    </div>
  )
}
