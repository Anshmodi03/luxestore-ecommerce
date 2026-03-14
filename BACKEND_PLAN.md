# 🏗️ LuxeStore — Backend Architecture Plan

> **Document Version:** 2.0  
> **Date:** March 4, 2026  
> **Status:** Draft — Awaiting Final Review  

> [!IMPORTANT]
> **v2.0 Changes:** Auth0 for authentication (with Google login), Razorpay (test mode) for payments, MongoDB + Mongoose as the database — as per user feedback.

---

## 1. Executive Summary

LuxeStore is currently a **frontend-only** React + Vite + TypeScript application. All product data, user profiles, orders, wishlist items, and cart state are hardcoded into static TypeScript files and React contexts. There is **no backend, no database, no authentication, and no payment processing**.

This document outlines every backend service, API endpoint, database schema, and security measure needed to transform LuxeStore from a static prototype into a **production-grade, secure e-commerce platform**.

---

## 2. Current Frontend Analysis

### 2.1 Tech Stack
| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript |
| Bundler | Vite 6 |
| Styling | Tailwind CSS 4 |
| Routing | React Router DOM 7 |
| Animations | Framer Motion + GSAP |
| Icons | Phosphor Icons |
| Smooth Scroll | Lenis |

### 2.2 Pages & Features Requiring Backend Support

| Frontend Page | Current State | Backend Required |
|---------------|--------------|-----------------|
| **AuthPage** (`/auth`) | Sign In, Register, Password Recovery forms with Google/Apple OAuth buttons — all mock, no real auth | ✅ Auth0 integration (email + Google login) |
| **CollectionPage** (`/collection`) | 18 hardcoded products in `products.ts` with filtering/sorting | ✅ Product catalog API |
| **ProductDetailsPage** (`/product/:id`) | Product info, gallery, features, specs, reviews — all generated from static data via `productDetails.ts` | ✅ Product details + reviews API |
| **CartDrawer** (global) | Real cart items from CartContext with add/remove/quantity controls, empty state UI, dynamic shipping | ✅ Cart management API (sync with backend) |
| **CheckoutPage** (`/checkout`) | 3-step form (address → payment → confirm) with static order number `LX-9428` | ✅ Order + Razorpay payment API |
| **DashboardPage** (`/dashboard`) | Profile, Order History, Saved Addresses, Wishlist, Settings — all hardcoded | ✅ User profile + orders API |
| **LandingPage** (`/`) | Trending products, testimonials, brand showcase | ✅ Featured products API |
| **EditorialPage** (`/editorial`) | Static content | ⚠️ Optional CMS integration |
| **ClientServicesPage** (`/services`) | Static content | ⚠️ Optional contact form API |

### 2.3 React Contexts (Current State — Must Be Overhauled)

| Context | Current Behavior | Needed Change |
|---------|-----------------|---------------|
| `CartContext` | Full cart state: `items[]`, `addItem`, `removeItem`, `updateQuantity`, `clearCart`, `totalItems`, `subtotal` — persisted to localStorage | Sync localStorage cart with backend API on login; on mutations, update both localStorage and server |
| `ProductModalContext` | Opens/closes a quick-view modal with a product object | Can remain client-side, but product data must come from API |

### 2.4 Static Data Files (To Be Replaced by Database)

| File | Contents | Replacement |
|------|----------|-------------|
| `src/data/products.ts` | 18 products with `Product` interface (id, name, category, price, image, badges) | Products collection in MongoDB |
| `src/data/productDetails.ts` | Category-based features, specs, and mock reviews generated via hash functions | Product details + reviews collections |

---

## 3. Recommended Tech Stack (Backend)

| Layer | Recommended Technology | Rationale |
|-------|----------------------|-----------|
| **Runtime** | Node.js 20 LTS | Matches frontend JavaScript ecosystem |
| **Framework** | Express.js 5 | Battle-tested, lightweight, massive ecosystem |
| **Language** | TypeScript | Consistent with frontend, shared type definitions |
| **Database** | MongoDB (Atlas) | Flexible document model, great for product catalogs with varying attributes, free tier available |
| **ODM** | Mongoose 8 | Schema validation, middleware hooks, TypeScript support, population for relations |
| **Auth** | Auth0 | Enterprise-grade auth-as-a-service: handles password hashing, token management, brute-force protection, Google OAuth, Apple Sign-In, MFA — all out-of-the-box |
| **Payment** | Razorpay (Test Mode) | India-friendly payment gateway, simple integration, test mode for development with test cards |
| **File Storage** | Cloudinary or AWS S3 | Product images, user avatars |
| **Email** | Nodemailer + SendGrid/Resend | Order confirmations, notifications (Auth0 handles password recovery emails) |
| **Validation** | Zod | Shared schemas between frontend and backend |
| **Rate Limiting** | express-rate-limit | Protect against brute-force attacks |
| **Caching** | Redis (optional for v2) | Session store, cart caching, product catalog cache |

