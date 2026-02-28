import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const features = [
  {
    title: "Masterful Technique",
    desc: "Every stitch and fold is a testament to generations of dedicated artisanship, refined through decades of uncompromising practice.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuChP60tG0jtnOAx__BI7wf91yrwLkX2fl17DuMDKfukAg1i8KY9QvHSUE8tYd7VaIrtv75XWkO6rVLr-_0WtVD0Jd0GirCW2crot8A64EBVE5oaFK2dpR783ogCnUpYVQUdFiuJc8UMhj3N_l2clHbzGJhCpsAWURXEv99G2KM5Exe1er8c7r-XkqEtoyJtccUvNV1wmq4LuDa02zrInWYTZG5raV5XcAmCqcztimT-xYiT6rDy1kS6P4Sbk4h1mvOdqY8M0NbV6sE"
  },
  {
    title: "Sourced with Purpose",
    desc: "We traverse the globe to find materials that not only meet our aesthetic standards but also align with our strict ecological values.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBoyxe1Tx-Tuy_kr_6q-D9dT84o92FhD-d7a49vUppKVRwPOtOVV-Q8l140twTEugUr1fLDzgQ49Aj2XoSO5xTa1L9GSpj2yrTnV_m3TP7JYnbW4mzbV7OVCEoXKHs-TuJP1uaHk0WLtAkSGVcQ7OuENods50WXjewb0kU_1MMuVoa47v2DJI2oixucGP7EcDuglkUQfGah_IOPtpE3OuZie6t4HI2elA38t-mDxjOiCkzI_gUr6rgNL8R6gIdxFCTHTch3GqBNv6w"
  },
  {
    title: "Enduring Form",
    desc: "Designed to transcend seasonal trends, our pieces are built to age gracefully, acquiring a unique patina that tells your story.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPYmp8c61TVnG5bwcy81oXnWjFebWCw5iLJrbsEdpOy4tdcVgNgm4_9FHdtURrjpJjP7Q59NjY_Ab2qfE7vz52w6_RR6mj8txmszkV1Mj7QHK6KPRAovysSmX2WrZWoQ3iEm5F3x3-9K7Zj1EesbygKvZUKrV2XLY9v3xPY3_5G6xecPa0uuE51gMxxwEQtcJ-i92LcFcinOniBZiy1Fro5C60OwU_BtQJ3dTLjB402xgdOmREzu7krnYd9MoKIHBHZ4J25A89Elk"
  }
];

export default function EditorialCraftsmanship() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0.05, 0.05, 0]);

  return (
    <section ref={containerRef} className="py-32 w-full overflow-hidden bg-zinc-950 dark:bg-white transition-colors duration-500 border-y border-white/10 dark:border-border-light relative flex flex-col items-center">
      
      {/* Background ambient text */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none z-0"
        style={{ opacity: bgOpacity }}
      >
        <motion.h1 
          className="text-[15vw] font-serif italic whitespace-nowrap text-white dark:text-charcoal"
          style={{ x: useTransform(scrollYProgress, [0, 1], ['20%', '-20%']) }}
        >
          Artisan Craftsmanship
        </motion.h1>
      </motion.div>

      <div className="max-w-[1440px] mx-auto px-6 w-full z-10">
        <div className="text-center mb-24 md:mb-32 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="w-12 h-px bg-white/20 dark:bg-slate-300 origin-right"></span>
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/50 dark:text-slate-500">The Anatomy of Elegance</span>
            <span className="w-12 h-px bg-white/20 dark:bg-slate-300 origin-left"></span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-white dark:text-charcoal leading-tight max-w-2xl"
          >
            Uncompromising Quality<br/>
            <span className="italic text-white/60 dark:text-slate-500 font-light">in Every Detail</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20 relative">
          {features.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
              className={`flex flex-col group cursor-pointer ${idx === 1 ? 'md:mt-24' : ''}`}
            >
              <div className="relative w-full aspect-4/5 overflow-hidden mb-8 border border-white/10 dark:border-border-light group-hover:border-white/30 dark:group-hover:border-slate-300 transition-colors duration-700">
                <div className="absolute inset-0 bg-black/20 dark:bg-black/5 group-hover:bg-transparent transition-colors duration-700 z-10 pointer-events-none" />
                <motion.img 
                  src={item.img} 
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 ease-out origin-center"
                  style={{ y: idx % 2 === 0 ? y1 : y2 }}
                />
              </div>
              <div className="flex gap-4">
                <span className="text-[10px] font-serif italic text-white/40 dark:text-slate-400 mt-1">0{idx + 1}</span>
                <div className="flex flex-col gap-3">
                  <h3 className="text-xl font-serif text-white dark:text-charcoal group-hover:text-white/80 dark:group-hover:text-black transition-colors uppercase tracking-widest">{item.title}</h3>
                  <p className="text-sm font-light text-white/50 dark:text-slate-600 leading-relaxed font-sans">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-32 md:mt-40 w-full flex flex-col items-center justify-center text-center px-4"
        >
          <i className="ph ph-quotes text-3xl text-white/20 dark:text-slate-300 mb-6"></i>
          <p className="font-serif italic text-2xl md:text-3xl max-w-3xl text-white/90 dark:text-charcoal leading-relaxed">
            "True luxury is not just what you see, but what you feel—the invisible thread of dedication woven into every piece."
          </p>
          <div className="mt-10 flex flex-col items-center gap-3">
            <span className="w-8 h-px bg-white/20 dark:bg-charcoal/20"></span>
            <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/50 dark:text-slate-500">Atelier Director</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
