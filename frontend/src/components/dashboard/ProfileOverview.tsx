import { useEffect, useRef, useState } from 'react'
import { ShoppingBag, Heart, Diamond } from '@phosphor-icons/react'
import { gsap } from 'gsap'
import { getProfile } from '../../services/user.service'
import { getOrders } from '../../services/order.service'
import { getWishlist } from '../../services/wishlist.service'

export default function ProfileOverview() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [firstName, setFirstName] = useState('')
  const [totalOrders, setTotalOrders] = useState<number | null>(null)
  const [wishlistCount, setWishlistCount] = useState<number | null>(null)

  useEffect(() => {
    getProfile()
      .then(user => setFirstName(user.firstName || user.email?.split('@')[0] || 'Guest'))
      .catch(() => {})
    getOrders(1, 1)
      .then(res => setTotalOrders(res.pagination?.total ?? res.data?.length ?? 0))
      .catch(() => setTotalOrders(0))
    getWishlist()
      .then(items => setWishlistCount(Array.isArray(items) ? items.length : 0))
      .catch(() => setWishlistCount(0))
  }, [])

  const stats = [
    {
      label: 'Total Orders',
      value: totalOrders !== null ? String(totalOrders) : '—',
      sub: 'Lifetime',
      icon: ShoppingBag,
      accent: false,
    },
    {
      label: 'Wishlist',
      value: wishlistCount !== null ? String(wishlistCount) : '—',
      sub: 'Saved Items',
      icon: Heart,
      accent: false,
    },
    {
      label: 'Loyalty Points',
      value: '3,250',
      sub: 'Gold Tier',
      icon: Diamond,
      accent: true,
    },
  ]

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.dash-heading',
        { y: 40, opacity: 0, filter: 'blur(8px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out', delay: 0.2 }
      )
      gsap.fromTo(
        '.dash-subtext',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.4 }
      )
      gsap.fromTo(
        '.stat-card',
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power3.out',
          delay: 0.5,
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="flex flex-col gap-8 sm:gap-12">
      {/* Welcome */}
      <div className="flex flex-col gap-3 pt-4">
        <h1 className="dash-heading font-serif italic text-4xl sm:text-5xl md:text-6xl text-gray-900 dark:text-white leading-tight tracking-wide">
          Welcome back,{' '}
          <span className="bg-clip-text text-transparent bg-linear-to-r from-gray-900 via-gray-900 to-gray-400 dark:from-white dark:via-white dark:to-slate-400">
            {firstName || '…'}
          </span>
        </h1>
        <p className="dash-subtext text-gray-500 dark:text-slate-400 max-w-lg text-sm tracking-wide font-light leading-relaxed">
          Manage your account ecosystem, view your recent activity, and explore exclusive elite
          member benefits crafted just for you.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className={`stat-card glass-card glass-card-hover rounded-2xl p-6 sm:p-8 flex flex-col gap-6 group hover:-translate-y-1 ${
                stat.accent ? 'relative overflow-hidden border-primary/20' : ''
              }`}
            >
              {stat.accent && (
                <div className="absolute top-0 right-0 p-20 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none opacity-50 group-hover:opacity-80 transition-opacity duration-700" />
              )}
              <div className="flex items-center justify-between relative z-10">
                <div
                  className={`p-2.5 rounded-full border transition-transform duration-500 group-hover:scale-110 ${
                    stat.accent
                      ? 'bg-primary/20 text-primary border-primary/30 animate-pulse-glow'
                      : 'bg-primary/5 text-primary border-primary/10'
                  }`}
                >
                  <Icon size={20} weight="fill" />
                </div>
                <span className={`micro-type ${stat.accent ? 'text-primary' : 'text-slate-500'}`}>
                  {stat.sub}
                </span>
              </div>
              <div className="relative z-10">
                <p className="micro-type text-gray-400 dark:text-slate-400 mb-2">{stat.label}</p>
                <p className="font-serif italic text-3xl sm:text-4xl text-gray-900 dark:text-white">{stat.value}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