### 3.1 Project Structure
```
backend/
├── src/
│   ├── server.ts              # Express app entry point
│   ├── config/
│   │   ├── env.ts             # Environment variable validation (Zod)
│   │   ├── database.ts        # Mongoose connection setup
│   │   ├── auth0.ts           # Auth0 configuration + JWKS setup
│   │   └── razorpay.ts        # Razorpay instance configuration
│   ├── models/
│   │   ├── User.model.ts      # Mongoose User schema
│   │   ├── Product.model.ts   # Mongoose Product schema (with embedded images, features, specs)
│   │   ├── Review.model.ts    # Mongoose Review schema
│   │   ├── Cart.model.ts      # Mongoose Cart schema (with embedded items)
│   │   ├── Order.model.ts     # Mongoose Order schema (with embedded items)
│   │   ├── Address.model.ts   # Mongoose Address schema
│   │   ├── WishlistItem.model.ts
│   │   └── PromoCode.model.ts
│   ├── middleware/
│   │   ├── auth.ts            # Auth0 JWT verification middleware (express-oauth2-jwt-bearer)
│   │   ├── validate.ts        # Request body validation (Zod)
│   │   ├── rateLimiter.ts     # Rate limiting rules
│   │   ├── errorHandler.ts    # Global error handling
│   │   └── cors.ts            # CORS configuration
│   ├── routes/
│   │   ├── auth.routes.ts     # Auth0 callback + user sync routes
│   │   ├── products.routes.ts
│   │   ├── cart.routes.ts
│   │   ├── orders.routes.ts
│   │   ├── users.routes.ts
│   │   ├── wishlist.routes.ts
│   │   └── promo.routes.ts
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── products.controller.ts
│   │   ├── cart.controller.ts
│   │   ├── orders.controller.ts
│   │   ├── users.controller.ts
│   │   ├── wishlist.controller.ts
│   │   └── promo.controller.ts
│   ├── services/
│   │   ├── auth.service.ts    # Sync Auth0 user to local MongoDB
│   │   ├── product.service.ts
│   │   ├── cart.service.ts
│   │   ├── order.service.ts
│   │   ├── email.service.ts
│   │   ├── payment.service.ts # Razorpay order creation + verification
│   │   └── promo.service.ts
│   ├── utils/
│   │   └── orderNumber.ts     # Unique order number generator (LX-XXXXX)
│   └── types/
│       └── index.ts           # Shared TypeScript interfaces
├── seed/
│   └── seed.ts                # Database seed script
├── tests/
│   ├── auth.test.ts
│   ├── products.test.ts
│   ├── cart.test.ts
│   └── orders.test.ts
├── .env.example
├── package.json
└── tsconfig.json
```

---

## 4. Database Schema (MongoDB + Mongoose)

### 4.1 User Model

```typescript
// src/models/User.model.ts
import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  auth0Id: string;         // Auth0 user ID (e.g., "auth0|abc123" or "google-oauth2|xyz")
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatarUrl?: string;
  role: 'customer' | 'admin';
  provider: 'auth0' | 'google';  // How the user signed up
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  auth0Id:    { type: String, required: true, unique: true, index: true },
  email:      { type: String, required: true, unique: true, index: true },
  firstName:  { type: String, required: true },
  lastName:   { type: String, required: true },
  phone:      { type: String },
  avatarUrl:  { type: String },
  role:       { type: String, enum: ['customer', 'admin'], default: 'customer' },
  provider:   { type: String, enum: ['auth0', 'google'], default: 'auth0' },
  isVerified: { type: Boolean, default: false },
}, { timestamps: true });

export const User = model<IUser>('User', userSchema);
```

### 4.2 Product Model (with embedded sub-documents)

