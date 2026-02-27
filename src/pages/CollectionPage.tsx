import { motion } from 'framer-motion'
import ProductGrid from '../components/collection/ProductGrid'
import PageTransition from '../components/common/PageTransition'

export default function CollectionPage() {
  return (
    <PageTransition>
      <main className="w-full max-w-[1600px] px-4 sm:px-8 lg:px-16 mx-auto pt-32 pb-24 md:pt-48 md:pb-32 min-h-screen">
        
        {/* Header Section */}
        <header className="text-center mb-20 md:mb-32">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-normal text-gray-900 dark:text-white tracking-tight leading-none mb-6"
          >
            The Collection
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="h-[2px] w-24 bg-gray-900 dark:bg-white mx-auto mb-8 origin-center"
          />
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-gray-500 dark:text-gray-400 text-sm md:text-base font-medium tracking-[0.3em] uppercase max-w-2xl mx-auto"
          >
            Autumn / Winter 2024
          </motion.p>
        </header>

        {/* Product Grid */}
        <ProductGrid />
        
      </main>
    </PageTransition>
  )
}
