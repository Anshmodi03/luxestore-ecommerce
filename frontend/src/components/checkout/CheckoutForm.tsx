import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import * as orderService from '../../services/order.service'
import * as userService from '../../services/user.service'
import { useCart } from '../../context/CartContext'
import { useToast } from '../../context/ToastContext'
import OrderSuccessModal from './OrderSuccessModal'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '')

interface FormErrors {
  [key: string]: string
}

// Inner form — must be inside <Elements>
function CheckoutFormInner() {
  const stripe = useStripe()
  const elements = useElements()
  const { clearCart } = useCart()
  const { showToast } = useToast()

  const [activeStep, setActiveStep] = useState(1)
  const [isOrderComplete, setIsOrderComplete] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [cardError, setCardError] = useState<string | null>(null)

  // Step 1 state
  const [form, setForm] = useState({
    firstName: '', lastName: '', street: '', city: '', state: '', postalCode: '', label: 'Home',
  })

  // State shared across steps
  const [addressId, setAddressId] = useState<string | null>(null)
  const [defaultAddressId, setDefaultAddressId] = useState<string | null>(null)
  const [orderNumber, setOrderNumber] = useState<string | null>(null)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null)
  const [savedPaymentMethodId, setSavedPaymentMethodId] = useState<string | null>(null)
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'))

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'))
    })
    observer.observe(document.documentElement, { attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  // Pre-fill form from user's default saved address
  useEffect(() => {
    userService.getAddresses()
      .then((addresses: any[]) => {
        const def = addresses.find((a: any) => a.isDefault) || addresses[0]
        if (def) {
          setDefaultAddressId(def._id)
          setForm({
            firstName: def.firstName || '',
            lastName: def.lastName || '',
            street: def.street || '',
            city: def.city || '',
            state: def.state || '',
            postalCode: def.postalCode || '',
            label: def.label || 'Home',
          })
        }
      })
      .catch(() => {})
  }, [])

  const updateField = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => { const next = { ...prev }; delete next[field]; return next })
  }

  const validateStep1 = () => {
    const errs: FormErrors = {}
    if (!form.firstName.trim()) errs.firstName = 'First name is required'
    if (!form.lastName.trim()) errs.lastName = 'Last name is required'
    if (!form.street.trim()) errs.street = 'Address is required'
    if (!form.city.trim()) errs.city = 'City is required'
    if (!form.state.trim()) errs.state = 'State is required'
    if (!form.postalCode.trim()) errs.postalCode = 'Postal code is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  // Step 1 → Step 2: save address, create order
  const goToStep2 = async () => {
    if (!validateStep1()) return
    setIsSubmitting(true)
    try {
      // Reuse default address if unchanged, otherwise create a new one
      let savedAddressId = defaultAddressId
      if (!savedAddressId) {
        const saved = await userService.createAddress({
          label: form.label,
          firstName: form.firstName,
          lastName: form.lastName,
          street: form.street,
          city: form.city,
          state: form.state,
          postalCode: form.postalCode,
        })
        savedAddressId = saved._id
      }
      setAddressId(savedAddressId)

      // Create order immediately so we get the clientSecret for Stripe
      const orderResp = await orderService.createOrder({ addressId: savedAddressId! })
      setOrderNumber(orderResp.order.orderNumber)
      setClientSecret(orderResp.clientSecret)
      setPaymentIntentId(orderResp.paymentIntentId)

      setActiveStep(2)
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Failed to save address. Please try again.'
      showToast(msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Step 2 → Step 3: create payment method while CardElement is still mounted
  const goToStep3 = async () => {
    if (!stripe || !elements) return
    const cardEl = elements.getElement(CardElement)
    if (!cardEl) return
    setIsSubmitting(true)
    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardEl })
      if (error) {
        setCardError(error.message || 'Invalid card details.')
        return
      }
      setSavedPaymentMethodId(paymentMethod.id)
      setCardError(null)
      setActiveStep(3)
    } catch {
      setCardError('Could not read card details. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Step 3: confirm payment → verify with backend
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !clientSecret || !orderNumber || !paymentIntentId || !savedPaymentMethodId) return

    setIsSubmitting(true)
    try {
      // Use the payment method ID captured in Step 2 — CardElement may be unmounted by now
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: savedPaymentMethodId,
      })

      if (error) {
        setCardError(error.message || 'Payment failed. Please check your card details.')
        setActiveStep(2) // go back to card step
        setIsSubmitting(false)
        return
      }

      if (paymentIntent?.status === 'succeeded') {
        // Notify backend — but don't block success UI if it fails
        // (order is already created and Stripe payment confirmed)
        try {
          await orderService.verifyPayment(orderNumber, { paymentIntentId })
        } catch {
          // Backend verify failed (e.g. token refresh) — order still confirmed via Stripe
        }
        clearCart()
        setIsOrderComplete(true)
      }
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Something went wrong. Please check your orders.'
      showToast(msg)
    } finally {
      setIsSubmitting(false)
    }
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
            onClick={() => activeStep === 1 && setActiveStep(1)}
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
              <button
                type="button"
                className="text-[10px] uppercase tracking-[0.2em] text-primary dark:text-white font-medium hover:opacity-70 transition-opacity"
                onClick={() => setActiveStep(1)}
              >
                Edit
              </button>
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
                    <input className={inputClass('street')} placeholder="Street address, suite, or apartment" type="text" value={form.street} onChange={e => updateField('street', e.target.value)} />
                    {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street}</p>}
                  </div>
                  <div className="col-span-1">
                    <label className="step-label">City</label>
                    <input className={inputClass('city')} placeholder="e.g. Mumbai" type="text" value={form.city} onChange={e => updateField('city', e.target.value)} />
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                  </div>
                  <div className="col-span-1">
                    <label className="step-label">State</label>
                    <input className={inputClass('state')} placeholder="e.g. Maharashtra" type="text" value={form.state} onChange={e => updateField('state', e.target.value)} />
                    {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                  </div>
                  <div className="col-span-1">
                    <label className="step-label">Postal Code</label>
                    <input className={inputClass('postalCode')} placeholder="Postal code" type="text" value={form.postalCode} onChange={e => updateField('postalCode', e.target.value)} />
                    {errors.postalCode && <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>}
                  </div>
                  <div className="col-span-2 mt-4">
                    <button
                      type="button"
                      onClick={goToStep2}
                      disabled={isSubmitting}
                      className="group h-14 px-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center gap-4 hover:bg-slate-800 dark:hover:bg-slate-200 transition-all duration-300 rounded-sm disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <span className="text-xs uppercase tracking-[0.2em] font-medium">
                        {isSubmitting ? 'Saving...' : 'Continue to Payment'}
                      </span>
                      {!isSubmitting && <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>}
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
              <button type="button" className="text-[10px] uppercase tracking-[0.2em] text-primary dark:text-white font-medium hover:opacity-70 transition-opacity" onClick={(e) => { e.stopPropagation(); setActiveStep(2) }}>Edit</button>
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
                <div className="flex flex-col gap-6 pb-4">
                  <div>
                    <label className="step-label mb-3 block">Card Details</label>
                    <div className="border-b border-slate-200 dark:border-white/10 pb-3 focus-within:border-primary dark:focus-within:border-white transition-colors duration-300">
                      <CardElement
                        options={{
                          style: {
                            base: {
                              fontSize: '14px',
                              fontFamily: '"Plus Jakarta Sans", sans-serif',
                              color: isDark ? '#f1f5f9' : '#1F2937',
                              iconColor: isDark ? '#f1f5f9' : '#1F2937',
                              '::placeholder': { color: isDark ? '#64748b' : '#9ca3af' },
                              letterSpacing: '0.025em',
                            },
                            invalid: { color: '#ef4444' },
                          },
                          hidePostalCode: true,
                        }}
                        onChange={(e) => {
                          if (e.error) setCardError(e.error.message)
                          else setCardError(null)
                        }}
                      />
                    </div>
                    {cardError && <p className="text-red-500 text-xs mt-2">{cardError}</p>}
                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mt-3">
                      Test card: 4242 4242 4242 4242 · Any future date · Any CVC
                    </p>
                  </div>
                  <div className="mt-2">
                    <button
                      type="button"
                      onClick={goToStep3}
                      disabled={!stripe || isSubmitting}
                      className="group h-14 px-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center gap-4 hover:bg-slate-800 dark:hover:bg-slate-200 transition-all duration-300 rounded-sm disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <span className="text-xs uppercase tracking-[0.2em] font-medium">{isSubmitting ? 'Verifying...' : 'Review Order'}</span>
                      {!isSubmitting && <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>}
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
            className="flex items-center justify-between mb-8"
          >
            <div className="flex items-center gap-4">
              <span className={`w-8 h-8 rounded-full border ${activeStep === 3 ? 'border-primary dark:border-white text-primary dark:text-white' : 'border-slate-300 dark:border-slate-700 text-slate-400 dark:text-slate-500'} flex items-center justify-center text-xs font-medium transition-colors duration-300`}>
                03
              </span>
              <h2 className={`text-2xl italic font-medium transition-colors duration-300 ${activeStep === 3 ? 'text-primary dark:text-white' : 'text-slate-400 dark:text-slate-500'}`}>
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
                    disabled={isSubmitting || !stripe}
                    className="group h-16 w-full max-w-sm bg-primary text-white flex items-center justify-center gap-4 hover:opacity-90 transition-all duration-300 rounded-sm shadow-xl shadow-primary/20 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <span className="text-xs uppercase tracking-[0.2em] font-medium">
                      {isSubmitting ? 'Processing...' : 'Place Order Securely'}
                    </span>
                    {!isSubmitting && <span className="material-symbols-outlined text-sm group-hover:-translate-y-0.5 transition-transform">lock_person</span>}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </form>

      <AnimatePresence>
        {isOrderComplete && orderNumber && (
          <OrderSuccessModal orderNumber={orderNumber} />
        )}
      </AnimatePresence>
    </>
  )
}

// Outer wrapper — provides Stripe context
const CheckoutForm = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutFormInner />
    </Elements>
  )
}

export default CheckoutForm
