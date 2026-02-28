import { motion } from 'framer-motion'

export default function EditorialHero() {
  return (
    <header className="relative w-full min-h-screen flex flex-col lg:flex-row bg-white dark:bg-zinc-950 transition-colors duration-500">
      <div className="w-full lg:w-[45%] h-[60vh] lg:h-screen relative overflow-hidden border-r border-border-light dark:border-white/10">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center grayscale contrast-[1.15]" 
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuATU1fFIKsqG3b9S4f6bpvapFYhx-3crhrOqXwTQtmMY2J9hSfgOTmHZuYr4f4dcHYIetE__Ce2PFmfYgdwhSGhcY2cOW57Yj1nm-arV-ZRyCTdjB3oWOkDYcgPjTlCvueNUx_OeGKhx7KdUt2ZSSQPw_jVnit0QYXJ8hcC301q3IfALveCLFbhpDcyd_aisbRm7unDuybX4iWubN04Fl2e2r1wVoVw_hye4nmstQ5_IJ46zfm4VPzYO8rcTb8s6a3AMPdQRKakiX8')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="absolute bottom-8 left-8 text-white/90 text-[10px] uppercase tracking-[0.25em] font-medium backdrop-blur-sm bg-black/20 px-3 py-1 border border-white/20"
        >
          Fig 01. The Artisan's Hands
        </motion.div>
      </div>
      
      <div className="w-full lg:w-[55%] h-[40vh] lg:h-screen flex flex-col justify-center px-8 lg:px-24 xl:px-32 relative z-10 bg-off-white dark:bg-zinc-950 transition-colors duration-500">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute top-12 lg:top-24 left-8 lg:left-24 flex items-center gap-6 text-[10px] uppercase tracking-[0.25em] text-slate-400 font-semibold"
        >
          <span>Words by: Julia Vance</span>
          <span className="h-8 w-[1px] bg-border-light dark:bg-white/10"></span>
          <span>Read Time: 6 Min</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-6xl md:text-8xl lg:text-[7rem] xl:text-[8rem] text-charcoal dark:text-gray-100 leading-[0.85] -ml-0 lg:-ml-40 mix-blend-normal lg:mix-blend-darken dark:mix-blend-normal relative z-20"
        >
          Behind <br/>
          <span className="italic text-slate-400 font-light">the Craft</span>
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 lg:ml-0 max-w-md border-l border-slate-300 dark:border-white/20 pl-6"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500 font-bold mb-2">
            Issue 24 — A Study in Patience
          </p>
          <p className="font-serif italic text-slate-400 text-lg">
            "Where the pursuit of perfection meets the silence of the atelier."
          </p>
        </motion.div>
      </div>
    </header>
  )
}