```typescript
// src/models/Product.model.ts
import { Schema, model, Document } from 'mongoose';

interface IProductImage {
  url: string;
  altText?: string;
  sortOrder: number;
}

interface IProductFeature {
  icon: string;       // e.g., "ph-cpu", "ph-shield-check"
  title: string;
  subtitle: string;
  sortOrder: number;
}

interface IProductSpec {
  category: string;   // e.g., "Hardware", "Dimensions"
  title: string;
  description: string;
}

export interface IProduct extends Document {
  slug: string;              // URL-friendly ID (e.g., "pro-audio-anc")
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  category: string;
  badge?: string;            // "New In", "-15% OFF"
  badgeClass?: string;       // Tailwind classes for badge styling
  isNew: boolean;
  isTrending: boolean;
  isPopular: boolean;
  isFeatured: boolean;
  stock: number;
  rating: number;
  reviewCount: number;
  images: IProductImage[];
  features: IProductFeature[];
  specs: IProductSpec[];
  createdAt: Date;
  updatedAt: Date;
}

const productImageSchema = new Schema<IProductImage>({
  url:       { type: String, required: true },
  altText:   { type: String },
  sortOrder: { type: Number, default: 0 },
}, { _id: false });

const productFeatureSchema = new Schema<IProductFeature>({
  icon:      { type: String, required: true },
  title:     { type: String, required: true },
  subtitle:  { type: String, required: true },
  sortOrder: { type: Number, default: 0 },
}, { _id: false });

const productSpecSchema = new Schema<IProductSpec>({
  category:    { type: String, required: true },
  title:       { type: String, required: true },
  description: { type: String, required: true },
}, { _id: false });

const productSchema = new Schema<IProduct>({
  slug:        { type: String, required: true, unique: true, index: true },
  name:        { type: String, required: true },
  description: { type: String, required: true },
  price:       { type: Number, required: true },
  oldPrice:    { type: Number },
  category:    { type: String, required: true, index: true },
  badge:       { type: String },
  badgeClass:  { type: String },
  isNew:       { type: Boolean, default: false },
  isTrending:  { type: Boolean, default: false },
  isPopular:   { type: Boolean, default: false },
  isFeatured:  { type: Boolean, default: false },
  stock:       { type: Number, default: 0 },
  rating:      { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  images:      [productImageSchema],
  features:    [productFeatureSchema],
  specs:       [productSpecSchema],
}, { timestamps: true });

// Compound index for filter queries
productSchema.index({ isTrending: 1, isPopular: 1, isNew: 1 });

export const Product = model<IProduct>('Product', productSchema);
```

### 4.3 Review Model

```typescript
// src/models/Review.model.ts
import { Schema, model, Document, Types } from 'mongoose';

export interface IReview extends Document {
  product: Types.ObjectId;
  user: Types.ObjectId;
  rating: number;           // 1–5
  title?: string;
  text: string;
  isVerified: boolean;      // "Verified Buyer" badge
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>({
  product:    { type: Schema.Types.ObjectId, ref: 'Product', required: true, index: true },
  user:       { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rating:     { type: Number, required: true, min: 1, max: 5 },
  title:      { type: String },
  text:       { type: String, required: true },
  isVerified: { type: Boolean, default: false },
}, { timestamps: true });

// One review per user per product
reviewSchema.index({ product: 1, user: 1 }, { unique: true });

export const Review = model<IReview>('Review', reviewSchema);
```

### 4.4 Cart Model (embedded items)

```typescript
// src/models/Cart.model.ts
import { Schema, model, Document, Types } from 'mongoose';

interface ICartItem {
  product: Types.ObjectId;
  quantity: number;
}

export interface ICart extends Document {
  user: Types.ObjectId;
  items: ICartItem[];
  updatedAt: Date;
}

const cartItemSchema = new Schema<ICartItem>({
  product:  { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, default: 1, min: 1 },
}, { _id: true });

const cartSchema = new Schema<ICart>({
  user:  { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
  items: [cartItemSchema],
}, { timestamps: true });

export const Cart = model<ICart>('Cart', cartSchema);
```

### 4.5 Order Model (embedded items — snapshot at purchase time)

