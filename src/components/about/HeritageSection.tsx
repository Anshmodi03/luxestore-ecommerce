export default function HeritageSection() {
  return (
    <section className="py-24 px-6 md:px-20 lg:px-40 bg-white dark:bg-background-dark relative z-20 transition-colors duration-500">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="relative order-2 md:order-1">
          <div className="aspect-4/5 w-full rounded-lg overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
            <div className="absolute inset-0 bg-primary/5 mix-blend-overlay z-10"></div>
            <img 
              alt="Close up of hands working on leather stitching" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfcyZporXozOUFWzqy-R0eU69jhG6bMp9mQfcX4CX5tne5NO9LzCKcITggIuNtTIkCz3T3a2Yjzes89w6Q3ifUc7492SBxZGDQ8FldeDoaG1DAA0MTGCdagAMRXv0_xMcaNON2OmzHjU5peOkq4fhuB7HSGeaYGM1F4oD7PTM2nM3gImnf7DDjPgQCrBoa8IzAGTewwoSsr6gATlZt2KRpnfUxkSv9yKWxBFUuVeGkZwx2QhxiBs4kvAbJ9458ZGPSZcTi5DJ4dH0"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 -z-10 rounded-full blur-2xl"></div>
        </div>
        <div className="flex flex-col gap-6 order-1 md:order-2">
          <h2 className="text-gray-900 dark:text-white text-4xl md:text-5xl font-serif font-bold leading-tight transition-colors duration-500">
            Heritage rooted in <span className="text-primary italic">tradition</span>.
          </h2>
          <div className="w-12 h-1 bg-primary rounded-full"></div>
          <p className="text-slate-600 dark:text-gray-300 text-lg leading-relaxed transition-colors duration-500">
            Born from a passion for timeless elegance, LuxeStore began in a small workshop in Milan. Today, we continue to honor the traditions of old-world craftsmanship while embracing modern innovation.
          </p>
          <p className="text-slate-600 dark:text-gray-300 text-lg leading-relaxed transition-colors duration-500">
            Every piece in our collection tells a story of dedication. We believe that true luxury lies not in the price tag, but in the hours of skilled labor, the selection of the finest raw materials, and the refusal to compromise on quality.
          </p>
          <a className="text-primary font-bold text-sm tracking-widest uppercase mt-4 flex items-center hover:opacity-80 transition-opacity" href="#">
            View Archive <span className="material-symbols-outlined ml-2 text-lg">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  )
}
