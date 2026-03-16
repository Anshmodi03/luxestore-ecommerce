import { motion } from 'framer-motion'

interface Spec {
  category: string
  title: string
  description: string
}

interface ProductSpecsProps {
  specs: Spec[]
}

export default function ProductSpecs({ specs }: ProductSpecsProps) {
  return (
    <div className="mt-32 lg:mt-48">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <h2 className="text-4xl md:text-5xl font-serif text-gray-900 dark:text-white">
          Technical <br/> <span className="text-gray-400 dark:text-gray-600 italic">Specifications</span>
        </h2>
        <p className="max-w-xs text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
          Engineered to perfection with premium materials and cutting-edge technology.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm"
      >
        {specs.map((spec, idx) => (
          <div key={idx} className="bg-surface-light dark:bg-surface-dark p-10 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
            <span className="block text-xs font-bold text-primary uppercase tracking-widest mb-4">{spec.category}</span>
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{spec.title}</h4>
            <p className="text-gray-500">{spec.description}</p>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
