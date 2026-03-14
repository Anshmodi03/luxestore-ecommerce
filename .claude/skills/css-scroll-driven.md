# CSS Scroll-Driven Animations

## Browser Support & Progressive Enhancement
```css
/* Feature detection — always provide fallback */
@supports (animation-timeline: scroll()) {
  .animated-element {
    animation: fadeIn linear both;
    animation-timeline: scroll();
  }
}

/* Fallback: use Intersection Observer or GSAP ScrollTrigger */
```
Supported: Chrome 115+, Edge 115+. Not yet in Firefox/Safari (use JS fallback).

## Scroll Timeline (Page Progress)
```css
/* Animate based on scroll position of the page */
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: var(--primary);
  transform-origin: left;
  animation: grow-bar linear both;
  animation-timeline: scroll();
}

@keyframes grow-bar {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
```

## Named Scroll Timeline
```css
/* Track scroll of a specific container */
.scroll-container {
  overflow-y: auto;
  scroll-timeline-name: --product-scroll;
  scroll-timeline-axis: block;
}

.indicator {
  animation: slide linear both;
  animation-timeline: --product-scroll;
}

@keyframes slide {
  from { transform: translateX(0); }
  to { transform: translateX(100%); }
}
```

## View Timeline (Element Visibility)
```css
/* Animate as element enters/exits viewport */
.product-card {
  animation: reveal linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}

@keyframes reveal {
  from {
    opacity: 0;
    transform: translateY(50px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
```

## Animation Range
```css
/* Control when animation starts/ends relative to viewport */

/* Animate only during entry */
animation-range: entry 0% entry 100%;

/* Animate only during exit */
animation-range: exit 0% exit 100%;

/* Animate through full visibility */
animation-range: cover 0% cover 100%;

/* Animate while contained in viewport */
animation-range: contain 0% contain 100%;

/* Custom range: start at 20% entry, end at 80% exit */
animation-range: entry 20% exit 80%;
```

## Parallax with CSS Only
```css
.parallax-slow {
  animation: parallax-move linear both;
  animation-timeline: scroll();
}

@keyframes parallax-move {
  from { transform: translateY(0); }
  to { transform: translateY(-100px); }
}

.parallax-fast {
  animation: parallax-move-fast linear both;
  animation-timeline: scroll();
}

@keyframes parallax-move-fast {
  from { transform: translateY(0); }
  to { transform: translateY(-300px); }
}
```

## Header Shrink on Scroll
```css
.header {
  animation: shrink-header linear both;
  animation-timeline: scroll();
  animation-range: 0px 200px; /* Shrink within first 200px of scroll */
}

@keyframes shrink-header {
  from {
    padding-block: 1.5rem;
    font-size: 1.5rem;
    background: transparent;
  }
  to {
    padding-block: 0.5rem;
    font-size: 1rem;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
}
```

## Staggered Reveal (CSS Grid)
```css
.grid-item {
  animation: card-reveal linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 80%;
}

/* Stagger via animation-delay trick with custom properties */
.grid-item:nth-child(1) { --delay: 0; }
.grid-item:nth-child(2) { --delay: 0.05; }
.grid-item:nth-child(3) { --delay: 0.1; }
.grid-item:nth-child(4) { --delay: 0.15; }

@keyframes card-reveal {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

## E-Commerce Patterns
```css
/* Product image zoom on scroll into view */
.product-hero-img {
  animation: zoom-in linear both;
  animation-timeline: view();
  animation-range: entry 0% cover 50%;
}

@keyframes zoom-in {
  from { transform: scale(1.2); filter: blur(4px); }
  to { transform: scale(1); filter: blur(0); }
}

/* Category section text reveal */
.category-title {
  animation: text-slide linear both;
  animation-timeline: view();
  animation-range: entry 10% entry 90%;
}

@keyframes text-slide {
  from {
    opacity: 0;
    transform: translateX(-50px);
    clip-path: inset(0 100% 0 0);
  }
  to {
    opacity: 1;
    transform: translateX(0);
    clip-path: inset(0 0 0 0);
  }
}

/* Back-to-top button appears after scrolling */
.back-to-top {
  animation: show-btn linear both;
  animation-timeline: scroll();
  animation-range: 300px 400px;
}

@keyframes show-btn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
```

## When to Use CSS vs GSAP ScrollTrigger
| Feature | CSS Scroll-Driven | GSAP ScrollTrigger |
|---------|------------------|--------------------|
| Performance | GPU-composited, off main thread | Main thread JS |
| Pinning | Not supported | Full support |
| Scrub | Built-in | `scrub: true` |
| Callbacks | No | `onEnter`, `onLeave`, etc. |
| Complex timelines | Limited | Full timeline control |
| Browser support | Chrome/Edge only | All browsers |
| Horizontal scroll | Limited | Full support |

**Use CSS** for: simple reveals, parallax, progress bars, header effects.
**Use GSAP** for: pinning, complex sequences, cross-browser, callbacks, horizontal scroll.
**Use both**: CSS for simple decorative effects, GSAP for core interactions.
