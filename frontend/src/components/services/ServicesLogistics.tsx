import { useRef } from 'react'
import { EyeSlash, Package, Globe } from '@phosphor-icons/react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ServicesLogistics() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])

  return (
    <section ref={containerRef} className="py-32 bg-white dark:bg-black relative overflow-hidden transition-colors duration-500">
      
      {/* Background Decor */}
      <div className="absolute right-0 top-0 h-full w-1/3 bg-gray-50 dark:bg-[#080808] z-0 transition-colors duration-500"></div>
      
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20">
          
          {/* Text Content */}
          <div className="lg:w-2/5 pt-12">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-primary font-bold text-[10px] uppercase tracking-[0.3em] mb-6 block"
            >
              Fulfillment & Handling
            </motion.span>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-5xl lg:text-6xl text-gray-900 dark:text-white mb-8 leading-[1.1]"
            >
              Curated <br/>
              <span className="italic text-gray-400 dark:text-gray-600">Unboxing</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gray-500 dark:text-gray-400 text-lg font-light leading-relaxed mb-12"
            >
              The luxury experience continues beyond the checkout. We deliver uncompromised quality directly to your sanctuary.
            </motion.p>
            
            <div className="space-y-8">
              
              {/* Feature 1 */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex gap-6 items-start group"
              >
                <div className="w-10 h-10 shrink-0 border border-gray-200 dark:border-white/20 rounded-full flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors duration-500">
                  <EyeSlash size={20} weight="regular" />
                </div>
                <div>
                  <h4 className="font-serif text-xl text-gray-900 dark:text-white mb-2">Discreet Transit</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-light max-w-sm">
                    Unmarked, highly secure outer casing designed to guarantee privacy for high-value acquisitions.
                  </p>
                </div>
              </motion.div>
              
              <div className="h-[0.5px] bg-black/10 dark:bg-white/10 w-full max-w-md"></div>
              
              {/* Feature 2 */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex gap-6 items-start group"
              >
                <div className="w-10 h-10 shrink-0 border border-gray-200 dark:border-white/20 rounded-full flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors duration-500">
                  <Package size={20} weight="regular" />
                </div>
                <div>
                  <h4 className="font-serif text-xl text-gray-900 dark:text-white mb-2">Thematic Encasement</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-light max-w-sm">
                    Every order is sealed with our signature wax, cocooned in archival tissue paper, and presented in a monogrammed hard-case.
                  </p>
                </div>
              </motion.div>
              
              <div className="h-[0.5px] bg-black/10 dark:bg-white/10 w-full max-w-md"></div>
              
              {/* Feature 3 */}
              <motion.div 
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.5, delay: 0.5 }}
                className="flex gap-6 items-start group"
              >
                <div className="w-10 h-10 shrink-0 border border-gray-200 dark:border-white/20 rounded-full flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors duration-500">
                  <Globe size={20} weight="regular" />
                </div>
                <div>
                  <h4 className="font-serif text-xl text-gray-900 dark:text-white mb-2">Global White Glove</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-light max-w-sm">
                    Door-to-door insured air freight including immediate customs clearance and dedicated final-mile handling.
                  </p>
                </div>
              </motion.div>

            </div>
          </div>

          {/* Image Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:w-3/5 relative overflow-hidden rounded-sm shadow-2xl"
          >
            <motion.div 
              className="aspect-4/3 w-full bg-gray-100 dark:bg-[#111] relative"
              style={{ y, scale: 1.1 }}
            >
              <motion.div 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute inset-0 bg-cover bg-center grayscale contrast-125" 
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1200&auto=format&fit=crop')" }}
              ></motion.div>
              
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
              
              <div className="absolute bottom-8 left-8 right-8 text-white z-10 pointer-events-none">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="uppercase text-[10px] tracking-widest mb-2 opacity-70">Logistics Partner</p>
                    <p className="font-serif text-3xl">Secure Transit Division</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
