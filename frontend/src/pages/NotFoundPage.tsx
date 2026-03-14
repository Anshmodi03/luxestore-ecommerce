import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { motion } from 'framer-motion'
import { House, MagnifyingGlass, ArrowLeft, Diamond } from '@phosphor-icons/react'
import Footer from '../components/common/Footer'
import PageTransition from '../components/common/PageTransition'

export default function NotFoundPage() {
  const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement>(null)
  const numbersRef = useRef<HTMLDivElement>(null)
  const orbsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !numbersRef.current) return

    const ctx = gsap.context(() => {
      // Stagger the 4-0-4 digits
      const digits = numbersRef.current!.querySelectorAll('.digit')
      gsap.fromTo(
        digits,
        { y: 120, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: 'elastic.out(1, 0.5)',
          delay: 0.3,
        }
      )

      // Animate the subtitle and buttons
      gsap.fromTo(
        '.notfound-subtitle',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.9 }
      )

      gsap.fromTo(
        '.notfound-desc',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.1 }
      )

      gsap.fromTo(
        '.notfound-actions',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.3 }
      )

      // Floating ambient orbs
      if (orbsRef.current) {
        const orbs = orbsRef.current.querySelectorAll('.floating-orb')
        orbs.forEach((orb, i) => {
          gsap.to(orb, {
            y: `random(-40, 40)`,
            x: `random(-30, 30)`,
            duration: gsap.utils.random(4, 7),
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.5,
          })
        })
      }

      // Continuous slow rotation on the "0"
      gsap.to('.digit-zero', {
        rotate: 360,
        duration: 20,
        repeat: -1,
        ease: 'none',
      })

      // Glitch effect on digits every few seconds
      const glitchTl = gsap.timeline({ repeat: -1, repeatDelay: 4 })
      glitchTl
        .to(digits, {
          x: 'random(-5, 5)',
          skewX: 'random(-3, 3)',
          duration: 0.1,
          stagger: 0.05,
        })
        .to(digits, {
          x: 0,
          skewX: 0,
          duration: 0.1,
          stagger: 0.05,
        })
        .to(digits, {
          x: 'random(-3, 3)',
          opacity: 0.7,
          duration: 0.08,
        })
        .to(digits, {
          x: 0,
          opacity: 1,
          duration: 0.08,
        })
    }, containerRef.current)

    return () => ctx.revert()
  }, [])

  return (
    <PageTransition>
      <main className="min-h-screen bg-background-light dark:bg-background-dark relative overflow-hidden">
        {/* Ambient floating orbs */}
        <div ref={orbsRef} className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="floating-orb absolute top-[15%] left-[10%] w-64 h-64 rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl" />
          <div className="floating-orb absolute top-[60%] right-[15%] w-80 h-80 rounded-full bg-purple-500/5 dark:bg-purple-500/10 blur-3xl" />
          <div className="floating-orb absolute bottom-[20%] left-[40%] w-72 h-72 rounded-full bg-amber-500/5 dark:bg-amber-500/10 blur-3xl" />
        </div>

        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Main content */}
        <div
          ref={containerRef}
          className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-[72px]"
        >
          {/* Decorative diamond */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: 'backOut', delay: 0.1 }}
            className="mb-8"
          >
            <Diamond weight="fill" size={28} className="text-primary animate-pulse" />
          </motion.div>

          {/* 404 Numbers */}
          <div ref={numbersRef} className="flex items-center gap-2 sm:gap-4 mb-8" style={{ perspective: '1000px' }}>
            <span className="digit text-[120px] sm:text-[160px] md:text-[200px] lg:text-[240px] font-serif font-bold leading-none text-gray-900 dark:text-white select-none" style={{ textShadow: '0 0 80px rgba(255,92,53,0.15)' }}>
              4
            </span>
            <span className="digit digit-zero text-[120px] sm:text-[160px] md:text-[200px] lg:text-[240px] font-serif font-bold leading-none text-primary select-none inline-block origin-center" style={{ textShadow: '0 0 80px rgba(255,92,53,0.3)' }}>
              0
            </span>
            <span className="digit text-[120px] sm:text-[160px] md:text-[200px] lg:text-[240px] font-serif font-bold leading-none text-gray-900 dark:text-white select-none" style={{ textShadow: '0 0 80px rgba(255,92,53,0.15)' }}>
              4
            </span>
          </div>

          {/* Subtitle */}
          <h1 className="notfound-subtitle font-serif italic text-2xl sm:text-3xl md:text-4xl text-gray-900 dark:text-white tracking-wide mb-4 text-center">
            Lost in Luxury
          </h1>

          {/* Description */}
          <p className="notfound-desc text-gray-500 dark:text-slate-400 text-sm sm:text-base max-w-md text-center leading-relaxed font-light mb-10">
            The page you're looking for has been moved, renamed, or perhaps never existed.
            Let us guide you back to somewhere beautiful.
          </p>

          {/* Action Buttons */}
          <div className="notfound-actions flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="group flex items-center gap-3 bg-primary hover:bg-[#ff6b42] text-white font-bold py-3.5 px-8 rounded-lg text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_0_30px_rgba(255,92,53,0.3)] hover:shadow-[0_0_40px_rgba(255,92,53,0.5)]"
            >
              <House size={18} weight="fill" className="group-hover:-translate-y-0.5 transition-transform" />
              Back to Home
            </button>
            <button
              onClick={() => navigate('/collection')}
              className="group flex items-center gap-3 border border-gray-300 dark:border-white/10 text-gray-700 dark:text-white font-bold py-3.5 px-8 rounded-lg text-xs uppercase tracking-widest hover:bg-gray-100 dark:hover:bg-white/5 hover:border-gray-400 dark:hover:border-white/20 transition-all duration-300"
            >
              <MagnifyingGlass size={18} className="group-hover:rotate-12 transition-transform" />
              Explore Collection
            </button>
          </div>

          {/* Go back link */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            onClick={() => navigate(-1)}
            className="mt-12 flex items-center gap-2 text-gray-400 dark:text-slate-500 text-xs uppercase tracking-widest hover:text-primary transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Go Back
          </motion.button>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: 'circOut', delay: 0.5 }}
            className="absolute bottom-32 left-1/2 -translate-x-1/2 w-32 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent"
          />
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </PageTransition>
  )
}
