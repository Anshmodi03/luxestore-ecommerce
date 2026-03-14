import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Product } from '../src/models/Product.model';
import { User } from '../src/models/User.model';
import { PromoCode } from '../src/models/PromoCode.model';
import { Address } from '../src/models/Address.model';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('MONGODB_URI is required in .env');
  process.exit(1);
}

// Helper: deterministic hash from product ID (mirrors frontend logic)
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

// Category-based features (mirrors productDetails.ts)
function getFeatures(category: string) {
  if (category === 'Tech') {
    return [
      { icon: 'ph-cpu', title: 'Next-Gen Core', subtitle: 'Ultra Fast', sortOrder: 0 },
      { icon: 'ph-battery-charging', title: 'All Day', subtitle: 'Battery', sortOrder: 1 },
      { icon: 'ph-wifi-high', title: 'Wi-Fi 6E', subtitle: 'Connectivity', sortOrder: 2 },
      { icon: 'ph-shield-check', title: 'Secure', subtitle: 'Encryption', sortOrder: 3 },
    ];
  }
  if (category === 'Beauty') {
    return [
      { icon: 'ph-leaf', title: 'Organic', subtitle: 'Ingredients', sortOrder: 0 },
      { icon: 'ph-drop', title: 'Hydrating', subtitle: 'Formula', sortOrder: 1 },
      { icon: 'ph-rabbit', title: 'Cruelty-Free', subtitle: 'Certified', sortOrder: 2 },
      { icon: 'ph-first-aid', title: 'Dermatologist', subtitle: 'Tested', sortOrder: 3 },
    ];
  }
  if (['Furniture', 'Home', 'Decor'].includes(category)) {
    return [
      { icon: 'ph-armchair', title: 'Ergonomic', subtitle: 'Design', sortOrder: 0 },
      { icon: 'ph-tree', title: 'Sustainable', subtitle: 'Materials', sortOrder: 1 },
      { icon: 'ph-paint-brush', title: 'Handcrafted', subtitle: 'Finish', sortOrder: 2 },
      { icon: 'ph-shield-check', title: '10 Year', subtitle: 'Warranty', sortOrder: 3 },
    ];
  }
  return [
    { icon: 'ph-star', title: 'Premium', subtitle: 'Quality', sortOrder: 0 },
    { icon: 'ph-feather', title: 'Lightweight', subtitle: 'Comfort', sortOrder: 1 },
    { icon: 'ph-globe', title: 'Ethical', subtitle: 'Sourcing', sortOrder: 2 },
    { icon: 'ph-medal', title: 'Authentic', subtitle: 'Guarantee', sortOrder: 3 },
  ];
}

// Category-based specs (mirrors productDetails.ts)
function getSpecs(category: string) {
  if (category === 'Tech') {
    return [
      { category: 'Hardware', title: 'Processor', description: 'Custom ARM Silicon' },
      { category: 'Hardware', title: 'Memory', description: 'Up to 32GB Unified' },
      { category: 'Dimensions', title: 'Weight', description: 'Ultra-light chassis' },
      { category: 'Power', title: 'Battery Life', description: 'Up to 24 hours mixed use' },
      { category: 'Power', title: 'Charging', description: 'Fast Charge protocol' },
      { category: 'Connectivity', title: 'Ports', description: '2x USB-C Thunderbolt 4' },
    ];
  }
  if (category === 'Beauty') {
    return [
      { category: 'Volume', title: 'Size', description: '50ml / 1.7 fl oz' },
      { category: 'Type', title: 'Skin Types', description: 'All (Sensitive Safe)' },
      { category: 'Application', title: 'Usage', description: 'Daily, AM and PM' },
      { category: 'Formula', title: 'Key Active', description: 'Hyaluronic Acid 2%' },
      { category: 'Formula', title: 'Fragrance', description: 'Natural, Unscented' },
      { category: 'Packaging', title: 'Material', description: '100% Recycled Glass' },
    ];
  }
  return [
    { category: 'Dimensions', title: 'Width', description: 'Available in standard sizes' },
    { category: 'Dimensions', title: 'Length', description: 'Made to measure fits' },
    { category: 'Materials', title: 'Primary', description: 'Ethically sourced raw materials' },
    { category: 'Materials', title: 'Secondary', description: 'Recycled metallic hardware' },
    { category: 'Care', title: 'Instructions', description: 'Professional clean recommended' },
    { category: 'Origin', title: 'Craftsmanship', description: 'Hand-assembled in Italy' },
  ];
}

