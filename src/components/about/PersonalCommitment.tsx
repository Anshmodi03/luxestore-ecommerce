export default function PersonalCommitment() {
  return (
    <section className="py-24 px-6 bg-white dark:bg-background-dark border-t border-slate-100 dark:border-border-dark transition-colors duration-500">
      <div className="max-w-[1000px] mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-widest text-xs uppercase mb-3 block">A Personal Commitment</span>
          <h2 className="text-gray-900 dark:text-white text-4xl md:text-5xl font-serif font-bold transition-colors duration-500">To Our Valued Community</h2>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          <div className="w-full md:w-1/2">
            <div className="relative aspect-4/5 overflow-hidden rounded-sm shadow-xl grayscale rotate-1 transition-transform hover:rotate-0 duration-700">
              <img alt="Elena and Marco candid in workshop" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfcyZporXozOUFWzqy-R0eU69jhG6bMp9mQfcX4CX5tne5NO9LzCKcITggIuNtTIkCz3T3a2Yjzes89w6Q3ifUc7492SBxZGDQ8FldeDoaG1DAA0MTGCdagAMRXv0_xMcaNON2OmzHjU5peOkq4fhuB7HSGeaYGM1F4oD7PTM2nM3gImnf7DDjPgQCrBoa8IzAGTewwoSsr6gATlZt2KRpnfUxkSv9yKWxBFUuVeGkZwx2QhxiBs4kvAbJ9458ZGPSZcTi5DJ4dH0"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="relative p-8 md:p-0">
              <p className="font-handwriting text-2xl md:text-3xl text-slate-700 dark:text-gray-300 leading-relaxed mb-8 transition-colors duration-500">
                "To create something truly timeless takes more than just skill—it takes heart. Every stitch, every fold, and every polish is a testament to our promise: to bring you nothing but the absolute best. Thank you for being part of our journey."
              </p>
              <div className="flex items-center gap-8 mt-12">
                <div className="flex flex-col gap-1">
                  <span className="font-handwriting text-4xl text-blue-900 dark:text-blue-300 -rotate-6 block transform origin-bottom-left transition-colors duration-500">Elena Rossi</span>
                  <span className="text-xs text-slate-400 dark:text-gray-500 font-sans uppercase tracking-widest mt-2 transition-colors duration-500">Elena Rossi</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-handwriting text-4xl text-blue-900 dark:text-blue-300 -rotate-3 block transform origin-bottom-left transition-colors duration-500">Marco Rossi</span>
                  <span className="text-xs text-slate-400 dark:text-gray-500 font-sans uppercase tracking-widest mt-2 transition-colors duration-500">Marco Rossi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
