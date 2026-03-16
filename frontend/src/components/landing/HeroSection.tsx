import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnnouncementBar from './AnnouncementBar'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoWrapperRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const videoWrapper = videoWrapperRef.current
    const textBlock = textRef.current
    if (!section || !videoWrapper || !textBlock) return

    const ctx = gsap.context(() => {
      // Video parallax — moves down as you scroll, with slight zoom
      gsap.to(videoWrapper, {
        y: '40%',
        scale: 1.15,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Text parallax — moves up faster than scroll
      gsap.to(textBlock, {
        y: '-15%',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <header ref={sectionRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <AnnouncementBar />
      <div 
        ref={videoWrapperRef}
        className="hero-video-wrapper absolute inset-0 w-full h-[120%] -top-[10%] origin-bottom will-change-transform"
      >
        <video autoPlay loop muted playsInline preload="auto" onLoadedData={(e) => { (e.target as HTMLVideoElement).playbackRate = 0.7 }} className="w-full h-full object-cover bg-[#0a0a0a]">
          <source src="/assets/videos/hero-bg.webm" type="video/webm" />
          <source src="/assets/videos/hero-bg.mp4" type="video/mp4" />
          <img alt="Fashion runway fallback" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCL_nsaxB0Od7ioWQk9Zt9R_jWHEfjK2IAwJBQsi7EmgmjD0QJFDJFtGedRYTv316JW-m6B_oPsjgb1Tjf1mG4WsxFZmRN6sJF_TQr9Yo__y2Eq8MrQEabb44od2hKypsqhVyw8_tpx4ET8paYV5qj7tFui0SrARFdAJaqEgRtcdgT8XSpuxJEoQMpORhfdgxC4FvaqJLHY-P9gl5vcn5JIrk7kEJ5yYPB8rZta0fNtyykH81QAd7YBh9oU1dkAbgYaSnqjqcCZoE" />
        </video>
        <div className="absolute inset-0 bg-black/40 z-0"></div>
      </div>
      <div 
        ref={textRef}
        className="relative z-10 w-full max-w-4xl px-4 text-center mt-16 space-y-8 will-change-transform"
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
