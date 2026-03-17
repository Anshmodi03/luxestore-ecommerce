import { Link } from 'react-router-dom'
import { Diamond, InstagramLogo, TwitterLogo, PinterestLogo, ArrowRight } from '@phosphor-icons/react'

const shopLinks: { label: string; to: string }[] = [
  { label: 'New Arrivals', to: '/collection?sort=newest' },
  { label: 'Best Sellers', to: '/collection?sort=rating' },
  { label: 'Home Decor', to: '/collection?category=Home+Decor' },
  { label: 'Electronics', to: '/collection?category=Electronics' },
]

const supportLinks: { label: string; to: string }[] = [
  { label: 'Order Status', to: '/dashboard' },
  { label: 'Shipping & Returns', to: '/services' },
  { label: 'FAQ', to: '/services' },
  { label: 'Contact Us', to: '/about' },
]

const companyLinks: { label: string; to: string }[] = [
  { label: 'About Us', to: '/about' },
  { label: 'Editorial', to: '/editorial' },
  { label: 'Services', to: '/services' },
]

export default function Footer() {
  return (
    <footer className="bg-[#050505] text-white pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Diamond weight="fill" size={24} className="text-primary" />
              <span className="text-2xl font-serif italic font-bold">LuxeStore</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Elevating everyday life through exceptional design and quality. Join our community of tastemakers.
            </p>
            <div className="flex gap-4">
              {[
                { icon: <InstagramLogo weight="fill" />, label: 'Instagram', href: 'https://instagram.com' },
                { icon: <TwitterLogo weight="fill" />, label: 'Twitter', href: 'https://twitter.com' },
                { icon: <PinterestLogo weight="fill" />, label: 'Pinterest', href: 'https://pinterest.com' },
              ].map((s) => (
                <a
                  key={s.label}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-white mb-6">Shop</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              {shopLinks.map((item) => (
                <li key={item.label}>
                  <Link className="hover:text-primary transition-colors" to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-white mb-6">Support</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              {supportLinks.map((item) => (
                <li key={item.label}>
                  <Link className="hover:text-primary transition-colors" to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company + Newsletter */}
          <div className="lg:col-span-4 space-y-8">
            <div>
              <h4 className="font-bold text-white mb-6">Company</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                {companyLinks.map((item) => (
                  <li key={item.label}>
                    <Link className="hover:text-primary transition-colors" to={item.to}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3">Stay in the know</h4>
              <p className="text-sm text-gray-400 mb-4">Subscribe for exclusive access to new drops and sales.</p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm text-white placeholder-gray-500"
                  placeholder="Email Address"
                  type="email"
                />
                <button className="bg-primary hover:bg-orange-600 text-white px-5 py-3 rounded-lg transition-colors font-bold" type="submit" aria-label="Subscribe">
                  <ArrowRight weight="bold" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© 2025 LuxeStore Inc. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link className="hover:text-white transition-colors" to="/services">Privacy Policy</Link>
            <Link className="hover:text-white transition-colors" to="/services">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
