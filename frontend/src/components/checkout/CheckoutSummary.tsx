import { useCart } from '../../context/CartContext'

const CheckoutSummary = () => {
  const { items, subtotal } = useCart()

  const tax = subtotal * 0.08
  const shippingThreshold = 500
  const shipping = subtotal >= shippingThreshold ? 0 : 15
  const total = subtotal + tax + shipping

  return (
    <aside className="bg-white dark:bg-background-dark border-t lg:border-t-0 lg:border-l border-slate-200/50 dark:border-white/5 relative transition-colors duration-300 z-10 w-full lg:h-full">
      <div className="relative lg:sticky lg:top-28 lg:h-[calc(100vh-160px)] flex flex-col pt-8 lg:pt-0 pb-12 px-4 sm:px-8 xl:px-12">
        <div className="grow bg-transparent lg:border border-slate-200/50 dark:border-white/10 lg:p-8 flex flex-col rounded-sm min-h-0">
          <h2 className="text-2xl font-serif italic mb-6 lg:mb-10 text-slate-900 dark:text-white shrink-0">Order Summary</h2>

          <div className="grow lg:overflow-y-auto pr-2 lg:pr-4 lg:-mr-4 flex flex-col gap-6 custom-scrollbar min-h-0">
            {items.length === 0 ? (
              <p className="text-sm text-slate-400 dark:text-slate-500 italic">Your cart is empty</p>
            ) : (
              items.map((item) => (
                <div key={item.product._id} className="flex gap-6 pb-6 border-b border-slate-200/50 dark:border-white/10 last:border-b-0 last:pb-0 shrink-0">
                  <div className="w-20 h-20 bg-white dark:bg-[#111] p-2 border border-slate-100 dark:border-white/10 shrink-0 rounded-sm">
                    <img
                      alt={item.product.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal opacity-80"
                      src={item.product.images?.[0]?.url || ''}
                    />
                  </div>
                  <div className="flex flex-col justify-center gap-1">
                    <h4 className="text-xs font-medium uppercase tracking-wider text-slate-900 dark:text-white">
                      {item.product.name}
                    </h4>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                      {item.product.category} / Qty {item.quantity}
                    </p>
                    <p className="text-sm font-light mt-1 text-slate-900 dark:text-white">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-8 pt-8 shrink-0 space-y-4">
            <div className="flex justify-between text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 font-light">
              <span>Subtotal</span>
              <span className="text-slate-900 dark:text-white">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 font-light">
              <span>Shipping</span>
              <span className={`${shipping === 0 ? 'text-emerald-600 dark:text-emerald-400 font-medium tracking-normal capitalize italic' : 'text-slate-900 dark:text-white'}`}>
                {shipping === 0 ? 'Complimentary' : `$${shipping.toFixed(2)}`}
              </span>
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
