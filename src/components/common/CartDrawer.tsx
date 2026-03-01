import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, ArrowRight } from '@phosphor-icons/react'
import { useCart } from '../../context/CartContext'

const mockCartItems = [
  {
    id: 1,
    name: "Pro Audio ANC",
    category: "Tech",
    price: 254.99,
    quantity: 1,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPo8P4cDxfdUKmudDqePbAHX7zlYOJs13ae7xww1fEo3xASV-mBZoG-dNjSY0FoyCbSku_LPnCIwtZoYSWAnxIFPqC8OSYUwty71F3V-wDzdGDNfjKXq3SzzauZG0N4r486WMbOupdxI5Fv59HZIBsWqb2OScbdVLNlj9yLvQUynGHODZW2SFUPkDdXR2oP62ypFaYQISJdhCPRtu_FDma_ScZdsYv_gZASC3gF4PSvF6VH94TEFKVcR8AQzVFDZ_Ui42kUka_TH8"
  },
  {
    id: 2,
    name: "Aviator Classic",
    category: "Eyewear",
    price: 145.00,
    quantity: 1,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAu38LODM6F6ETMFe7VUQkqeJuKd5qhruCwyto_oih1a4RjHfHWP9HQR1GfCKCIFxd_yz7Pl_jhZzTj_HCQCIx57in0taOrGfWFgpAMNt5FAiOieCEZaP7a0gKYgzudLp40i1N4anemEBkJVVDG4axA786f2AEiWsQtFf75rBdAlnk5aQaigsUzOxrZj83tWnOCNuJoWyiG-6Qa9lCI3YVZzwX4a8GHVBs4E45yCJkvHt6G0Pp8iXokQDW_L8eUIRIo9X1ob4nfcfI"
  }
]

const upSells = [
  { name: "Leather Strap", price: 45.00, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqw8xzMl7mB8PaL9Zjc7P3YswgWlPh6TO6uN-wnPvR7NvNyTvuLOgo9U3oeNxo22SeCwl5dNjhj_J8iMbnj2anuvS4e5QNIdSv3-vJ0BqNuv_Rb5RAYDxOaNde84RQEt9Z4mVo48xmq9ml7a1ZCFRld4ag4R3bNh-5R5ZTRhNObz_b5gs2sW-G5PnBv3PulIX4dOxd1F7N0u2e61ud8sACfxkedvYklkZg0YXYKDZ-3kMNnradL13aJN9bTlJM2I5cban544dMPF0" },
  { name: "Lens Cleaner", price: 12.00, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAu38LODM6F6ETMFe7VUQkqeJuKd5qhruCwyto_oih1a4RjHfHWP9HQR1GfCKCIFxd_yz7Pl_jhZzTj_HCQCIx57in0taOrGfWFgpAMNt5FAiOieCEZaP7a0gKYgzudLp40i1N4anemEBkJVVDG4axA786f2AEiWsQtFf75rBdAlnk5aQaigsUzOxrZj83tWnOCNuJoWyiG-6Qa9lCI3YVZzwX4a8GHVBs4E45yCJkvHt6G0Pp8iXokQDW_L8eUIRIo9X1ob4nfcfI" },
  { name: "Travel Case", price: 35.00, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2hdtCWfChEho98nDce9OUELG-1EqP3toxQJfV9f_elD4jZ0U-7Ag-1rY6mhh1mZEaKCyTT9GBUZCI8pGAdhxZmYDKbKc-k1IocCWBrZ4oWz0qY4a2SOPrN1UzOy3JL20uHmmRz--aprelcM3PuClCNdtbgQQPujT2QgV4tXKxh-ADrKnzuujZzOH2bjUjTV8JhxFZ_A1pB-Z1bEHmM7DmJwzJs37sKoRc71vjlS764Ex1Ysj-p1S15CDnrDEgFU21VUSdmq_hvEg" }
]

export default function CartDrawer() {
  const { isCartOpen, closeCart } = useCart()

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-[150] overflow-hidden">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            className="absolute top-0 right-0 h-full w-full max-w-md bg-white dark:bg-[#121212] shadow-2xl flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-gray-100 dark:border-white/10 flex items-center justify-between">
              <h2 className="text-2xl font-serif font-medium text-gray-900 dark:text-white">Your Selection</h2>
              <button 
                onClick={closeCart}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 transition-colors"
              >
                <X size={20} weight="bold" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-8 space-y-8">
              {mockCartItems.map((item) => (
                <div key={item.id} className="flex gap-4 group">
                  <div className="w-20 h-24 bg-gray-50 dark:bg-white/5 rounded-lg overflow-hidden flex-shrink-0">
                    <img alt={item.name} className="w-full h-full object-cover" src={item.image} />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-base font-medium text-gray-900 dark:text-white font-serif tracking-wide">{item.name}</h3>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">${item.price.toFixed(2)}</span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">{item.category}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-gray-200 dark:border-white/10 rounded-full px-2 py-1">
                        <button className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                          <Minus size={12} weight="bold" />
                        </button>
                        <span className="w-6 text-center text-xs font-medium text-gray-900 dark:text-white">{item.quantity}</span>
                        <button className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                          <Plus size={12} weight="bold" />
                        </button>
                      </div>
                      <button className="text-xs text-gray-400 hover:text-red-500 transition-colors underline underline-offset-4">Remove</button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Upsells */}
              <div className="pt-6 border-t border-gray-100 dark:border-white/10 mt-8">
                <h3 className="text-sm font-serif font-medium text-gray-900 dark:text-white mb-4 tracking-wide uppercase">Frequently Bought Together</h3>
                <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
                  {upSells.map((upsell) => (
                    <div key={upsell.name} className="flex-shrink-0 w-28 group relative">
                      <div className="aspect-3/4 rounded-lg overflow-hidden bg-gray-50 dark:bg-white/5 mb-3 relative">
                        <img alt={upsell.name} className="w-full h-full object-cover" src={upsell.image} />
                        <button className="absolute bottom-2 right-2 w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                          <Plus size={12} weight="bold" />
                        </button>
                      </div>
                      <h4 className="text-xs font-medium text-gray-900 dark:text-white truncate">{upsell.name}</h4>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400">${upsell.price.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Checkout Footer */}
            <div className="border-t border-gray-100 dark:border-white/10 p-6 md:p-8 bg-gray-50 dark:bg-[#121212]/80 backdrop-blur-md">
               <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>$399.99</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="pt-4 mt-4 border-t border-gray-200 dark:border-white/10 flex justify-between items-end">
                  <span className="text-base font-medium text-gray-900 dark:text-white uppercase tracking-widest text-xs">Total</span>
                  <span className="text-xl font-serif font-medium text-gray-900 dark:text-white">$399.99</span>
                </div>
              </div>
              <button className="w-full py-4 bg-primary hover:bg-[#e04f2d] text-white font-medium text-xs uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-3 shadow-lg shadow-primary/20">
                Secure Checkout
                <ArrowRight size={16} weight="bold" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
