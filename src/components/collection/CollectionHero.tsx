import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2940&auto=format&fit=crop', // Fashion/Apparel aesthetic
    title: 'The Collection',
    subtitle: 'Autumn / Winter 2024',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=2727&auto=format&fit=crop', // Interior/Furniture aesthetic
    title: 'Modern Living',
    subtitle: 'Curated Spaces',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2940&auto=format&fit=crop', // Sleek product aesthetic
    title: 'Elevated Essentials',
    subtitle: 'Everyday Luxury',
  }
]

export default function CollectionHero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000) // Change slide every 5 seconds
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden bg-zinc-950">
      {/* Background Images - Render all and crossfade opacity to prevent lag */}
      {slides.map((slide, index) => (
        <motion.img
          key={slide.id}
          src={slide.image}
          alt={slide.title}
          initial={false}
          animate={{
            opacity: currentSlide === index ? 0.6 : 0,
            scale: currentSlide === index ? 1 : 1.05,
            zIndex: currentSlide === index ? 1 : 0
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80 flex flex-col items-center justify-center text-center px-4" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-[1600px] mx-auto pt-20"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-normal text-white tracking-tight leading-none mb-6 drop-shadow-lg">
              {slides[currentSlide].title}
            </h1>
            
            <motion.div 
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="h-[2px] w-24 bg-white mx-auto mb-8 origin-center shadow-lg"
            />
            
            <p className="text-gray-200 text-sm md:text-base font-medium tracking-[0.3em] uppercase max-w-2xl mx-auto drop-shadow-md">
              {slides[currentSlide].subtitle}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              currentSlide === index ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
