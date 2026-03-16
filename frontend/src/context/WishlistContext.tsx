import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import { useFirebaseAuth } from './FirebaseAuthContext'
import { getWishlist, addToWishlist, removeFromWishlist } from '../services/wishlist.service'
import { useToast } from './ToastContext'

interface WishlistContextType {
  wishlistedIds: Set<string>
  isWishlisted: (id: string) => boolean
  toggleWishlist: (productId: string, productName?: string) => Promise<void>
}

const WishlistContext = createContext<WishlistContextType | null>(null)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useFirebaseAuth()
  const { showToast } = useToast()
  const [wishlistedIds, setWishlistedIds] = useState<Set<string>>(new Set())

  // Load wishlist IDs when user logs in
  useEffect(() => {
    if (!isAuthenticated) {
      setWishlistedIds(new Set())
      return
    }
    getWishlist()
      .then((items: any[]) => {
        const ids = items.map((item: any) => item.product?._id || item.product || item._id)
        setWishlistedIds(new Set(ids.filter(Boolean)))
      })
      .catch(() => {})
  }, [isAuthenticated])

  const isWishlisted = useCallback((id: string) => wishlistedIds.has(id), [wishlistedIds])

  const toggleWishlist = useCallback(async (productId: string, productName?: string) => {
    const alreadyWishlisted = wishlistedIds.has(productId)

    // Optimistic update
    setWishlistedIds(prev => {
      const next = new Set(prev)
      if (alreadyWishlisted) next.delete(productId)
      else next.add(productId)
      return next
    })

    try {
      if (alreadyWishlisted) {
        await removeFromWishlist(productId)
        showToast(productName ? `${productName} removed from wishlist` : 'Removed from wishlist')
      } else {
        await addToWishlist(productId)
        showToast(productName ? `${productName} saved to wishlist` : 'Added to wishlist')
      }
    } catch {
      // Revert on failure
      setWishlistedIds(prev => {
        const next = new Set(prev)
        if (alreadyWishlisted) next.add(productId)
        else next.delete(productId)
        return next
      })
      showToast('Failed to update wishlist')
    }
  }, [wishlistedIds, showToast])

  const value = useMemo(() => ({ wishlistedIds, isWishlisted, toggleWishlist }), [wishlistedIds, isWishlisted, toggleWishlist])

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}
