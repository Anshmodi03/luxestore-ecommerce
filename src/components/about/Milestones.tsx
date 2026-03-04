export default function Milestones() {
  return (
    <section className="relative py-24 bg-slate-50 dark:bg-background-dark overflow-hidden transition-colors duration-500">
      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="text-primary font-bold tracking-widest text-xs uppercase mb-3 block">Milestones</span>
          <h2 className="text-gray-900 dark:text-white text-4xl md:text-5xl font-serif font-bold transition-colors duration-500">Our Evolution</h2>
        </div>
        
        <div className="relative pl-8 md:pl-0">
          {/* Timeline Center Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-slate-200 to-transparent md:-ml-px h-full"></div>
          
          {/* Active Glowing Line (simulated as static for now based on purely CSS gradient, but in real app would animate with frame loops if wanted) */}
          <div className="absolute left-8 md:left-1/2 top-0 w-0.5 md:-ml-px h-32 bg-linear-to-b from-primary to-blue-400 shadow-[0_0_15px_rgba(17,82,212,0.3)] animate-glow"></div>
          
          {/* Milestone 1 */}
          <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-20 group">
            <div className="md:w-1/2 flex justify-end order-1 md:order-1">
              <div className="bg-white dark:bg-surface-dark p-6 rounded-lg shadow-xl border border-slate-100 dark:border-border-dark w-full max-w-md relative hover:-translate-y-2 transition-transform duration-500">
                <div className="absolute -right-3 top-6 w-6 h-6 bg-white dark:bg-surface-dark rotate-45 border-t border-r border-slate-100 dark:border-border-dark hidden md:block transition-colors duration-500"></div>
                <div className="absolute -left-3 top-6 w-6 h-6 bg-white dark:bg-surface-dark rotate-45 border-b border-l border-slate-100 dark:border-border-dark md:hidden transition-colors duration-500"></div>
                <div className="aspect-video bg-slate-50 dark:bg-background-dark mb-4 rounded overflow-hidden">
                  <img alt="Sketch of the first workshop atelier" loading="lazy" decoding="async" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfcyZporXozOUFWzqy-R0eU69jhG6bMp9mQfcX4CX5tne5NO9LzCKcITggIuNtTIkCz3T3a2Yjzes89w6Q3ifUc7492SBxZGDQ8FldeDoaG1DAA0MTGCdagAMRXv0_xMcaNON2OmzHjU5peOkq4fhuB7HSGeaYGM1F4oD7PTM2nM3gImnf7DDjPgQCrBoa8IzAGTewwoSsr6gATlZt2KRpnfUxkSv9yKWxBFUuVeGkZwx2QhxiBs4kvAbJ9458ZGPSZcTi5DJ4dH0"/>
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-500">The Founding Atelier</h3>
                <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed transition-colors duration-500">
                    Where it all began. A small, sunlit studio in Milan dedicated to mastering the art of leatherworking before a single product was sold.
                </p>
              </div>
            </div>
            <div className="absolute left-0 md:left-1/2 -ml-[5px] md:-ml-2 w-4 h-4 rounded-full bg-white dark:bg-surface-dark border-2 border-primary z-10 shadow-[0_0_10px_rgba(17,82,212,0.4)] order-1 md:order-2"></div>
            <div className="md:w-1/2 flex items-center order-1 md:order-3 pl-8 md:pl-0">
              <span className="text-6xl font-serif font-bold text-slate-200 dark:text-gray-800 select-none transition-colors duration-500">2012</span>
            </div>
          </div>
          
          {/* Milestone 2 */}
          <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-20 group">
            <div className="md:w-1/2 flex justify-end md:justify-end items-center order-1 md:order-1 text-right pr-0 md:pr-0">
              <span className="text-6xl font-serif font-bold text-slate-200 dark:text-gray-800 select-none pl-8 md:pl-0 transition-colors duration-500">2016</span>
            </div>
            <div className="absolute left-0 md:left-1/2 -ml-[5px] md:-ml-2 w-4 h-4 rounded-full bg-white dark:bg-surface-dark border-2 border-primary z-10 shadow-[0_0_10px_rgba(17,82,212,0.4)] order-1 md:order-2"></div>
            <div className="md:w-1/2 order-1 md:order-3">
              <div className="bg-white dark:bg-surface-dark p-6 rounded-lg shadow-xl border border-slate-100 dark:border-border-dark w-full max-w-md relative hover:-translate-y-2 transition-transform duration-500">
                <div className="absolute -left-3 top-6 w-6 h-6 bg-white dark:bg-surface-dark rotate-45 border-b border-l border-slate-100 dark:border-border-dark hidden md:block transition-colors duration-500"></div>
                <div className="absolute -left-3 top-6 w-6 h-6 bg-white dark:bg-surface-dark rotate-45 border-b border-l border-slate-100 dark:border-border-dark md:hidden transition-colors duration-500"></div>
                <div className="aspect-video bg-slate-50 dark:bg-background-dark mb-4 rounded overflow-hidden">
                  <img alt="Signature Collection Launch product shot" loading="lazy" decoding="async" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBN_arGX_O2fO_meMs8RdVpNfRfpId6Z8Xm8ACnt3irXsCuvjiouN2lNqs2BV1NA95tp1ox6I6sRTW58u7LGOzEtnqPHNf1c7Ie6hgB_kCU4rz4408i0AxxASICDUrwJWcamHBoVzBJQYo-A-aKEaE2T1pp_35ojFeTUb1Z7s8VoYOXjR2Wd267fFWIaguR8_PUwH4_u54GBT1icfJmQkdycxe5jOrASO4rm6ZXL3vragYJLmnIILDorVKr93oo0pfL4RSNTQMzjgk"/>
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-500">Signature Collection</h3>
                <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed transition-colors duration-500">
                    The launch of our iconic line defined by minimalist geometry and Tuscan leather. An instant classic that set the standard.
                </p>
              </div>
            </div>
          </div>
          
          {/* Milestone 3 */}
          <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-16 group">
            <div className="md:w-1/2 flex justify-end order-1 md:order-1">
              <div className="bg-white dark:bg-surface-dark p-6 rounded-lg shadow-xl border border-slate-100 dark:border-border-dark w-full max-w-md relative hover:-translate-y-2 transition-transform duration-500">
                <div className="absolute -right-3 top-6 w-6 h-6 bg-white dark:bg-surface-dark rotate-45 border-t border-r border-slate-100 dark:border-border-dark hidden md:block transition-colors duration-500"></div>
                <div className="absolute -left-3 top-6 w-6 h-6 bg-white dark:bg-surface-dark rotate-45 border-b border-l border-slate-100 dark:border-border-dark md:hidden transition-colors duration-500"></div>
                <div className="aspect-video bg-slate-50 dark:bg-background-dark mb-4 rounded overflow-hidden relative">
                  <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
                  <img alt="Sustainable innovation workshop" loading="lazy" decoding="async" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtyyxkjjnMvu7HunMwMZ6EH_0RcUpEzzzOcT1RwTCznlg1oDN79FduVcDfcqqZ6N59ZANudXV-UfDLFeFxMTF6YO18hAalh7S_cswPwEJq_qj__mluz7-ItrJmYPRMtUxXZLFS1ge-0BdH2FLGZ0k7ueDAt52JJTQt2fdNJ_8iAKzdHNTNi2JKT1QY0YU1pc0Dz5uTpTccBSfkxHZKSQPmJMbP5bWYLCJ4M5g9LAOfGIpO6AkY97N9EUJoT8RrtPfC62bDUdKSpO0"/>
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-500">The Future of Craft</h3>
                <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed transition-colors duration-500">
                    Pioneering sustainable luxury with 100% traceable materials and carbon-neutral production processes.
                </p>
              </div>
            </div>
            <div className="absolute left-0 md:left-1/2 -ml-[5px] md:-ml-2 w-4 h-4 rounded-full bg-white dark:bg-surface-dark border-2 border-primary z-10 shadow-[0_0_10px_rgba(17,82,212,0.4)] order-1 md:order-2"></div>
            <div className="md:w-1/2 flex items-center order-1 md:order-3 pl-8 md:pl-0">
              <span className="text-6xl font-serif font-bold text-slate-200 dark:text-gray-800 select-none transition-colors duration-500">2023</span>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}