```typescript
// src/models/Order.model.ts
import { Schema, model, Document, Types } from 'mongoose';

interface IOrderItem {
  product: Types.ObjectId;
  name: string;             // Snapshot of product name at purchase time
  price: number;            // Snapshot of price at purchase time
  image: string;            // Snapshot of product image
  quantity: number;
}

export interface IOrder extends Document {
  orderNumber: string;       // "LX-XXXXX" format
  user: Types.ObjectId;
  shippingAddress: {
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  items: IOrderItem[];
  subtotal: number;
  tax: number;
  shippingCost: number;
  discount: number;
  total: number;
  promoCode?: string;
  razorpayOrderId?: string;     // Razorpay Order ID
  razorpayPaymentId?: string;   // Razorpay Payment ID (set after verification)
  razorpaySignature?: string;   // Razorpay Signature (for verification)
  paidAt?: Date;
  shippedAt?: Date;
  deliveredAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const orderItemSchema = new Schema<IOrderItem>({
  product:  { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  name:     { type: String, required: true },
  price:    { type: Number, required: true },
  image:    { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
}, { _id: false });

const orderSchema = new Schema<IOrder>({
  orderNumber: { type: String, required: true, unique: true, index: true },
  user:        { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  shippingAddress: {
    firstName:  { type: String, required: true },
    lastName:   { type: String, required: true },
    street:     { type: String, required: true },
    city:       { type: String, required: true },
    state:      { type: String, required: true },
    postalCode: { type: String, required: true },
    country:    { type: String, default: 'IN' },
  },
  status:       { type: String, enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'], default: 'pending', index: true },
  items:        [orderItemSchema],
  subtotal:     { type: Number, required: true },
  tax:          { type: Number, required: true },
  shippingCost: { type: Number, default: 0 },
  discount:     { type: Number, default: 0 },
  total:        { type: Number, required: true },
  promoCode:    { type: String },
  razorpayOrderId:   { type: String },
  razorpayPaymentId: { type: String },
  razorpaySignature: { type: String },
  paidAt:       { type: Date },
  shippedAt:    { type: Date },
  deliveredAt:  { type: Date },
}, { timestamps: true });

export const Order = model<IOrder>('Order', orderSchema);
```

### 4.6 Address Model

```typescript
// src/models/Address.model.ts
import { Schema, model, Document, Types } from 'mongoose';

export interface IAddress extends Document {
  user: Types.ObjectId;
  label: string;             // "Home", "Office"
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const addressSchema = new Schema<IAddress>({
  user:       { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  label:      { type: String, default: 'Home' },
  firstName:  { type: String, required: true },
  lastName:   { type: String, required: true },
  street:     { type: String, required: true },
  city:       { type: String, required: true },
  state:      { type: String, required: true },
  postalCode: { type: String, required: true },
  country:    { type: String, default: 'IN' },
  isDefault:  { type: Boolean, default: false },
}, { timestamps: true });

export const Address = model<IAddress>('Address', addressSchema);
```

### 4.7 Wishlist & Promo Code Models

```typescript
// src/models/WishlistItem.model.ts
import { Schema, model, Document, Types } from 'mongoose';

export interface IWishlistItem extends Document {
  user: Types.ObjectId;
  product: Types.ObjectId;
  createdAt: Date;
}

const wishlistSchema = new Schema<IWishlistItem>({
  user:    { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
}, { timestamps: true });

wishlistSchema.index({ user: 1, product: 1 }, { unique: true });

export const WishlistItem = model<IWishlistItem>('WishlistItem', wishlistSchema);
```

```typescript
// src/models/PromoCode.model.ts
import { Schema, model, Document } from 'mongoose';

export interface IPromoCode extends Document {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue?: number;
  maxUses?: number;
  currentUses: number;
  expiresAt?: Date;
  isActive: boolean;
  createdAt: Date;
}

const promoCodeSchema = new Schema<IPromoCode>({
  code:          { type: String, required: true, unique: true, index: true, uppercase: true },
  discountType:  { type: String, enum: ['percentage', 'fixed'], required: true },
  discountValue: { type: Number, required: true },
  minOrderValue: { type: Number },
  maxUses:       { type: Number },
  currentUses:   { type: Number, default: 0 },
  expiresAt:     { type: Date },
  isActive:      { type: Boolean, default: true },
}, { timestamps: true });

export const PromoCode = model<IPromoCode>('PromoCode', promoCodeSchema);
```

---

## 5. Auth0 Integration Architecture

### 5.1 How It Works

Auth0 handles **all** authentication complexity. Your backend never touches passwords directly.

```
┌──────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                       │
│                                                          │
│  1. User clicks "Sign In" or "Sign Up" or "Google"       │
│  2. Auth0 SDK redirects to Auth0 Universal Login page     │
│  3. User authenticates (email/password OR Google)         │
│  4. Auth0 returns JWT access token + ID token             │
│  5. Frontend stores tokens via Auth0 React SDK            │
│  6. Frontend sends access token in Authorization header   │
└──────────────────┬───────────────────────────────────────┘
                   │ Authorization: Bearer <access_token>
                   ▼
┌──────────────────────────────────────────────────────────┐
│                    BACKEND (Express)                      │
│                                                          │
│  1. auth middleware verifies JWT using Auth0 JWKS          │
│  2. Extracts auth0Id (sub claim) from token               │
│  3. Looks up or creates user in MongoDB by auth0Id        │
│  4. Attaches user to req.user for downstream use          │
└──────────────────────────────────────────────────────────┘
```

### 5.2 Auth0 Tenant Configuration

