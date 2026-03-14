import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import OrderSuccessModal from './OrderSuccessModal'

interface FormErrors {
  [key: string]: string
}

const CheckoutForm = () => {
  const [activeStep, setActiveStep] = useState(1)
  const [isOrderComplete, setIsOrderComplete] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})

  const [form, setForm] = useState({
    firstName: '', lastName: '', address: '', city: '', postalCode: '',
    cardNumber: '', expiry: '', cvc: ''
  })

  const updateField = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => { const next = { ...prev }; delete next[field]; return next })
  }

  const validateStep1 = () => {
    const errs: FormErrors = {}
    if (!form.firstName.trim()) errs.firstName = 'First name is required'
    if (!form.lastName.trim()) errs.lastName = 'Last name is required'
    if (!form.address.trim()) errs.address = 'Address is required'
    if (!form.city.trim()) errs.city = 'City is required'
    if (!form.postalCode.trim()) errs.postalCode = 'Postal code is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const validateStep2 = () => {
    const errs: FormErrors = {}
    const cardDigits = form.cardNumber.replace(/\s/g, '')
    if (!cardDigits || cardDigits.length < 13 || cardDigits.length > 19 || !/^\d+$/.test(cardDigits)) {
      errs.cardNumber = 'Enter a valid card number'
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiry)) {
      errs.expiry = 'Enter MM/YY format'
    }
    if (!/^\d{3,4}$/.test(form.cvc)) {
      errs.cvc = 'Enter 3 or 4 digit CVC'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const goToStep2 = () => { if (validateStep1()) setActiveStep(2) }
  const goToStep3 = () => { if (validateStep2()) setActiveStep(3) }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault()
    setIsOrderComplete(true)
  }

  const inputClass = (field: string) =>
    `ultra-thin-input w-full ${errors[field] ? '!border-red-500 dark:!border-red-400' : ''}`

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
                  <input className={inputClass('firstName')} placeholder="Enter first name" type="text" value={form.firstName} onChange={e => updateField('firstName', e.target.value)} />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>
                <div className="col-span-1">
                  <label className="step-label">Last Name</label>
                  <input className={inputClass('lastName')} placeholder="Enter last name" type="text" value={form.lastName} onChange={e => updateField('lastName', e.target.value)} />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>
                <div className="col-span-2">
                  <label className="step-label">Shipping Address</label>
                  <input className={inputClass('address')} placeholder="Street address, suite, or apartment" type="text" value={form.address} onChange={e => updateField('address', e.target.value)} />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>
                <div className="col-span-1">
                  <label className="step-label">City</label>
                  <input className={inputClass('city')} placeholder="e.g. New York" type="text" value={form.city} onChange={e => updateField('city', e.target.value)} />
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                </div>
                <div className="col-span-1">
                  <label className="step-label">Postal Code</label>
                  <input className={inputClass('postalCode')} placeholder="Zip code" type="text" value={form.postalCode} onChange={e => updateField('postalCode', e.target.value)} />
                  {errors.postalCode && <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>}
                </div>
                <div className="col-span-2 mt-4">
                  <button
                    type="button"
                    onClick={goToStep2}
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
                  <input className={inputClass('cardNumber')} placeholder="0000 0000 0000 0000" type="text" value={form.cardNumber} onChange={e => updateField('cardNumber', e.target.value)} maxLength={19} />
                  {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                </div>
                <div className="col-span-1">
                  <label className="step-label">Expiry Date</label>
                  <input className={inputClass('expiry')} placeholder="MM/YY" type="text" value={form.expiry} onChange={e => updateField('expiry', e.target.value)} maxLength={5} />
                  {errors.expiry && <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>}
                </div>
                <div className="col-span-1">
                  <label className="step-label">CVC</label>
                  <input className={inputClass('cvc')} placeholder="123" type="text" value={form.cvc} onChange={e => updateField('cvc', e.target.value)} maxLength={4} />
                  {errors.cvc && <p className="text-red-500 text-xs mt-1">{errors.cvc}</p>}
                </div>
                <div className="col-span-2 mt-4">
                  <button
                    type="button"
                    onClick={goToStep3}
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
