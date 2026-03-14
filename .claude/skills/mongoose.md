# Mongoose — MongoDB Schemas & E-Commerce Data Modeling

## Connection Setup
```js
import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

// Cache connection in dev (Next.js hot reload)
let cached = global.mongoose || { conn: null, promise: null }

async function connectDB() {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    })
  }

  cached.conn = await cached.promise
  global.mongoose = cached
  return cached.conn
}

export default connectDB
```

## Product Schema
```js
import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, index: 'text' },
  slug: { type: String, required: true, unique: true, lowercase: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  compareAtPrice: { type: Number, min: 0 },  // original price for sale display
  currency: { type: String, default: 'INR' },

  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true, index: true },
  tags: [{ type: String, lowercase: true, index: true }],

  images: [{
    url: String,
    alt: String,
    order: { type: Number, default: 0 },
  }],
  model3d: { url: String, format: { type: String, enum: ['glb', 'gltf'] } },

  variants: [{
    name: String,      // "Red / XL"
    sku: { type: String, unique: true, sparse: true },
    price: Number,     // override base price
    stock: { type: Number, default: 0, min: 0 },
    attributes: mongoose.Schema.Types.Mixed,  // { color: 'red', size: 'XL' }
  }],

  stock: { type: Number, default: 0, min: 0 },
  lowStockThreshold: { type: Number, default: 5 },

  ratings: {
    average: { type: Number, default: 0, min: 0, max: 5 },
    count: { type: Number, default: 0 },
  },

  isActive: { type: Boolean, default: true, index: true },
  isFeatured: { type: Boolean, default: false },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
})

// Virtuals
productSchema.virtual('isOnSale').get(function () {
  return this.compareAtPrice && this.compareAtPrice > this.price
})

productSchema.virtual('discount').get(function () {
  if (!this.isOnSale) return 0
  return Math.round((1 - this.price / this.compareAtPrice) * 100)
})

// Indexes
productSchema.index({ price: 1, category: 1 })
productSchema.index({ createdAt: -1 })
productSchema.index({ name: 'text', description: 'text', tags: 'text' })

// Pre-save: generate slug
productSchema.pre('save', function (next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  }
  next()
})

export default mongoose.models.Product || mongoose.model('Product', productSchema)
```

## User Schema
```js
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: { type: String },
  passwordHash: { type: String, select: false },  // never return by default

  addresses: [{
    label: { type: String, default: 'Home' },
    line1: String,
    line2: String,
    city: String,
    state: String,
    pincode: String,
    isDefault: { type: Boolean, default: false },
  }],

  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
}, { timestamps: true })

// Only one default address
userSchema.pre('save', function (next) {
  const defaults = this.addresses.filter(a => a.isDefault)
  if (defaults.length > 1) {
    defaults.slice(1).forEach(a => { a.isDefault = false })
  }
  next()
})

export default mongoose.models.User || mongoose.model('User', userSchema)
```

## Order Schema
```js
const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },

  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,           // snapshot — product name may change
    price: Number,          // snapshot — price at time of order
    quantity: { type: Number, required: true, min: 1 },
    variant: String,
    image: String,
  }],

  shippingAddress: {
    name: String,
    line1: String,
    line2: String,
    city: String,
    state: String,
    pincode: String,
    phone: String,
  },

  subtotal: { type: Number, required: true },
  shipping: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  total: { type: Number, required: true },

  // Razorpay
  payment: {
    provider: { type: String, default: 'razorpay' },
    orderId: String,        // razorpay_order_id
    paymentId: String,      // razorpay_payment_id
    signature: String,      // razorpay_signature
    status: { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], default: 'pending' },
    paidAt: Date,
  },

  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'],
    default: 'pending',
    index: true,
  },
  statusHistory: [{
    status: String,
    timestamp: { type: Date, default: Date.now },
    note: String,
  }],

  trackingNumber: String,
  deliveredAt: Date,
}, { timestamps: true })

// Auto-generate order number
orderSchema.pre('save', async function (next) {
  if (!this.orderNumber) {
    const count = await mongoose.models.Order.countDocuments()
    this.orderNumber = `ORD-${String(count + 1).padStart(6, '0')}`
  }
  next()
})

// Push status changes to history
orderSchema.pre('save', function (next) {
  if (this.isModified('status')) {
    this.statusHistory.push({ status: this.status })
  }
  next()
})

orderSchema.index({ createdAt: -1 })
orderSchema.index({ 'payment.status': 1, status: 1 })

export default mongoose.models.Order || mongoose.model('Order', orderSchema)
```

