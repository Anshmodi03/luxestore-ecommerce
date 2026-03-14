import { ArrowsHorizontal, ArrowRight, QrCode, ShieldCheck, Waves, Cube } from '@phosphor-icons/react'

const headphonesImg = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPo8P4cDxfdUKmudDqePbAHX7zlYOJs13ae7xww1fEo3xASV-mBZoG-dNjSY0FoyCbSku_LPnCIwtZoYSWAnxIFPqC8OSYUwty71F3V-wDzdGDNfjKXq3SzzauZG0N4r486WMbOupdxI5Fv59HZIBsWqb2OScbdVLNlj9yLvQUynGHODZW2SFUPkDdXR2oP62ypFaYQISJdhCPRtu_FDma_ScZdsYv_gZASC3gF4PSvF6VH94TEFKVcR8AQzVFDZ_Ui42kUka_TH8'

export default function Product360() {
  return (
    <section className="py-24 bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark overflow-hidden relative">
      <div className="absolute inset-0 bg-linear-to-br from-gray-50/50 via-white/10 to-gray-100/30 dark:from-black/50 dark:via-surface-dark dark:to-black/30 pointer-events-none"></div>
      <div className="max-w-8xl mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase font-body mb-3">Interactive Showcase</span>
          <h2 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 dark:text-white">360° Precision Design</h2>
        </div>
        <div className="flex flex-col lg:flex-row gap-12 items-center justify-between">
          {/* Left panel */}
          <div className="w-full lg:w-1/4 order-2 lg:order-1 space-y-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Listening Modes</h3>
              <div className="flex flex-col gap-3">
                {[
                  { id: 'anc', icon: ShieldCheck, title: 'Active Noise Cancelling', desc: 'Block the world out completely', active: true },
                  { id: 'transparency', icon: Waves, title: 'Transparency Mode', desc: 'Let the environment in naturally', active: false },
                  { id: 'spatial', icon: Cube, title: 'Spatial Audio', desc: 'Immersive 360° soundstage mapping', active: false },
                ].map((mode) => (
                  <button key={mode.id} className={`group flex items-start flex-row gap-4 p-3 rounded-xl transition-all border text-left ${mode.active ? 'bg-primary/5 border-primary/30 dark:border-primary/50 ring-1 ring-primary/20 shadow-sm' : 'bg-transparent border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/40'}`}>
                    <div className={`p-2 rounded-lg transition-colors flex shrink-0 items-center justify-center ${mode.active ? 'bg-primary text-white shadow-md' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 group-hover:text-primary group-hover:bg-primary/10 dark:group-hover:bg-primary/20'}`}>
                      <mode.icon weight={mode.active ? "fill" : "regular"} size={20} />
                    </div>
                    <div className="flex flex-col justify-center min-h-[36px]">
                      <h4 className={`text-sm font-bold transition-colors ${mode.active ? 'text-primary dark:text-primary-light' : 'text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary-light'}`}>{mode.title}</h4>
                      <p className={`text-xs mt-0.5 transition-colors ${mode.active ? 'text-gray-700 dark:text-gray-300' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'}`}>{mode.desc}</p>
                    </div>
                  </button>
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
            <div className="absolute w-[400px] h-[400px] bg-primary/20 dark:bg-primary/10 rounded-full blur-3xl opacity-50 z-0"></div>
            
            {/* 3D Model Premium Container */}
            <div className="relative w-full max-w-md aspect-square flex flex-col items-center justify-center product-model z-10 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl shadow-2xl p-6">
              <model-viewer
                src="/assets/models/headphones.glb"
                alt="3D Headphones Model"
                camera-controls
                interaction-prompt="hover"
                shadow-intensity="1"
                environment-image="neutral"
                ar
                ar-modes="webxr scene-viewer quick-look"
                className="w-full h-full min-h-[300px] z-10"
                style={{ backgroundColor: 'transparent' }}
              >
                <div slot="poster" className="absolute inset-0 flex items-center justify-center bg-transparent">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              </model-viewer>
              
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white/80 dark:bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 shadow-md z-20 pointer-events-none w-max">
                <ArrowsHorizontal weight="bold" className="text-gray-500 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">Drag to Rotate</span>
              </div>
              {/* Hotspot: Aluminum */}
              <div className="hotspot" style={{ top: '30%', right: '15%' }}>
                <div className="hotspot-card w-64!">
                  <h5 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Aerospace-grade Aluminum</h5>
                  <p className="text-xs text-gray-500 mb-2 leading-relaxed">Lightweight yet incredibly durable frame construction for extended listening sessions without fatigue.</p>
                  <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full w-4/5 bg-primary"></div>
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1 block text-right">Durability Rating</span>
                </div>
              </div>
              {/* Hotspot: Memory Foam */}
              <div className="hotspot" style={{ bottom: '30%', left: '20%' }}>
                <div className="hotspot-card w-64!">
                  <h5 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Memory Foam Comfort</h5>
                  <p className="text-xs text-gray-500 mb-2 leading-relaxed">Cloud-soft protein leather cushions that adapt to your unique ear shape for superior noise isolation.</p>
                </div>
              </div>
              {/* Hotspot: Drivers (Center Earcup) */}
              <div className="hotspot" style={{ top: '62%', left: '65%' }}>
                <div className="hotspot-card w-64!">
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
