# Framer Motion for React

## Basic Animations
```jsx
import { motion } from 'framer-motion'

// Animate on mount
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: 'easeOut' }}
/>

// Hover & tap
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
/>
```

## Variants (Orchestrated Animations)
```jsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
}

const item = {
  hidden: { y: 30, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: 'spring', damping: 20 } }
}

function ProductGrid({ products }) {
  return (
    <motion.div variants={container} initial="hidden" animate="show">
      {products.map(p => (
        <motion.div key={p.id} variants={item} className="product-card">
          {p.name}
        </motion.div>
      ))}
    </motion.div>
  )
}
```

## AnimatePresence (Enter/Exit)
```jsx
import { AnimatePresence } from 'framer-motion'

// Route transitions
<AnimatePresence mode="wait">
  <motion.div
    key={pathname}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3 }}
  >
    <Outlet />
  </motion.div>
</AnimatePresence>

// Cart item removal
<AnimatePresence>
  {cartItems.map(item => (
    <motion.div
      key={item.id}
      layout
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0, transition: { duration: 0.2 } }}
    >
      <CartItem {...item} />
    </motion.div>
  ))}
</AnimatePresence>
```

## Layout Animations
```jsx
// Shared layout animation (product grid ↔ detail)
<motion.div layoutId={`product-${id}`}>
  <img src={product.image} />
</motion.div>

// Auto-animate layout changes
<motion.li layout transition={{ type: 'spring', stiffness: 500, damping: 30 }}>
  {content}
</motion.li>

// Layout group for independent layout animations
import { LayoutGroup } from 'framer-motion'
<LayoutGroup>
  <FilterTabs />
  <ProductGrid />
</LayoutGroup>
```

## Gestures
```jsx
// Drag
<motion.div
  drag="x"
  dragConstraints={{ left: -200, right: 200 }}
  dragElastic={0.2}
  onDragEnd={(e, info) => {
    if (info.offset.x > 100) nextSlide()
    if (info.offset.x < -100) prevSlide()
  }}
/>

// Pan (no DOM movement)
<motion.div
  onPan={(e, info) => console.log(info.point.x)}
  onPanEnd={(e, info) => {/* swipe logic */}}
/>
```

## Scroll Animations
```jsx
import { useScroll, useTransform, motion, useInView } from 'framer-motion'

// Scroll-linked parallax
function ParallaxHero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, -150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  return (
    <motion.div style={{ y, opacity }}>
      <h1>Hero Content</h1>
    </motion.div>
  )
}

// Scroll progress for element
function RevealSection() {
  const ref = useRef()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])

  return <motion.section ref={ref} style={{ scale }} />
}

// useInView for trigger-based
function FadeInWhenVisible({ children }) {
  const ref = useRef()
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  )
}
```

## Spring Physics
```jsx
// Snappy UI interactions
transition={{ type: 'spring', stiffness: 400, damping: 25 }}

// Bouncy (notifications, badges)
transition={{ type: 'spring', stiffness: 300, damping: 10 }}

// Smooth (page transitions)
transition={{ type: 'spring', stiffness: 100, damping: 20 }}

// Tween for precise control
transition={{ type: 'tween', duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
```

## E-Commerce Patterns
```jsx
// Modal/drawer with backdrop
<AnimatePresence>
  {isOpen && (
    <>
      <motion.div
        className="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className="modal"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        {children}
      </motion.div>
    </>
  )}
</AnimatePresence>

// Notification toast
<motion.div
  initial={{ opacity: 0, y: 50, scale: 0.3 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  exit={{ opacity: 0, y: 20, scale: 0.5 }}
  className="toast"
/>

// Image carousel
<AnimatePresence mode="wait" initial={false}>
  <motion.img
    key={currentIndex}
    src={images[currentIndex]}
    initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
    transition={{ duration: 0.3 }}
  />
</AnimatePresence>
```

## When to Use Framer Motion vs GSAP
- **Framer Motion**: React-native, component-level, layout animations, gestures, simple scroll
- **GSAP**: Complex timelines, ScrollTrigger with pin/scrub, text splitting, cross-framework
- **Both together**: Framer for component enter/exit, GSAP for scroll-driven sequences
