import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Check } from '@phosphor-icons/react'
import { createPortal } from 'react-dom'

interface OrderSuccessModalProps {
  orderNumber: string
}

export default function OrderSuccessModal({ orderNumber }: OrderSuccessModalProps) {
  // Stagger variants for the "Thank You" typing effect
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  }

  const letter = {
    hidden: { opacity: 0, y: 50, rotate: 5 },
    show: { 
      opacity: 1, 
      y: 0,
      rotate: 0,
      transition: { duration: 0.8, ease: [0.5, 0, 0, 1] as const }
    }
  }

  return createPortal(
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-9999 flex items-center justify-center bg-slate-900/40 dark:bg-black/60 backdrop-blur-md p-4 sm:p-6"
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="relative z-30 w-full max-w-xl mx-auto px-6 sm:px-10 py-10 sm:py-12 flex flex-col items-center justify-center bg-white dark:bg-[#0a0a0a] text-slate-900 dark:text-white border border-slate-200/50 dark:border-white/10 shadow-2xl rounded-2xl overflow-hidden"
      >
        {/* Subtle background glow inside the card */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-linear-to-b from-slate-50/50 to-transparent dark:from-white/5 dark:to-transparent"></div>
        </div>

        <div className="relative z-10 w-full flex flex-col items-center">
        
          {/* Animated Header */}
          <div className="text-center mb-6 w-full relative">
            <motion.h1 
              variants={container}
              initial="hidden"
              animate="show"
              className="text-4xl sm:text-5xl md:text-6xl font-medium italic tracking-tighter mb-3 flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-3 gap-y-1 overflow-hidden"
            >
              <div className="flex flex-wrap justify-center items-center">
                <span className="inline-flex overflow-hidden">
                  {['T', 'h', 'a', 'n', 'k'].map((char, i) => (
                    <motion.span key={i} variants={letter} className="inline-block origin-bottom-left">
                      {char}
                    </motion.span>
                  ))}
                </span>
                <span className="inline-flex overflow-hidden ml-2 sm:ml-3">
                  {['Y', 'o', 'u'].map((char, i) => (
                    <motion.span key={i} variants={letter} className="inline-block origin-bottom-left">
                      {char}
                    </motion.span>
                  ))}
                </span>
              </div>
              
              <motion.span 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5, type: 'spring' }}
                className="relative inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 ml-1"
              >
                <svg className="w-full h-full text-emerald-500" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <motion.path 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 1.2, duration: 0.5, ease: "easeInOut" }}
                    d="M20 6L9 17l-5-5"
                  />
                </svg>
              </motion.span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-base sm:text-lg md:text-xl font-light tracking-wide text-slate-600 dark:text-slate-400 mt-2 px-4"
            >
              Your order <span className="font-medium text-slate-900 dark:text-white">#{orderNumber}</span> is being prepared
            </motion.p>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 w-full px-2 sm:px-4"
          >
            <Link
              to="/collection"
              className="relative overflow-hidden group bg-primary text-white px-8 py-4 rounded-sm uppercase tracking-[0.2em] text-xs font-semibold shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-500 w-full sm:w-auto text-center hover:-translate-y-0.5"
            >
              <span className="relative z-10">Continue Shopping</span>
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </Link>

            <Link
              to="/dashboard"
              className="group inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.15em] relative text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-300 px-4 py-4"
            >
              View Orders
              <span className="material-symbols-outlined text-sm sm:text-base thin-icon group-hover:translate-x-1 transition-transform">arrow_forward</span>
              <div className="absolute bottom-2 left-1/2 w-0 h-px bg-slate-900 dark:bg-white transition-all duration-300 -translate-x-1/2 group-hover:w-full"></div>
            </Link>
          </motion.div>
          
          {/* Support Link */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            whileHover={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="mt-8 text-center cursor-pointer"
          >
            <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.4em] mb-1.5 text-slate-500">Need Help?</p>
            <Link to="/services" className="text-xs font-serif italic border-b border-transparent hover:border-slate-400 transition-colors pb-0.5">Contact Concierge</Link>
          </motion.div>

        </div>
      </motion.div>
    </motion.div>,
    document.body
  )
}
