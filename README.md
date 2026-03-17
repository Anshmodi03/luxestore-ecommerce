<div align="center">

# ◆ LuxeStore

### A full-stack luxury e-commerce platform

![Node.js](https://img.shields.io/badge/Node.js-20_LTS-339933?style=flat-square&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=flat-square&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?style=flat-square&logo=stripe&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?style=flat-square&logo=firebase&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-FF5C35?style=flat-square)

LuxeStore is a production-grade luxury e-commerce application built with React 19, Express 5, and MongoDB.
It features Google Sign-In, Stripe payments, animated UI, wishlists, a full dashboard, and a REST API backend.

[Live Demo](https://luxestore-ecommerce.vercel.app) · [API Health](https://luxestore-api.onrender.com/api/health) · [Report Bug](https://github.com/Anshmodi03/luxestore-ecommerce/issues)

<br/>

![Homepage](frontend/public/screenshots/homepage.png)

</div>

---

## ✨ Features

- 🔐 **Google Sign-In** — Firebase Authentication with persistent sessions
- 🛍 **Product Catalog** — Category filters, sort, search with slug-based routing
- 🔍 **Quick View Modal** — Preview products without leaving the current page
- 🛒 **Shopping Cart** — Slide-out drawer with persistent local state
- ❤️ **Wishlist** — Heart toggle on every product card, synced to dashboard
- 💳 **Stripe Checkout** — 3-step flow (address → card → confirm) with real payments
- 📦 **Order History** — Full order timeline in dashboard with status tracking
- 🏠 **Address Book** — Save multiple addresses, set a default for auto-fill at checkout
- 🌊 **Scroll Animations** — GSAP ScrollTrigger reveals + Lenis smooth scroll
- 🎬 **Page Transitions** — Framer Motion curtain transitions between routes
- 🌙 **Dark Mode** — System-aware with manual toggle
- 📱 **Fully Responsive** — Mobile-first layout across all breakpoints
- ✦ **Custom Cursor** — Animated dot + ring cursor on desktop
- ⚡ **Preloader** — Diamond SVG trace → character stagger → counter → blinds exit

---

## 🛠 Tech Stack

|  | **Frontend** | **Backend** |
|---|---|---|
| **Runtime** | Vite 6 | Node.js 20 LTS |
| **Framework** | React 19 + TypeScript | Express.js 5 + TypeScript |
| **Styling** | Tailwind CSS v4 (`@theme` syntax) | — |
| **Animation** | GSAP 3.14 + ScrollTrigger | — |
| **Transitions** | Framer Motion 12 | — |
| **Smooth Scroll** | Lenis 1.3 (GSAP-synced) | — |
| **Icons** | Phosphor Icons | — |
| **Authentication** | Firebase SDK (Google OAuth) | Firebase Admin SDK |
| **Payments** | Stripe.js + `@stripe/react-stripe-js` | Stripe Node.js SDK |
| **Database** | — | MongoDB Atlas + Mongoose 8 |
| **Validation** | — | Zod |
| **Security** | — | Helmet · CORS · express-rate-limit |
| **HTTP Client** | Axios | — |
| **Testing** | Playwright (E2E) | — |

---

## 📁 Project Structure

```
luxestore/
├── frontend/                        # React 19 + Vite 6 SPA
│   └── src/
│       ├── components/
│       │   ├── landing/             # Hero, TrendingProducts, ShopTheLook…
│       │   ├── collection/          # ProductCard, ProductGrid, ProductCarousel
│       │   ├── product/             # Gallery, Features, Specs, Reviews
│       │   ├── checkout/            # CheckoutForm, OrderSuccessModal
│       │   ├── dashboard/           # Sidebar, OrderHistory, SavedAddresses…
│       │   └── common/              # Navbar, CartDrawer, Footer, Cursor…
│       ├── pages/                   # 9 top-level page components
│       ├── context/                 # Cart · Wishlist · Firebase Auth · Toast
│       ├── services/                # Axios API wrappers (product, order, user…)
│       ├── config/                  # Firebase initialisation
│       └── data/                    # Static product seed data
│
└── backend/                         # Express 5 + TypeScript REST API
    └── src/
        ├── models/                  # Mongoose schemas (User, Product, Order…)
        ├── routes/                  # Express routers
        ├── controllers/             # Route handlers
        ├── services/                # Business logic layer
        ├── middleware/              # Auth (Firebase JWT) · Zod validation · CORS
        ├── config/                  # env · database · firebase · stripe
        └── utils/                   # Order number generator
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20 LTS — [nodejs.org](https://nodejs.org)
- **MongoDB** — local instance or [MongoDB Atlas](https://www.mongodb.com/atlas) free tier
- **Firebase** project with Google Sign-In enabled — [console.firebase.google.com](https://console.firebase.google.com)
- **Stripe** account (test mode is fine) — [stripe.com](https://stripe.com)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Anshmodi03/luxestore-ecommerce.git
cd luxestore-ecommerce

# 2. Install backend dependencies
cd backend && npm install

# 3. Install frontend dependencies
cd ../frontend && npm install
```

### Environment Variables

#### `backend/.env`

```env
# Server
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173

# Database
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/luxestore

# Firebase (for JWT verification — no service account needed)
FIREBASE_PROJECT_ID=your-firebase-project-id

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

#### `frontend/.env`

```env
# Backend
VITE_API_URL=http://localhost:5000/api

# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Firebase
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=000000000000
VITE_FIREBASE_APP_ID=1:000000000000:web:...
```

### Running Locally

```bash
# Terminal 1 — Backend (http://localhost:5000)
cd backend
npm run dev

# Terminal 2 — Frontend (http://localhost:5173)
cd frontend
npm run dev

# Seed the database with products
cd backend && npm run seed
```

---

## 🗂 API Reference

All endpoints are prefixed with `/api`. Protected routes require a Firebase ID token in `Authorization: Bearer <token>`.

| Domain | Method | Endpoint | Auth |
|---|---|---|:---:|
| **Health** | `GET` | `/health` | — |
| **Auth** | `GET` | `/auth/me` | ✅ |
| | `PUT` | `/auth/me` | ✅ |
| **Products** | `GET` | `/products` | — |
| | `GET` | `/products/featured` | — |
| | `GET` | `/products/:slug` | — |
| **Reviews** | `GET` | `/products/:slug/reviews` | — |
| | `POST` | `/products/:slug/reviews` | ✅ |
| **Cart** | `GET` | `/cart` | ✅ |
| | `POST` | `/cart/items` | ✅ |
| | `PUT` | `/cart/items/:id` | ✅ |
| | `DELETE` | `/cart/items/:id` | ✅ |
| | `DELETE` | `/cart` | ✅ |
| **Orders** | `POST` | `/orders` | ✅ |
| | `GET` | `/orders` | ✅ |
| | `GET` | `/orders/:orderNumber` | ✅ |
| | `POST` | `/orders/:orderNumber/verify-payment` | ✅ |
| **Addresses** | `GET` | `/users/me/addresses` | ✅ |
| | `POST` | `/users/me/addresses` | ✅ |
| | `PUT` | `/users/me/addresses/:id` | ✅ |
| | `DELETE` | `/users/me/addresses/:id` | ✅ |
| | `PUT` | `/users/me/addresses/:id/default` | ✅ |
| **Wishlist** | `GET` | `/wishlist` | ✅ |
| | `POST` | `/wishlist` | ✅ |
| | `DELETE` | `/wishlist/:productId` | ✅ |

### Query Parameters — `GET /api/products`

| Parameter | Type | Example | Description |
|---|---|---|---|
| `category` | string | `Headphones` | Filter by product category |
| `sort` | string | `price-asc` \| `price-desc` \| `rating` \| `newest` | Sort order |
| `search` | string | `wireless` | Full-text name search |
| `page` | number | `1` | Pagination page |
| `limit` | number | `12` | Results per page |

---

## 🌐 Deployment

| | Platform | Notes |
|---|---|---|
| **Frontend** | [Vercel](https://vercel.com) | Auto-deploys on push to `main` |
| **Backend** | [Render](https://render.com) + [UptimeRobot](https://uptimerobot.com) | Free tier, keep-alive ping every 14 min |
| **Database** | [MongoDB Atlas](https://www.mongodb.com/atlas) | M0 free cluster |
| **Auth** | [Firebase](https://firebase.google.com) | Google Sign-In, Spark plan |
| **Payments** | [Stripe](https://stripe.com) | Test mode → swap to live keys when ready |

### Deploy Backend to Render

1. Sign up at [render.com](https://render.com) → **New Web Service** → connect GitHub repo
2. Set **Root directory** → `backend`, **Build command** → `npm install && npm run build`, **Start command** → `npm start`
3. Add all environment variables from `backend/.env.example` in the **Environment** tab
   - Set `FRONTEND_URL` to your Vercel frontend URL (e.g. `https://luxestore-ecommerce.vercel.app`)
   - Set `NODE_ENV` to `production`
4. Set **Health check path** → `/api/health`
5. After deploy, go to [uptimerobot.com](https://uptimerobot.com) → **Add New Monitor** → HTTP(s) → paste your Render URL + `/api/health` → interval **14 minutes** (free)
   > This prevents Render's free tier from sleeping after 15 min of inactivity.

### Deploy Frontend to Vercel

```bash
# One-time setup
npm i -g vercel
vercel --cwd frontend

# Set VITE_API_URL to your Render backend URL, then redeploy
```

### Firebase — Add Production Domain

Google Sign-In only works from domains Firebase explicitly trusts.

**Firebase Console → Authentication → Settings → Authorized domains → Add domain**

Add your Vercel frontend URL: `luxestore-ecommerce.vercel.app`

> The backend URL does **not** need to be added — Firebase Admin SDK verifies tokens server-side using your `FIREBASE_PROJECT_ID` only.

---

## 📜 Scripts Reference

| Directory | Script | Description |
|---|---|---|
| `frontend` | `npm run dev` | Start Vite dev server on port 5173 |
| `frontend` | `npm run build` | TypeScript check + production build |
| `frontend` | `npm run preview` | Preview the production build locally |
| `backend` | `npm run dev` | Start nodemon dev server on port 5000 |
| `backend` | `npm run build` | Compile TypeScript → `dist/` |
| `backend` | `npm start` | Run compiled production server |
| `backend` | `npm run seed` | Seed MongoDB with all product data |

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for details.

---

<div align="center">

Made with ♥ by [Ansh Modi](https://github.com/Anshmodi03)

</div>
