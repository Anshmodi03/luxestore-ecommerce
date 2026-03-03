import { useEffect, useRef } from 'react'
import { DotsThree, ArrowRight } from '@phosphor-icons/react'
import { gsap } from 'gsap'

export default function SavedAddresses() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.right-card',
        { y: 40, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          delay: 0.8,
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="flex flex-col gap-6 sm:gap-8">
      {/* Payment card */}
      <div className="right-card flex flex-col gap-4">
        <h2 className="text-lg sm:text-xl font-serif italic text-gray-900 dark:text-white pb-2 border-b border-gray-200 dark:border-white/5">
          Primary Method
        </h2>
        <div className="glass-card glass-card-hover p-5 sm:p-6 rounded-2xl bg-linear-to-br from-[#1a1a1a] to-[#0f0f0f] border border-white/5 relative overflow-hidden group">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/10 blur-2xl group-hover:bg-primary/20 transition-colors duration-500" />
          <div className="relative z-10 flex justify-between items-start mb-8 sm:mb-10">
            <img
              alt="Visa Logo"
              className="h-5 sm:h-6 opacity-90 brightness-0 invert"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCs8H5cSF85KFfNV8zdB5CnukH8YWtLaKK11cZnH86N7SGmnZl1ry7PITUvDrEEkDetY3jPg0xAsxL5_MNy1I61JUIqiOS_VHhQCNND_HwPXq_Dnbzq84JaifdFhNrRS3Q4lC5WEuW8XqdNv9lg7ileDKZCb7W1gGztyXTGe0bzZQz2qEp33evAAKULepBbs_-Wv700cwlfqdTcZfs2Fg0msss3YN8amKL-DR0wnMY6I1fsl_l8kT20h63WkV1wjrgQIbFMffCO5lI"
            />
            <DotsThree
              size={24}
              className="text-slate-500 cursor-pointer hover:text-white transition-colors"
            />
          </div>
          <div className="relative z-10 mb-4 sm:mb-6">
            <p className="micro-type text-slate-500 mb-2">Card Number</p>
            <div className="flex items-center gap-3 text-white text-base sm:text-lg tracking-widest font-mono">
              <span className="opacity-50">••••</span>
              <span className="opacity-50">••••</span>
              <span className="opacity-50">••••</span>
              <span>4242</span>
            </div>
          </div>
          <div className="relative z-10 flex justify-between items-end">
            <div>
              <p className="micro-type text-slate-500 mb-1">Holder</p>
              <p className="text-gray-900 dark:text-white text-sm font-medium tracking-wide">ISABELLA M.</p>
            </div>
            <div className="text-right">
              <p className="micro-type text-slate-500 mb-1">Exp.</p>
              <p className="text-gray-900 dark:text-white text-sm font-medium tracking-wide">12/25</p>
            </div>
          </div>
        </div>
      </div>

      {/* Promo / Collection CTA */}
      <div className="right-card relative overflow-hidden rounded-2xl border border-primary/20 group cursor-pointer">
        <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-primary/5 transition-all duration-500 group-hover:from-primary/20 group-hover:to-primary/10" />
        <div className="absolute top-0 right-0 p-24 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none group-hover:bg-primary/30 transition-colors duration-500" />
        <div className="relative z-10 p-6 sm:p-8 flex flex-col items-start text-left">
          <span className="micro-type text-primary mb-3 px-2 py-1 bg-primary/10 rounded">
            Just In
          </span>
          <h3 className="text-gray-900 dark:text-white font-serif italic text-2xl sm:text-3xl mb-3">
            Fall Collection
          </h3>
          <p className="text-gray-600 dark:text-slate-300 text-sm mb-5 sm:mb-6 font-light leading-relaxed">
            Exclusive early access for Gold Members. Discover the new era of luxury.
          </p>
          <button className="bg-primary hover:bg-[#ff6b42] text-white font-bold py-3 sm:py-3.5 px-6 sm:px-8 rounded-lg text-xs uppercase tracking-widest transition-all w-full flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,92,53,0.3)] hover:shadow-[0_0_30px_rgba(255,92,53,0.5)]">
            Browse Now
            <ArrowRight size={16} weight="bold" />
          </button>
        </div>
      </div>
    </div>
  )
}
