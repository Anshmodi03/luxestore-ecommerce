import { motion } from 'framer-motion'

export default function EditorialArticle() {
  return (
    <article className="w-full bg-off-white dark:bg-zinc-950 transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-6 py-24 md:py-32 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="md:col-span-8 md:col-start-3"
        >
          <p className="first-letter:font-serif first-letter:float-left first-letter:text-[5.5rem] first-letter:leading-[0.75] first-letter:pr-5 first-letter:pt-3 first-letter:text-charcoal dark:first-letter:text-white text-lg md:text-xl font-light leading-[1.8] text-slate-800 dark:text-slate-300 mb-8 text-justify">
            The air in the atelier is thick with the scent of beeswax and seasoned leather. It is a quiet place, a sanctuary where time seems to slow down, measured not in minutes but in the rhythmic pull of a waxed thread through a needle's eye. Here, perfection is not an abstract concept but a tangible pursuit, chased daily by hands that have known the grain of calfskin for decades.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:col-span-10 md:col-start-2"
        >
          <p className="text-xl md:text-2xl font-light leading-[1.6] text-slate-900 dark:text-slate-200 mb-16 md:indent-12">
            In a world obsessed with speed, we have chosen the path of resistance. Every bag that leaves this workshop is the result of over forty hours of meticulous labor. The artisans do not rush. They listen to the material, understanding its tension, its give, and its unique character. It is a dialogue between maker and medium that cannot be replicated by machines.
          </p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-4 lg:sticky lg:top-32"
        >
          <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 mb-6 border-b border-border-light dark:border-white/10 pb-4 w-full">01. The Selection Process</h3>
          <p className="font-serif italic text-2xl text-slate-500 dark:text-slate-400 mb-6">"Nature provides the canvas; we merely frame it."</p>
          <div className="font-script text-4xl text-slate-300 dark:text-slate-600 transform -rotate-6 ml-4">
            Pure & Unfiltered
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-7 lg:col-start-6"
        >
          <p className="text-lg font-light leading-[1.9] text-slate-700 dark:text-slate-300 mb-8">
            Sourcing begins in the rolling hills of Tuscany. We work exclusively with tanneries that adhere to centuries-old vegetable tanning traditions. This process, free from harsh chemicals, relies on natural tannins found in tree bark to cure the hide. The result is a leather that breathes, ages, and develops a rich patina unique to its owner's journey.
          </p>
        </motion.div>
      </div>
    </article>
  )
}
