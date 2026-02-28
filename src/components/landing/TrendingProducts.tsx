import { ArrowRight } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import ProductCard from '../collection/ProductCard'
import { collectionProducts } from '../../data/products'

export default function TrendingProducts() {
  const trendingItems = collectionProducts.filter(p => p.isTrending).slice(0, 4)

  return (
    <section className="py-24 px-4 sm:px-8 lg:px-16 max-w-8xl mx-auto" id="trending">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 dark:text-white mb-4">Trending Now</h2>
          <p className="text-gray-500 dark:text-gray-400 font-light text-lg">Curated favorites loved by our community.</p>
        </div>
        <Link className="group inline-flex items-center gap-2 font-medium text-gray-900 dark:text-white hover:text-primary transition-colors" to="/collection">
          View All Collection
          <ArrowRight weight="bold" className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
        {trendingItems.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onQuickView={() => {}} 
          />
        ))}
      </div>
    </section>
  )
}
