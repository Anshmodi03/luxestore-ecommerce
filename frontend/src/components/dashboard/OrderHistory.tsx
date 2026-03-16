import { useEffect, useRef, useState } from 'react'
import { CaretRight, ArrowRight } from '@phosphor-icons/react'
import { gsap } from 'gsap'
import { getOrders } from '../../services/order.service'

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-yellow-900/20 text-yellow-400 border-yellow-500/20',
  confirmed: 'bg-blue-900/20 text-blue-400 border-blue-500/20',
  processing: 'bg-blue-900/20 text-blue-400 border-blue-500/20',
  shipped: 'bg-blue-900/20 text-blue-400 border-blue-500/20',
  delivered: 'bg-green-900/20 text-green-400 border-green-500/20 shadow-[0_0_10px_rgba(74,222,128,0.1)]',
  cancelled: 'bg-red-900/20 text-red-400 border-red-500/20',
}

const DOT_STYLES: Record<string, string> = {
  pending: 'bg-yellow-400',
  confirmed: 'bg-blue-400',
  processing: 'bg-blue-400 animate-pulse',
  shipped: 'bg-blue-500 animate-pulse',
  delivered: 'bg-green-500',
  cancelled: 'bg-red-400',
}

export default function OrderHistory() {
  const listRef = useRef<HTMLDivElement>(null)
  const [orders, setOrders] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getOrders(1, 5)
      .then(res => setOrders(res.data || []))
      .catch(() => setOrders([]))
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    if (!listRef.current || isLoading) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.order-header',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', delay: 0.6 }
      )
      gsap.fromTo(
        '.order-row',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out', delay: 0.7 }
      )
    }, listRef)
    return () => ctx.revert()
  }, [isLoading])

  return (
    <div ref={listRef} className="flex flex-col gap-6 sm:gap-8">
      <div className="order-header flex items-end justify-between border-b border-white/5 pb-4">
        <h2 className="text-xl sm:text-2xl font-serif italic text-gray-900 dark:text-white">Recent Orders</h2>
        <a
          className="micro-type text-primary hover:text-white transition-colors flex items-center gap-1 group cursor-pointer"
          href="#"
        >
          View All{' '}
          <ArrowRight size={14} weight="bold" className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      <div className="flex flex-col gap-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="order-row glass-card p-4 sm:p-5 rounded-xl flex gap-4 animate-pulse">
              <div className="h-16 w-16 bg-white/10 rounded-lg shrink-0" />
              <div className="flex-1 space-y-2 py-1">
                <div className="h-3 bg-white/10 rounded w-1/3" />
                <div className="h-3 bg-white/10 rounded w-2/3" />
              </div>
            </div>
          ))
        ) : orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-400 dark:text-slate-500 text-sm mb-4">No orders yet. Start shopping!</p>
            <a href="/collection" className="text-primary text-sm font-medium hover:underline">Browse Collection →</a>
          </div>
        ) : (
          orders.map((order) => {
            const status = (order.status || 'pending').toLowerCase()
            const firstItem = order.items?.[0]
            const imageUrl = firstItem?.product?.images?.[0]?.url || firstItem?.image || ''
            const productName = firstItem?.product?.name || firstItem?.name || 'Order Item'

            return (
              <div
                key={order._id || order.orderNumber}
                className="order-row glass-card p-4 sm:p-5 rounded-xl flex flex-col sm:flex-row items-center gap-4 sm:gap-6 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
              >
                {/* Thumbnail */}
                <div className="h-16 w-16 sm:h-20 sm:w-20 shrink-0 rounded-lg overflow-hidden border border-white/10">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={productName}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-white/5 flex items-center justify-center text-slate-600 text-xs">No img</div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 w-full sm:w-auto text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-3 mb-1">
                    <p className="text-gray-900 dark:text-white font-medium font-serif italic text-base sm:text-lg">
                      Order #{order.orderNumber}
                    </p>
                    <span className={`h-1.5 w-1.5 rounded-full ${DOT_STYLES[status] || 'bg-slate-400'}`} />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-slate-400">
                    {productName} • ${order.total?.toFixed(2) || '—'}
                  </p>
                </div>

                {/* Status + Date */}
                <div className="flex flex-col items-center sm:items-end gap-2">
                  <span className={`px-3 py-1 rounded-full micro-type border ${STATUS_STYLES[status] || 'bg-white/5 text-slate-400 border-white/10'}`}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>

                {/* Chevron */}
                <div className="hidden sm:block text-slate-600 group-hover:text-primary transition-colors pl-2">
                  <CaretRight size={20} />
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
