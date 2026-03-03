import { useEffect, useRef } from 'react'
import { Diamond, SignOut, User, Package, MapPin, Heart, Gear } from '@phosphor-icons/react'
import { gsap } from 'gsap'

interface DashboardSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const navItems = [
  { id: 'profile', label: 'Profile Overview', icon: User },
  { id: 'orders', label: 'Orders', icon: Package },
  { id: 'addresses', label: 'Addresses', icon: MapPin },
  { id: 'wishlist', label: 'Wishlist', icon: Heart, badge: 8 },
  { id: 'settings', label: 'Settings', icon: Gear },
]

export default function DashboardSidebar({ activeTab, onTabChange }: DashboardSidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sidebarRef.current) return
    const items = sidebarRef.current.querySelectorAll('.sidebar-item')
    gsap.fromTo(
      items,
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out', delay: 0.3 }
    )
  }, [])

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        ref={sidebarRef}
        className="hidden lg:flex w-[280px] shrink-0 h-[calc(100vh-80px)] sticky top-[80px] overflow-y-auto border-r border-gray-200 dark:border-white/5 bg-white/80 dark:bg-[#080808]/80 backdrop-blur-xl flex-col justify-between p-6 z-20"
      >
        <div className="flex flex-col gap-10">
          {/* User profile */}
          <div className="sidebar-item flex items-center gap-4 px-2 pb-6 border-b border-gray-200 dark:border-white/5 pt-2">
            <div className="relative group cursor-pointer">
              <div
                className="h-14 w-14 rounded-full bg-cover bg-center ring-2 ring-primary/20 transition-all duration-300 group-hover:ring-primary/50"
                style={{
                  backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDMOz8iU8snW1Hg0bX-AaPjdWb1-2dL2x5lIP-4xcUr4mEmzrENmEAfviLRe3pfGp0PUW9YmhPU86C6GKaUCNYGA5N3vvKUif1ulAndQFURmHC1ApVo-jfuXgoDh6IEXJKl652WAVwyD0moch-m5HFANCTB7zvFDFoaiq1cvBlOBKyUTh1PvXefz9jH7Xwfn3f7H1KqpzFg40lueQL7uVpYL0N1KaX0I2P-Xno9WIINGDwr6pssoSZ2lVadJCA_c11DLNEbMplH9s8")`,
                }}
              />
              <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white animate-pulse-glow shadow-[0_0_15px_rgba(255,92,53,0.4)]">
                <Diamond weight="fill" size={12} />
              </div>
            </div>
            <div>
              <h2 className="text-lg font-serif italic text-gray-900 dark:text-white tracking-wide">Isabella M.</h2>
              <p className="micro-type text-primary mt-1">Gold Member</p>
            </div>
          </div>

          {/* Navigation links */}
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`sidebar-item dash-nav-link flex items-center gap-4 rounded-lg px-4 py-3.5 text-sm font-medium transition-all duration-300 w-full text-left group ${
                    isActive
                      ? 'active bg-primary/5 dark:bg-white/5 text-gray-900 dark:text-white'
                      : 'text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Icon
                    size={20}
                    weight={isActive ? 'fill' : 'regular'}
                    className={`transition-colors ${isActive ? 'text-primary' : 'group-hover:text-primary'}`}
                  />
                  <span className="tracking-wide">{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full bg-gray-200 dark:bg-white/10 px-1.5 text-[9px] font-bold text-gray-700 dark:text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              )
            })}
          </nav>
        </div>

        <button className="sidebar-item flex w-full items-center justify-center gap-3 rounded-lg border border-gray-200 dark:border-white/5 p-3.5 text-xs font-medium uppercase tracking-widest text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:border-gray-300 dark:hover:border-white/10 hover:text-gray-900 dark:hover:text-white transition-all duration-300 group">
          <SignOut size={18} className="group-hover:-translate-x-1 transition-transform" />
          Log Out
        </button>
      </aside>

      {/* Mobile tab bar */}
      <div className="lg:hidden sticky top-[72px] z-30 bg-white/95 dark:bg-[#080808]/95 backdrop-blur-xl border-b border-gray-200 dark:border-white/5">
        <div className="flex overflow-x-auto scrollbar-hide gap-1 px-4 py-3">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-xs font-medium transition-all duration-300 shrink-0 ${
                  isActive
                    ? 'bg-primary/15 text-primary border border-primary/30'
                    : 'text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white border border-transparent'
                }`}
              >
                <Icon size={16} weight={isActive ? 'fill' : 'regular'} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="flex h-4 min-w-[16px] items-center justify-center rounded-full bg-gray-200 dark:bg-white/10 px-1 text-[8px] font-bold text-gray-700 dark:text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}
