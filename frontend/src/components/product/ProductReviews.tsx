import { motion } from 'framer-motion'

interface ApiReview {
  _id: string
  user: { firstName: string; lastName: string; avatarUrl?: string }
  rating: number
  title?: string
  text: string
  isVerified: boolean
  createdAt: string
}

interface ProductReviewsProps {
  reviews: ApiReview[]
  rating: number
  reviewCount: number
}

const INITIALS_COLORS = [
  'bg-primary/10 text-primary',
  'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
]

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

      {reviews.length === 0 ? (
        <p className="text-center text-gray-400 dark:text-gray-500 py-12">No reviews yet. Be the first to review this product.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.slice(0, 3).map((review, idx) => {
            const name = `${review.user.firstName} ${review.user.lastName}`
            const initials = `${review.user.firstName[0]}${review.user.lastName[0]}`.toUpperCase()
            const colorClass = INITIALS_COLORS[idx % INITIALS_COLORS.length]
            const delay = idx * 0.15

            return (
              <motion.div
                key={review._id}
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`flex flex-col h-full p-8 md:p-10 rounded-4xl transition-all duration-500 backdrop-blur-md ${
                  idx === 1
                    ? 'bg-linear-to-br from-gray-50 to-gray-100 dark:from-white/10 dark:to-white/5 border border-white/20 dark:border-white/10 shadow-xl shadow-gray-200/50 dark:shadow-black/50'
                    : 'bg-white/80 dark:bg-[#161B28]/80 shadow-lg shadow-gray-100/50 dark:shadow-none border border-gray-100 dark:border-white/5'
                }`}
              >
                <div className="flex items-center gap-4 mb-6">
                  {review.user.avatarUrl ? (
                    <img alt={name} loading="lazy" decoding="async" className="w-12 h-12 rounded-full object-cover ring-2 ring-white dark:ring-gray-800 shadow-md" src={review.user.avatarUrl} />
                  ) : (
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shadow-inner ${colorClass}`}>
                      {initials}
                    </div>
                  )}
                  <div>
                    <h5 className="text-base font-serif font-medium text-gray-900 dark:text-white uppercase tracking-wide">{name}</h5>
                    <p className="text-xs text-gray-400 font-medium tracking-wider">{review.isVerified ? 'Verified Purchase' : 'Customer'}</p>
                  </div>
                </div>

                <div className="flex text-primary text-sm mb-5 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.i
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: delay + 0.3 + (i * 0.1) }}
                      viewport={{ once: true }}
                      className={`ph-fill ${i < Math.floor(review.rating) ? 'ph-star' : i === 4 && review.rating % 1 !== 0 ? 'ph-star-half' : ''} drop-shadow-sm`}
                    ></motion.i>
                  ))}
                </div>

                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-light italic grow">
                  {review.text}
                </p>
              </motion.div>
            )
          })}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-16 text-center"
      >
        <button type="button" className="px-8 py-3 rounded-full border border-gray-300 dark:border-gray-700 text-sm font-bold text-gray-900 dark:text-white hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-colors uppercase tracking-widest">
          Read All Reviews
        </button>
      </motion.div>
    </div>
  )
}
