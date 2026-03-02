import { useEffect, useRef, ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollRevealProps {
  children: ReactNode
  /** Animation variant */
  variant?: 'fade-up' | 'fade-left' | 'fade-right' | 'scale' | 'clip-up'
  /** Delay in seconds */
  delay?: number
  /** Duration in seconds */
  duration?: number
  /** Additional className */
  className?: string
  /** Stagger children by this amount (seconds) */
  stagger?: number
  /** Whether to animate direct children individually */
  staggerChildren?: boolean
}

export default function ScrollReveal({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 1,
  className = '',
  stagger = 0.1,
  staggerChildren = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const targets = staggerChildren ? el.children : [el]

    const fromVars: gsap.TweenVars = { opacity: 0 }
    const toVars: gsap.TweenVars = {
      opacity: 1,
      duration,
      delay,
      ease: 'power3.out',
      stagger: staggerChildren ? stagger : 0,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        end: 'bottom 20%',
        toggleActions: 'play none none none',
      },
    }

    switch (variant) {
      case 'fade-up':
        fromVars.y = 60
        toVars.y = 0
        break
      case 'fade-left':
        fromVars.x = -60
        toVars.x = 0
        break
      case 'fade-right':
        fromVars.x = 60
        toVars.x = 0
        break
      case 'scale':
        fromVars.scale = 0.9
        toVars.scale = 1
        break
      case 'clip-up':
        fromVars.clipPath = 'inset(100% 0 0 0)'
        toVars.clipPath = 'inset(0% 0 0 0)'
        fromVars.y = 30
        toVars.y = 0
        break
    }

    gsap.fromTo(targets, fromVars, toVars)

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill()
      })
    }
  }, [variant, delay, duration, stagger, staggerChildren])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
