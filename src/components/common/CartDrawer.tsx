import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, ArrowRight, Lock } from '@phosphor-icons/react'
import { useCart } from '../../context/CartContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const mockCartItems = [
  {
    id: 1,
    name: "Pro Audio ANC",
    category: "Matte Black • Wireless BT 5.2",
    price: 299.00,
    quantity: 1,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDl7iwUqxBSEtEN8aL5I_ARy7UnLMjVDKtS_m6hRVQG4gU4w3D4bfkAsEUUDNlzfmIc_A38LMKjOXNzNcSOquJE98uLHV28NkrItRDNc-EJjTS51JPjCBX--DeKzhh6S5qDW6WxnM0WeL819OuEwld4tIBzxHhhsrf7lpyMS5ySuCO15eao-xNKTnetd8TCyf7_RHWyyDppIbVYyWtjz07p1KPRIHItLIbRaQK0DH4wDSqh4wuT9n_Qbil45nt9C9lX1LpAoMH0hl8"
  },
  {
    id: 2,
    name: "Ultra-HD 4K Camera",
    category: "4K Ultra HD • Wide Angle Lens",
    price: 149.00,
    quantity: 1,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBOzMF423nUkZEQ90UYbT4EcnPUiI4DgtWEjWq32R1Vo-KiF9j5jlbncK95Y7A5Dx3dIW514XVjwpF-WCl-l8BzIluX495ans7ELMQEgkPIoKzN7T_MV979T6GMkivJyeFiIx0BfeIBpAo5vIxQOpvuJz3QpvdTjD2lpTbkVN2Oqwfu8AnBUiyI3jKtSDmptS0wvkfYBJuZ7eM0O5YnNyjVjiV-F2SzSMpaqLyKsWQrH8kLZJJrOPteGWMhW3DmnL327K7VU1DJor4"
  }
]

