import { Link } from 'react-router-dom';

export default function EditorialFooter() {
  return (
    <div className="w-full border-t border-charcoal/10 dark:border-white/10 relative group cursor-pointer overflow-hidden h-[80vh] min-h-[600px]">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] ease-out group-hover:scale-105 grayscale opacity-100 group-hover:grayscale-0" 
        style={{ 
          backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBmogbDKWCZBwfn_vA-g23FMk7paOLMer0_L7wyFC8QGFYEV_Dj5RMjWV2RRBuVe7qAmqQy5aFqp0A6hdpa6Wdzgo6Tv1GwtWM4kfFWroO1Af1Jp4Kno1Y1nT3fGhJdRorkvnIs81U9LHs2azW6pyC565WCDwhU1O7wXDz75spGlu1U4SMkhXZ3La-onWVR77aniTzvVZFstwolj5UWg4PO7LtOeFxdgJ7VUGuYyPjFRvey81iZboCviZEsgDkrVVjrsDY9F2gqpBA')",
          backgroundAttachment: 'fixed'
        }}
      />
      <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-700"></div>
      
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-6">
        <div className="overflow-hidden mb-6">
          <span className="inline-block font-serif text-3xl md:text-4xl italic text-white/80 transform translate-y-0 group-hover:-translate-y-full transition-transform duration-500">
            Continue the Journey
          </span>
        </div>
        
        <h2 className="font-serif text-6xl md:text-8xl lg:text-9xl text-white leading-none mb-8 tracking-tight">
          Explore the<br/>
          <span className="font-light italic">Core</span> Collection
        </h2>
        
        <p className="text-slate-200 max-w-md mx-auto text-sm md:text-base font-light tracking-wide leading-relaxed mb-16 opacity-80 group-hover:opacity-100 transition-opacity">
          Discover the meticulous craftsmanship and timeless design of our complete heritage line.
        </p>
        
        <Link 
          to="/collection" 
          onClick={() => window.scrollTo(0,0)} 
          className="relative overflow-hidden inline-flex items-center gap-6 px-8 py-4 border border-white/30 hover:border-white transition-colors group/btn"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white">Shop All</span>
          <i className="ph ph-arrow-right text-lg text-white group-hover/btn:translate-x-1 transition-transform"></i>
        </Link>
      </div>
    </div>
  )
}
