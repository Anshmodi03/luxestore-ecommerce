import { useState } from 'react'
import DashboardSidebar from '../components/dashboard/DashboardSidebar'
import ProfileOverview from '../components/dashboard/ProfileOverview'
import OrderHistory from '../components/dashboard/OrderHistory'
import SavedAddresses from '../components/dashboard/SavedAddresses'
import Footer from '../components/common/Footer'
import PageTransition from '../components/common/PageTransition'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('profile')

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
              Items you've saved for later. 8 items in your collection.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { name: 'Silk Scarf', price: '$320', img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&h=300&fit=crop' },
              { name: 'Cashmere Sweater', price: '$450', img: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&h=300&fit=crop' },
              { name: 'Leather Belt', price: '$180', img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop' },
              { name: 'Sunglasses', price: '$275', img: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop' },
              { name: 'Canvas Bag', price: '$390', img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&h=300&fit=crop' },
              { name: 'Gold Watch', price: '$620', img: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&h=300&fit=crop' },
              { name: 'Perfume', price: '$195', img: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=300&fit=crop' },
              { name: 'Wool Coat', price: '$890', img: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=300&h=300&fit=crop' },
            ].map((item) => (
              <div key={item.name} className="glass-card glass-card-hover rounded-xl overflow-hidden group cursor-pointer">
                <div className="aspect-square overflow-hidden">
                  <img src={item.img} alt={item.name} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="p-3 sm:p-4">
                  <p className="text-gray-900 dark:text-white text-sm font-medium truncate">{item.name}</p>
                  <p className="text-primary text-xs font-bold mt-1">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
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
              {[
                { label: 'Full Name', value: 'Isabella Martinez' },
                { label: 'Email', value: 'isabella.m@luxestore.com' },
                { label: 'Phone', value: '+1 (555) 234-5678' },
              ].map((field) => (
                <div key={field.label}>
                  <p className="micro-type text-gray-400 dark:text-slate-500 mb-2">{field.label}</p>
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-gray-900 dark:text-white text-sm">{field.value}</p>
                    <button className="micro-type text-primary hover:text-gray-900 dark:hover:text-white transition-colors">
                      Edit
                    </button>
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
