import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import AnnouncementBar from './AnnouncementBar'

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    
    // Add passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <AnnouncementBar />
      <div 
        className="hero-video-wrapper absolute inset-0 w-full h-[120%] -top-[10%] origin-bottom"
        style={{ 
          transform: `translateY(${scrollY * 0.4}px) scale(${1 + scrollY * 0.0005})`,
          willChange: 'transform'
        }}
      >
        <video autoPlay loop muted playsInline preload="auto" onLoadedData={(e) => { (e.target as HTMLVideoElement).playbackRate = 0.7 }} style={{ background: '#0a0a0a' }} className="w-full h-full object-cover">
          <source src="/assets/videos/hero-bg.webm" type="video/webm" />
          <source src="/assets/videos/hero-bg.mp4" type="video/mp4" />
          <img alt="Fashion runway fallback" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCL_nsaxB0Od7ioWQk9Zt9R_jWHEfjK2IAwJBQsi7EmgmjD0QJFDJFtGedRYTv316JW-m6B_oPsjgb1Tjf1mG4WsxFZmRN6sJF_TQr9Yo__y2Eq8MrQEabb44od2hKypsqhVyw8_tpx4ET8paYV5qj7tFui0SrARFdAJaqEgRtcdgT8XSpuxJEoQMpORhfdgxC4FvaqJLHY-P9gl5vcn5JIrk7kEJ5yYPB8rZta0fNtyykH81QAd7YBh9oU1dkAbgYaSnqjqcCZoE" />
        </video>
        <div className="absolute inset-0 bg-black/40 z-0"></div>
      </div>
      <div 
        className="relative z-10 w-full max-w-4xl px-4 text-center mt-16 space-y-8"
        style={{
          transform: `translateY(${scrollY * -0.15}px)`,
          willChange: 'transform'
        }}
      >
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mx-auto">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span className="text-xs font-bold text-white tracking-widest uppercase font-body">Fall / Winter 2024</span>
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] font-serif tracking-tight drop-shadow-2xl">
          Curated Essentials <br />
          <span className="font-light italic text-white/90 tracking-wide">for Modern Life.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed font-light drop-shadow-md">
          Discover a world where premium quality meets everyday utility. From high-tech gadgets to artisanal home decor.
        </p>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="relative mt-16 flex flex-col items-center gap-4 w-full"
        >
          <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/50">Discover</span>
          <div className="w-px h-16 bg-white/20 relative overflow-hidden">
            <motion.div
              animate={{ 
                y: ["-100%", "200%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute top-0 left-0 w-full h-1/2 bg-white"
            />
          </div>
        </motion.div>
      </div>
    </header>
  )
}
