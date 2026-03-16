import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'

interface AuthSuccessOverlayProps {
  type: 'signin' | 'register'
  onComplete?: () => void
}

export default function AuthSuccessOverlay({ type, onComplete }: AuthSuccessOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          // Navigate to home FIRST so it loads underneath the overlay
          navigate('/', { state: { skipTransition: true } })
          // Then fade out the overlay to reveal home page
          const exitTl = gsap.timeline({ onComplete: () => onComplete?.() })
          exitTl.to('.success-content', { opacity: 0, y: -30, duration: 0.5 })
          exitTl.to('.success-overlay-bg', { opacity: 0, duration: 0.6 }, '-=0.2')
        }
      })

      // 1. Overlay background fades in
      tl.fromTo('.success-overlay-bg',
        { opacity: 0 },
        { opacity: 1, duration: 0.5 }
      )

      // 2. Diamond draws & fills (SVG path)
      tl.fromTo('.success-diamond-path',
        { strokeDashoffset: 400, fill: 'rgba(255,255,255,0)' },
        { strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut' },
        '-=0.2'
      )
      tl.to('.success-diamond-path', {
        fill: 'rgba(255,255,255,1)',
        duration: 0.6,
        ease: 'power2.in'
      }, '-=0.4')

      // 3. Diamond scales up with a pop and glow
      tl.to('.success-diamond-svg', {
        scale: 1.15, duration: 0.3, ease: 'power2.out'
      }, '-=0.1')
      tl.to('.success-diamond-svg', {
        scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)'
      })

      // 4. Glow ring expands from diamond
      tl.fromTo('.success-glow-ring',
        { scale: 0, opacity: 1 },
        { scale: 4, opacity: 0, duration: 1.2, ease: 'power2.out' },
        '-=0.8'
      )

      // 5. Golden particles burst out
      tl.fromTo('.success-particle',
        { scale: 0, opacity: 1 },
        {
          scale: 1,
          opacity: 0,
          duration: 1.5,
          ease: 'power2.out',
          stagger: { each: 0.03, from: 'center' }
        },
        '-=1.2'
      )

      // 6. Primary text reveals with clip-path
      tl.fromTo('.success-heading',
        { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 0.9, ease: 'power3.inOut' },
        '-=1'
      )

      // 7. Subtitle fades up
      tl.fromTo('.success-subtitle',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.4'
      )

      // 8. Decorative line draws
      tl.fromTo('.success-line',
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: 'power2.inOut' },
        '-=0.4'
      )

      // 9. Redirect text fades in
      tl.fromTo('.success-redirect-text',
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        '-=0.2'
      )

      // 10. Hold for a moment then exit
      tl.addPause('+=1.2')

    }, overlayRef)

    return () => ctx.revert()
  }, [navigate, onComplete])

  // Generate particle positions
  const particles = Array.from({ length: 24 }, (_, i) => {
    const angle = (i / 24) * Math.PI * 2
    const radius = 100 + Math.random() * 120
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius
    const size = 2 + Math.random() * 4
    const isGold = Math.random() > 0.4
    return { x, y, size, isGold }
  })

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-9999 flex items-center justify-center pointer-events-auto"
    >
      {/* Background */}
      <div className="success-overlay-bg absolute inset-0 bg-[#030303]" />

      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[200px]" />
      </div>

      {/* Content */}
      <div className="success-content relative z-10 flex flex-col items-center text-center">
        
        {/* Diamond + particles container */}
        <div className="relative w-48 h-48 flex items-center justify-center mb-8">
          
          {/* Glow ring */}
          <div className="success-glow-ring absolute w-16 h-16 rounded-full border border-primary/40" />

          {/* Particles */}
          <style>{particles.map((p, i) =>
            `.success-particle-${i}{width:${p.size}px;height:${p.size}px;background-color:${p.isGold ? '#c8956e' : '#ffffff'};transform:translate(${p.x}px,${p.y}px)}`
          ).join('')}</style>

          {particles.map((p, i) => (
            <div
              key={i}
              className={`success-particle success-particle-${i} absolute rounded-full left-1/2 top-1/2 opacity-80`}
            />
          ))}

          {/* Diamond SVG */}
          <svg
            className="success-diamond-svg relative z-10"
            width="64"
            height="64"
            viewBox="0 0 100 100"
          >
            <path
              className="success-diamond-path"
              d="M50 5 L95 50 L50 95 L5 50 Z"
              stroke="#ffffff"
              strokeWidth="1.5"
              fill="rgba(255,255,255,0)"
              strokeDasharray="400"
              strokeDashoffset="400"
            />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="success-heading text-4xl sm:text-5xl lg:text-6xl font-serif italic text-white mb-3 tracking-tight">
          {type === 'signin' ? 'Welcome Back' : 'Welcome Aboard'}
        </h1>

        {/* Subtitle */}
        <p className="success-subtitle text-[10px] sm:text-xs uppercase tracking-[0.35em] text-white/40 mb-8 font-light">
          {type === 'signin' 
            ? 'Your luxury shopping experience awaits' 
            : 'Your exclusive shopping journey begins now'
          }
        </p>

        {/* Decorative line */}
        <div className="success-line w-16 h-px bg-primary mb-8 origin-center" />

        {/* Redirect hint */}
        <p className="success-redirect-text text-[9px] uppercase tracking-[0.3em] text-white/20 flex items-center gap-2">
          <span className="inline-block w-4 h-px bg-white/20" />
          Taking you to the store
          <span className="inline-block w-4 h-px bg-white/20" />
        </p>
      </div>
    </div>
  )
}
