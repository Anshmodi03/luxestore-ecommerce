import { ArrowRight } from '@phosphor-icons/react'

export default function AnnouncementBar() {
  return (
    <div className="sticky top-0 z-[60] w-full bg-[#1A1A1A] text-white overflow-hidden animate-slide-down shadow-lg border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 h-12 flex items-center justify-between text-sm">
        <div className="flex items-center gap-3">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
          </span>
          <div className="flex items-center gap-2 font-medium">
            <span className="text-primary font-bold tracking-wider text-xs animate-pulse-live">LIVE</span>
            <span className="hidden sm:inline text-gray-300">|</span>
            <span className="truncate max-w-[200px] sm:max-w-none">Summer Collection Showcase with Isabella V.</span>
          </div>
        </div>
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-gray-400 bg-white/5 px-3 py-1 rounded">
            <span>Starts in</span>
            <span className="text-white font-bold">15:24</span>
          </div>
          <a
            className="flex items-center gap-2 bg-primary hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full transition-colors duration-300 shadow-lg shadow-primary/20"
            href="#"
          >
            Join Now
            <ArrowRight weight="bold" />
          </a>
        </div>
      </div>
    </div>
  )
}
