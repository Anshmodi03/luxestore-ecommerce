import { MagnifyingGlass, ArrowDown } from '@phosphor-icons/react'

export default function HeroSection() {
  return (
    <header className="relative h-[95vh] w-full flex items-center justify-center overflow-hidden">
      <div className="hero-video-wrapper">
        <video autoPlay loop muted playsInline poster="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop">
          <source src="https://videos.pexels.com/video-files/3756003/3756003-uhd_2560_1440_25fps.mp4" type="video/mp4" />
          <img alt="Fashion runway fallback" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCL_nsaxB0Od7ioWQk9Zt9R_jWHEfjK2IAwJBQsi7EmgmjD0QJFDJFtGedRYTv316JW-m6B_oPsjgb1Tjf1mG4WsxFZmRN6sJF_TQr9Yo__y2Eq8MrQEabb44od2hKypsqhVyw8_tpx4ET8paYV5qj7tFui0SrARFdAJaqEgRtcdgT8XSpuxJEoQMpORhfdgxC4FvaqJLHY-P9gl5vcn5JIrk7kEJ5yYPB8rZta0fNtyykH81QAd7YBh9oU1dkAbgYaSnqjqcCZoE" />
        </video>
        <div className="absolute inset-0 hero-overlay"></div>
      </div>
      <div className="relative z-10 w-full max-w-4xl px-4 text-center mt-16 space-y-8">
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mx-auto">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span className="text-xs font-bold text-white tracking-widest uppercase font-body">Fall / Winter 2024</span>
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] font-serif tracking-tight drop-shadow-2xl">
          Curated Essentials <br />
          <span className="font-light italic text-white/90">for Modern Life.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed font-light drop-shadow-md">
          Discover a world where premium quality meets everyday utility. From high-tech gadgets to artisanal home decor.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 max-w-lg mx-auto w-full">
          <div className="relative flex-grow w-full">
            <input
              className="w-full pl-6 pr-12 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition shadow-lg"
              placeholder="Search the collection..."
              type="text"
            />
            <button className="absolute right-2 top-2 bottom-2 w-10 h-10 bg-white text-gray-900 rounded-full flex items-center justify-center hover:bg-gray-200 transition">
              <MagnifyingGlass weight="bold" />
            </button>
          </div>
          <a
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-bold hover:bg-primary hover:text-white transition-all duration-300 shadow-xl min-w-[160px]"
            href="#trending"
          >
            Start Shopping
            <ArrowDown weight="bold" />
          </a>
        </div>
      </div>
    </header>
  )
}
