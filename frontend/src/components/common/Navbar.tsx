import { Moon, Sun, ShoppingBag, Diamond, SignOut } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useAuthUI } from '../../context/AuthUIContext'

interface NavbarProps {
  onMenuOpen: () => void
  onToggleDark: () => void
  isDark: boolean
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

export default function Navbar({ onMenuOpen, onToggleDark, isDark }: NavbarProps) {
  const { openCart, totalItems } = useCart()
  const { triggerLogin, signOut, user, isAuthenticated, isLoading } = useAuthUI()

  return (
    <nav className="absolute top-0 w-full z-50 py-6 px-4 sm:px-8 lg:px-16 border-b border-white/10 bg-linear-to-b from-black/50 to-transparent">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-8">
          <button
            className="group flex items-center gap-2 text-white hover:text-primary transition-colors focus:outline-none"
            onClick={onMenuOpen}
            aria-label="Open menu"
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

        <div className="flex items-center gap-4 sm:gap-6">
          <button
            className="p-2 text-white hover:text-primary transition rounded-full hover:bg-white/10"
            onClick={onToggleDark}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            className="relative p-2 text-white hover:text-primary transition rounded-full hover:bg-white/10 cursor-pointer"
            onClick={openCart}
            aria-label={`Shopping cart${totalItems > 0 ? `, ${totalItems} items` : ''}`}
          >
            <ShoppingBag weight="fill" size={20} />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 h-4 w-4 bg-primary text-[10px] font-bold flex items-center justify-center rounded-full text-white">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </button>

          {/* Auth button — three states: loading / logged in / logged out */}
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : isAuthenticated ? (
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-xs font-medium text-white/80 tracking-wide">
                {user?.displayName?.split(' ')[0]}
              </span>
              <button
                onClick={signOut}
                className="flex items-center gap-1.5 text-white hover:text-primary transition-colors"
                aria-label="Log out"
              >
                <SignOut size={16} />
                <span className="hidden sm:inline text-xs font-medium tracking-wide">Logout</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => triggerLogin()}
              className="flex items-center gap-2 rounded-full border border-white/30 hover:border-white/60 hover:bg-white/10 transition-all duration-200 px-3 py-1.5 text-white"
              aria-label="Sign in with Google"
            >
              <GoogleIcon />
              <span className="hidden sm:inline text-xs font-medium tracking-wide">Sign in</span>
              <span className="hidden lg:inline text-xs font-medium tracking-wide"> with Google</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
