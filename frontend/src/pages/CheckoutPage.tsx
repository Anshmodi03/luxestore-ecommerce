import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageTransition from '../components/common/PageTransition'
import CheckoutForm from '../components/checkout/CheckoutForm'
import CheckoutSummary from '../components/checkout/CheckoutSummary'
import Footer from '../components/common/Footer'

const CheckoutPage = () => {
  return (
    <PageTransition>
      <div className="flex flex-col min-h-screen bg-white dark:bg-background-dark text-slate-900 dark:text-white antialiased transition-colors duration-300">
        <main className="flex-1 w-full mx-auto pt-28 pb-12 relative z-0 lg:grid lg:grid-cols-[1fr_450px] max-w-[1440px]">
          
          <div className="px-4 sm:px-8 lg:px-12 xl:px-24 flex flex-col max-w-5xl mx-auto w-full">
            <header className="mb-16">
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl font-medium tracking-tight italic mb-2"
              >
                Secure Checkout
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-[10px] uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500"
              >
                Step 1 of 3 — Shipping Details
              </motion.p>
            </header>

            <CheckoutForm />
          </div>

          {/* Right Column Summary */}
          <CheckoutSummary />
          
        </main>
      </div>
    </PageTransition>
  )
}

export default CheckoutPage
