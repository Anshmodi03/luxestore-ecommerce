export default function Sustainability() {
  return (
    <section className="py-24 px-6 bg-white dark:bg-background-dark transition-colors duration-500">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-widest text-xs uppercase mb-3 block">Sustainability &amp; Ethics</span>
          <h2 className="text-gray-900 dark:text-white text-4xl md:text-5xl font-serif font-bold transition-colors duration-500">Committed to Tomorrow</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="group relative overflow-hidden rounded-lg bg-slate-50 dark:bg-surface-dark border border-slate-100 dark:border-border-dark shadow-md h-[400px] transition-colors duration-500">
            <div className="absolute inset-0">
              <img alt="Close-up of ethically sourced raw materials" loading="lazy" decoding="async" className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtyyxkjjnMvu7HunMwMZ6EH_0RcUpEzzzOcT1RwTCznlg1oDN79FduVcDfcqqZ6N59ZANudXV-UfDLFeFxMTF6YO18hAalh7S_cswPwEJq_qj__mluz7-ItrJmYPRMtUxXZLFS1ge-0BdH2FLGZ0k7ueDAt52JJTQt2fdNJ_8iAKzdHNTNi2JKT1QY0YU1pc0Dz5uTpTccBSfkxHZKSQPmJMbP5bWYLCJ4M5g9LAOfGIpO6AkY97N9EUJoT8RrtPfC62bDUdKSpO0"/>
              <div className="absolute inset-0 bg-linear-to-t from-white dark:from-surface-dark via-white/40 dark:via-surface-dark/40 to-transparent opacity-90 transition-colors duration-500"></div>
            </div>
            <div className="absolute top-6 left-6 z-20">
              <span className="bg-primary/90 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-sm">100% Traceability</span>
            </div>
            <div className="absolute bottom-0 left-0 w-full p-8 z-20 translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
              <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-500">Ethical Sourcing</h3>
              <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                  We partner exclusively with suppliers who adhere to the strictest ethical standards, ensuring dignity and fair wages for every hand that touches our products.
              </p>
              <a className="text-primary font-bold text-sm uppercase tracking-widest inline-flex items-center opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 hover:text-blue-700 dark:hover:text-blue-400" href="#">
                  Learn More <span className="material-symbols-outlined ml-1 text-base">arrow_forward</span>
              </a>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="group relative overflow-hidden rounded-lg bg-slate-50 dark:bg-surface-dark border border-slate-100 dark:border-border-dark shadow-md h-[400px] transition-colors duration-500">
            <div className="absolute inset-0">
              <img alt="Minimalist landscape representing carbon neutrality" loading="lazy" decoding="async" className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-500 grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtyyxkjjnMvu7HunMwMZ6EH_0RcUpEzzzOcT1RwTCznlg1oDN79FduVcDfcqqZ6N59ZANudXV-UfDLFeFxMTF6YO18hAalh7S_cswPwEJq_qj__mluz7-ItrJmYPRMtUxXZLFS1ge-0BdH2FLGZ0k7ueDAt52JJTQt2fdNJ_8iAKzdHNTNi2JKT1QY0YU1pc0Dz5uTpTccBSfkxHZKSQPmJMbP5bWYLCJ4M5g9LAOfGIpO6AkY97N9EUJoT8RrtPfC62bDUdKSpO0"/>
              <div className="absolute inset-0 bg-linear-to-t from-white dark:from-surface-dark via-white/40 dark:via-surface-dark/40 to-transparent opacity-90 transition-colors duration-500"></div>
            </div>
            <div className="absolute top-6 right-6 z-20 text-right">
              <span className="block text-3xl font-serif font-bold text-gray-900 dark:text-white transition-colors duration-500">85%</span>
              <span className="text-xs text-slate-500 dark:text-gray-400 uppercase tracking-wider transition-colors duration-500">Renewable Energy</span>
            </div>
            <div className="absolute bottom-0 left-0 w-full p-8 z-20 translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
              <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-500">Carbon Neutral</h3>
              <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                  Our journey to net zero is well underway. We offset 100% of our logistics emissions and are rapidly transitioning our ateliers to renewable power sources.
              </p>
              <a className="text-primary font-bold text-sm uppercase tracking-widest inline-flex items-center opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 hover:text-blue-700 dark:hover:text-blue-400" href="#">
                  Learn More <span className="material-symbols-outlined ml-1 text-base">arrow_forward</span>
              </a>
            </div>
          </div>
          
          {/* Card 3 */}
          <div className="group relative overflow-hidden rounded-lg bg-slate-50 dark:bg-surface-dark border border-slate-100 dark:border-border-dark shadow-md h-[400px] transition-colors duration-500">
            <div className="absolute inset-0 flex items-center justify-center bg-slate-50 dark:bg-surface-dark transition-colors duration-500">
              <svg className="w-48 h-48 text-slate-300 dark:text-slate-600 opacity-50 group-hover:opacity-40 transition-opacity duration-500" fill="none" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="40" stroke="currentColor" strokeDasharray="10 5" strokeWidth="2"></circle>
                <path d="M50 10 L50 20 M90 50 L80 50 M50 90 L50 80 M10 50 L20 50" stroke="currentColor" strokeWidth="2"></path>
                <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="1"></circle>
              </svg>
              <div className="absolute inset-0 bg-linear-to-t from-white dark:from-surface-dark via-white/40 dark:via-surface-dark/40 to-transparent opacity-90 transition-colors duration-500"></div>
            </div>
            <div className="absolute bottom-0 left-0 w-full p-8 z-20 translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
              <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-500">Circular Design</h3>
              <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                  End-of-life is just a new beginning. We design for disassembly, allowing precious metals and leathers to be reclaimed and reborn into future collections.
              </p>
              <a className="text-primary font-bold text-sm uppercase tracking-widest inline-flex items-center opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 hover:text-blue-700 dark:hover:text-blue-400" href="#">
                  Learn More <span className="material-symbols-outlined ml-1 text-base">arrow_forward</span>
              </a>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}
