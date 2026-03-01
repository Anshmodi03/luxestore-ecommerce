import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from '@phosphor-icons/react'

const FAQ_DATA = [
  {
    question: "How do I verify the authenticity of an archive piece?",
    answer: "Every item in our archive collection undergoes a rigorous multi-point inspection by certified authenticators. Upon purchase, you will receive a digital Certificate of Authenticity via your dashboard vault, backed by blockchain verification, alongside physical document provenance where applicable."
  },
  {
    question: "What is your policy on international shipping for high-value items?",
    answer: "We offer Global White-Glove delivery for all high-value acquisitions. This includes fully insured, temperature-controlled transit, discreet packaging, and dedicated handling. For pieces exceeding $50,000, secure armored transport can be arranged directly through your concierge."
  },
  {
    question: "Can I schedule a virtual styling session before purchasing?",
    answer: "Absolutely. Our elite clientele have access to complimentary virtual styling sessions. A dedicated stylist will curate a digital lookbook based on your preferences, current wardrobe, and upcoming events, walking you through material textures and fit details via a private video link."
  },
  {
    question: "How are returns handled for bespoke or customized orders?",
    answer: "Due to the unique nature of bespoke items tailored specifically to your measurements or customizations, they are generally non-refundable. However, we offer a Perfect Fit Guarantee—if any adjustments are needed upon receipt, our master tailors will alter the piece at no additional cost."
  },
  {
    question: "What does the 24/7 Digital Concierge service encompass?",
    answer: "The Digital Concierge is your direct line to LuxeStore. Whether you need an update on a shipment at 2 AM, wish to source a sold-out runway piece, or require immediate assistance with a return, a senior advisor is always available. Priority access is guaranteed for our Black Tier members."
  }
]

export default function ServicesFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-24 bg-gray-50 dark:bg-[#0a0a0a] transition-colors duration-500">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-12">
        
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-bold text-[10px] uppercase tracking-[0.3em] mb-4 block"
          >
            Client Inquiries
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl lg:text-5xl text-gray-900 dark:text-white"
          >
            Frequently Asked Questions
          </motion.h2>
        </div>

        <div className="space-y-4">
          {FAQ_DATA.map((faq, index) => {
            const isOpen = openIndex === index

            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border border-gray-200 dark:border-white/10 rounded-lg bg-white dark:bg-[#111] overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                >
                  <span className="font-serif text-lg md:text-xl text-gray-900 dark:text-white pr-8">
                    {faq.question}
                  </span>
                  <div className="text-gray-400 flex-shrink-0">
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="p-6 pt-0 text-gray-500 dark:text-gray-400 font-light leading-relaxed border-t border-transparent dark:border-white/5">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
        
      </div>
    </section>
  )
}
