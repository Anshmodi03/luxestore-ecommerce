import { AirplaneTilt, ShieldCheck, ArrowUUpLeft } from '@phosphor-icons/react'
import ScrollReveal from '../common/ScrollReveal'

const features = [
  {
    icon: <AirplaneTilt weight="thin" size={32} />,
    title: 'Global Shipping',
    desc: 'Complimentary expedited delivery on all orders over $250. Arrives in signature packaging.',
  },
  {
    icon: <ShieldCheck weight="thin" size={32} />,
    title: 'Secure & Private',
    desc: 'Your data is protected with military-grade encryption. We respect your privacy absolutely.',
  },
  {
    icon: <ArrowUUpLeft weight="thin" size={32} />,
    title: 'Concierge Returns',
    desc: 'Not perfect? Our concierge team will arrange a hassle-free return pickup from your door.',
  },
]

export default function FeaturesStrip() {
  return (
    <section className="bg-white dark:bg-surface-dark py-24 border-y border-border-light dark:border-border-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <ScrollReveal variant="fade-up" staggerChildren className="grid lg:grid-cols-3 gap-12 text-center divide-y lg:divide-y-0 lg:divide-x divide-gray-100 dark:divide-gray-800">
          {features.map((f) => (
            <div key={f.title} className="px-4 py-8 lg:py-0 group">
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 dark:bg-gray-800 text-primary group-hover:scale-110 transition-transform duration-300">
                {f.icon}
              </div>
              <h3 className="font-serif text-2xl text-gray-900 dark:text-white mb-3">{f.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 font-light leading-relaxed px-8">{f.desc}</p>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  )
}
