# CLAUDE.md

## Project
LuxeStore — luxury e-commerce site with React frontend and Express+MongoDB backend.

## Repository Structure
- `frontend/` — React 19 + Vite 6 + TypeScript (complete)
- `backend/` — Express.js + MongoDB + Mongoose (in development)
- `BACKEND_PLAN.md` — Full backend architecture specification

## Frontend (frontend/)

### Stack
- React 19 + TypeScript + Vite 6
- Tailwind CSS v4 (@theme syntax, not v3 config)
- GSAP 3.14 + ScrollTrigger (scroll animations, reveals)
- Framer Motion 12 (page transitions, component animations)
- Lenis 1.3 (smooth scroll, synced with ScrollTrigger)
- @google/model-viewer (3D product viewer)
- @phosphor-icons/react (icons)
- Playwright (E2E testing)

### Commands
- `cd frontend && npm run dev` — Vite dev server (localhost:5173)
- `cd frontend && npm run build` — TypeScript check + Vite build
- `cd frontend && npm run preview` — preview production build

### Architecture
- `frontend/src/components/` — organized by feature: landing/, collection/, product/, common/, checkout/, dashboard/, auth/, about/, editorial/, services/
- `frontend/src/pages/` — 10 page components routed in App.tsx
- `frontend/src/context/` — CartContext, ProductModalContext, ToastContext
- `frontend/src/data/` — hardcoded product data (products.ts, productDetails.ts)
- `frontend/src/index.css` — Tailwind v4 @theme config with custom animations

### Design System
- Fonts: Playfair Display (display/headings), Plus Jakarta Sans (body)
- Primary: #FF5C35 (orange), Secondary: #1F2937 (dark gray)
- Dark mode via `.dark` class toggle + CSS custom properties
- Glass morphism effects (backdrop-blur), custom cursor, hotspot annotations

### Animation Patterns
- **Scroll reveals**: GSAP ScrollTrigger via `ScrollReveal` component (variants: fade-up, fade-left, fade-right, scale, clip-up)
- **Page transitions**: Framer Motion AnimatePresence + `PageTransition` curtain effect
- **Preloader**: Diamond SVG trace → character stagger → counter → blinds exit
- **Smooth scroll**: Lenis synced with GSAP ticker
- **Micro-interactions**: Custom cursor (dot + ring), hover scales, button transitions
- Always use `useGSAP` hook with `scope` for GSAP in React components
- Always use refs (not state) for values updated in `useFrame`/animation loops

### Frontend Conventions
- PascalCase components, feature-folder organization
- Responsive: mobile-first with sm/md/lg/xl breakpoints
- Images: `loading="lazy" decoding="async"` on all img tags
- Products use ID-based routing (`/product/:id`)
- Cart is drawer-based (Sheet pattern), not a separate page

## Backend (backend/)

### Stack
- Node.js 20 + TypeScript + Express.js 5
- MongoDB (Atlas) + Mongoose 8
- Auth0 (authentication via express-oauth2-jwt-bearer)
- Razorpay test mode (payments)
- Zod (request validation)
- Helmet + CORS + express-rate-limit (security)

### Commands
- `cd backend && npm run dev` — nodemon dev server (localhost:5000)
- `cd backend && npm run build` — TypeScript compile
- `cd backend && npm start` — production server
- `cd backend && npm run seed` — seed database

### Architecture
- `backend/src/server.ts` — Express app entry point
- `backend/src/config/` — env validation, database, auth0, razorpay setup
- `backend/src/models/` — Mongoose schemas (User, Product, Review, Cart, Order, Address, Wishlist, PromoCode)
- `backend/src/routes/` — Express route definitions
- `backend/src/controllers/` — Request handlers
- `backend/src/services/` — Business logic layer
- `backend/src/middleware/` — Auth (JWT), validation (Zod), rate limiting, CORS, error handling
- `backend/src/types/` — Shared TypeScript interfaces
- `backend/src/utils/` — Helpers (order number generator)
- `backend/seed/` — Database seed script

### Backend Conventions
- Route → Controller → Service → Model layered architecture
- Zod schemas validate all request bodies
- Auth0 JWT verified on protected routes via `checkJwt` middleware
- User synced from Auth0 to MongoDB on first authenticated request
- Server-side price calculation (never trust frontend totals)
- Generic error responses in production (no stack traces)

## Skills Reference
Read these from `.claude/skills/` when working on the relevant domain:
- `threejs-scene-builder.md` — R3F Canvas, GLTF loading, cameras, lighting, product viewer
- `threejs-best-practices.md` — Three.js memory, mobile optimization, textures, shaders
- `animation-motion-design.md` — GSAP timelines, ScrollTrigger, SplitText, stagger, easing
- `framer-motion.md` — Variants, AnimatePresence, layout animations, gestures, scroll
- `scroll-experience.md` — Lenis + GSAP sync, parallax, horizontal scroll, pinned sections
- `css-scroll-driven.md` — CSS scroll-timeline, view-timeline, progressive enhancement
- `shadcn-ui.md` — shadcn/ui components, forms+Zod, dark mode, theming, toasts
- `mongoose.md` — Product/User/Order schemas, Razorpay fields, aggregation, transactions
