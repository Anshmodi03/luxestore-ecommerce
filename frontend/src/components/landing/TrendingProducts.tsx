import { useState, useEffect } from 'react'
import { ArrowRight } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import ProductCard from '../collection/ProductCard'
import { getProducts, Product } from '../../services/product.service'
import ScrollReveal from '../common/ScrollReveal'

export default function TrendingProducts() {
  const [trendingItems, setTrendingItems] = useState<Product[]>([])

  useEffect(() => {
    getProducts({ limit: 8 })
      .then(res => setTrendingItems(res.data.filter(p => p.isTrending).slice(0, 8)))
      .catch(() => setTrendingItems([]))
  }, [])

  if (trendingItems.length === 0) return null

  return (
    <section className="py-24 px-4 sm:px-8 lg:px-16 max-w-8xl mx-auto" id="trending">
      <ScrollReveal variant="fade-up">
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
      </ScrollReveal>
      <ScrollReveal variant="fade-up" delay={0.2} staggerChildren>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {trendingItems.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      </ScrollReveal>
    </section>
  )
}