export default function CartDrawer() {
  const { isCartOpen, closeCart } = useCart()
  const navigate = useNavigate()
  
  const subtotal = mockCartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  const tax = subtotal * 0.08
  const total = subtotal + tax
  
  const shippingThreshold = 500
  const progressToFreeShipping = Math.min((subtotal / shippingThreshold) * 100, 100)
  const amountToFreeShipping = Math.max(shippingThreshold - subtotal, 0)

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isCartOpen])

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-150 overflow-hidden font-sans flex justify-end">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
          />

          {/* Drawer - Broader responsive container (w-full on mobile, up to 960px on desktop) */}
          <motion.div
            className="relative h-full w-full lg:w-[800px] xl:w-[960px] max-w-full bg-surface-light dark:bg-[#0a0a0a] shadow-[-20px_0_40px_-10px_rgba(0,0,0,0.3)] flex flex-col selection:bg-primary selection:text-white"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="px-6 py-5 md:px-8 border-b border-gray-100 dark:border-white/10 flex items-center justify-between bg-white dark:bg-[#0a0a0a] z-20 shrink-0">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-1">Shopping Bag</span>
                <h2 className="text-2xl md:text-3xl font-serif font-medium tracking-tight text-gray-900 dark:text-white italic leading-none">Your Selection</h2>
              </div>
              <button 
                onClick={closeCart}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label="Close cart"
              >
                <X size={24} weight="light" />
              </button>
            </div>

            {/* Free Shipping Tracker */}
            <div className="bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/5 px-6 md:px-8 py-3 shrink-0">
              <div className="flex justify-between items-end mb-2">
                <span className="text-[11px] text-gray-900 dark:text-white font-medium uppercase tracking-wider">
                  {amountToFreeShipping > 0 
                    ? `You're $${amountToFreeShipping.toFixed(2)} away from complimentary shipping` 
                    : 'Complimentary White-Glove Shipping Unlocked'}
                </span>
                <span className="text-[10px] text-gray-500">{progressToFreeShipping.toFixed(0)}%</span>
              </div>
              <div className="h-1 w-full bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressToFreeShipping}%` }}
                  transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                  className="h-full bg-primary"
                />
              </div>
            </div>

            {/* 2-Column Responsive Content Area */}
            <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">
                
              {/* LEFT COLUMN: Cart Items List & Upsells */}
              <div className="flex-1 overflow-y-hidden p-6 md:p-8 space-y-8 bg-surface-light dark:bg-[#0a0a0a]">
                
                {/* Items */}
                <div className="flex flex-col gap-4">
                  {mockCartItems.map((item) => (
                    <div key={item.id} className="group relative flex gap-5 p-4 bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300">
                      <div className="shrink-0">
                        <div className="h-24 w-24 md:h-28 md:w-28 bg-gray-50 dark:bg-white/5 flex items-center justify-center overflow-hidden">
                          <img alt={item.name} className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal opacity-90 transition-transform duration-700 group-hover:scale-105" src={item.image} />
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col justify-between py-1">
                        <div className="flex justify-between items-start gap-4">
                          <div className="space-y-1">
                            <h3 className="text-base md:text-lg font-medium text-gray-900 dark:text-white font-serif tracking-tight">{item.name}</h3>
                            <div className="flex flex-col text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400">
                              {item.category.split(' • ').map((spec, i) => (
                                  <p key={i}>{spec}</p>
                              ))}
                            </div>
                          </div>
                          <button aria-label="Remove item" className="text-gray-300 dark:text-gray-600 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-300 mt-1">
                            <X size={16} weight="light" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-3 border border-gray-200 dark:border-white/10 rounded-full px-2 py-1">
                            <button className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                              <Minus size={12} weight="bold" />
                            </button>
                            <span className="text-xs font-medium w-6 text-center text-gray-900 dark:text-white">{item.quantity}</span>
                            <button className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                              <Plus size={12} weight="bold" />
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="text-base md:text-lg font-light text-gray-900 dark:text-white">${item.price.toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT COLUMN: Checkout Footer (Desktop side, Mobile bottom) */}
              <div className="w-full lg:w-[320px] xl:w-[380px] shrink-0 bg-white/95 dark:bg-[#111]/95 md:bg-white md:dark:bg-[#111] backdrop-blur-md border-t lg:border-t-0 lg:border-l border-gray-100 dark:border-white/10 p-4 sm:p-6 lg:p-8 flex flex-col justify-between shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] lg:shadow-none z-10">
                <div className="flex flex-col gap-2 lg:gap-4 mb-3 lg:mb-6">
                  <h3 className="hidden lg:block text-xl font-serif italic text-gray-900 dark:text-white border-b border-gray-100 dark:border-white/10 pb-4 mb-2">Order Summary</h3>
                  
                  <div className="flex justify-between items-center text-sm font-light">
                    <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
                    <span className="text-gray-900 dark:text-white font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-light">
                    <span className="text-gray-500 dark:text-gray-400">Shipping</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">Complimentary</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-light">
                    <span className="text-gray-500 dark:text-gray-400">Tax Estimate</span>
                    <span className="text-gray-900 dark:text-white font-medium">${tax.toFixed(2)}</span>
                  </div>
                  
                  {/* Promo Code nested in summary on desktop */}
                  <div className="hidden lg:block mt-4 pt-4 border-t border-gray-100 dark:border-white/5">
                    <div className="flex gap-2 mb-1">
                      <input 
                        className="flex-1 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-sm text-sm px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary font-light outline-none transition-all" 
                        placeholder="Gift card or promo code" 
                        type="text"
                      />
                      <button className="bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white px-4 text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-gray-200 dark:hover:bg-white/20 transition-colors">
                        Apply
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-auto">
                  <div className="h-px bg-gray-200 dark:bg-white/10 w-full mb-4"></div>
                  
                  <div className="flex justify-between items-end mb-6">
                    <span className="text-lg font-serif italic text-gray-900 dark:text-white">Total</span>
                    <span className="text-3xl font-light text-gray-900 dark:text-white tracking-tight">${total.toFixed(2)}</span>
                  </div>

                  <div className="space-y-3">
                    <button 
                      onClick={() => {
                        closeCart()
                        navigate('/checkout')
                      }}
                      className="group w-full h-14 relative overflow-hidden flex items-center justify-center gap-3 bg-primary text-white text-sm uppercase tracking-[0.15em] hover:bg-[#e04f2d] hover:shadow-lg shadow-primary/20 transition-all duration-300 rounded-sm"
                    >
                      <span className="font-semibold">Proceed to Checkout</span>
                      <ArrowRight size={18} weight="bold" className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  <div className="hidden lg:flex items-center justify-center gap-2 mt-6 text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500">
                    <Lock size={12} weight="fill" className="text-emerald-500" />
                    <span>256-bit Encrypted Transaction</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
