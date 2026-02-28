import { Diamond, ArrowRight, InstagramLogo, TwitterLogo, PinterestLogo } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[70]">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500" onClick={onClose}></div>
      <div className="absolute left-0 top-0 h-full w-full sm:w-[480px] glass-drawer shadow-2xl animate-drawer-in flex flex-col justify-between p-8 sm:p-12 overflow-y-auto">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-2 text-gray-900 dark:text-white">
            <Diamond weight="fill" size={24} />
            <span className="text-xl font-bold font-serif italic">LuxeStore</span>
          </div>
          <button
            className="text-gray-900 dark:text-white hover:rotate-90 transition-transform duration-500 p-2"
            onClick={onClose}
          >
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>
        </div>
        <div className="flex flex-col gap-6">
          {[
            { name: 'Collections', path: '/collection' },
            { name: 'New Arrivals', path: '/' },
            { name: 'Atelier', path: '/' },
            { name: 'Living', path: '/' },
            { name: 'About', path: '/about' }
          ].map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={onClose}
              className="group flex items-center justify-between text-4xl sm:text-5xl font-serif text-gray-900 dark:text-white hover:text-primary dark:hover:text-primary transition-colors"
            >
              <span>{item.name}</span>
              <ArrowRight weight="bold" className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300 text-2xl" size={24} />
            </Link>
          ))}
        </div>
        <div className="mt-12 pt-12 border-t border-gray-200 dark:border-gray-800">
          <div className="grid grid-cols-2 gap-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 mb-8">
            <a className="hover:text-primary transition-colors" href="#">My Account</a>
            <a className="hover:text-primary transition-colors" href="#">Sustainability</a>
            <a className="hover:text-primary transition-colors" href="#">Store Locator</a>
            <a className="hover:text-primary transition-colors" href="#">Help &amp; Support</a>
          </div>
          <div className="flex items-center gap-4 text-gray-400">
            <a className="hover:text-primary transition-colors" href="#"><InstagramLogo weight="fill" size={20} /></a>
            <a className="hover:text-primary transition-colors" href="#"><TwitterLogo weight="fill" size={20} /></a>
            <a className="hover:text-primary transition-colors" href="#"><PinterestLogo weight="fill" size={20} /></a>
          </div>
        </div>
      </div>
    </div>
  )
}
