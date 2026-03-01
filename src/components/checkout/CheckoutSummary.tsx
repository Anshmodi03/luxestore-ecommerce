import { useCart } from '../../context/CartContext'

const mockCartItems = [
  {
    id: 1,
    name: 'Pro Noise-Cancel Audio',
    color: 'Matte Black',
    price: 299.00,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
  },
  {
    id: 2,
    name: 'Aviator Classic',
    color: 'Gold / G-15 Green',
    price: 163.00,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80',
  }
]

const CheckoutSummary = () => {
  const { closeCart } = useCart() // Only for routing context if needed

  const subtotal = mockCartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  const tax = subtotal * 0.08
  const total = subtotal + tax

  return (
    <aside className="bg-white dark:bg-background-dark border-t lg:border-t-0 lg:border-l border-slate-200/50 dark:border-white/5 relative transition-colors duration-300 z-10 w-full lg:h-full">
      <div className="relative lg:sticky lg:top-28 lg:h-[calc(100vh-160px)] flex flex-col pt-8 lg:pt-0 pb-12 px-4 sm:px-8 xl:px-12">
        <div className="grow bg-transparent lg:border border-slate-200/50 dark:border-white/10 lg:p-8 flex flex-col rounded-sm min-h-0">
          <h2 className="text-2xl font-serif italic mb-6 lg:mb-10 text-slate-900 dark:text-white shrink-0">Order Summary</h2>
          
          <div className="grow lg:overflow-y-auto pr-2 lg:pr-4 lg:-mr-4 flex flex-col gap-6 custom-scrollbar min-h-0">
            {mockCartItems.map((item) => (
              <div key={`${item.id}-${item.color || 'default'}`} className="flex gap-6 pb-6 border-b border-slate-200/50 dark:border-white/10 last:border-b-0 last:pb-0 shrink-0">
                <div className="w-20 h-20 bg-white dark:bg-[#111] p-2 border border-slate-100 dark:border-white/10 shrink-0 rounded-sm">
                  <img 
                    alt={item.name} 
                    className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal opacity-80" 
                    src={item.image}
                  />
                </div>
                <div className="flex flex-col justify-center gap-1">
                  <h4 className="text-xs font-medium uppercase tracking-wider text-slate-900 dark:text-white">
                    {item.name}
                  </h4>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    {item.color || 'Standard'} / Qty {item.quantity}
                  </p>
                  <p className="text-sm font-light mt-1 text-slate-900 dark:text-white">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-8 shrink-0 space-y-4">
            <div className="flex justify-between text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 font-light">
              <span>Subtotal</span>
              <span className="text-slate-900 dark:text-white">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 font-light">
              <span>Shipping</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium tracking-normal capitalize italic">Complimentary</span>
            </div>
            <div className="flex justify-between text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 font-light">
              <span>Estimated Tax</span>
              <span className="text-slate-900 dark:text-white">${tax.toFixed(2)}</span>
            </div>
            
            <div className="pt-6 mt-6 border-t border-slate-900/5 dark:border-white/10 flex justify-between items-baseline">
              <span className="text-lg italic font-medium text-slate-900 dark:text-white">Total Amount</span>
              <span className="text-3xl font-light text-slate-900 dark:text-white">${total.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="mt-8 shrink-0 flex items-center justify-center p-4 border border-dashed border-slate-200 dark:border-white/20 rounded-sm">
            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 italic">
              Promo codes applied at payment
            </span>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default CheckoutSummary