| Setting | Value |
|---------|-------|
| **Tenant Domain** | `luxestore.auth0.com` (or your custom domain) |
| **Application Type** | Single Page Application (SPA) |
| **Allowed Callback URLs** | `http://localhost:5173/auth/callback`, `https://luxestore.com/auth/callback` |
| **Allowed Logout URLs** | `http://localhost:5173`, `https://luxestore.com` |
| **Allowed Web Origins** | `http://localhost:5173`, `https://luxestore.com` |
| **API Audience** | `https://api.luxestore.com` (custom API identifier) |

### 5.3 Auth0 Connections to Enable

| Connection | Purpose |
|------------|---------|
| **Username-Password-Authentication** | Email/password sign-up and login |
| **google-oauth2** | Google Sign-In button on AuthPage |

### 5.4 Backend Auth Middleware

```typescript
// src/middleware/auth.ts
import { auth } from 'express-oauth2-jwt-bearer';

// Validates the JWT access token from Auth0
export const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,           // Custom API audience
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL, // https://luxestore.auth0.com
  tokenSigningAlg: 'RS256',
});

// After JWT check — sync Auth0 user to local MongoDB
export const syncUser = async (req: any, res: any, next: any) => {
  const auth0Id = req.auth.payload.sub;  // e.g., "auth0|abc123" or "google-oauth2|xyz"
  
  let user = await User.findOne({ auth0Id });
  
  if (!user) {
    // First-time login — create local user from Auth0 profile
    const userInfo = await fetchAuth0UserProfile(auth0Id);
    user = await User.create({
      auth0Id,
      email: userInfo.email,
      firstName: userInfo.given_name || '',
      lastName: userInfo.family_name || '',
      avatarUrl: userInfo.picture,
      provider: auth0Id.startsWith('google') ? 'google' : 'auth0',
      isVerified: userInfo.email_verified,
    });
  }
  
  req.user = user;
  next();
};
```

### 5.5 Frontend Auth0 Setup

```typescript
// src/main.tsx — wrap app with Auth0Provider
import { Auth0Provider } from '@auth0/auth0-react';

root.render(
  <Auth0Provider
    domain={import.meta.env.VITE_AUTH0_DOMAIN}
    clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin + '/auth/callback',
      audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      scope: 'openid profile email',
    }}
  >
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </Auth0Provider>
);
```

### 5.6 Auth0-Powered AuthPage Changes

| Current AuthPage Feature | Auth0 Implementation |
|--------------------------|---------------------|
| Email/Password Sign In form | `loginWithRedirect()` with Auth0 Universal Login |
| Email/Password Register form | `loginWithRedirect({ authorizationParams: { screen_hint: 'signup' } })` |
| Password Recovery | Auth0 handles via Universal Login "Forgot Password" link |
| Google OAuth button | `loginWithRedirect({ authorizationParams: { connection: 'google-oauth2' } })` |
| Apple OAuth button | Can be added as an Auth0 Social Connection (optional) |
| "Stay Signed In" checkbox | Auth0 SDK `cacheLocation: 'localstorage'` vs `'memory'` |

> [!NOTE]
> Auth0's Universal Login page handles password validation, brute-force protection, and rate limiting automatically. No need to build these on the backend.

---

## 6. API Endpoints

### 6.1 Authentication (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| `GET` | `/api/auth/me` | Get current user profile (syncs Auth0 user to local DB on first call) | ✅ (Auth0 JWT) |
| `PUT` | `/api/auth/me` | Update local user profile (firstName, lastName, phone) | ✅ |
| `DELETE` | `/api/auth/me` | Delete user account (soft delete local record) | ✅ |

> [!TIP]
> Registration, login, password recovery, Google sign-in, and token refresh are all handled by Auth0 on the frontend. The backend only needs to verify the JWT and sync the user to MongoDB.

**Rate Limiting:** 10 requests/minute for `/api/auth/me`.

### 6.2 Products (`/api/products`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| `GET` | `/api/products` | List all products (supports `?category=`, `?sort=`, `?search=`, `?page=`, `?limit=`) | ❌ |
| `GET` | `/api/products/featured` | Get featured/trending products (for landing page) | ❌ |
| `GET` | `/api/products/:slug` | Get single product with images, features, specs | ❌ |
| `GET` | `/api/products/:slug/reviews` | Get paginated reviews for a product | ❌ |
| `POST` | `/api/products/:slug/reviews` | Submit a review (verified buyers only) | ✅ |
| `POST` | `/api/products` | Create product (admin only) | ✅ Admin |
| `PUT` | `/api/products/:slug` | Update product (admin only) | ✅ Admin |
| `DELETE` | `/api/products/:slug` | Delete product (admin only) | ✅ Admin |

