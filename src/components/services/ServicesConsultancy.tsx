import { Leaf, Diamond, Armchair } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

export default function ServicesConsultancy() {
  return (
    <section className="py-32 bg-gray-50 dark:bg-[#0a0a0a] transition-colors duration-500">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-black/5 dark:border-white/5 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-black/40 dark:text-white/40 font-bold text-[10px] uppercase tracking-[0.3em] mb-4 block">
              Expert Guidance
            </span>
            <h2 className="font-serif text-4xl lg:text-6xl text-gray-900 dark:text-white">
              Consultancy & Advice
            </h2>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 md:mt-0"
          >
            <button className="text-xs font-bold uppercase tracking-[0.2em] border-b border-gray-900 dark:border-white pb-1 hover:opacity-60 transition-opacity text-gray-900 dark:text-white">
              Book Consultation
            </button>
          </motion.div>
        </div>

        {/* 3-Column Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5"
        >
          
          {/* Item 1 */}
          <motion.div 
            whileHover={{ y: -10 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-[#0a0a0a] p-12 hover:bg-gray-50 dark:hover:bg-[#111] transition-all duration-500 group relative overflow-hidden h-full flex flex-col"
          >
            <div className="absolute top-0 left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            <div className="w-12 h-12 mb-8 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center group-hover:border-primary group-hover:text-primary transition-colors text-gray-900 dark:text-white group-hover:scale-110 duration-500">
              <Armchair size={24} weight="regular" />
            </div>
            <h3 className="font-serif text-2xl text-gray-900 dark:text-white mb-4">Virtual Styling</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-light leading-relaxed mb-8 flex-grow">
              Connect directly with our senior stylists via secure video link. We curate selections based on your visual preferences and existing luxury wardrobe.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-xs uppercase tracking-wide text-gray-600 dark:text-gray-300">
                <span className="w-1 h-1 bg-primary rounded-full"></span> 1-on-1 Video Consultation
              </li>
              <li className="flex items-center gap-3 text-xs uppercase tracking-wide text-gray-600 dark:text-gray-300">
                <span className="w-1 h-1 bg-primary rounded-full"></span> Custom Lookbook Creation
              </li>
            </ul>
          </motion.div>

          {/* Item 2 */}
          <motion.div 
            whileHover={{ y: -10 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-[#0a0a0a] p-12 hover:bg-gray-50 dark:hover:bg-[#111] transition-all duration-500 group relative overflow-hidden h-full flex flex-col"
          >
            <div className="absolute top-0 left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            <div className="w-12 h-12 mb-8 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center group-hover:border-primary group-hover:text-primary transition-colors text-gray-900 dark:text-white group-hover:scale-110 duration-500">
              <Leaf size={24} weight="regular" />
            </div>
            <h3 className="font-serif text-2xl text-gray-900 dark:text-white mb-4">Sizing Expertise</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-light leading-relaxed mb-8 flex-grow">
              Skip the uncertainty of online sizing. Provide your measurements to our tailors, and we will cross-reference every garment to ensure a flawless bespoke fit before shipping.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-xs uppercase tracking-wide text-gray-600 dark:text-gray-300">
                <span className="w-1 h-1 bg-primary rounded-full"></span> Measurement Profiling
              </li>
              <li className="flex items-center gap-3 text-xs uppercase tracking-wide text-gray-600 dark:text-gray-300">
                <span className="w-1 h-1 bg-primary rounded-full"></span> Perfect Fit Guarantee
              </li>
            </ul>
          </motion.div>

          {/* Item 3 */}
          <motion.div 
            whileHover={{ y: -10 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-[#0a0a0a] p-12 hover:bg-gray-50 dark:hover:bg-[#111] transition-all duration-500 group relative overflow-hidden h-full flex flex-col"
          >
            <div className="absolute top-0 left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            <div className="w-12 h-12 mb-8 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center group-hover:border-primary group-hover:text-primary transition-colors text-gray-900 dark:text-white group-hover:scale-110 duration-500">
              <Diamond size={24} weight="regular" />
            </div>
            <h3 className="font-serif text-2xl text-gray-900 dark:text-white mb-4">Gift Concierge</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-light leading-relaxed mb-8 flex-grow">
              Secure the perfect luxury gift instantly. We manage sourcing, high-end thematic wrapping, and timed international delivery for your most important recipients.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-xs uppercase tracking-wide text-gray-600 dark:text-gray-300">
                <span className="w-1 h-1 bg-primary rounded-full"></span> Premium Gift Wrapping
              </li>
              <li className="flex items-center gap-3 text-xs uppercase tracking-wide text-gray-600 dark:text-gray-300">
                <span className="w-1 h-1 bg-primary rounded-full"></span> Sourced Exclusives
              </li>
            </ul>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
