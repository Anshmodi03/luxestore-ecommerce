import { useState } from 'react'
import { motion } from 'framer-motion'
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

export default function ProductGrid() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const isModalOpen = selectedProduct !== null

  return (
    <>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-x-8 lg:gap-x-12 gap-y-16 md:gap-y-24"
      >
        {collectionProducts.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onQuickView={(p) => setSelectedProduct(p)} 
          />
        ))}
      </motion.div>

      <QuickViewModal 
        product={selectedProduct} 
        isOpen={isModalOpen} 
        onClose={() => setSelectedProduct(null)} 
      />
    </>
  )
}