### 6.3 Cart (`/api/cart`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| `GET` | `/api/cart` | Get current user's cart with items (populated with product details) | ✅ |
| `POST` | `/api/cart/items` | Add item to cart (`{ productId, quantity }`) | ✅ |
| `PUT` | `/api/cart/items/:itemId` | Update item quantity | ✅ |
| `DELETE` | `/api/cart/items/:itemId` | Remove item from cart | ✅ |
| `DELETE` | `/api/cart` | Clear entire cart | ✅ |

### 6.4 Orders & Razorpay Payment (`/api/orders`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| `POST` | `/api/orders` | Create order from cart → creates Razorpay order → returns `razorpay_order_id` | ✅ |
| `POST` | `/api/orders/:orderNumber/verify-payment` | Verify Razorpay payment signature after checkout | ✅ |
| `GET` | `/api/orders` | Get user's order history (paginated) | ✅ |
| `GET` | `/api/orders/:orderNumber` | Get single order details | ✅ |
| `POST` | `/api/orders/:orderNumber/cancel` | Cancel a pending order | ✅ |
| `POST` | `/api/webhooks/razorpay` | Razorpay webhook for payment status updates | ❌ (verified by signature) |

#### Razorpay Payment Flow

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Frontend: User clicks "Place Order"                       │
│    → POST /api/orders { addressId, promoCode }               │
│                                                              │
│ 2. Backend: Creates Order (status: pending)                  │
│    → Creates Razorpay Order via razorpay.orders.create()     │
│    → Returns { orderNumber, razorpayOrderId, amount, key }   │
│                                                              │
│ 3. Frontend: Opens Razorpay Checkout modal                   │
│    → User pays with test card (4111 1111 1111 1111)          │
│    → Razorpay returns: payment_id + order_id + signature     │
│                                                              │
│ 4. Frontend: POST /api/orders/:orderNumber/verify-payment    │
│    → Sends { razorpay_payment_id, razorpay_order_id,         │
│              razorpay_signature }                             │
│                                                              │
│ 5. Backend: Verifies signature using HMAC SHA256             │
│    → If valid: updates order status to "confirmed"           │
│    → Clears user's cart                                      │
│    → Returns success + order details                         │
└─────────────────────────────────────────────────────────────┘
```

**Razorpay Test Cards:**
| Card Number | Description |
|------------|-------------|
| `4111 1111 1111 1111` | Successful payment |
| `5267 3181 8797 5449` | Mastercard test |

### 6.5 User Profile (`/api/users`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| `GET` | `/api/users/me` | Get authenticated user's profile | ✅ |
| `PUT` | `/api/users/me` | Update profile (name, phone, avatar) | ✅ |

### 6.6 Addresses (`/api/users/me/addresses`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| `GET` | `/api/users/me/addresses` | List saved addresses | ✅ |
| `POST` | `/api/users/me/addresses` | Add new address | ✅ |
| `PUT` | `/api/users/me/addresses/:id` | Update address | ✅ |
| `DELETE` | `/api/users/me/addresses/:id` | Delete address | ✅ |
| `PUT` | `/api/users/me/addresses/:id/default` | Set as default | ✅ |

### 6.7 Wishlist (`/api/wishlist`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| `GET` | `/api/wishlist` | Get user's wishlist | ✅ |
| `POST` | `/api/wishlist` | Add product to wishlist (`{ productId }`) | ✅ |
| `DELETE` | `/api/wishlist/:productId` | Remove from wishlist | ✅ |

### 6.8 Promo Codes (`/api/promo`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| `POST` | `/api/promo/validate` | Validate a promo code → returns discount info | ✅ |
| `POST` | `/api/promo` | Create promo code (admin only) | ✅ Admin |

---

## 7. Security Plan

### 7.1 Authentication & Authorization (Auth0-Managed)

| Measure | Implementation |
|---------|---------------|
| **Password Hashing** | Handled by Auth0 (bcrypt internally) — we never store passwords |
| **JWT Access Tokens** | Issued by Auth0, RS256 signed, verified on backend using JWKS endpoint |
| **Token Refresh** | Auth0 SDK handles silent authentication + refresh token rotation |
| **Brute-Force Protection** | Auth0's built-in Attack Protection (blocks IPs after failed attempts) |
| **Google OAuth** | Auth0 Social Connection — handles OAuth flow, state validation, token exchange |
| **MFA (Future)** | Can be enabled in Auth0 dashboard with zero backend code changes |
| **Role-Based Access** | Auth0 custom claims (`app_metadata.role`) or local DB role lookup |

### 7.2 API Security

| Measure | Implementation |
|---------|---------------|
| **CORS** | Whitelist only frontend origin (`FRONTEND_URL` env var) |
| **Rate Limiting** | Tiered: auth routes (10/min), general API (100/min), webhooks (unlimited from Razorpay IPs) |
| **Input Validation** | Zod schemas on every request body — reject invalid data early |
| **NoSQL Injection** | Mongoose schema validation + `mongo-sanitize` middleware to strip `$` operators |
| **XSS Protection** | Sanitize all user-generated content (reviews, names) with `dompurify` |
| **CSRF Protection** | SameSite cookies + check `Origin`/`Referer` headers |
| **Helmet.js** | Set security headers: `X-Content-Type-Options`, `X-Frame-Options`, `Strict-Transport-Security`, etc. |
| **Request Size Limit** | `express.json({ limit: '1mb' })` — prevent payload bombs |

### 7.3 Payment Security (Razorpay)

| Measure | Implementation |
|---------|---------------|
| **No Raw Card Data** | Razorpay Checkout.js handles card input in an iframe — we never touch card numbers |
| **Signature Verification** | Verify `razorpay_signature` using HMAC SHA256 with Razorpay Key Secret |
| **Server-Side Totals** | Always calculate order totals on the backend — never trust frontend prices |
| **Idempotent Orders** | Use Razorpay Order ID to prevent duplicate payments |
| **Webhook Verification** | Verify Razorpay webhook signatures for async payment status updates |
| **Test Mode** | Use Razorpay test keys (`rzp_test_...`) — no real money charged during development |

### 7.4 Data Protection

| Measure | Implementation |
|---------|---------------|
| **HTTPS Only** | Force TLS in production; set `Strict-Transport-Security` header |
| **Environment Variables** | All secrets in `.env` — never committed to Git |
| **MongoDB Atlas** | Connection via TLS, IP whitelisting, strong credentials, network peering |
| **Logging** | Structured logging (pino/winston) — never log passwords or tokens |
| **Error Responses** | Generic error messages in production — no stack traces leaked |

---

## 8. Environment Variables

```env
# .env.example

