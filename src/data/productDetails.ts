import { Product } from './products'

export interface Feature {
  id: number
  icon: string
  title: string
  subtitle: string
  delay: number
}

export interface Spec {
  category: string
  title: string
  description: string
}

export interface Review {
  id: number
  name: string
  type: string
  rating: number
  text: string
  avatarUrl?: string
  initials?: string
  initialsColor?: string
  isHighlight?: boolean
  delay: number
}

export interface ExpandedProductDetails {
  images: string[]
  features: Feature[]
  specs: Spec[]
  reviews: Review[]
  rating: number
  reviewCount: number
}

// Generate dynamic details based on the product's category to make every single popup feel unique and tailored
export function getExpandedProductDetails(product: Product): ExpandedProductDetails {
  
  // 1. Dynamic Images pseudo-generator (just simulating multiple angles using variations of the same image url or generic lush images)
  const images = [
    product.image,
    // Add some generic luxury lifestyle mock angles
    product.category === 'Tech' ? 'https://images.unsplash.com/photo-1550009158-9efff6c97348?q=80&w=500&auto=format&fit=crop' :
    product.category === 'Beauty' ? 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=500&auto=format&fit=crop' :
    product.category === 'Furniture' ? 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=500&auto=format&fit=crop' :
    product.category === 'Footwear' ? 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=500&auto=format&fit=crop' :
    product.category === 'Accessories' ? 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=500&auto=format&fit=crop' :
    'https://images.unsplash.com/photo-1600857062241-98e5dba7f214?q=80&w=500&auto=format&fit=crop',
    product.image // back to main for the 3rd angled shot
  ]

  // 2. Dynamic Features
  let features: Feature[] = []
  
  if (product.category === 'Tech') {
    features = [
      { id: 1, icon: 'ph-cpu', title: 'Next-Gen Core', subtitle: 'Ultra Fast', delay: 0 },
      { id: 2, icon: 'ph-battery-charging', title: 'All Day', subtitle: 'Battery', delay: 0.1 },
      { id: 3, icon: 'ph-wifi-high', title: 'Wi-Fi 6E', subtitle: 'Connectivity', delay: 0.2 },
      { id: 4, icon: 'ph-shield-check', title: 'Secure', subtitle: 'Encryption', delay: 0.3 }
    ]
  } else if (product.category === 'Beauty') {
    features = [
      { id: 1, icon: 'ph-leaf', title: 'Organic', subtitle: 'Ingredients', delay: 0 },
      { id: 2, icon: 'ph-drop', title: 'Hydrating', subtitle: 'Formula', delay: 0.1 },
      { id: 3, icon: 'ph-rabbit', title: 'Cruelty-Free', subtitle: 'Certified', delay: 0.2 },
      { id: 4, icon: 'ph-first-aid', title: 'Dermatologist', subtitle: 'Tested', delay: 0.3 }
    ]
  } else if (product.category === 'Furniture' || product.category === 'Home' || product.category === 'Decor') {
    features = [
      { id: 1, icon: 'ph-armchair', title: 'Ergonomic', subtitle: 'Design', delay: 0 },
      { id: 2, icon: 'ph-tree', title: 'Sustainable', subtitle: 'Materials', delay: 0.1 },
      { id: 3, icon: 'ph-paint-brush', title: 'Handcrafted', subtitle: 'Finish', delay: 0.2 },
      { id: 4, icon: 'ph-shield-check', title: '10 Year', subtitle: 'Warranty', delay: 0.3 }
    ]
  } else {
    // Default (Footwear, Accessories, Eyewear, etc)
    features = [
      { id: 1, icon: 'ph-star', title: 'Premium', subtitle: 'Quality', delay: 0 },
      { id: 2, icon: 'ph-feather', title: 'Lightweight', subtitle: 'Comfort', delay: 0.1 },
      { id: 3, icon: 'ph-globe', title: 'Ethical', subtitle: 'Sourcing', delay: 0.2 },
      { id: 4, icon: 'ph-medal', title: 'Authentic', subtitle: 'Guarantee', delay: 0.3 }
    ]
  }

  // 3. Dynamic Specs
  let specs: Spec[] = []
  
  if (product.category === 'Tech') {
    specs = [
      { category: 'Hardware', title: 'Processor', description: 'Custom ARM Silicon' },
      { category: 'Hardware', title: 'Memory', description: 'Up to 32GB Unified' },
      { category: 'Dimensions', title: 'Weight', description: 'Ultra-light chassis' },
      { category: 'Power', title: 'Battery Life', description: 'Up to 24 hours mixed use' },
      { category: 'Power', title: 'Charging', description: 'Fast Charge protocol' },
      { category: 'Connectivity', title: 'Ports', description: '2x USB-C Thunderbolt 4' },
    ]
  } else if (product.category === 'Beauty') {
    specs = [
      { category: 'Volume', title: 'Size', description: '50ml / 1.7 fl oz' },
      { category: 'Type', title: 'Skin Types', description: 'All (Sensitive Safe)' },
      { category: 'Application', title: 'Usage', description: 'Daily, AM and PM' },
      { category: 'Formula', title: 'Key Active', description: 'Hyaluronic Acid 2%' },
      { category: 'Formula', title: 'Fragrance', description: 'Natural, Unscented' },
      { category: 'Packaging', title: 'Material', description: '100% Recycled Glass' },
    ]
  } else {
    specs = [
      { category: 'Dimensions', title: 'Width', description: 'Available in standard sizes' },
      { category: 'Dimensions', title: 'Length', description: 'Made to measure fits' },
      { category: 'Materials', title: 'Primary', description: 'Ethically sourced raw materials' },
      { category: 'Materials', title: 'Secondary', description: 'Recycled metallic hardware' },
      { category: 'Care', title: 'Instructions', description: 'Professional clean recommended' },
      { category: 'Origin', title: 'Craftsmanship', description: 'Hand-assembled in Italy' },
    ]
  }

  // 4. Dynamic Reviews
  // We'll generate a random rating between 4.2 and 5.0 for the product
  const hashString = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }
  
  // Use the ID to generate deterministic "random" numbers
  const salt = hashString(product.id)
  const rating = 4.2 + ((salt % 100) / 100) * 0.8 // 4.2 to 5.0
  const reviewCount = 24 + (salt % 500) // 24 to 523 reviews

  const reviews: Review[] = [
    {
      id: 1,
      name: "Alexander M.",
      type: "Verified Buyer",
      rating: 5,
      text: `"The build quality on the ${product.name} is exceptional. It exceeded all my expectations and fits perfectly into my lifestyle."`,
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
      delay: 0
    },
    {
      id: 2,
      name: "Sophia L.",
      type: "Verified Buyer",
      rating: rating > 4.8 ? 5 : 4,
      text: `"Stunning design. The attention to detail is exactly what I've come to expect from LuxeStore. Worth every penny."`,
      initials: "SL",
      delay: 0.1
    },
    {
      id: 3,
      name: "Marcus T.",
      type: "Verified Buyer",
      rating: 5,
      text: `"I was hesitant about the price tag, but the moment I unboxed the ${product.name}, I understood the value. Highly recommended."`,
      avatarUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=150&auto=format&fit=crop",
      isHighlight: true,
      delay: 0.2
    },
    {
      id: 4,
      name: "Emma W.",
      type: "Verified Buyer",
      rating: rating > 4.5 ? 5 : 4.5,
      text: `"Flawless delivery and packaging. The item itself is a masterpiece. I've received so many compliments already."`,
      initials: "EW",
      initialsColor: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400",
      delay: 0.3
    }
  ]

  return {
    images,
    features,
    specs,
    reviews,
    rating,
    reviewCount
  }
}
