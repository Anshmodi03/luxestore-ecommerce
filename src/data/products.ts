export interface Product {
  id: string
  name: string
  category: string
  price: number
  image: string
  description: string
  isNew?: boolean
  isTrending?: boolean
  isPopular?: boolean
  oldPrice?: number
  badge?: string
  badgeClass?: string
}

export const collectionProducts: Product[] = [
  {
    id: "pro-audio-anc",
    name: "Pro Audio ANC",
    category: "Tech",
    price: 254.99,
    oldPrice: 299.00,
    badge: "-15% OFF",
    badgeClass: "bg-white/90 dark:bg-black/80 backdrop-blur-sm text-gray-900 dark:text-white",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500&auto=format&fit=crop",
    description: "This item represents the pinnacle of our craftsmanship. Designed for the modern aesthete, it combines functionality with timeless elegance.",
    isTrending: true,
    isPopular: true
  },
  {
    id: "series-7-watch",
    name: "Series 7 Watch",
    category: "Accessories",
    price: 399.00,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=500&auto=format&fit=crop",
    description: "Keep perfect time with a masterpiece of micro-engineering, wrapped in aerospace-grade titanium."
  },
  {
    id: "urban-runner-x",
    name: "Urban Runner X",
    category: "Footwear",
    price: 129.50,
    badge: "New In",
    badgeClass: "bg-primary text-white",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=500&auto=format&fit=crop",
    description: "Seamlessly transition from the morning commute to evening runs with unmatched comfort.",
    isTrending: true
  },
  {
    id: "radiance-serum",
    name: "Radiance Serum",
    category: "Beauty",
    price: 75.00,
    oldPrice: 89.00,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=500&auto=format&fit=crop",
    description: "A potent blend of active ingredients designed to restore your skin's natural luminance.",
    isPopular: true,
    isNew: true
  },
  {
    id: "arc-floor-lamp",
    name: "Arc Floor Lamp",
    category: "Home",
    price: 329.00,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=500&auto=format&fit=crop",
    description: "Sculptural lighting that transforms any room into a gallery space with warm, ambient glow."
  },
  {
    id: "velvet-lounge-chair",
    name: "Velvet Lounge Chair",
    category: "Furniture",
    price: 850.00,
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=500&auto=format&fit=crop",
    description: "Sink into premium velvet upholstery paired with mid-century modern architectural lines."
  },
  {
    id: "aviator-classic",
    name: "Aviator Classic",
    category: "Eyewear",
    price: 145.00,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=500&auto=format&fit=crop",
    description: "Iconic teardrop frames updated with polarized lenses and ultra-lightweight titanium."
  },
  {
    id: "minimalist-vase",
    name: "Minimalist Vase",
    category: "Decor",
    price: 45.00,
    image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?q=80&w=500&auto=format&fit=crop",
    description: "Matte ceramic beautifully shaped to enhance any floral arrangement.",
    isNew: true,
    isTrending: true
  },
  {
    id: "smart-thermostat",
    name: "Aura Smart Thermostat",
    category: "Tech",
    price: 199.00,
    image: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?q=80&w=500&auto=format&fit=crop",
    description: "Intelligent climate control enveloped in a sleek, minimalist glass design."
  },
  {
    id: "leather-tote",
    name: "Signature Leather Tote",
    category: "Accessories",
    price: 450.00,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=500&auto=format&fit=crop",
    description: "Handcrafted from full-grain Italian leather. Spacious enough for daily essentials.",
    isPopular: true
  },
  {
    id: "wireless-charger",
    name: "Zenith Charging Pad",
    category: "Tech",
    price: 65.00,
    image: "https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?q=80&w=500&auto=format&fit=crop",
    description: "Fast-charging wireless pad featuring a premium walnut wood finish."
  },
  {
    id: "cashmere-throw",
    name: "Cloud Cashmere Throw",
    category: "Home",
    price: 295.00,
    image: "https://images.unsplash.com/photo-1571508601891-ca5e7a713859?q=80&w=500&auto=format&fit=crop",
    description: "Ethically sourced pure cashmere. The ultimate layer for cozy evenings."
  },
  {
    id: "chelsea-boots",
    name: "Heritage Chelsea Boots",
    category: "Footwear",
    price: 285.00,
    image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=500&auto=format&fit=crop",
    description: "Classic Chelsea silhouette with a modern lug sole for everyday durability."
  },
  {
    id: "night-cream",
    name: "Restorative Night Cream",
    category: "Beauty",
    price: 95.00,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=500&auto=format&fit=crop",
    description: "Deeply hydrating formula that works overnight to rejuvenate tired skin."
  },
  {
    id: "marble-bookends",
    name: "Geometra Bookends",
    category: "Decor",
    price: 120.00,
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=500&auto=format&fit=crop",
    description: "Solid Carrara marble bookends to elevate your home library aesthetic.",
    isNew: true
  },
  {
    id: "cashmere-beanie",
    name: "Ribbed Cashmere Beanie",
    category: "Accessories",
    price: 85.00,
    image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?q=80&w=500&auto=format&fit=crop",
    description: "Ultra-compact warmth woven from 100% sustainably sourced cashmere.",
    isTrending: true
  },
  {
    id: "ceramic-pour-over",
    name: "Artisan Pour-Over Set",
    category: "Home",
    price: 135.00,
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=500&auto=format&fit=crop",
    description: "Elevate your morning ritual with this hand-thrown ceramic coffee set.",
    isNew: true,
    isPopular: true
  },
  {
    id: "linen-bedding",
    name: "French Linen Sheet Set",
    category: "Home",
    price: 350.00,
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=500&auto=format&fit=crop",
    description: "Breathable, stone-washed French linen that gets softer with every wash.",
    isTrending: true
  },
  {
    id: "botanical-candle",
    name: "Santal Voyage Candle",
    category: "Decor",
    price: 65.00,
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=500&auto=format&fit=crop",
    description: "Hand-poured soy wax infused with rich sandalwood and amber notes."
  }
]
