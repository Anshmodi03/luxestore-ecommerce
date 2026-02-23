import { ArrowsHorizontal, ArrowRight, QrCode } from '@phosphor-icons/react'

const headphonesImg = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPo8P4cDxfdUKmudDqePbAHX7zlYOJs13ae7xww1fEo3xASV-mBZoG-dNjSY0FoyCbSku_LPnCIwtZoYSWAnxIFPqC8OSYUwty71F3V-wDzdGDNfjKXq3SzzauZG0N4r486WMbOupdxI5Fv59HZIBsWqb2OScbdVLNlj9yLvQUynGHODZW2SFUPkDdXR2oP62ypFaYQISJdhCPRtu_FDma_ScZdsYv_gZASC3gF4PSvF6VH94TEFKVcR8AQzVFDZ_Ui42kUka_TH8'

export default function Product360() {
  return (
    <section className="py-24 bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-white/10 to-gray-100/30 dark:from-black/50 dark:via-surface-dark dark:to-black/30 pointer-events-none"></div>
      <div className="max-w-8xl mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase font-body mb-3">Interactive Showcase</span>
          <h2 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 dark:text-white">360° Precision Design</h2>
        </div>
        <div className="flex flex-col lg:flex-row gap-12 items-center justify-between">
          {/* Left panel */}
          <div className="w-full lg:w-1/4 order-2 lg:order-1 space-y-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Material &amp; Finish</h3>
              <div className="flex flex-col gap-4">
                {[
                  { id: 'matte-black', color: 'bg-gray-900', label: 'Matte Black', checked: true },
                  { id: 'silver', color: 'bg-gray-300', label: 'Sterling Silver', checked: false },
                  { id: 'gold', color: 'bg-[#E5C79E]', label: 'Champagne Gold', checked: false },
                ].map((mat) => (
                  <label key={mat.id} className="flex items-center gap-3 cursor-pointer">
                    <input defaultChecked={mat.checked} className="hidden peer" name="material" type="radio" />
                    <span className={`w-8 h-8 rounded-full ${mat.color} border border-gray-200 dark:border-gray-700 shadow-sm hover:scale-110 transition peer-checked:ring-2 peer-checked:ring-primary peer-checked:ring-offset-2 dark:peer-checked:ring-offset-surface-dark`}></span>
                    <span className="text-sm text-gray-600 dark:text-gray-300 peer-checked:font-bold peer-checked:text-gray-900 dark:peer-checked:text-white">{mat.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Augmented Reality</h3>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl flex items-center gap-4 border border-gray-100 dark:border-gray-700">
                <div className="bg-white p-1 rounded-lg shrink-0">
                  <div className="w-16 h-16 bg-gray-900 flex items-center justify-center text-white">
                    <QrCode weight="bold" size={32} />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">View in your space</p>
                  <button className="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
                    Launch AR Experience <ArrowRight weight="bold" size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Center — product model */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2 h-[500px] relative viewer-360-container flex items-center justify-center select-none">
            <div className="absolute w-[400px] h-[400px] bg-gray-200 dark:bg-gray-800 rounded-full blur-3xl opacity-50 z-0"></div>
            <div className="relative w-full h-full flex items-center justify-center product-model z-10">
              <img
                alt="Pro Audio ANC 360 View"
                className="max-h-[400px] w-auto drop-shadow-2xl object-contain mix-blend-multiply dark:mix-blend-normal"
                src={headphonesImg}
              />
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white/80 dark:bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 shadow-lg">
                <ArrowsHorizontal weight="bold" className="text-gray-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">Drag to Rotate</span>
              </div>
              {/* Hotspot: Aluminum */}
              <div className="hotspot" style={{ top: '30%', right: '25%' }}>
                <div className="hotspot-card !w-64">
                  <h5 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Aerospace-grade Aluminum</h5>
                  <p className="text-xs text-gray-500 mb-2 leading-relaxed">Lightweight yet incredibly durable frame construction for extended listening sessions without fatigue.</p>
                  <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full w-4/5 bg-primary"></div>
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1 block text-right">Durability Rating</span>
                </div>
              </div>
              {/* Hotspot: Memory Foam */}
              <div className="hotspot" style={{ bottom: '35%', left: '30%' }}>
                <div className="hotspot-card !w-64">
                  <h5 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Memory Foam Comfort</h5>
                  <p className="text-xs text-gray-500 mb-2 leading-relaxed">Cloud-soft protein leather cushions that adapt to your unique ear shape for superior noise isolation.</p>
                </div>
              </div>
              {/* Hotspot: Drivers */}
              <div className="hotspot" style={{ top: '50%', left: '50%' }}>
                <div className="hotspot-card !w-64">
                  <h5 className="text-sm font-bold text-gray-900 dark:text-white mb-1">High-Fidelity Drivers</h5>
                  <p className="text-xs text-gray-500 mb-2 leading-relaxed">Custom 40mm drivers delivering rich bass and crystal-clear highs across the entire frequency spectrum.</p>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-[10px] font-bold rounded text-gray-600 dark:text-gray-300">20Hz - 20kHz</span>
                    <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-[10px] font-bold rounded text-gray-600 dark:text-gray-300">ANC On</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel — specs */}
          <div className="w-full lg:w-1/4 order-3 space-y-8 lg:text-right">
            {[
              { label: 'Battery Life', value: '40 Hours', sub: 'With ANC enabled' },
              { label: 'Connectivity', value: 'BT 5.2', sub: 'Multi-point connection' },
              { label: 'Weight', value: '250g', sub: 'Featherlight build' },
            ].map((spec) => (
              <div key={spec.label} className="space-y-2">
                <p className="text-sm font-bold uppercase tracking-widest text-gray-400">{spec.label}</p>
                <p className="text-3xl font-serif text-gray-900 dark:text-white">{spec.value}</p>
                <p className="text-sm text-gray-500">{spec.sub}</p>
              </div>
            ))}
            <div className="pt-8">
              <button className="w-full lg:w-auto bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-all shadow-lg flex items-center justify-center gap-2">
                Add to Cart - $254.99
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
