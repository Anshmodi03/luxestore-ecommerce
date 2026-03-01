import { motion } from 'framer-motion'

const FEATURES = [
  {
    id: 1,
    icon: 'ph-waves',
    title: 'Active NC',
    subtitle: 'Smart Adapt',
    delay: 0,
  },
  {
    id: 2,
    icon: 'ph-battery-charging',
    title: '30 Hours',
    subtitle: 'Playtime',
    delay: 0.1,
  },
  {
    id: 3,
    icon: 'ph-bluetooth',
    title: 'BT 5.2',
    subtitle: 'Seamless',
    delay: 0.2,
  },
  {
    id: 4,
    icon: 'ph-speaker-high',
    title: 'Spatial',
    subtitle: '3D Audio',
    delay: 0.3,
  }
]

export default function ProductFeatures() {
  return (
    <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-6">
      {FEATURES.map((feature) => (
        <motion.div
          key={feature.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: feature.delay, ease: "easeOut" }}
          className="glass-panel p-8 rounded-3xl flex flex-col items-center text-center gap-4 transition-transform hover:-translate-y-2 duration-500 border border-white/20 dark:border-white/5 bg-white/60 dark:bg-[#161B28]/60 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]"
        >
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
            <i className={`ph-fill ${feature.icon} text-2xl`}></i>
          </div>
          <div>
            <h3 className="font-serif font-medium text-lg text-gray-900 dark:text-white mb-1">{feature.title}</h3>
            <p className="text-xs text-gray-500 uppercase tracking-wider">{feature.subtitle}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
