import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [cursorText, setCursorText] = useState('')

  useEffect(() => {
    // Don't show on touch devices
    if ('ontouchstart' in window) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const pos = { x: 0, y: 0 }

    const onMouseMove = (e: MouseEvent) => {
      pos.x = e.clientX
      pos.y = e.clientY
      if (!isVisible) setIsVisible(true)

      // Dot follows instantly
      gsap.set(dot, { x: pos.x, y: pos.y })
      // Ring follows with smooth lag
      gsap.to(ring, { x: pos.x, y: pos.y, duration: 0.15, ease: 'power2.out' })
    }

    const onMouseEnter = () => setIsVisible(true)
    const onMouseLeave = () => setIsVisible(false)

    // Hover detection for interactive elements
    const onElementEnter = (e: Event) => {
      setIsHovering(true)
      const target = e.target as HTMLElement
      const text = target.dataset.cursorText || target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text') || ''
      setCursorText(text)
    }
    const onElementLeave = () => {
      setIsHovering(false)
      setCursorText('')
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mouseleave', onMouseLeave)

    // Attach hover listeners to interactive elements
    const hoverables = document.querySelectorAll('a, button, [role="button"], input, textarea, select, [data-cursor-hover]')
    hoverables.forEach((el) => {
      el.addEventListener('mouseenter', onElementEnter)
      el.addEventListener('mouseleave', onElementLeave)
    })

    // MutationObserver to handle dynamically added elements
    const observer = new MutationObserver(() => {
      const newHoverables = document.querySelectorAll('a, button, [role="button"], input, textarea, select, [data-cursor-hover]')
      newHoverables.forEach((el) => {
        el.removeEventListener('mouseenter', onElementEnter)
        el.removeEventListener('mouseleave', onElementLeave)
        el.addEventListener('mouseenter', onElementEnter)
        el.addEventListener('mouseleave', onElementLeave)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseleave', onMouseLeave)
      hoverables.forEach((el) => {
        el.removeEventListener('mouseenter', onElementEnter)
        el.removeEventListener('mouseleave', onElementLeave)
      })
      observer.disconnect()
    }
  }, [isVisible])

  // Don't render on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null

  return (
    <>
      {/* Hide system cursor globally */}
      <style>{`* { cursor: none !important; }`}</style>
      
      {/* Dot (inner) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-99999 pointer-events-none mix-blend-difference"
        style={{
          width: 8,
          height: 8,
          marginLeft: -4,
          marginTop: -4,
          borderRadius: '50%',
          backgroundColor: '#fff',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s',
        }}
      />

      {/* Ring (outer) */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-99999 pointer-events-none mix-blend-difference flex items-center justify-center"
        style={{
          width: isHovering ? 64 : 40,
          height: isHovering ? 64 : 40,
          marginLeft: isHovering ? -32 : -20,
          marginTop: isHovering ? -32 : -20,
          borderRadius: '50%',
          border: `1.5px solid rgba(255,255,255,${isHovering ? 0.6 : 0.3})`,
          opacity: isVisible ? 1 : 0,
          transition: 'width 0.3s cubic-bezier(0.16,1,0.3,1), height 0.3s cubic-bezier(0.16,1,0.3,1), margin 0.3s cubic-bezier(0.16,1,0.3,1), border-color 0.3s, opacity 0.3s',
          backdropFilter: isHovering ? 'blur(1px)' : 'none',
        }}
      >
        {cursorText && (
          <span className="text-white text-[8px] uppercase tracking-widest font-bold">
            {cursorText}
          </span>
        )}
      </div>
    </>
  )
}
