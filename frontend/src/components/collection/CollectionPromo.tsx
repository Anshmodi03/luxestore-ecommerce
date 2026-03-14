import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from '@phosphor-icons/react'

interface CollectionPromoProps {
  image: string
  subtitle: string
  title: string
  description: string
  ctaText?: string
  align?: 'left' | 'center' | 'right'
}

export default function CollectionPromo({ 
  image, 
  subtitle, 
  title, 
  description, 
  ctaText = "Discover the Collection",
  align = 'center'
}: CollectionPromoProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // Subtle parallax effect on the background image
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])
  
  const contentAlign = {
    'left': 'items-start text-left',
    'center': 'items-center text-center mx-auto',
    'right': 'items-end text-right ml-auto'
  }[align]

  return (
    <div ref={ref} className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] my-24 overflow-hidden group">
      {/* Parallax Background */}
      <motion.div 
        style={{ y }}
        className="absolute inset-[-10%] w-[120%] h-[120%]"
      >
        <div className="absolute inset-0 bg-black/30 z-10" /> {/* Dark overlay for text readability */}
        <img 
          src={image} 
          alt={title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 w-full h-full flex flex-col justify-center max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`max-w-xl flex flex-col ${contentAlign}`}
        >
          <span className="text-white/80 uppercase tracking-[0.2em] text-xs font-semibold mb-4 sm:mb-6 block">
            {subtitle}
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white mb-6 leading-[1.1]">
            {title}
          </h2>
          <p className="text-white/80 text-lg md:text-xl font-light mb-10 max-w-md">
            {description}
          </p>
          <a 
            href="#shop" 
            onClick={(e) => e.preventDefault()}
            className="flex items-center gap-3 text-white uppercase tracking-widest text-sm font-medium group/link w-fit"
          >
            <span className="relative pb-1">
              {ctaText}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-500 ease-out group-hover/link:w-full"></span>
            </span>
            <ArrowRight weight="light" className="text-xl transform transition-transform duration-500 ease-out group-hover/link:translate-x-3" />
          </a>
        </motion.div>
      </div>
    </div>
  )
}
