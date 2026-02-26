import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0)
  const [isAnimatingOut, setIsAnimatingOut] = useState(false)

  useEffect(() => {
    // Simulate loading progress
    const duration = 2000 // 2 seconds to reach 100%
    const intervalTime = 20
    const steps = duration / intervalTime
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      setProgress(Math.min((currentStep / steps) * 100, 100))
      
      if (currentStep >= steps) {
        clearInterval(timer)
        setTimeout(() => {
          setIsAnimatingOut(true)
          setTimeout(onComplete, 800) // Call onComplete after exit animation finishes
        }, 400) // Small pause at 100%
      }
    }, intervalTime)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!isAnimatingOut && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] text-white overflow-hidden origin-top"
          initial={{ opacity: 1, y: 0 }}
          exit={{ y: '-100%', opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex flex-col items-center justify-center gap-8 relative z-10">
            {/* Logo Text Animation */}
            <motion.div
              className="text-4xl md:text-6xl font-serif italic font-bold tracking-wider"
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              LuxeStore
            </motion.div>

            {/* Progress Bar Container */}
            <div className="w-48 md:w-64 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
              {/* Animated Progress Line */}
              <motion.div
                className="absolute top-0 left-0 h-full bg-white rounded-full"
                style={{ width: `${progress}%` }}
                layout
              />
            </div>

             {/* Percentage Counter */}
            <motion.div
                className="text-xs tracking-widest text-white/50 font-mono"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
            >
                {Math.floor(progress)}%
            </motion.div>
          </div>

          {/* Background Gradient/Noise Overlay (Optional Cinematic Touch) */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_100%)]" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
