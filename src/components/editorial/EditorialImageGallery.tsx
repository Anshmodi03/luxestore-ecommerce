import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function EditorialImageGallery() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Subtle parallax for the second image
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <div ref={containerRef} className="w-full bg-off-white dark:bg-zinc-950 transition-colors duration-500">
      <div className="max-w-5xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row gap-12 md:gap-24 mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="md:w-1/3 pt-4"
          >
            <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 border-b border-border-light dark:border-white/10 pb-4">02. Precision in Stitching</h3>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="md:w-2/3"
          >
            <p className="text-lg md:text-xl font-light leading-relaxed text-slate-800 dark:text-slate-300 first-letter:float-left first-letter:text-5xl first-letter:pr-3 first-letter:font-serif first-letter:italic first-letter:text-charcoal dark:first-letter:text-white">
              The hallmark of true luxury is the saddle stitch. Unlike a machine lockstitch, which can unravel if a single thread breaks, the saddle stitch is formed by two independent threads crossing each other within the leather. It is stronger, more durable, and undeniably beautiful in its slight irregularity.
            </p>
          </motion.div>
        </div>

        <motion.blockquote 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="my-24 relative max-w-3xl mx-auto text-center"
        >
          <span className="absolute -top-12 left-1/2 -translate-x-1/2 font-serif text-[8rem] leading-none text-slate-100 dark:text-white/5 -z-10">“</span>
          <p className="font-serif text-4xl md:text-5xl text-charcoal dark:text-gray-100 italic leading-tight px-8">
            Perfection is not a destination, but a relentless journey.
          </p>
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className="h-px w-12 bg-slate-300 dark:bg-white/20"></span>
            <cite className="text-[10px] uppercase tracking-[0.25em] text-slate-500 not-italic">Master Artisan, Marco V.</cite>
            <span className="h-px w-12 bg-slate-300 dark:bg-white/20"></span>
          </div>
        </motion.blockquote>

        <div className="columns-1 md:columns-2 gap-12 space-y-12">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-lg font-light leading-[1.9] text-slate-700 dark:text-slate-300"
          >
            To watch an artisan bevel an edge is to witness a form of sculpture. The raw edges of the leather are sanded, painted, heated, and polished—a cycle repeated up to five times until the surface is as smooth as glass. This attention to detail extends to the unseen.
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg font-light leading-[1.9] text-slate-700 dark:text-slate-300"
          >
            The lining, the reinforcement, the hidden pockets that only the wearer will ever truly know—these are the secrets kept between the maker and the owner. It is in these shadows that the true quality of a piece is defined.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 my-24 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          <figure className="md:col-span-5 relative group overflow-hidden">
            <div className="aspect-3/4 overflow-hidden">
              <img 
                alt="Tool detail" 
                className="w-full h-full object-cover grayscale contrast-[1.1] transition-transform duration-[1.5s] group-hover:scale-105" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoyxe1Tx-Tuy_kr_6q-D9dT84o92FhD-d7a49vUppKVRwPOtOVV-Q8l140twTEugUr1fLDzgQ49Aj2XoSO5xTa1L9GSpj2yrTnV_m3TP7JYnbW4mzbV7OVCEoXKHs-TuJP1uaHk0WLtAkSGVcQ7OuENods50WXjewb0kU_1MMuVoa47v2DJI2oixucGP7EcDuglkUQfGah_IOPtpE3OuZie6t4HI2elA38t-mDxjOiCkzI_gUr6rgNL8R6gIdxFCTHTch3GqBNv6w"
              />
            </div>
            <figcaption className="mt-3 flex items-center gap-3">
              <span className="text-[9px] font-bold tracking-[0.2em] text-slate-400">FIG 03.</span>
              <span className="h-px flex-1 bg-border-light dark:bg-white/10"></span>
              <span className="text-[9px] uppercase tracking-widest text-slate-500">Traditional Tooling</span>
            </figcaption>
          </figure>

          <div className="md:col-span-2 hidden md:flex flex-col justify-end pb-12 items-center">
            <div className="h-32 w-px bg-slate-300 dark:bg-white/20 mb-6"></div>
            <span className="[writing-mode:vertical-rl] text-[10px] uppercase tracking-[0.3em] text-slate-400">Atelier Atmosphere</span>
          </div>

          {/* Render with parallax */}
          <motion.figure style={{ y }} className="md:col-span-5 relative group overflow-hidden mt-12 md:mt-32">
            <div className="aspect-4/5 overflow-hidden">
              <img 
                alt="Studio atmosphere" 
                className="w-full h-full object-cover grayscale contrast-[1.1] transition-transform duration-[1.5s] group-hover:scale-105" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmogbDKWCZBwfn_vA-g23FMk7paOLMer0_L7wyFC8QGFYEV_Dj5RMjWV2RRBuVe7qAmqQy5aFqp0A6hdpa6Wdzgo6Tv1GwtWM4kfFWroO1Af1Jp4Kno1Y1nT3fGhJdRorkvnIs81U9LHs2azW6pyC565WCDwhU1O7wXDz75spGlu1U4SMkhXZ3La-onWVR77aniTzvVZFstwolj5UWg4PO7LtOeFxdgJ7VUGuYyPjFRvey81iZboCviZEsgDkrVVjrsDY9F2gqpBA"
              />
            </div>
            <figcaption className="mt-3 flex items-center gap-3">
              <span className="text-[9px] font-bold tracking-[0.2em] text-slate-400">FIG 04.</span>
              <span className="h-px flex-1 bg-border-light dark:bg-white/10"></span>
              <span className="text-[9px] uppercase tracking-widest text-slate-500">Studio Light</span>
            </figcaption>
          </motion.figure>

        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto px-6 py-24 pb-40 text-center"
      >
        <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 mb-8 inline-block border-b border-border-light dark:border-white/10 pb-2">03. The Final Touch</h3>
        <p className="text-xl md:text-2xl font-light leading-relaxed text-slate-800 dark:text-slate-200">
          Before a piece leaves the atelier, it undergoes a rigorous final inspection. Every stitch is checked, every edge examined under bright light. Only when it meets the master's exacting standards is it stamped with our seal. This is not just a product; it is a promise.
        </p>
        <div className="mt-12 font-script text-5xl text-charcoal dark:text-gray-100">
          Julia Vance
        </div>
      </motion.div>
    </div>
  )
}
