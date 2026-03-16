import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from '@phosphor-icons/react'
import { getProduct, getProductReviews, Product } from '../services/product.service'
import ProductGallery from '../components/product/ProductGallery'
import ProductInfo from '../components/product/ProductInfo'
import ProductFeatures from '../components/product/ProductFeatures'
import ProductSpecs from '../components/product/ProductSpecs'
import ProductReviews from '../components/product/ProductReviews'
import Footer from '../components/common/Footer'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'

export default function ProductDetailsPage() {
  const { id: slug } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { openCart, addItem } = useCart()
  const { showToast } = useToast()

  const [product, setProduct] = useState<Product | null>(null)
  const [reviews, setReviews] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) return
    setIsLoading(true)
    setNotFound(false)
    getProduct(slug)
      .then(p => {
        setProduct(p)
        return getProductReviews(slug)
      })
      .then(res => setReviews(res.data || []))
      .catch(() => setNotFound(true))
      .finally(() => setIsLoading(false))
  }, [slug])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <p className="text-gray-400 text-sm tracking-widest uppercase">Loading</p>
        </div>
      </div>
    )
  }

  if (notFound || !product) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen flex flex-col items-center justify-center bg-background-light dark:bg-background-dark"
      >
        <h1 className="text-4xl font-serif italic text-gray-900 dark:text-white mb-4">Product Not Found</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">The product you're looking for doesn't exist.</p>
        <button
          type="button"
          onClick={() => navigate('/collection')}
          className="flex items-center gap-2 text-primary hover:text-orange-600 transition-colors font-medium"
        >
          <ArrowLeft size={20} weight="bold" />
          Back to Collection
        </button>
      </motion.div>
    )
  }

  const imageUrls = product.images.map(img => img.url)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background-light dark:bg-background-dark"
    >
      {/* Hero spacer for navbar */}
      <div className="h-24 md:h-28 bg-gray-50 dark:bg-[#0a0a0a]" />

      {/* Breadcrumb / Back Navigation */}
      <div className="bg-gray-50 dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
          >
            <ArrowLeft size={16} weight="bold" className="group-hover:-translate-x-1 transition-transform" />
            <span className="uppercase tracking-wider text-[11px] font-medium">Back</span>
          </button>
          <div className="flex items-center gap-2 mt-2 text-[11px] uppercase tracking-wider text-gray-500">
            <button type="button" onClick={() => navigate('/')} className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">Home</button>
            <span>/</span>
            <button type="button" onClick={() => navigate('/collection')} className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">Collection</button>
            <span>/</span>
            <span className="text-gray-900 dark:text-gray-300">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="bg-linear-to-b from-gray-50 via-white to-background-light dark:from-[#0a0a0a] dark:via-[#0f0f0f] dark:to-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-10 xl:gap-20 items-start">
            <ProductGallery images={imageUrls} />

            <div className="lg:sticky lg:top-32">
              <ProductInfo
                title={product.name}
                subtitle={product.category}
                description={product.description}
                price={product.price}
                oldPrice={product.oldPrice}
                rating={product.rating}
                reviewsCount={product.reviewCount}
                onAddToCart={() => { addItem(product); showToast(`${product.name} added to bag`); openCart() }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features, Specs, Reviews */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-16 md:py-24 space-y-20 md:space-y-32">
        {product.features.length > 0 && <ProductFeatures features={product.features} />}
        {product.specs.length > 0 && <ProductSpecs specs={product.specs} />}
        <ProductReviews
          reviews={reviews}
          rating={product.rating}
          reviewCount={product.reviewCount}
        />
      </div>

      <Footer />
    </motion.div>
  )
}
