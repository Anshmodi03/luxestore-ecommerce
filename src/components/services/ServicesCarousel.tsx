import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react'

const CAROUSEL_DATA = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1537832816519-689ad163238b?q=80&w=2670&auto=format&fit=crop',
    title: 'Bespoke Sourcing',
    description: 'Our global network of curators can locate rare, archive, or sold-out pieces exclusively for our premier clientele.',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=2670&auto=format&fit=crop',
    title: 'Virtual Styling',
    description: 'Book a private digital session with our in-house stylists to curate a wardrobe perfectly tailored to your next season or event.',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2670&auto=format&fit=crop',
    title: 'Authenticity Guarantee',
    description: 'Every artifact is rigorously inspected by our master authenticators. Shop with absolute confidence and peace of mind.',
  }
]

export default function ServicesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // Auto-play functionality
  useEffect(() => {
    if (isHovered) return // Pause on hover
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CAROUSEL_DATA.length)
    }, 6000)
    
    return () => clearInterval(interval)
  }, [isHovered])

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % CAROUSEL_DATA.length)
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + CAROUSEL_DATA.length) % CAROUSEL_DATA.length)

  return (
    <section 
      className="relative w-full h-[50vh] lg:h-[55vh] min-h-[450px] bg-black overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${CAROUSEL_DATA[currentIndex].image})` }}
          />
          
          {/* Cinematic Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-black/20" />
          
          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 lg:p-16 pt-24 max-w-[1600px] mx-auto w-full z-10">
            <div className="max-w-xl">
              <motion.span 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="text-white/60 font-bold text-[9px] uppercase tracking-[0.3em] mb-3 block"
              >
                Online Shopping Concierge
              </motion.span>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-[1.1]"
              >
                {CAROUSEL_DATA[currentIndex].title}
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                className="text-white/80 text-base md:text-lg font-light leading-relaxed max-w-lg"
              >
                {CAROUSEL_DATA[currentIndex].description}
              </motion.p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute bottom-6 md:bottom-12 right-6 md:right-12 lg:right-16 z-20 flex gap-3">
        <button 
          onClick={prevSlide}
          className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors duration-300 backdrop-blur-md"
        >
          <ArrowLeft size={16} />
        </button>
        <button 
          onClick={nextSlide}
          className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors duration-300 backdrop-blur-md"
        >
          <ArrowRight size={16} />
        </button>
      </div>
      
      {/* Progress Indicators */}
      <div className="absolute bottom-6 left-6 md:left-12 lg:left-16 z-20 flex gap-2">
        {CAROUSEL_DATA.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1 transition-all duration-500 rounded-full ${currentIndex === idx ? 'w-8 bg-white' : 'w-2 bg-white/30 hover:bg-white/60'}`}
          />
        ))}
      </div>
    </section>
  )
}
