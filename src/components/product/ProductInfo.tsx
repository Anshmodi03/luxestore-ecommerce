interface ProductInfoProps {
  title: string
  subtitle?: string
  description: string
  price: number
  oldPrice?: number
  reviewsCount?: number
  rating?: number
  onAddToCart: () => void
}

export default function ProductInfo({ 
  title, 
  subtitle = "Series II", 
  description, 
  price, 
  oldPrice,
  reviewsCount = 128,
  rating = 4.8,
  onAddToCart
}: ProductInfoProps) {
  return (
    <div className="flex flex-col justify-center order-1 lg:order-2">
      <div className="mb-10">
        
        {/* Rating & Badge */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex text-primary text-sm gap-0.5">
            {[...Array(5)].map((_, i) => (
              <i key={i} className={`ph-fill ${i < Math.floor(rating) ? 'ph-star' : 'ph-star-half'}`}></i>
            ))}
          </div>
          <span className="text-xs text-gray-400 font-medium tracking-wide uppercase">Top Rated Audio</span>
        </div>
        
        {/* Title */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium text-gray-900 dark:text-white mb-6 leading-tight">
          {title} <br/> 
          {subtitle && <span className="text-gray-400 dark:text-gray-600 italic">{subtitle}</span>}
        </h1>
        
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg font-light mb-10 max-w-md">
          {description}
        </p>
        
        {/* Price */}
        <div className="flex items-baseline gap-6 mb-12">
          <span className="text-4xl font-serif font-normal text-gray-900 dark:text-white">${price.toFixed(2)}</span>
          {oldPrice && (
            <span className="text-lg text-gray-400 line-through font-light">${oldPrice.toFixed(2)}</span>
          )}
        </div>
      </div>

      <div className="space-y-10 border-t border-gray-100 dark:border-gray-800 pt-10">
        
        {/* Finish Selector */}
        <div className="space-y-4">
          <span className="text-xs font-bold tracking-widest text-gray-900 dark:text-white uppercase">Select Finish</span>
          <div className="flex gap-4">
            <button aria-label="Space Gray" className="w-12 h-12 rounded-full bg-[#363636] ring-2 ring-offset-4 ring-primary ring-offset-background-light dark:ring-offset-background-dark shadow-xl transition-transform hover:scale-110"></button>
            <button aria-label="Silver" className="w-12 h-12 rounded-full bg-[#E8E8E8] shadow-sm transition-transform hover:scale-110"></button>
            <button aria-label="Rose Gold" className="w-12 h-12 rounded-full bg-[#EAC9C1] shadow-sm transition-transform hover:scale-110"></button>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-6">
          <button 
            onClick={onAddToCart}
            className="flex-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 h-16 rounded-full font-medium text-lg hover:opacity-90 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-3"
          >
            <span>Add to Cart</span>
            <i className="ph-bold ph-arrow-right"></i>
          </button>
          <button aria-label="Add to wishlist" className="w-16 h-16 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-colors">
            <i className="ph-bold ph-heart text-xl"></i>
          </button>
        </div>
        
      </div>
    </div>
  )
}
