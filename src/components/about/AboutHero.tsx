import { useState, useEffect } from 'react'

export default function AboutHero() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="@container relative" id="hero-section">
      <div className="relative h-[700px] md:h-[850px] overflow-hidden flex items-center justify-center p-4">
        {/* Parallax Background */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat origin-center z-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.55) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAJem4OMKg69ilhZ2OJzLLeoBNKhA4GXvNLiSfW_fwFlmW30pF8PCyV4GnT5FIigPzq6zedSx1zDKYMEiZh9fnAP5II1FHXzGYIvsL5MSsNZw4NlJ6EXyn7aZVeWvabYfkKBtZyMIDhsQ1TJ-mTMF2ux5PUxzYRXdkC-W6oO4CKCh5TPo10GdBCRyzjJLR53BhwffEU-vv9Jr1Nfnv_hy39fp2ZpeW3IiMU_PJlg3EaqmAFPn6dEKwaWbsinoNJ8yIjAYigDe7wcbI")',
            transform: `translate3d(0, ${scrollY <= 1000 ? scrollY * 0.4 : 400}px, 0) scale(${1 + (scrollY <= 1000 ? scrollY / 1500 : 1000/1500)})`,
            willChange: 'transform'
          }}
        />

        {/* Parallax Content */}
        <div 
          className="relative z-10 max-w-[800px] flex flex-col items-center gap-6 px-6 pointer-events-auto text-center"
          style={{
            transform: `translate3d(0, ${scrollY <= 1000 ? scrollY * -0.15 : -150}px, 0)`,
            opacity: Math.max(0, 1 - (scrollY / 800)),
            willChange: 'transform, opacity'
          }}
        >
          <span className="text-white font-bold uppercase tracking-[0.2em] text-xs md:text-sm bg-black/20 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20">
            Since 1985
          </span>
          <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-serif font-normal leading-tight tracking-tight drop-shadow-2xl">
            Our Story: <br /> <span className="font-bold italic">Excellence by Design</span>
          </h1>
          <p className="text-white/90 text-lg md:text-xl font-normal leading-relaxed max-w-2xl drop-shadow-md mx-auto">
            We don't just manufacture products; we curate legacies. Discover the meticulous artistry that defines the LuxeStore standard.
          </p>
          <div className="pt-8">
            <button className="flex min-w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-8 bg-white text-gray-900 hover:bg-slate-100 transition-all duration-300 text-base font-bold leading-normal tracking-wide shadow-xl group hover:scale-105">
              <span>Watch Film</span>
              <span className="material-symbols-outlined ml-2 transition-transform duration-300 group-hover:translate-x-1 text-[22px]">play_circle</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
