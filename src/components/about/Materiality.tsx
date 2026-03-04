export default function Materiality() {
  return (
    <section className="py-20 px-6 bg-slate-50 dark:bg-surface-dark transition-colors duration-500">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-200 dark:border-border-dark pb-8 transition-colors duration-500">
          <div>
            <span className="text-primary font-bold tracking-widest text-xs uppercase mb-2 block">Materiality</span>
            <h2 className="text-gray-900 dark:text-white text-3xl md:text-4xl font-serif font-bold transition-colors duration-500">Uncompromising Materials</h2>
          </div>
          <p className="text-slate-600 dark:text-gray-400 max-w-md text-right md:text-left transition-colors duration-500">Sourced from the world's finest tanneries and mills, ensuring longevity and grace.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Material 1 */}
          <div className="group cursor-pointer">
            <div className="overflow-hidden rounded-xl aspect-square relative mb-4 shadow-sm">
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors z-10"></div>
              <img alt="Macro texture of premium full grain leather" loading="lazy" decoding="async" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBN_arGX_O2fO_meMs8RdVpNfRfpId6Z8Xm8ACnt3irXsCuvjiouN2lNqs2BV1NA95tp1ox6I6sRTW58u7LGOzEtnqPHNf1c7Ie6hgB_kCU4rz4408i0AxxASICDUrwJWcamHBoVzBJQYo-A-aKEaE2T1pp_35ojFeTUb1Z7s8VoYOXjR2Wd267fFWIaguR8_PUwH4_u54GBT1icfJmQkdycxe5jOrASO4rm6ZXL3vragYJLmnIILDorVKr93oo0pfL4RSNTQMzjgk"/>
              <div className="absolute bottom-4 left-4 z-20 bg-white/80 dark:bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/50 dark:border-white/10 transition-colors duration-500">
                <span className="text-gray-900 dark:text-white text-xs font-bold tracking-wider">01. LEATHER</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-500">Full-Grain Tuscan Leather</h3>
            <p className="text-sm text-slate-500 dark:text-gray-400 transition-colors duration-500">Vegetable-tanned for 60 days to develop a unique patina over time.</p>
          </div>
          
          {/* Material 2 */}
          <div className="group cursor-pointer">
            <div className="overflow-hidden rounded-xl aspect-square relative mb-4 shadow-sm">
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors z-10"></div>
              <img alt="Macro shot of brushed gold metal hardware" loading="lazy" decoding="async" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFcgUxdndqSWOIAu9tkoo2qlnjtkp4qoHrKJZNPbQj8Xj_YUt9SGQkOU5-kUTfsev-UWAlLSDxVFD5nOE1CLxqR8645qjwgMV19gDmN7UkPPgetNe9yM8NGMN6MapiKOQ1D_LLUFgL6TN8YKHlbx5-3aClPO6UC8QAwyKnR9R10Bz6CxFuCg0gososnV3GoLngYFOH_eHd1I1SU6bk0gjny9mgAlzzyKbCrrjm7KpxLosL_8h_8FJkLhoUkfqBW1KhX_c95sYfsPI"/>
              <div className="absolute bottom-4 left-4 z-20 bg-white/80 dark:bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/50 dark:border-white/10 transition-colors duration-500">
                <span className="text-gray-900 dark:text-white text-xs font-bold tracking-wider">02. METAL</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-500">Solid Brass Hardware</h3>
            <p className="text-sm text-slate-500 dark:text-gray-400 transition-colors duration-500">Precision-milled and PVD coated for scratch resistance and lasting shine.</p>
          </div>
          
          {/* Material 3 */}
          <div className="group cursor-pointer">
            <div className="overflow-hidden rounded-xl aspect-square relative mb-4 shadow-sm">
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors z-10"></div>
              <img alt="Macro shot of organic silk fabric weave" loading="lazy" decoding="async" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtyyxkjjnMvu7HunMwMZ6EH_0RcUpEzzzOcT1RwTCznlg1oDN79FduVcDfcqqZ6N59ZANudXV-UfDLFeFxMTF6YO18hAalh7S_cswPwEJq_qj__mluz7-ItrJmYPRMtUxXZLFS1ge-0BdH2FLGZ0k7ueDAt52JJTQt2fdNJ_8iAKzdHNTNi2JKT1QY0YU1pc0Dz5uTpTccBSfkxHZKSQPmJMbP5bWYLCJ4M5g9LAOfGIpO6AkY97N9EUJoT8RrtPfC62bDUdKSpO0"/>
              <div className="absolute bottom-4 left-4 z-20 bg-white/80 dark:bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/50 dark:border-white/10 transition-colors duration-500">
                <span className="text-gray-900 dark:text-white text-xs font-bold tracking-wider">03. TEXTILE</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-500">Organic Mulberry Silk</h3>
            <p className="text-sm text-slate-500 dark:text-gray-400 transition-colors duration-500">Sustainably harvested and hand-woven for unparalleled softness.</p>
          </div>
          
        </div>
      </div>
    </section>
  )
}
