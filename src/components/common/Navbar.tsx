import { MagnifyingGlass, Moon, Sun, ShoppingBag, Diamond } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

interface NavbarProps {
  onMenuOpen: () => void
  onToggleDark: () => void
  isDark: boolean
}

export default function Navbar({ onMenuOpen, onToggleDark, isDark }: NavbarProps) {
  return (
    <nav className="absolute top-0 w-full z-50 py-6 px-4 sm:px-8 lg:px-16 border-b border-white/10 bg-gradient-to-b from-black/50 to-transparent">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-8">
          <button
            className="group flex items-center gap-2 text-white hover:text-primary transition-colors focus:outline-none"
            onClick={onMenuOpen}
          >
            <span className="material-symbols-outlined text-3xl">menu</span>
          </button>
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="text-white text-2xl drop-shadow-md">
              <Diamond weight="fill" />
            </div>
            <span className="text-2xl font-bold text-white tracking-tight drop-shadow-md font-serif italic">LuxeStore</span>
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <button className="p-2 text-white hover:text-primary transition rounded-full hover:bg-white/10">
            <MagnifyingGlass weight="bold" size={20} />
          </button>
          <button
            className="p-2 text-white hover:text-primary transition rounded-full hover:bg-white/10"
            onClick={onToggleDark}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <a className="relative p-2 text-white hover:text-primary transition rounded-full hover:bg-white/10" href="#">
            <ShoppingBag weight="fill" size={20} />
            <span className="absolute top-0 right-0 h-4 w-4 bg-primary text-[10px] font-bold flex items-center justify-center rounded-full text-white">2</span>
          </a>
        </div>
      </div>
    </nav>
  )
}
