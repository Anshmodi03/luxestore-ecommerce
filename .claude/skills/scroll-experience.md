# Scroll Experience — Lenis + GSAP ScrollTrigger

## Lenis Smooth Scroll Setup
```jsx
import Lenis from 'lenis'
import { useEffect } from 'react'

function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,           // scroll smoothness
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // ease out expo
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,      // mobile scroll speed
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])
}
```

## Lenis + GSAP ScrollTrigger Integration
```jsx
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

useEffect(() => {
  const lenis = new Lenis()

  // Sync Lenis scroll position with GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update)

  // Use GSAP ticker for Lenis raf
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)

  return () => {
    gsap.ticker.remove(lenis.raf)
    lenis.destroy()
  }
}, [])
```

## React Context Provider Pattern
```jsx
'use client'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const LenisContext = createContext(null)
export const useLenisContext = () => useContext(LenisContext)

export function LenisProvider({ children }) {
  const [lenis, setLenis] = useState(null)

  useEffect(() => {
    const instance = new Lenis({ duration: 1.2, smoothWheel: true })

    instance.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => instance.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    setLenis(instance)
    return () => instance.destroy()
  }, [])

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  )
}

// Usage: scroll to section
function NavLink({ target }) {
  const lenis = useLenisContext()
  return (
    <button onClick={() => lenis?.scrollTo(target, { duration: 1.5 })}>
      Go to section
    </button>
  )
}
```

## Parallax Sections
```jsx
// Multi-layer parallax
function ParallaxHero() {
  const containerRef = useRef()

  useGSAP(() => {
    const layers = gsap.utils.toArray('.parallax-layer')
    layers.forEach((layer, i) => {
      const speed = layer.dataset.speed || (i + 1) * 0.2
      gsap.to(layer, {
        yPercent: -speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      })
    })
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden">
      <div className="parallax-layer absolute inset-0" data-speed="0.1">
        <img src="/bg-far.jpg" className="w-full h-full object-cover" />
      </div>
      <div className="parallax-layer absolute inset-0" data-speed="0.3">
        <img src="/bg-mid.png" className="w-full h-full object-cover" />
      </div>
      <div className="parallax-layer absolute inset-0" data-speed="0.5">
        <h1 className="text-6xl font-bold text-center pt-40">Shop Now</h1>
      </div>
    </div>
  )
}
```

## Horizontal Scroll
```jsx
function HorizontalScroll({ children }) {
  const containerRef = useRef()
  const panelsRef = useRef()

  useGSAP(() => {
    const panels = gsap.utils.toArray('.h-panel')
    const totalWidth = panels.reduce((w, p) => w + p.offsetWidth, 0)

    gsap.to(panels, {
      x: () => -(totalWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        end: () => `+=${totalWidth}`,
        snap: {
          snapTo: 1 / (panels.length - 1),
          duration: { min: 0.2, max: 0.5 },
          ease: 'power1.inOut',
        },
        invalidateOnRefresh: true,
      }
    })
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="overflow-hidden">
      <div ref={panelsRef} className="flex">
        {children}
      </div>
    </div>
  )
}

// Usage
<HorizontalScroll>
  <div className="h-panel w-screen flex-shrink-0">Product 1</div>
  <div className="h-panel w-screen flex-shrink-0">Product 2</div>
  <div className="h-panel w-screen flex-shrink-0">Product 3</div>
</HorizontalScroll>
```

## Pinned Sections
```jsx
// Pin section while content animates
function PinnedFeature() {
  const containerRef = useRef()

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=300%',
        pin: true,
        scrub: 1,
      }
    })

    tl.from('.feature-1', { opacity: 0, y: 50 })
      .to('.feature-1', { opacity: 0, y: -50 })
      .from('.feature-2', { opacity: 0, y: 50 })
      .to('.feature-2', { opacity: 0, y: -50 })
      .from('.feature-3', { opacity: 0, y: 50 })
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="h-screen relative">
      <div className="feature-1 absolute inset-0 flex items-center justify-center">
        Feature 1
      </div>
      <div className="feature-2 absolute inset-0 flex items-center justify-center">
        Feature 2
      </div>
      <div className="feature-3 absolute inset-0 flex items-center justify-center">
        Feature 3
      </div>
    </div>
  )
}
```

## Scroll Progress Indicator
```jsx
function ScrollProgress() {
  useGSAP(() => {
    gsap.to('.progress-bar', {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      }
    })
  })

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50">
      <div className="progress-bar h-full bg-primary origin-left scale-x-0" />
    </div>
  )
}
```

## Common Pitfalls
- Call `ScrollTrigger.refresh()` after dynamic content loads or route changes
- Stop Lenis during modals: `lenis.stop()` / `lenis.start()`
- Use `invalidateOnRefresh: true` on ScrollTrigger when sizes change
- Mobile: set `scrub: true` (not number) for smoother touch response
- Pinned sections need `overflow: hidden` or `clip` on parent
- Kill ScrollTrigger instances on unmount via `useGSAP` cleanup
- Test with `markers: true` during development
