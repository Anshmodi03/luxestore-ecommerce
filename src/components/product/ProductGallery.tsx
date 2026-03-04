import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ProductGalleryProps {
  images: string[]
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(images[0])
  const [is360View, setIs360View] = useState(false)

  return (
    <div className="space-y-8 order-2 lg:order-1">
      {/* Main Viewer */}
      <div className="relative w-full aspect-4/5 lg:aspect-square rounded-4xl bg-surface-light dark:bg-surface-dark shadow-deep overflow-hidden group">
        
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-transparent to-gray-50 dark:to-gray-900/50 opacity-50 z-0"></div>
        
        <AnimatePresence mode="wait">
          {!is360View ? (
            <motion.div 
              key="still"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center z-20"
            >
              <motion.img 
                key={activeImage}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                alt="Product View" 
                className="relative w-[85%] h-[85%] object-contain transition-transform duration-700 ease-out group-hover:scale-110" 
                src={activeImage}
              />
              <div className="absolute top-8 left-8 flex flex-col gap-3 z-30">
                <span className="bg-primary/90 backdrop-blur-sm text-white text-[10px] font-bold tracking-widest uppercase px-4 py-2 rounded-full shadow-lg shadow-primary/20">
                  -15% OFF
                </span>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="360"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center z-20"
            >
              <div className="w-[80%] h-[80%] relative flex items-center justify-center cursor-ew-resize">
                <div className="absolute inset-0 rounded-full border border-gray-100 dark:border-gray-800 scale-110 animate-pulse"></div>
                <div className="absolute inset-0 rounded-full border border-dashed border-gray-200 dark:border-gray-700 scale-125 opacity-50"></div>
                
                <img 
                  alt="360 View" 
                  className="relative w-full h-full object-contain z-10" 
                  src={images[0]} 
                  style={{ filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.15))' }}
                />
                
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
                  <div className="w-12 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-primary animate-[shimmer_2s_infinite]"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 360 Toggle UI */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40">
          <label className="relative inline-flex items-center cursor-pointer bg-white dark:bg-gray-800 rounded-full p-1 shadow-lg border border-gray-100 dark:border-gray-700">
            <input 
              type="checkbox" 
              className="sr-only" 
              checked={is360View}
              onChange={(e) => setIs360View(e.target.checked)}
            />
            <span className={`text-[10px] font-bold tracking-widest px-4 py-2 transition-colors duration-300 z-10 ${!is360View ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>
              STILL
            </span>
            <span className={`text-[10px] font-bold tracking-widest px-4 py-2 transition-colors duration-300 z-10 ${is360View ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>
              360°
            </span>
            {/* Sliding Pill Indicator */}
            <motion.div 
              className="absolute top-1 left-1 w-[calc(50%-4px)] h-[calc(100%-8px)] bg-gray-100 dark:bg-gray-700 rounded-full shadow-inner"
              animate={{ x: is360View ? '100%' : '0%' }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          </label>
        </div>

        {/* 360 Instruction Overlay */}
        <AnimatePresence>
          {is360View && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-2 text-gray-500 dark:text-gray-400 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-white/20 z-30 pointer-events-none"
            >
              <i className="ph-fill ph-arrows-clockwise text-primary"></i>
              <span className="text-xs font-medium tracking-wide uppercase">Rotate to Explore</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Thumbnails */}
      <div className="flex justify-center gap-4 md:gap-6">
        {images.map((img, idx) => (
          <button 
            key={idx}
            onClick={() => {
              setActiveImage(img)
              setIs360View(false)
            }}
            className={`w-16 h-16 rounded-2xl p-2 transition-all duration-300 ${activeImage === img ? 'border-primary border-2 opacity-100 scale-105' : 'border-transparent border opacity-50 hover:opacity-100 hover:border-gray-300 dark:hover:border-gray-700'}`}
          >
            <img alt={`Thumbnail ${idx + 1}`} loading="lazy" decoding="async" className="w-full h-full object-contain" src={img} />
          </button>
        ))}
      </div>
    </div>
  )
}
