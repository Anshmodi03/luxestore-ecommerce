import { motion } from 'framer-motion'
import { Package, ArrowUUpLeft, Receipt } from '@phosphor-icons/react'

export default function ServicesHero() {
  return (
    <section className="relative w-full py-32 lg:py-48 bg-white dark:bg-[#050505] border-b border-black/5 dark:border-white/5 transition-colors duration-500 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:items-end">
          
          {/* Typography Entry */}
          <div className="lg:w-1/2">
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-black/50 dark:text-white/50 text-xs font-bold uppercase tracking-[0.3em] mb-8"
            >
              Customer Success Portal
            </motion.p>
            
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-6xl md:text-7xl lg:text-8xl text-gray-900 dark:text-white leading-[0.95] tracking-tight mb-8"
            >
              Service <br/>
              <span className="italic font-light opacity-80">Portfolio</span>
            </motion.h1>
            
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="h-[0.5px] w-full bg-black/10 dark:bg-white/10 mb-10 origin-left"
            ></motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-gray-600 dark:text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-xl"
            >
              A unified ecosystem dedicated to the lifecycle of your luxury assets. From acquisition advisory to heritage preservation.
            </motion.p>
          </div>

          {/* Interactive Status Dashboard */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:w-1/2 lg:pl-12"
          >
            <div className="bg-gray-50 dark:bg-[#0a0a0a] rounded-xl p-8 border border-gray-200 dark:border-white/5 shadow-2xl transition-colors duration-500">
              
              {/* Card Header */}
              <div className="flex justify-between items-center mb-8 border-b border-gray-200 dark:border-white/10 pb-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-white">Digital Concierge</h3>
                <div className="flex gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500/80"></span>
                  <span className="w-2 h-2 rounded-full bg-yellow-500/80"></span>
                  <span className="w-2 h-2 rounded-full bg-green-500/80"></span>
                </div>
              </div>

              {/* Grid Items */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Active Order */}
                <div className="p-6 bg-white dark:bg-[#121212] rounded-lg border border-gray-200 dark:border-white/5 hover:border-primary/50 transition-colors cursor-pointer group shadow-sm dark:shadow-none">
                  <div className="flex justify-between items-start mb-4">
                    <Package weight="fill" className="text-primary text-2xl group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] uppercase font-bold text-gray-400">Live</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Order Status</p>
                  <p className="text-xl font-serif text-gray-900 dark:text-white">In Transit</p>
                  <div className="mt-4 h-1 w-full bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '75%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                      className="h-full bg-primary"
                    ></motion.div>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-2 text-right">Est. 14:00 Today</p>
                </div>

                {/* Returns */}
                <div className="p-6 bg-white dark:bg-[#121212] rounded-lg border border-gray-200 dark:border-white/5 hover:border-primary/50 transition-colors cursor-pointer group shadow-sm dark:shadow-none">
                  <div className="flex justify-between items-start mb-4">
                    <ArrowUUpLeft weight="regular" className="text-gray-900 dark:text-white text-2xl group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] uppercase font-bold text-gray-400">Action</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Active Returns</p>
                  <p className="text-xl font-serif text-gray-900 dark:text-white">Processing</p>
                  <p className="text-sm text-gray-500 mt-2">Ref: #RET-8829</p>
                </div>

                {/* Vault */}
                <div className="p-6 bg-white dark:bg-[#121212] rounded-lg border border-gray-200 dark:border-white/5 hover:border-primary/50 transition-colors cursor-pointer group shadow-sm dark:shadow-none">
                  <div className="flex justify-between items-start mb-4">
                    <Receipt weight="regular" className="text-gray-900 dark:text-white text-2xl group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] uppercase font-bold text-gray-400">Vault</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Certificates</p>
                  <p className="text-xl font-serif text-gray-900 dark:text-white">12 Active</p>
                  <p className="text-sm text-gray-500 mt-2">Digital Warranty</p>
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