# ── Server ──
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173

# ── MongoDB ──
MONGODB_URI=mongodb+srv://luxestore:<password>@cluster0.xxxxx.mongodb.net/luxestore?retryWrites=true&w=majority

# ── Auth0 ──
AUTH0_ISSUER_BASE_URL=https://your-tenant.auth0.com
AUTH0_AUDIENCE=https://api.luxestore.com
AUTH0_CLIENT_ID=your-auth0-client-id
AUTH0_CLIENT_SECRET=your-auth0-client-secret
AUTH0_MANAGEMENT_API_TOKEN=your-management-api-token  # For fetching user profiles

# ── Auth0 (Frontend — exposed via VITE_) ──
VITE_AUTH0_DOMAIN=your-tenant.auth0.com
VITE_AUTH0_CLIENT_ID=your-spa-client-id
VITE_AUTH0_AUDIENCE=https://api.luxestore.com

# ── Razorpay ──
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
RAZORPAY_KEY_SECRET=your-razorpay-key-secret
RAZORPAY_WEBHOOK_SECRET=your-razorpay-webhook-secret

# ── Razorpay (Frontend — exposed via VITE_) ──
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx

# ── Email ──
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=your-sendgrid-api-key
EMAIL_FROM=noreply@luxestore.com

# ── File Storage ──
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

---

## 9. Frontend Integration Changes

These are the key refactors needed on the **existing frontend** to connect to the backend:

### 9.1 New NPM Dependencies (Frontend)

```json
{
  "@auth0/auth0-react": "^2.x",
  "axios": "^1.x",
  "razorpay": "loaded via script tag"
}
```

### 9.2 New Frontend Service Layer
Create an `src/services/` directory with API client modules:
```
src/services/
├── api.ts            # Axios instance with Auth0 interceptor (attach JWT on every request)
├── product.service.ts
├── cart.service.ts
├── order.service.ts
├── user.service.ts
└── wishlist.service.ts
```

### 9.3 Context Overhaul

| Context | Change |
|---------|--------|
| `CartContext` | Already has full cart state (items[], add/remove/update, localStorage persistence). Add backend sync: on login, merge localStorage cart with server cart via `/api/cart`. On mutations, update both localStorage and server. |
| New `AuthContext` | Powered by `@auth0/auth0-react` — provides `isAuthenticated`, `user`, `loginWithRedirect`, `logout`, `getAccessTokenSilently` |
| `ProductModalContext` | Keep as-is (UI-only), but product fetched from API |

### 9.4 Route Protection
Add a `<ProtectedRoute>` wrapper using Auth0's `withAuthenticationRequired` HOC. Apply to:
- `/dashboard`
- `/checkout`

