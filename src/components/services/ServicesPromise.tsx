import { motion } from 'framer-motion'

export default function ServicesPromise() {
  return (
    <section className="py-24 bg-[#0a0a0a] text-white overflow-hidden relative">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 text-center relative z-10">
        
        {/* Pulsing Status Label */}
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-white/40 font-bold text-[10px] uppercase tracking-[0.3em] mb-8 block animate-pulse-slow"
        >
          Our Commitment
        </motion.span>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif text-4xl md:text-5xl mb-12"
        >
          The Service Promise
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
          
          {/* Subtle Dividers (Desktop Only) */}
          <div className="hidden md:block absolute top-1/2 left-1/3 w-px h-12 bg-white/20 -translate-y-1/2"></div>
          <div className="hidden md:block absolute top-1/2 right-1/3 w-px h-12 bg-white/20 -translate-y-1/2"></div>
          
          {/* Promise 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center group"
          >
            <div className="text-4xl font-serif mb-4 text-primary group-hover:scale-110 transition-transform duration-500">24/7</div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-2">Priority Access</h3>
            <p className="text-white/50 text-xs max-w-xs leading-relaxed">
              Dedicated line for VIP clientele, ensuring immediate connection to a senior concierge anywhere in the world.
            </p>
          </motion.div>
          
          {/* Promise 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col items-center group"
          >
            <div className="text-4xl font-serif mb-4 text-primary group-hover:scale-110 transition-transform duration-500">1 Hr</div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-2">Response Time</h3>
            <p className="text-white/50 text-xs max-w-xs leading-relaxed">
              Guaranteed initial response for all digital inquiries submitted through the secure portal during business hours.
            </p>
          </motion.div>
          
          {/* Promise 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col items-center group"
          >
            <div className="text-4xl font-serif mb-4 text-primary group-hover:scale-110 transition-transform duration-500">100%</div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-2">Resolution</h3>
            <p className="text-white/50 text-xs max-w-xs leading-relaxed">
              We do not close a case until you are completely satisfied. Every concern is treated as a priority.
            </p>
          </motion.div>
          
        </div>
      </div>
    </section>
  )
}
