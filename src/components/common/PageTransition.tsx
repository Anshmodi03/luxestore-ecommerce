import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

// Reusable cinematic curve
const transitionCurve = { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const }

export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <>
      {/* Page Content Animation (Slight scale/fade) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98, filter: 'blur(4px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, scale: 0.98, filter: 'blur(4px)' }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.2 }} // Wait slightly for curtain to rise
      >
        {children}
      </motion.div>

      {/* Slide-IN Curtain (Triggers when THIS page is exiting/unmounting) */}
      <motion.div
        className="fixed inset-0 z-9998 bg-[#050505] flex items-center justify-center pointer-events-none"
        initial={{ y: "100%" }} // Hidden below
        animate={{ y: "100%", transition: { duration: 0 } }} // Stay hidden while page is active
        exit={{ y: 0 }} // Slide up to cover screen when leaving this page
        transition={transitionCurve}
      >
         <svg width="60" height="60" viewBox="0 0 100 100">
           <path d="M50 5 L95 50 L50 95 L5 50 Z" fill="none" stroke="#ffffff" strokeWidth="1.5" />
         </svg>
      </motion.div>

      {/* Slide-OUT Curtain (Triggers when THIS page is entering/mounting) */}
      <motion.div
        className="fixed inset-0 z-9998 bg-[#050505] flex items-center justify-center pointer-events-none"
        initial={{ y: 0 }} // Cover screen initially
        animate={{ y: "-100%" }} // Slide up out of view to reveal page
        exit={{ y: "-100%", transition: { duration: 0 } }} // Stay hidden when leaving
        transition={transitionCurve}
      >
         <svg width="60" height="60" viewBox="0 0 100 100">
           <path d="M50 5 L95 50 L50 95 L5 50 Z" fill="none" stroke="#ffffff" strokeWidth="1.5" />
         </svg>
      </motion.div>
    </>
  )
}
