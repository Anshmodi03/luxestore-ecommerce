import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0)
  const [isAnimatingOut, setIsAnimatingOut] = useState(false)

  // Split text for staggered character animation
  const brandName = "LuxeStore"
  const characters = brandName.split("")

  // Number of columns for the "blinds" exit effect
  const columns = 5

  useEffect(() => {
    // Smoother cubic-ease-like counter simulation (sped up significantly)
    const duration = 1500 
    const intervalTime = 16 
    const steps = duration / intervalTime
    let currentStep = 0

    // Ensure scroll lock during preload
    document.body.style.overflow = 'hidden'

    const timer = setInterval(() => {
      currentStep++
      
      // Advanced easing for counter - starts fast but doesn't hang drastically at the end
      const t = currentStep / steps
      const easeOutSine = Math.sin((t * Math.PI) / 2)
      
      setProgress(Math.min(easeOutSine * 100, 100))
      
      if (currentStep >= steps) {
        clearInterval(timer)
        setTimeout(() => {
          setIsAnimatingOut(true)
          
          // Release scroll lock right before columns finish their exit
          setTimeout(() => {
            document.body.style.overflow = ''
            onComplete()
          }, 1500) // Call onComplete after blind exit animations finish
        }, 600) // Pause at 100%
      }
    }, intervalTime)

    return () => {
      clearInterval(timer)
      document.body.style.overflow = ''
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {!isAnimatingOut && (
        <div className="fixed inset-0 z-9999 pointer-events-none flex items-center justify-center overflow-hidden">
          
          {/* Phase 3: The "Blinds" Shutter Exit (Background Columns) */}
          <div className="absolute inset-0 flex w-full h-full">
            {Array.from({ length: columns }).map((_, i) => (
              <motion.div
                key={`col-${i}`}
                className="h-full bg-[#030303]"
                style={{ width: `${100 / columns}%` }}
                initial={{ y: 0 }}
                exit={{ y: '-100%' }}
                transition={{
                  duration: 1.2,
                  ease: [0.85, 0, 0.15, 1],
                  delay: i * 0.08 // Staggered upwards based on column index
                }}
              />
            ))}
          </div>

          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
            
            <div className="flex flex-col items-center gap-12 sm:gap-16">
              
              {/* Phase 1: The Monogram Trace (Diamond SVG) */}
              <motion.svg
                width="80"
                height="80"
                viewBox="0 0 100 100"
                className="overflow-visible"
                exit={{ opacity: 0, scale: 0.5, y: -50 }}
                transition={{ duration: 0.6, ease: [0.85, 0, 0.15, 1] }}
              >
                {/* Thin underlying guideline */}
                <path
                  d="M50 5 L95 50 L50 95 L5 50 Z"
                  fill="none"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="1"
                />
                <motion.path
                  d="M50 5 L95 50 L50 95 L5 50 Z"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0, fill: "rgba(255, 255, 255, 0)" }}
                  animate={{ 
                    pathLength: 1, 
                    fill: "rgba(255, 255, 255, 1)"
                  }}
                  transition={{
                    pathLength: { duration: 1.5, ease: "easeInOut" },
                    fill: { duration: 0.8, ease: "easeInOut", delay: 0.7 } // Smoothly fades in while drawing finishes
                  }}
                />
              </motion.svg>

              {/* Phase 2: Extreme Tracking Wordmark Reveal */}
              <div className="overflow-hidden py-4 px-8 relative">
                <div className="flex justify-center flex-wrap">
                  {characters.map((char, index) => (
                    <motion.span
                      key={`char-${index}`}
                      className="text-4xl md:text-6xl lg:text-7xl font-serif italic text-white"
                      // Start very wide apart, blurry, and transparent
                      initial={{ opacity: 0, x: (index - 4) * 50, filter: 'blur(10px)' }}
                      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                      exit={{ 
                        opacity: 0, 
                        y: -40, 
                        filter: 'blur(5px)',
                        transition: { 
                           duration: 0.6,
                           ease: [0.85, 0, 0.15, 1],
                           delay: index * 0.02 
                        }
                      }}
                      transition={{
                        duration: 1.5,
                        // Strong elastic spring for snap-into-place feel
                        ease: [1, 0.01, 0, 0.99], 
                        delay: 0.4 + (index * 0.03) // Wait for diamond to start drawing
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>

            {/* Elegant Minimal Counter at Bottom */}
            <motion.div
              className="absolute bottom-12 left-0 right-0 flex flex-col items-center justify-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 1, duration: 1 }}
            >
              <div className="text-sm font-mono text-white/50 tracking-[0.3em] flex items-center gap-4">
                <span>LOADING</span>
                <span className="w-12 text-right">{Math.floor(progress).toString().padStart(2, '0')}%</span>
              </div>
              
              {/* Ultra-thin elegant progress line at the bottom */}
              <div className="w-48 h-px bg-white/10 relative overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-white origin-left"
                  style={{ width: `${progress}%` }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ ease: "linear" }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