// Category-based extra image
function getExtraImage(category: string): string {
  const map: Record<string, string> = {
    Tech: 'https://images.unsplash.com/photo-1550009158-9efff6c97348?q=80&w=500&auto=format&fit=crop',
    Beauty: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=500&auto=format&fit=crop',
    Furniture: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=500&auto=format&fit=crop',
    Footwear: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=500&auto=format&fit=crop',
    Accessories: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=500&auto=format&fit=crop',
  };
  return map[category] || 'https://images.unsplash.com/photo-1600857062241-98e5dba7f214?q=80&w=500&auto=format&fit=crop';
}

// All 18 products from frontend products.ts
const products = [
  { id: 'pro-audio-anc', name: 'Pro Audio ANC', category: 'Tech', price: 254.99, oldPrice: 299.00, badge: '-15% OFF', badgeClass: 'bg-white/90 dark:bg-black/80 backdrop-blur-sm text-gray-900 dark:text-white', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500&auto=format&fit=crop', description: 'This item represents the pinnacle of our craftsmanship. Designed for the modern aesthete, it combines functionality with timeless elegance.', isTrending: true, isPopular: true },
  { id: 'series-7-watch', name: 'Series 7 Watch', category: 'Accessories', price: 399.00, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=500&auto=format&fit=crop', description: 'Keep perfect time with a masterpiece of micro-engineering, wrapped in aerospace-grade titanium.' },
  { id: 'urban-runner-x', name: 'Urban Runner X', category: 'Footwear', price: 129.50, badge: 'New In', badgeClass: 'bg-primary text-white', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=500&auto=format&fit=crop', description: 'Seamlessly transition from the morning commute to evening runs with unmatched comfort.', isTrending: true },
  { id: 'radiance-serum', name: 'Radiance Serum', category: 'Beauty', price: 75.00, oldPrice: 89.00, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=500&auto=format&fit=crop', description: 'A potent blend of active ingredients designed to restore your skin\'s natural luminance.', isPopular: true, isNew: true },
  { id: 'arc-floor-lamp', name: 'Arc Floor Lamp', category: 'Home', price: 329.00, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=500&auto=format&fit=crop', description: 'Sculptural lighting that transforms any room into a gallery space with warm, ambient glow.' },
  { id: 'velvet-lounge-chair', name: 'Velvet Lounge Chair', category: 'Furniture', price: 850.00, image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=500&auto=format&fit=crop', description: 'Sink into premium velvet upholstery paired with mid-century modern architectural lines.' },
  { id: 'aviator-classic', name: 'Aviator Classic', category: 'Eyewear', price: 145.00, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=500&auto=format&fit=crop', description: 'Iconic teardrop frames updated with polarized lenses and ultra-lightweight titanium.' },
  { id: 'minimalist-vase', name: 'Minimalist Vase', category: 'Decor', price: 45.00, image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?q=80&w=500&auto=format&fit=crop', description: 'Matte ceramic beautifully shaped to enhance any floral arrangement.', isNew: true, isTrending: true },
  { id: 'smart-thermostat', name: 'Aura Smart Thermostat', category: 'Tech', price: 199.00, image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?q=80&w=500&auto=format&fit=crop', description: 'Intelligent climate control enveloped in a sleek, minimalist glass design.' },
  { id: 'leather-tote', name: 'Signature Leather Tote', category: 'Accessories', price: 450.00, image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=500&auto=format&fit=crop', description: 'Handcrafted from full-grain Italian leather. Spacious enough for daily essentials.', isPopular: true },
  { id: 'wireless-charger', name: 'Zenith Charging Pad', category: 'Tech', price: 65.00, image: 'https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?q=80&w=500&auto=format&fit=crop', description: 'Fast-charging wireless pad featuring a premium walnut wood finish.' },
  { id: 'cashmere-throw', name: 'Cloud Cashmere Throw', category: 'Home', price: 295.00, image: 'https://images.unsplash.com/photo-1571508601891-ca5e7a713859?q=80&w=500&auto=format&fit=crop', description: 'Ethically sourced pure cashmere. The ultimate layer for cozy evenings.' },
  { id: 'chelsea-boots', name: 'Heritage Chelsea Boots', category: 'Footwear', price: 285.00, image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=500&auto=format&fit=crop', description: 'Classic Chelsea silhouette with a modern lug sole for everyday durability.' },
  { id: 'night-cream', name: 'Restorative Night Cream', category: 'Beauty', price: 95.00, image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=500&auto=format&fit=crop', description: 'Deeply hydrating formula that works overnight to rejuvenate tired skin.' },
  { id: 'marble-bookends', name: 'Geometra Bookends', category: 'Decor', price: 120.00, image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=500&auto=format&fit=crop', description: 'Solid Carrara marble bookends to elevate your home library aesthetic.', isNew: true },
  { id: 'cashmere-beanie', name: 'Ribbed Cashmere Beanie', category: 'Accessories', price: 85.00, image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?q=80&w=500&auto=format&fit=crop', description: 'Ultra-compact warmth woven from 100% sustainably sourced cashmere.', isTrending: true },
  { id: 'ceramic-pour-over', name: 'Artisan Pour-Over Set', category: 'Home', price: 135.00, image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=500&auto=format&fit=crop', description: 'Elevate your morning ritual with this hand-thrown ceramic coffee set.', isNew: true, isPopular: true },
  { id: 'linen-bedding', name: 'French Linen Sheet Set', category: 'Home', price: 350.00, image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=500&auto=format&fit=crop', description: 'Breathable, stone-washed French linen that gets softer with every wash.', isTrending: true },
  { id: 'botanical-candle', name: 'Santal Voyage Candle', category: 'Decor', price: 65.00, image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=500&auto=format&fit=crop', description: 'Hand-poured soy wax infused with rich sandalwood and amber notes.' },
];

async function seed() {
  console.log('🌱 Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI!);
  console.log('✅ Connected\n');

  // Clear existing data
  console.log('🗑️  Clearing existing data...');
  await Promise.all([
    Product.deleteMany({}),
    PromoCode.deleteMany({}),
  ]);

  // Seed products
  console.log('📦 Seeding 18 products...');
  for (const p of products) {
    const salt = hashString(p.id);
    const rating = Math.round((4.2 + ((salt % 100) / 100) * 0.8) * 10) / 10;
    const reviewCount = 24 + (salt % 500);

    await Product.create({
      slug: p.id,
      name: p.name,
      description: p.description,
      price: p.price,
      oldPrice: p.oldPrice,
      category: p.category,
      badge: p.badge,
      badgeClass: p.badgeClass,
      isNewArrival: p.isNew || false,
      isTrending: p.isTrending || false,
      isPopular: p.isPopular || false,
      isFeatured: p.isTrending || p.isPopular || false,
      stock: 50 + (salt % 200),
      rating,
      reviewCount,
      images: [
        { url: p.image, altText: `${p.name} - main`, sortOrder: 0 },
        { url: getExtraImage(p.category), altText: `${p.name} - detail`, sortOrder: 1 },
        { url: p.image, altText: `${p.name} - angle`, sortOrder: 2 },
      ],
      features: getFeatures(p.category),
      specs: getSpecs(p.category),
    });
    console.log(`   ✅ ${p.name}`);
  }

  // Seed promo codes
  console.log('\n🎫 Seeding promo codes...');
  await PromoCode.create([
    { code: 'LUXE10', discountType: 'percentage', discountValue: 10, minOrderValue: 100, isActive: true },
    { code: 'WELCOME20', discountType: 'percentage', discountValue: 20, minOrderValue: 200, maxUses: 1000, isActive: true },
    { code: 'FLAT500', discountType: 'fixed', discountValue: 500, minOrderValue: 2000, isActive: true },
  ]);
  console.log('   ✅ LUXE10 (10% off, min ₹100)');
  console.log('   ✅ WELCOME20 (20% off, min ₹200)');
  console.log('   ✅ FLAT500 (₹500 off, min ₹2000)');

  // Create default admin user (placeholder — real user created on Auth0 login)
  console.log('\n👤 Creating users...');
  await User.deleteMany({ email: { $in: ['admin@luxestore.com', 'customer@luxestore.com'] } });

  const admin = await User.create({
    auth0Id: 'auth0|admin-placeholder',
    email: 'admin@luxestore.com',
    firstName: 'Admin',
    lastName: 'LuxeStore',
    role: 'admin',
    provider: 'auth0',
    isVerified: true,
  });
  console.log(`   ✅ admin@luxestore.com (role: admin)`);

  const customer = await User.create({
    auth0Id: 'dev|customer-placeholder',
    email: 'customer@luxestore.com',
    firstName: 'Test',
    lastName: 'Customer',
    role: 'customer',
    provider: 'auth0',
    isVerified: true,
  });
  console.log(`   ✅ customer@luxestore.com (role: customer)`);

  // Create default address for customer
  console.log('\n🏠 Creating test address...');
  await Address.deleteMany({ user: customer._id });
  await Address.create({
    user: customer._id,
    label: 'Home',
    firstName: 'Test',
    lastName: 'Customer',
    street: '123 Dev Street, Andheri West',
    city: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '400001',
    country: 'IN',
    isDefault: true,
  });
  console.log('   ✅ Default address created');

  console.log('\n🎉 Seed complete! 18 products, 3 promo codes, 2 users, 1 address');
  console.log('\n📋 Use these IDs for Postman (X-Dev-User-Id header):');
  console.log(`   Admin ID:    ${admin._id}`);
  console.log(`   Customer ID: ${customer._id}`);
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
