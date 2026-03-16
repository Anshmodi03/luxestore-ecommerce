import { Eye, Plus } from '@phosphor-icons/react'
import ScrollReveal from '../common/ScrollReveal'

const hotspots = [
  {
    positionClass: 'top-[35%] left-[25%]',
    name: 'Arc Floor Lamp', price: '$329.00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5kLHcqLz_lJ5IICU7pcgfgUl6dFr3OZigARypjwtzNZoBOt33ldc6SMqYmN84ZqNFJy89CmLchoUWxr74eTQs7brB_fJ0ULgI03T9yOu_GoTLctFCehT3HK4suwYkhmm6z45pe4HJAgu7UD2FEgIOVF-plNTWSzg541feNHRIxAuHDgjyO--UUFSq2BNN8dt9zqOrMyYCyk6Y3CKu7Ri1Ai8r9y8Y7xcWHnDknMHOQBg13mxL0iyhlfw9x_VMOdyAPZB9maHF_QQ',
  },
  {
    positionClass: 'top-[65%] left-[45%]',
    name: 'Velvet Lounge Chair', price: '$850.00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqw8xzMl7mB8PaL9Zjc7P3YswgWlPh6TO6uN-wnPvR7NvNyTvuLOgo9U3oeNxo22SeCwl5dNjhj_J8iMbnj2anuvS4e5QNIdSv3-vJ0BqNuv_Rb5RAYDxOaNde84RQEt9Z4mVo48xmq9ml7a1ZCFRld4ag4R3bNh-5R5ZTRhNObz_b5gs2sW-G5PnBv3PulIX4dOxd1F7N0u2e61ud8sACfxkedvYklkZg0YXYKDZ-3kMNnradL13aJN9bTlJM2I5cban544dMPF0',
  },
  {
    positionClass: 'top-[58%] left-[72%]',
    name: 'Pro Audio ANC', price: '$254.99',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPo8P4cDxfdUKmudDqePbAHX7zlYOJs13ae7xww1fEo3xASV-mBZoG-dNjSY0FoyCbSku_LPnCIwtZoYSWAnxIFPqC8OSYUwty71F3V-wDzdGDNfjKXq3SzzauZG0N4r486WMbOupdxI5Fv59HZIBsWqb2OScbdVLNlj9yLvQUynGHODZW2SFUPkDdXR2oP62ypFaYQISJdhCPRtu_FDma_ScZdsYv_gZASC3gF4PSvF6VH94TEFKVcR8AQzVFDZ_Ui42kUka_TH8',
  },
]

export default function ShopTheLook() {
  return (
    <section className="py-24 px-4 sm:px-8 lg:px-16 max-w-8xl mx-auto bg-gray-50 dark:bg-surface-dark border-b border-border-light dark:border-border-dark">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <ScrollReveal variant="fade-left" className="lg:col-span-4 space-y-8 order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 text-primary font-bold tracking-widest text-xs uppercase">
            <Eye weight="fill" />
            <span>Interactive Experience</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 dark:text-white leading-tight">
            Shop the Look: <br />
            <span className="italic text-gray-500 font-light">The Modern Sanctuary</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg font-light leading-relaxed">
            Recreate this serene aesthetic in your own home. Hover over the interactive points to discover the pieces that make this room come alive with understated elegance and warmth.
          </p>
          <div className="flex flex-col gap-4 pt-4">
            <div className="flex items-center gap-4">
              <span className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400">1</span>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">Hover to Discover</h4>
                <p className="text-sm text-gray-500">Explore product details instantly.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400">2</span>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">One-Click Add</h4>
                <p className="text-sm text-gray-500">Add items directly to your cart.</p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fade-right" delay={0.2} className="lg:col-span-8 relative order-1 lg:order-2 group">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img
              alt="Modern living room interior"
              loading="lazy"
              decoding="async"
              className="w-full h-auto object-cover transform transition-transform duration-[2s] group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSIuR5b5ya3hQTrmIcjL054y-_wnjZmnyakH7WQ1zaDJ9cbQfu2frZrJJ6heoU5ky-lBbJhmRwXdkSFEL0WW4u9_ucyBYUPlmNTE7iqaZLPnbxEjMABeAwGZ2SshDSC4OJvSt4uA-LEY7i_CNeEfkAt_yUGMu0kEsq_4HD67Q1P5MWXirkuj9w7XFVvX5UZqt4xwf_ah0CgPGWFp4OfrjmIR06Qktc3zFlXsDx7sLENmopya2VgjDf_b5ma_eQUsdSEN0vwpiu8ww"
            />
            {hotspots.map((spot, i) => (
              <div key={i} className={`hotspot ${spot.positionClass}`}>
                <div className="hotspot-card">
                  <div className="flex gap-3 mb-3">
                    <img alt={spot.name} loading="lazy" decoding="async" className="w-16 h-16 object-cover rounded-lg bg-gray-100" src={spot.image} />
                    <div>
                      <h5 className="text-sm font-bold text-gray-900 dark:text-white">{spot.name}</h5>
                      <p className="text-primary font-medium text-sm">{spot.price}</p>
                    </div>
                  </div>
                  <button className="w-full py-2 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-md hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
                    <Plus weight="bold" /> Quick Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
