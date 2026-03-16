import { useState, useEffect } from 'react'
import ProductGrid from '../components/collection/ProductGrid'
import CollectionHero from '../components/collection/CollectionHero'
import CustomDropdown from '../components/collection/CustomDropdown'
import PageTransition from '../components/common/PageTransition'
import Footer from '../components/common/Footer'
import { getProducts, Product } from '../services/product.service'

export type SortOption = 'featured' | 'price-asc' | 'price-desc'

export default function CollectionPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [sortOption, setSortOption] = useState<SortOption>('featured')
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getProducts({ limit: 100 })
      .then(res => setProducts(res.data))
      .catch(() => setProducts([]))
      .finally(() => setIsLoading(false))
  }, [])

  const dynamicCategories = Array.from(new Set(products.map(p => p.category)))
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
                  type="button"
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

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-4/5 rounded-2xl bg-gray-200 dark:bg-white/5 mb-6" />
                  <div className="h-3 bg-gray-200 dark:bg-white/5 rounded w-1/3 mb-3" />
                  <div className="h-4 bg-gray-200 dark:bg-white/5 rounded w-2/3 mb-2" />
                  <div className="h-4 bg-gray-200 dark:bg-white/5 rounded w-1/4" />
                </div>
              ))}
            </div>
          ) : (
            <ProductGrid products={products} activeCategory={activeCategory} sortOption={sortOption} />
          )}

        </section>

        <Footer />
      </main>
    </PageTransition>
  )
}
