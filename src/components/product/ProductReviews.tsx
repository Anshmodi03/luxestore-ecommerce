import { motion } from 'framer-motion'
import { Review } from '../../data/productDetails'

interface ProductReviewsProps {
  reviews: Review[]
  rating: number
  reviewCount: number
}

export default function ProductReviews({ reviews, rating, reviewCount }: ProductReviewsProps) {
  return (
    <div className="mt-32 lg:mt-48 pb-12">
      <div className="flex flex-col items-center text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-serif text-gray-900 dark:text-white mb-4"
        >
          Customer Stories
        </motion.h2>
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2"
        >
          <span className="text-2xl font-bold text-gray-900 dark:text-white">{rating.toFixed(1)}</span>
          <div className="flex text-primary text-sm gap-0.5">
            {[...Array(5)].map((_, i) => (
              <i key={i} className={`ph-fill ${i < Math.floor(rating) ? 'ph-star' : i === 4 && rating % 1 !== 0 ? 'ph-star-half' : ''}`}></i>
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-2">based on {reviewCount} reviews</span>
        </motion.div>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
        {reviews.map((review) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: review.delay, ease: "easeOut" }}
            className={`break-inside-avoid p-8 rounded-3xl ${
              review.isHighlight 
                ? 'bg-gray-50 dark:bg-gray-900/50 border border-transparent' 
                : 'bg-surface-light dark:bg-surface-dark shadow-sm border border-gray-100 dark:border-gray-800'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              {review.avatarUrl ? (
                <img alt={review.name} className="w-10 h-10 rounded-full object-cover" src={review.avatarUrl} />
              ) : (
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${review.initialsColor || 'bg-primary/10 text-primary'}`}>
                  {review.initials}
                </div>
              )}
              
              <div>
                <h5 className="text-sm font-bold text-gray-900 dark:text-white">{review.name}</h5>
                <p className="text-xs text-gray-400">{review.type}</p>
              </div>
            </div>
            
            <div className="flex text-primary text-xs mb-3 gap-0.5">
              {[...Array(5)].map((_, i) => (
                <i key={i} className={`ph-fill ${i < Math.floor(review.rating) ? 'ph-star' : i === 4 && review.rating % 1 !== 0 ? 'ph-star-half' : ''}`}></i>
              ))}
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed italic">
              {review.text}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-16 text-center"
      >
        <button className="px-8 py-3 rounded-full border border-gray-300 dark:border-gray-700 text-sm font-bold text-gray-900 dark:text-white hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-colors uppercase tracking-widest">
          Read All Reviews
        </button>
      </motion.div>
    </div>
  )
}
