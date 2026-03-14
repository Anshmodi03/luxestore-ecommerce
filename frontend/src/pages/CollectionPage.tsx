import { useState } from 'react'
import ProductGrid from '../components/collection/ProductGrid'
import CollectionHero from '../components/collection/CollectionHero'
import CustomDropdown from '../components/collection/CustomDropdown'
import PageTransition from '../components/common/PageTransition'
import Footer from '../components/common/Footer'
import { collectionProducts } from '../data/products'

export type SortOption = 'featured' | 'price-asc' | 'price-desc'

export default function CollectionPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [sortOption, setSortOption] = useState<SortOption>('featured')
  
  // Inject the curated lists as pseudo-categories before the dynamic product categories
  const dynamicCategories = Array.from(new Set(collectionProducts.map(p => p.category)))
  const categories = ['All', 'New Arrivals', 'Trending', ...dynamicCategories]

  return (
    <PageTransition>
      <main className="w-full min-h-screen bg-white dark:bg-[#030303] overflow-x-hidden">
        
        {/* Animated Carousel Hero */}
        <CollectionHero />
          
        {/* --- FULL CATALOG --- */}
        <section id="full-collection" className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16 py-24 md:py-32">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 dark:text-white mb-4">The Complete Archive</h2>
            <p className="text-gray-500 dark:text-gray-400 font-light text-lg">Explore our full range of masterfully crafted pieces.</p>
          </div>

          {/* Filter & Sort Bar */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-16">
            
            {/* Category Filters */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-md transform scale-105'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-white/5 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Custom Sorting Dropdown */}
            <CustomDropdown value={sortOption} onChange={setSortOption} />
          </div>

          <ProductGrid activeCategory={activeCategory} sortOption={sortOption} />
          
        </section>

        <Footer />
      </main>
    </PageTransition>
  )
}