### 9.5 AuthPage Overhaul
Replace the manual form handling with Auth0 SDK calls:
- **Sign In button** → `loginWithRedirect()`
- **Register button** → `loginWithRedirect({ authorizationParams: { screen_hint: 'signup' } })`
- **Google button** → `loginWithRedirect({ authorizationParams: { connection: 'google-oauth2' } })`
- **Forgot Password** → `loginWithRedirect()` (Auth0 Universal Login has "Forgot Password" built-in)
- Add a `/auth/callback` route to handle the Auth0 redirect

### 9.6 Checkout Flow Overhaul
1. Create order via `POST /api/orders` on form submission
2. Backend returns `razorpayOrderId` + `amount` + `key_id`
3. Open Razorpay Checkout modal with the returned order info
4. On payment success, call `POST /api/orders/:orderNumber/verify-payment`
5. Show real order number from backend response (not hardcoded `LX-9428`)

### 9.7 Data Files Removal
Delete `src/data/products.ts` and `src/data/productDetails.ts` after migrating their content to the database seed script.

---

## 10. Database Seed Script

A seed script (`seed/seed.ts`) should populate MongoDB with the existing 18 products from `products.ts` and their generated details from `productDetails.ts`, ensuring the migration is seamless:

- All 18 products with their current IDs as `slug`
- Category-specific features, specs, and images
- Sample reviews (the 4 mock reviewers)
- Default admin user account
- Sample promo codes for testing (e.g., `LUXE10` for 10% off)

---

## 11. Deployment Recommendations

| Concern | Recommendation |
|---------|---------------|
| **Backend Hosting** | Railway, Render, or AWS ECS |
| **Database** | MongoDB Atlas (free M0 tier for development, M10+ for production) |
| **Frontend Hosting** | Vercel or Netlify (Vite builds) |
| **Auth** | Auth0 free tier (up to 25,000 monthly active users) |
| **Payments** | Razorpay test mode → switch to live keys for production |
| **CI/CD** | GitHub Actions: lint → test → build → deploy |
| **Monitoring** | Sentry for error tracking, Uptime Robot for availability |
| **SSL** | Auto-provisioned by hosting platform |

---

## 12. Implementation Priority (Phases)

### Phase 1 — Core (Must Have)
- [ ] Project setup (Express + TypeScript + Mongoose)
- [ ] MongoDB Atlas cluster + connection
- [ ] Auth0 tenant setup (SPA app, API, Google connection)
- [ ] Auth middleware (`express-oauth2-jwt-bearer`)
- [ ] User sync (Auth0 → MongoDB)
- [ ] Product catalog API (CRUD + filtering + sorting)
- [ ] Cart API (add, remove, update, get)
- [ ] Frontend Auth0 SDK integration
- [ ] Frontend API service layer

### Phase 2 — Commerce (Must Have)
- [ ] Razorpay integration (test mode)
- [ ] Order creation + Razorpay order generation
- [ ] Payment verification endpoint
- [ ] Checkout flow overhaul with Razorpay Checkout.js
- [ ] Order history on dashboard
- [ ] Email notifications (order confirmation)

### Phase 3 — Profile & Social
- [ ] User profile management
- [ ] Saved addresses CRUD
- [ ] Wishlist CRUD
- [ ] Product reviews (submit + display)
- [ ] Database seed script migration

### Phase 4 — Polish & Admin
- [ ] Promo code system
- [ ] Admin product management
- [ ] Image upload to Cloudinary
- [ ] Full-text search (MongoDB Atlas Search)
- [ ] Redis caching layer
- [ ] Rate limiting tuning
- [ ] Comprehensive test suite

---

## 13. Summary of What's Missing Today

> [!CAUTION]
> The current LuxeStore has **zero backend infrastructure**. Every interaction is simulated on the frontend. A user can "place an order" and see a success modal, but no data is persisted, no payment is processed, and refreshing the page resets everything.

**Critical gaps:**
1. **No real authentication** — anyone can access `/dashboard` directly
2. **No persistent cart** — cart has mock items, no add/remove logic
3. **No payment processing** — checkout form collects card numbers with no payment gateway
4. **No database** — all 18 products are hardcoded TypeScript arrays
5. **No user data persistence** — profile, orders, addresses, wishlist are all fake
6. **No security** — no CORS, no rate limiting, no input validation, no HTTPS enforcement

This plan addresses every single gap with production-grade solutions using **Auth0**, **Razorpay**, and **MongoDB**.

---

*Please review this updated plan and let me know if any further changes are needed before we begin implementation.*