## Population & Queries
```js
// Populate references
const order = await Order.findById(id)
  .populate('user', 'name email phone')
  .populate('items.product', 'name slug images')

// Lean queries (plain objects, 5x faster for read-only)
const products = await Product.find({ isActive: true }).lean()

// Pagination
const page = 1, limit = 12
const products = await Product.find({ category: catId })
  .sort({ createdAt: -1 })
  .skip((page - 1) * limit)
  .limit(limit)
  .lean()

const total = await Product.countDocuments({ category: catId })

// Text search
const results = await Product.find(
  { $text: { $search: query } },
  { score: { $meta: 'textScore' } }
).sort({ score: { $meta: 'textScore' } }).limit(20)

// Filter + sort
const filters = { isActive: true }
if (minPrice) filters.price = { ...filters.price, $gte: minPrice }
if (maxPrice) filters.price = { ...filters.price, $lte: maxPrice }
if (category) filters.category = category

const products = await Product.find(filters).sort(sortMap[sortBy] || { createdAt: -1 })
```

## Aggregation
```js
// Sales dashboard
const salesStats = await Order.aggregate([
  { $match: { 'payment.status': 'paid', createdAt: { $gte: startDate } } },
  { $group: {
    _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
    revenue: { $sum: '$total' },
    orders: { $sum: 1 },
    avgOrderValue: { $avg: '$total' },
  }},
  { $sort: { _id: 1 } },
])

// Top products
const topProducts = await Order.aggregate([
  { $match: { 'payment.status': 'paid' } },
  { $unwind: '$items' },
  { $group: {
    _id: '$items.product',
    totalSold: { $sum: '$items.quantity' },
    revenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } },
  }},
  { $sort: { totalSold: -1 } },
  { $limit: 10 },
  { $lookup: { from: 'products', localField: '_id', foreignField: '_id', as: 'product' } },
  { $unwind: '$product' },
])

// Category breakdown
const categoryStats = await Product.aggregate([
  { $match: { isActive: true } },
  { $group: { _id: '$category', count: { $sum: 1 }, avgPrice: { $avg: '$price' } } },
  { $lookup: { from: 'categories', localField: '_id', foreignField: '_id', as: 'category' } },
])
```

## Transactions (Stock + Order)
```js
const session = await mongoose.startSession()
try {
  session.startTransaction()

  // Decrement stock
  for (const item of cartItems) {
    const result = await Product.updateOne(
      { _id: item.productId, stock: { $gte: item.quantity } },
      { $inc: { stock: -item.quantity } },
      { session }
    )
    if (result.modifiedCount === 0) {
      throw new Error(`Insufficient stock for ${item.name}`)
    }
  }

  // Create order
  const order = await Order.create([orderData], { session })

  await session.commitTransaction()
  return order[0]
} catch (error) {
  await session.abortTransaction()
  throw error
} finally {
  session.endSession()
}
```

## Performance Tips
- Use `.lean()` for read-only queries (returns plain objects)
- Index fields used in `find`, `sort`, and `$match`
- Use `select('field1 field2')` to limit returned fields
- Use `$inc` for atomic counter updates (stock, ratings count)
- Avoid deep population chains — denormalize frequently-read data
- Use `mongoose.models.X || mongoose.model('X', schema)` to prevent re-compilation in dev
- Set `autoIndex: false` in production — run index creation in migrations
