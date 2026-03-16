import { useState, useEffect } from 'react'
import DashboardSidebar from '../components/dashboard/DashboardSidebar'
import ProfileOverview from '../components/dashboard/ProfileOverview'
import OrderHistory from '../components/dashboard/OrderHistory'
import SavedAddresses from '../components/dashboard/SavedAddresses'
import Footer from '../components/common/Footer'
import PageTransition from '../components/common/PageTransition'
import { getWishlist, removeFromWishlist } from '../services/wishlist.service'
import { getProfile, updateProfile } from '../services/user.service'
import { Link } from 'react-router-dom'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('profile')

  // Wishlist state
  const [wishlistItems, setWishlistItems] = useState<any[]>([])
  const [wishlistLoading, setWishlistLoading] = useState(false)

  // Settings state
  const [profile, setProfile] = useState<{ firstName?: string; lastName?: string; email?: string; phone?: string } | null>(null)
  const [editingField, setEditingField] = useState<string | null>(null)
  const [editValues, setEditValues] = useState<Record<string, string>>({})
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (activeTab === 'wishlist' && wishlistItems.length === 0) {
      setWishlistLoading(true)
      getWishlist()
        .then(items => setWishlistItems(Array.isArray(items) ? items : []))
        .catch(() => setWishlistItems([]))
        .finally(() => setWishlistLoading(false))
    }
  }, [activeTab])

  useEffect(() => {
    if (activeTab === 'settings' && !profile) {
      getProfile()
        .then(u => {
          setProfile(u)
          setEditValues({
            'Full Name': `${u.firstName || ''} ${u.lastName || ''}`.trim(),
            'Email': u.email || '',
            'Phone': u.phone || '',
          })
        })
        .catch(() => {})
    }
  }, [activeTab])

  const handleRemoveWishlist = async (productId: string) => {
    await removeFromWishlist(productId).catch(() => {})
    setWishlistItems(prev => prev.filter(item => item.product?._id !== productId && item._id !== productId))
  }

  const handleSaveField = async (label: string) => {
    setIsSaving(true)
    try {
      if (label === 'Full Name') {
        const [firstName, ...rest] = editValues['Full Name'].split(' ')
        await updateProfile({ firstName, lastName: rest.join(' ') })
        setProfile(prev => ({ ...prev, firstName, lastName: rest.join(' ') }))
      } else if (label === 'Phone') {
        await updateProfile({ phone: editValues['Phone'] })
        setProfile(prev => ({ ...prev, phone: editValues['Phone'] }))
      }
      setEditingField(null)
    } catch {
      // keep editing open on failure
    } finally {
      setIsSaving(false)
    }
  }

  const content = (
    <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:py-12">
      {activeTab === 'profile' && (
        <div className="flex flex-col gap-8 sm:gap-10 lg:gap-12">
          <ProfileOverview />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="lg:col-span-2">
              <OrderHistory />
            </div>
            <div>
              <SavedAddresses />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="flex flex-col gap-6 sm:gap-10">
          <div className="flex flex-col gap-2 sm:gap-3 pt-2 sm:pt-4">
            <h1 className="font-serif italic text-3xl sm:text-4xl lg:text-5xl text-gray-900 dark:text-white tracking-wide">
              Order History
            </h1>
            <p className="text-gray-500 dark:text-slate-400 text-sm tracking-wide font-light">
              Track and manage all your purchases in one place.
            </p>
          </div>
          <OrderHistory />
        </div>
      )}

      {activeTab === 'addresses' && (
        <div className="flex flex-col gap-6 sm:gap-10">
          <div className="flex flex-col gap-2 sm:gap-3 pt-2 sm:pt-4">
            <h1 className="font-serif italic text-3xl sm:text-4xl lg:text-5xl text-gray-900 dark:text-white tracking-wide">
              Saved Addresses & Payment
            </h1>
            <p className="text-gray-500 dark:text-slate-400 text-sm tracking-wide font-light">
              Manage your shipping addresses and payment methods.
            </p>
          </div>
          <div className="max-w-md">
            <SavedAddresses />
          </div>
        </div>
      )}

      {activeTab === 'wishlist' && (
        <div className="flex flex-col gap-6 sm:gap-10">
          <div className="flex flex-col gap-2 sm:gap-3 pt-2 sm:pt-4">
            <h1 className="font-serif italic text-3xl sm:text-4xl lg:text-5xl text-gray-900 dark:text-white tracking-wide">
              Your Wishlist
            </h1>
            <p className="text-gray-500 dark:text-slate-400 text-sm tracking-wide font-light">
              Items you've saved for later. {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} in your collection.
            </p>
          </div>
          {wishlistLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="glass-card rounded-xl overflow-hidden animate-pulse">
                  <div className="aspect-square bg-white/5" />
                  <div className="p-3 space-y-2">
                    <div className="h-3 bg-white/10 rounded w-3/4" />
                    <div className="h-3 bg-white/10 rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : wishlistItems.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-slate-400 text-sm mb-4">Your wishlist is empty.</p>
              <Link to="/collection" className="text-primary text-sm font-medium hover:underline">Browse Collection →</Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {wishlistItems.map((item) => {
                const product = item.product || item
                const imageUrl = product.images?.[0]?.url || ''
                const slug = product.slug || product._id
                return (
                  <div key={product._id} className="glass-card glass-card-hover rounded-xl overflow-hidden group cursor-pointer relative">
                    <Link to={`/product/${slug}`} className="block aspect-square overflow-hidden">
                      <img src={imageUrl} alt={product.name} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </Link>
                    <div className="p-3 sm:p-4">
                      <p className="text-gray-900 dark:text-white text-sm font-medium truncate">{product.name}</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-primary text-xs font-bold">${product.price?.toFixed(2)}</p>
                        <button
                          type="button"
                          onClick={() => handleRemoveWishlist(product._id)}
                          className="text-[10px] text-slate-500 hover:text-red-400 transition-colors uppercase tracking-wider"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="flex flex-col gap-6 sm:gap-10">
          <div className="flex flex-col gap-2 sm:gap-3 pt-2 sm:pt-4">
            <h1 className="font-serif italic text-3xl sm:text-4xl lg:text-5xl text-gray-900 dark:text-white tracking-wide">
              Account Settings
            </h1>
            <p className="text-gray-500 dark:text-slate-400 text-sm tracking-wide font-light">
              Update your profile and notification preferences.
            </p>
          </div>
          <div className="glass-card rounded-2xl p-5 sm:p-6 lg:p-8 max-w-2xl flex flex-col gap-6 sm:gap-8">
            <div className="flex flex-col gap-4 sm:gap-6">
              {(['Full Name', 'Email', 'Phone'] as const).map((label) => (
                <div key={label}>
                  <p className="micro-type text-gray-400 dark:text-slate-500 mb-2">{label}</p>
                  <div className="flex items-center justify-between gap-4">
                    {editingField === label ? (
                      <input
                        type={label === 'Email' ? 'email' : 'text'}
                        aria-label={label}
                        placeholder={label}
                        value={editValues[label] || ''}
                        onChange={e => setEditValues(prev => ({ ...prev, [label]: e.target.value }))}
                        className="flex-1 text-sm bg-transparent border-b border-primary text-gray-900 dark:text-white focus:outline-none py-1"
                        autoFocus
                        disabled={label === 'Email'}
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white text-sm">
                        {editValues[label] || (profile ? '—' : '…')}
                      </p>
                    )}
                    {editingField === label ? (
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleSaveField(label)}
                          disabled={isSaving || label === 'Email'}
                          className="micro-type text-primary hover:text-gray-900 dark:hover:text-white transition-colors disabled:opacity-40"
                        >
                          {isSaving ? 'Saving…' : 'Save'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingField(null)}
                          className="micro-type text-slate-500 hover:text-white transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setEditingField(label)}
                        disabled={label === 'Email'}
                        className="micro-type text-primary hover:text-gray-900 dark:hover:text-white transition-colors disabled:opacity-30"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                  <div className="mt-3 border-b border-gray-200 dark:border-white/5" />
                </div>
              ))}
            </div>
            <div>
              <p className="micro-type text-gray-400 dark:text-slate-500 mb-4">Notifications</p>
              <div className="flex flex-col gap-3">
                {['Order updates', 'Promotional offers', 'Price drop alerts'].map((n) => (
                  <label key={n} className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-10 h-6 rounded-full bg-primary/20 border border-primary/30 relative transition-colors group-hover:bg-primary/30">
                      <div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-primary transition-transform" />
                    </div>
                    <span className="text-gray-600 dark:text-slate-300 text-sm">{n}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <PageTransition>
      <main className="min-h-screen bg-background-light dark:bg-background-dark relative overflow-x-hidden">
        {/* Ambient background orb (dark mode only) */}
        <div className="ambient-orb hidden dark:block" />

        {/* Sidebar (desktop fixed) + Mobile tab grid */}
        <DashboardSidebar activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Main content - offset for desktop sidebar */}
        <div className="relative z-10 lg:ml-[280px] lg:pt-[72px]">
          {content}
        </div>

        {/* Footer - z-30 to sit above the fixed sidebar (z-20) */}
        <div className="relative z-30">
          <Footer />
        </div>
      </main>
    </PageTransition>
  )
}
