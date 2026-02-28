import { useState } from 'react'
import { ArrowRight } from '@phosphor-icons/react'
import ProductCard from '../components/collection/ProductCard'
import ProductGrid from '../components/collection/ProductGrid'
import ProductCarousel from '../components/collection/ProductCarousel'
import CollectionPromo from '../components/collection/CollectionPromo'
import CollectionHero from '../components/collection/CollectionHero'
import CustomDropdown from '../components/collection/CustomDropdown'
import PageTransition from '../components/common/PageTransition'
import Footer from '../components/common/Footer'
import { collectionProducts } from '../data/products'

export type SortOption = 'featured' | 'price-asc' | 'price-desc'

export default function CollectionPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [sortOption, setSortOption] = useState<SortOption>('featured')
  
  const categories = ['All', ...Array.from(new Set(collectionProducts.map(p => p.category)))]

  const newProducts = collectionProducts.filter(p => p.isNew).slice(0, 4)
  const trendingProducts = collectionProducts.filter(p => p.isTrending).slice(0, 4)
  const popularProducts = collectionProducts.filter(p => p.isPopular).slice(0, 4)

  return (
    <PageTransition>
      <main className="w-full min-h-screen bg-white dark:bg-[#030303] overflow-x-hidden">
        
        {/* Animated Carousel Hero */}
        <CollectionHero />

        {/* --- DEDICATED SECTIONS --- */}
        <section className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16 pt-24 space-y-32">
          
          {/* New Arrivals */}
          {newProducts.length > 0 && (
            <ProductCarousel 
              title="The Vanguard"
              subtitle="The latest additions to our curated collection."
              products={newProducts}
              onShopAll={() => {
                const el = document.getElementById('full-collection')
                el?.scrollIntoView({ behavior: 'smooth' })
              }}
            />
          )}

          {/* Promo Section 1 */}
          <CollectionPromo 
            image="https://images.unsplash.com/photo-1449247709967-d4461a6a6103?q=80&w=2000&auto=format&fit=crop"
            subtitle="The Art of Living"
            title="Elevate Your Everyday"
            description="Discover pieces that transform your living spaces into sanctuaries of design and comfort."
            align="left"
          />

          {/* Trending Products */}
          {trendingProducts.length > 0 && (
            <ProductCarousel 
              title="Current Obsessions"
              subtitle="Highly sought-after pieces defining the season."
              products={trendingProducts}
              onShopAll={() => {
                setSortOption('featured')
                const el = document.getElementById('full-collection')
                el?.scrollIntoView({ behavior: 'smooth' })
              }}
            />
          )}

          {/* Popular Products */}
          {popularProducts.length > 0 && (
            <>
              <CollectionPromo 
                image="https://images.unsplash.com/photo-1618220179428-22790b461013?w=2000&auto=format&fit=crop"
                subtitle="Enduring Classics"
                title="Timeless Craftsmanship"
                description="Invest in pieces that transcend seasons. Our most loved essentials, crafted to last."
                align="right"
                ctaText="Explore the Classics"
              />
              <ProductCarousel 
                title="Cult Favorites"
                subtitle="Our most loved and reviewed essentials."
              products={popularProducts}
              onShopAll={() => {
                setSortOption('featured')
                const el = document.getElementById('full-collection')
                el?.scrollIntoView({ behavior: 'smooth' })
              }}
            />
            </>
          )}

        </section>
          
        {/* --- FULL CATALOG --- */}
        <section id="full-collection" className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16 py-32 md:py-40 border-t border-gray-100 dark:border-white/5 mt-32">
          
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
