import { motion } from 'framer-motion'
import { Headset } from '@phosphor-icons/react'

export default function ServicesCTA() {
  return (
    <section className="py-32 bg-white dark:bg-[#050505] overflow-hidden transition-colors duration-500">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="border border-black/5 dark:border-white/10 p-12 lg:p-24 text-center relative overflow-hidden group"
        >
          {/* Subtle Background Overlay */}
          <div className="absolute inset-0 bg-gray-50 dark:bg-white/5 opacity-50 pointer-events-none transition-colors duration-500"></div>
          
          {/* Animated Glow on Hover */}
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-700 pointer-events-none"></div>

          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Headset weight="light" className="text-6xl text-gray-900 dark:text-white mb-8 mx-auto opacity-80" />
            </motion.div>
            
            <h2 className="font-serif text-5xl lg:text-6xl text-gray-900 dark:text-white mb-8">
              Ready to Elevate Your Experience?
            </h2>
            
            <p className="text-gray-500 dark:text-gray-400 text-lg font-light max-w-2xl mx-auto mb-12">
              Access your dashboard to manage orders, schedule consultations, or chat with your dedicated concierge.
            </p>
            
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <button className="bg-gray-900 dark:bg-white text-white dark:text-black px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-all duration-300">
                Enter Portal
              </button>
              <button className="bg-transparent border border-black/20 dark:border-white/20 text-gray-900 dark:text-white px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300">
                Contact Support
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
