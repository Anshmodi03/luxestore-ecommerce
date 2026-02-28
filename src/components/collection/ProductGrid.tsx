import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProductCard from './ProductCard'
import QuickViewModal from './QuickViewModal'
import { collectionProducts, Product } from '../../data/products'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
}

interface ProductGridProps {
  activeCategory?: string;
  sortOption?: 'featured' | 'price-asc' | 'price-desc';
}

export default function ProductGrid({ activeCategory = 'All', sortOption = 'featured' }: ProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const isModalOpen = selectedProduct !== null

  const filteredAndSortedProducts = useMemo(() => {
    let result = activeCategory === 'All'
      ? [...collectionProducts]
      : collectionProducts.filter(p => p.category === activeCategory)
      
    if (sortOption === 'price-asc') {
      result.sort((a, b) => a.price - b.price)
    } else if (sortOption === 'price-desc') {
      result.sort((a, b) => b.price - a.price)
    }
    // 'featured' maintains the default array order
    
    return result
  }, [activeCategory, sortOption])

  return (
    <>
      <motion.div 
        key={activeCategory}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16 md:gap-x-8 md:gap-y-20"
      >
        <AnimatePresence mode="popLayout">
          {filteredAndSortedProducts.map((product) => (
            <motion.div 
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <ProductCard 
                product={product} 
                onQuickView={(p) => setSelectedProduct(p)} 
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <QuickViewModal 
        product={selectedProduct} 
        isOpen={isModalOpen} 
        onClose={() => setSelectedProduct(null)} 
      />
    </>
  )
}
