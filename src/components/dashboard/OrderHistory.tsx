import { useEffect, useRef } from 'react'
import { CaretRight, ArrowRight } from '@phosphor-icons/react'
import { gsap } from 'gsap'

const orders = [
  {
    id: '#84920',
    product: 'Limited Edition Sneaker',
    price: '$245.00',
    status: 'Delivered',
    statusColor: 'green',
    date: 'Oct 24, 2023',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBJGB7gdxOsGXaIXTBOWoTxGdXm2HYK5ODCDUN0jq-qJo2iqlKzjUebks4HgXUPAA2MW8ZSZEbgOcwehOS-WSgA3o8B037ZsuuOAWDRyzDhNY0VXYE995QU3v6EgEsqFBexRwLylFhhPcihOTouiDLnXjmkXeUn5-RCibj3p0Y_ckgI2TFST3K0KqZRgWc8Pv9vSStsrJFLlPnW3XbhCbHHEatlIoHHUSggGJ1-hcawRnGba5u9HpT2W1BGRhjxubExEplWbR-uQzA',
    pulsing: true,
  },
  {
    id: '#84815',
    product: 'Minimalist Watch',
    price: '$180.00',
    status: 'Shipped',
    statusColor: 'blue',
    date: 'Oct 20, 2023',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCC7-YRnKeuO6k-i3jqFOa6N79YnFnT7nkQx4Y_VA1hWrgIB6i5az7QECwwFJuyKR4GeB0MFjv-ETgMc8if-TiIm8-dAM8vjTvxHv5ytGiKuWeam4RFqf65DMNXpIA2PuoPw04H5a9Lc_aBMqUJ7U2EabXjk9lIUDJVSoxGHklRb4pqBKHMXU1ZDbqNo4uKOZJ2usCM4s0UteyZz0uiktpRPqx-zmd0t3yKiSbN49q2jhs5d-BsD4yL0qWTWfjZHyyurodR1KwAMZE',
    pulsing: false,
  },
  {
    id: '#83201',
    product: 'Leather Tote Bag',
    price: '$850.00',
    status: 'Delivered',
    statusColor: 'green',
    date: 'Sep 15, 2023',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAJQ7eaMhCD7DKx4xyVlRN6DiI6gc90fUzcAxUlkPteLWdmhP2XkexMIcDu6K-N7EgqUWx3HF-K81QbRhmN-2Cevfx_q4xWwJQeZzL-LWNJzH8zMhRfvb7ksYKad4aP_HgNqFh78mAXxkaAFRtfYFQ4Wt2AbQEqjWBE9eZ1q0HsURTAawH2_03YjHMJmAHIqOXAuNn0hBJoVmgNhp1DvHIpzlbjyxev2K3OIiwt0O6F0RDH9rXXvocoRzo_K7Z6hXDXNLrkYLcEyJM',
    pulsing: true,
  },
]

const statusStyles: Record<string, string> = {
  green: 'bg-green-900/20 text-green-400 border-green-500/20 shadow-[0_0_10px_rgba(74,222,128,0.1)]',
  blue: 'bg-blue-900/20 text-blue-400 border-blue-500/20',
}

const dotStyles: Record<string, string> = {
  green: 'bg-green-500',
  blue: 'bg-blue-500',
}

export default function OrderHistory() {
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!listRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.order-header',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
          delay: 0.6,
        }
      )
      gsap.fromTo(
        '.order-row',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.7,
        }
      )
    }, listRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={listRef} className="flex flex-col gap-6 sm:gap-8">
      <div className="order-header flex items-end justify-between border-b border-white/5 pb-4">
        <h2 className="text-xl sm:text-2xl font-serif italic text-gray-900 dark:text-white">Recent Orders</h2>
        <a
          className="micro-type text-primary hover:text-white transition-colors flex items-center gap-1 group cursor-pointer"
          href="#"
        >
          View All{' '}
          <ArrowRight
            size={14}
            weight="bold"
            className="group-hover:translate-x-1 transition-transform"
          />
        </a>
      </div>

      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="order-row glass-card p-4 sm:p-5 rounded-xl flex flex-col sm:flex-row items-center gap-4 sm:gap-6 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
          >
            {/* Thumbnail */}
            <div className="h-16 w-16 sm:h-20 sm:w-20 shrink-0 rounded-lg overflow-hidden border border-white/10">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url("${order.image}")` }}
              />
            </div>

            {/* Info */}
            <div className="flex-1 w-full sm:w-auto text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-3 mb-1">
                <p className="text-gray-900 dark:text-white font-medium font-serif italic text-base sm:text-lg">
                  Order {order.id}
                </p>
                <span
                  className={`h-1.5 w-1.5 rounded-full ${dotStyles[order.statusColor]} ${
                    order.pulsing ? 'animate-pulse' : ''
                  }`}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-slate-400">
                {order.product} • {order.price}
              </p>
            </div>

            {/* Status + Date */}
            <div className="flex flex-col items-center sm:items-end gap-2">
              <span
                className={`px-3 py-1 rounded-full micro-type border ${statusStyles[order.statusColor]}`}
              >
                {order.status}
              </span>
              <span className="text-xs text-slate-500 font-mono">{order.date}</span>
            </div>

            {/* Chevron */}
            <div className="hidden sm:block text-slate-600 group-hover:text-primary transition-colors pl-2">
              <CaretRight size={20} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
