import { useState } from 'react'
import { ArrowRight, X } from '@phosphor-icons/react'

export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false)
  const [hovered, setHovered] = useState(false)

  if (dismissed) return null

  return (
    <div
      className="absolute bottom-8 right-8 z-20"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Expanded card on hover */}
      <div
        className={`absolute bottom-14 right-0 w-[300px] transition-all duration-300 origin-bottom-right ${
          hovered
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-90 translate-y-2 pointer-events-none'
        }`}
      >
        <div className="relative bg-black/60 backdrop-blur-xl border border-white/15 rounded-2xl p-5 shadow-2xl shadow-black/40">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-primary font-bold tracking-wider text-[10px] uppercase animate-pulse-live">Live</span>
            <span className="text-white/40 text-xs">|</span>
            <span className="text-xs font-mono text-gray-400">
              Starts in <span className="text-white font-bold">15:24</span>
            </span>
          </div>
          <h4 className="text-white text-sm font-semibold mb-1 leading-snug pr-6">
            Summer Collection Showcase
          </h4>
          <p className="text-gray-400 text-xs mb-4 leading-relaxed">
            Join Isabella V. for an exclusive preview of this season's curated essentials.
          </p>
          <a
            className="inline-flex items-center gap-2 bg-primary hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full transition-colors duration-300 shadow-lg shadow-primary/25"
            href="#"
          >
            Join Now
            <ArrowRight weight="bold" size={12} />
          </a>
        </div>
      </div>

      {/* Circle trigger */}
      <button className="relative w-12 h-12 rounded-full bg-gradient-to-br from-[#2a1a0a] to-[#1a0f05] backdrop-blur-xl border border-amber-500/20 shadow-xl shadow-primary/15 flex items-center justify-center cursor-pointer hover:border-primary/50 hover:shadow-primary/30 transition-all duration-300 group">
        <span className="flex h-2.5 w-2.5 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
        </span>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[8px] font-bold rounded-full flex items-center justify-center shadow-md">
          1
        </span>
      </button>
    </div>
  )
}
