import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import OrderSuccessModal from './OrderSuccessModal'

const CheckoutForm = () => {
  const [activeStep, setActiveStep] = useState(1)
  const [isOrderComplete, setIsOrderComplete] = useState(false)

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault()
    setIsOrderComplete(true)
  }

  return (
    <>
      <form className="flex flex-col gap-12" onSubmit={handlePlaceOrder}>
      
      {/* STEP 1: Delivery Address */}
      <section className="relative">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between mb-8 cursor-pointer group"
          onClick={() => setActiveStep(1)}
        >
          <div className="flex items-center gap-4">
            <span className={`w-8 h-8 rounded-full border ${activeStep === 1 ? 'border-primary dark:border-white text-primary dark:text-white' : 'border-slate-300 dark:border-slate-700 text-slate-400 dark:text-slate-500'} flex items-center justify-center text-xs font-medium transition-colors duration-300`}>
              01
            </span>
            <h2 className={`text-2xl italic font-medium transition-colors duration-300 ${activeStep === 1 ? 'text-primary dark:text-white' : 'text-slate-400 dark:text-slate-500 group-hover:text-primary dark:group-hover:text-white'}`}>
              Delivery Address
            </h2>
          </div>
          {activeStep !== 1 && (
            <button type="button" className="text-[10px] uppercase tracking-[0.2em] text-primary dark:text-white font-medium hover:opacity-70 transition-opacity">Edit</button>
          )}
        </motion.div>

        <AnimatePresence initial={false}>
          {activeStep === 1 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-2 gap-x-12 gap-y-8 pb-4">
                <div className="col-span-1">
                  <label className="step-label">First Name</label>
                  <input className="ultra-thin-input w-full" placeholder="Enter first name" type="text" />
                </div>
                <div className="col-span-1">
                  <label className="step-label">Last Name</label>
                  <input className="ultra-thin-input w-full" placeholder="Enter last name" type="text" />
                </div>
                <div className="col-span-2">
                  <label className="step-label">Shipping Address</label>
                  <input className="ultra-thin-input w-full" placeholder="Street address, suite, or apartment" type="text" />
                </div>
                <div className="col-span-1">
                  <label className="step-label">City</label>
                  <input className="ultra-thin-input w-full" placeholder="e.g. New York" type="text" />
                </div>
                <div className="col-span-1">
                  <label className="step-label">Postal Code</label>
                  <input className="ultra-thin-input w-full" placeholder="Zip code" type="text" />
                </div>
                <div className="col-span-2 mt-4">
                  <button 
                    type="button" 
                    onClick={() => setActiveStep(2)}
                    className="group h-14 px-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center gap-4 hover:bg-slate-800 dark:hover:bg-slate-200 transition-all duration-300 rounded-sm"
                  >
                    <span className="text-xs uppercase tracking-[0.2em] font-medium">Continue to Payment</span>
                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* STEP 2: Payment Method */}
      <section className="relative border-t border-slate-100 dark:border-white/10 pt-12 transition-colors duration-300">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between mb-8 cursor-pointer group"
          onClick={() => activeStep > 1 && setActiveStep(2)}
        >
          <div className="flex items-center gap-4">
            <span className={`w-8 h-8 rounded-full border ${activeStep === 2 ? 'border-primary dark:border-white text-primary dark:text-white' : 'border-slate-300 dark:border-slate-700 text-slate-400 dark:text-slate-500'} flex items-center justify-center text-xs font-medium transition-colors duration-300`}>
              02
            </span>
            <h2 className={`text-2xl italic font-medium transition-colors duration-300 ${activeStep === 2 ? 'text-primary dark:text-white' : 'text-slate-400 dark:text-slate-500 group-hover:text-primary dark:group-hover:text-white'}`}>
              Payment Method
            </h2>
          </div>
          {activeStep > 2 && (
            <button type="button" className="text-[10px] uppercase tracking-[0.2em] text-primary dark:text-white font-medium hover:opacity-70 transition-opacity" onClick={(e) => { e.stopPropagation(); setActiveStep(2); }}>Edit</button>
          )}
        </motion.div>

        <AnimatePresence initial={false}>
          {activeStep === 2 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-2 gap-x-12 gap-y-8 pb-4">
                <div className="col-span-2">
                  <label className="step-label">Card Number</label>
                  <input className="ultra-thin-input w-full" placeholder="0000 0000 0000 0000" type="text" />
                </div>
                <div className="col-span-1">
                  <label className="step-label">Expiry Date</label>
                  <input className="ultra-thin-input w-full" placeholder="MM/YY" type="text" />
                </div>
                <div className="col-span-1">
                  <label className="step-label">CVC</label>
                  <input className="ultra-thin-input w-full" placeholder="123" type="text" />
                </div>
                <div className="col-span-2 mt-4">
                  <button 
                    type="button" 
                    onClick={() => setActiveStep(3)}
                    className="group h-14 px-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center gap-4 hover:bg-slate-800 dark:hover:bg-slate-200 transition-all duration-300 rounded-sm"
                  >
                    <span className="text-xs uppercase tracking-[0.2em] font-medium">Review Order</span>
                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* STEP 3: Review & Confirm */}
      <section className="relative border-t border-slate-100 dark:border-white/10 pt-12 transition-colors duration-300">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between mb-8 cursor-pointer group"
          onClick={() => activeStep === 3 && setActiveStep(3)}
        >
          <div className="flex items-center gap-4">
            <span className={`w-8 h-8 rounded-full border ${activeStep === 3 ? 'border-primary dark:border-white text-primary dark:text-white' : 'border-slate-300 dark:border-slate-700 text-slate-400 dark:text-slate-500'} flex items-center justify-center text-xs font-medium transition-colors duration-300`}>
              03
            </span>
            <h2 className={`text-2xl italic font-medium transition-colors duration-300 ${activeStep === 3 ? 'text-primary dark:text-white' : 'text-slate-400 dark:text-slate-500 group-hover:text-primary dark:group-hover:text-white'}`}>
              Review & Confirm
            </h2>
          </div>
        </motion.div>

        <AnimatePresence initial={false}>
          {activeStep === 3 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="pb-4">
                <p className="text-sm font-light text-slate-600 dark:text-slate-400 mb-8 max-w-lg leading-relaxed">
                  By clicking "Place Order", you confirm that you have read and accepted our Terms of Service and Return Policy. All transactions are securely encrypted.
                </p>
                <button 
                  type="submit" 
                  className="group h-16 w-full max-w-sm bg-primary text-white flex items-center justify-center gap-4 hover:opacity-90 transition-all duration-300 rounded-sm shadow-xl shadow-primary/20"
                >
                  <span className="text-xs uppercase tracking-[0.2em] font-medium">Place Order Securely</span>
                  <span className="material-symbols-outlined text-sm group-hover:-translate-y-0.5 transition-transform">lock_person</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      </form>
      <AnimatePresence>
        {isOrderComplete && <OrderSuccessModal orderNumber="LX-9428" />}
      </AnimatePresence>
    </>
  )
}

export default CheckoutForm
