# GSAP Animation Patterns

## Core Animations
```jsx
import gsap from 'gsap'

// Basic tweens
gsap.to('.element', { x: 100, opacity: 1, duration: 1, ease: 'power2.out' })
gsap.from('.element', { y: 50, opacity: 0, duration: 0.8 })
gsap.fromTo('.element', { scale: 0 }, { scale: 1, duration: 0.5, ease: 'back.out(1.7)' })

// Set (instant, no animation)
gsap.set('.element', { visibility: 'visible' })
```

## Timelines
```jsx
const tl = gsap.timeline({ defaults: { duration: 0.8, ease: 'power3.out' } })

tl.from('.hero-title', { y: 100, opacity: 0 })
  .from('.hero-subtitle', { y: 50, opacity: 0 }, '-=0.4')  // overlap
  .from('.hero-cta', { scale: 0.8, opacity: 0 }, '-=0.3')
  .from('.hero-image', { x: 100, opacity: 0 }, '<')          // same start as previous

// Labels for control
tl.addLabel('reveal')
  .to('.overlay', { scaleY: 0 }, 'reveal')
  .from('.content', { opacity: 0 }, 'reveal+=0.2')
```

## React Integration with useGSAP
```jsx
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

function AnimatedSection() {
  const container = useRef()

  useGSAP(() => {
    // All animations auto-cleanup on unmount
    gsap.from('.card', {
      y: 60,
      opacity: 0,
      stagger: 0.15,
      scrollTrigger: {
        trigger: container.current,
        start: 'top 80%',
      }
    })
  }, { scope: container }) // scope limits querySelector to container

  return <div ref={container}>...</div>
}
```

## ScrollTrigger
```jsx
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// Reveal on scroll
gsap.from('.section', {
  scrollTrigger: {
    trigger: '.section',
    start: 'top 80%',       // trigger top hits 80% of viewport
    end: 'bottom 20%',
    toggleActions: 'play none none reverse',
    // markers: true,        // debug
  },
  y: 100,
  opacity: 0,
})

// Pinned section with scrub
gsap.to('.horizontal-panels', {
  xPercent: -100 * (panels.length - 1),
  ease: 'none',
  scrollTrigger: {
    trigger: '.horizontal-container',
    pin: true,
    scrub: 1,
    snap: 1 / (panels.length - 1),
    end: () => '+=' + document.querySelector('.horizontal-container').offsetWidth,
  }
})

// Batch for grid items
ScrollTrigger.batch('.grid-item', {
  onEnter: batch => gsap.from(batch, { y: 40, opacity: 0, stagger: 0.1 }),
  start: 'top 85%',
})
```

## SplitText
```jsx
import { SplitText } from 'gsap/SplitText'
gsap.registerPlugin(SplitText)

function TextReveal({ children }) {
  const textRef = useRef()

  useGSAP(() => {
    const split = new SplitText(textRef.current, { type: 'chars,words,lines' })

    gsap.from(split.chars, {
      y: 50,
      opacity: 0,
      rotateX: -90,
      stagger: 0.02,
      duration: 0.8,
      ease: 'back.out(1.7)',
      scrollTrigger: { trigger: textRef.current, start: 'top 80%' },
    })

    // Revert split on cleanup
    return () => split.revert()
  }, { scope: textRef })

  return <h2 ref={textRef}>{children}</h2>
}
```

## Stagger Patterns
```jsx
// Sequential
gsap.from('.item', { y: 30, opacity: 0, stagger: 0.1 })

// From center
gsap.from('.item', { scale: 0, stagger: { each: 0.1, from: 'center' } })

// Grid stagger
gsap.from('.grid-item', {
  scale: 0,
  stagger: { grid: [4, 4], from: 'center', each: 0.08 }
})

// Random
gsap.from('.particle', { opacity: 0, stagger: { each: 0.05, from: 'random' } })
```

## Easing
```jsx
// Common eases for e-commerce
'power2.out'     // smooth deceleration — default for most UI
'power3.inOut'   // elegant section transitions
'back.out(1.7)'  // slight overshoot — buttons, modals
'elastic.out(1, 0.3)'  // bouncy — notifications, badges
'expo.out'       // fast start, smooth stop — page transitions

// Custom ease
gsap.registerEase('custom', progress => {
  return progress * progress * (3 - 2 * progress) // smoothstep
})
```

## E-Commerce Animation Patterns
```jsx
// Product card hover
useGSAP(() => {
  const cards = gsap.utils.toArray('.product-card')
  cards.forEach(card => {
    const img = card.querySelector('img')
    const info = card.querySelector('.info')

    card.addEventListener('mouseenter', () => {
      gsap.to(img, { scale: 1.05, duration: 0.4 })
      gsap.to(info, { y: -10, opacity: 1, duration: 0.3 })
    })
    card.addEventListener('mouseleave', () => {
      gsap.to(img, { scale: 1, duration: 0.4 })
      gsap.to(info, { y: 0, duration: 0.3 })
    })
  })
}, { scope: container })

// Add to cart animation
function animateAddToCart(productEl, cartEl) {
  const clone = productEl.cloneNode(true)
  document.body.appendChild(clone)
  const cartRect = cartEl.getBoundingClientRect()
  const prodRect = productEl.getBoundingClientRect()

  gsap.set(clone, { position: 'fixed', left: prodRect.left, top: prodRect.top, zIndex: 9999 })
  gsap.to(clone, {
    left: cartRect.left, top: cartRect.top,
    scale: 0.2, opacity: 0,
    duration: 0.8, ease: 'power3.in',
    onComplete: () => clone.remove()
  })
}

// Page transition
function pageTransition(onComplete) {
  const tl = gsap.timeline()
  tl.to('.page-transition', { scaleY: 1, transformOrigin: 'bottom', duration: 0.5 })
    .add(onComplete)
    .to('.page-transition', { scaleY: 0, transformOrigin: 'top', duration: 0.5 })
}
```

## Performance Tips
- Use `will-change: transform` on animated elements (or let GSAP handle via `force3D: true`)
- Animate `transform` and `opacity` only — avoid `width`, `height`, `top`, `left`
- Use `gsap.ticker` instead of `requestAnimationFrame` for synchronized animations
- `ScrollTrigger.refresh()` after dynamic content loads
- Use `overwrite: 'auto'` to kill conflicting tweens
- Batch DOM reads/writes — GSAP does this internally, don't mix with manual DOM manipulation
- `fastScrollEnd: true` and `preventOverlaps: true` on ScrollTrigger for mobile
