import { createContext, useContext, useState, useCallback, useEffect, useMemo, ReactNode } from 'react'
import { Product } from '../services/product.service'
import * as cartApi from '../services/cart.service'

export interface CartItem {
  product: Product
  quantity: number
  _itemId?: string // backend cart item _id (set after syncCartWithBackend)
}

interface CartContextType {
  isCartOpen: boolean
  openCart: () => void
  closeCart: () => void
  items: CartItem[]
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  subtotal: number
  syncCartWithBackend: () => Promise<void>
}

const CART_STORAGE_KEY = 'luxestore_cart'

function loadCartFromStorage(): CartItem[] {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveCartToStorage(items: CartItem[]) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  } catch {
    // Storage full or unavailable
  }
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [items, setItems] = useState<CartItem[]>(loadCartFromStorage)

  useEffect(() => {
    saveCartToStorage(items)
  }, [items])

  const openCart = useCallback(() => setIsCartOpen(true), [])
  const closeCart = useCallback(() => setIsCartOpen(false), [])

  const addItem = useCallback((product: Product, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(item => item.product._id === product._id)
      if (existing) {
        return prev.map(item =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { product, quantity }]
    })

    // Fire-and-forget backend sync (don't block UI)
    cartApi.addToCart(product._id, quantity).catch(() => {
      // Backend unavailable — localStorage already updated
    })
  }, [])

  const removeItem = useCallback((productId: string) => {
    setItems(prev => {
      const item = prev.find(i => i.product._id === productId)
      if (item?._itemId) {
        cartApi.removeCartItem(item._itemId).catch(() => {})
      }
      return prev.filter(i => i.product._id !== productId)
    })
  }, [])

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => {
        const item = prev.find(i => i.product._id === productId)
        if (item?._itemId) {
          cartApi.removeCartItem(item._itemId).catch(() => {})
        }
        return prev.filter(i => i.product._id !== productId)
      })
      return
    }
    setItems(prev =>
      prev.map(item => {
        if (item.product._id !== productId) return item
        if (item._itemId) {
          cartApi.updateCartItem(item._itemId, quantity).catch(() => {})
        }
        return { ...item, quantity }
      })
    )
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
    cartApi.clearCart().catch(() => {})
  }, [])

  // Sync localStorage cart with backend on login
  const syncCartWithBackend = useCallback(async () => {
    try {
      // Push local items to backend
      const localItems = loadCartFromStorage()
      for (const item of localItems) {
        await cartApi.addToCart(item.product._id, item.quantity)
      }

      // Fetch merged cart from backend
      const serverCart = await cartApi.getCart()
      if (serverCart?.items?.length > 0) {
        const mergedItems: CartItem[] = serverCart.items.map((item: any) => ({
          _itemId: item._id,
          product: item.product,
          quantity: item.quantity,
        }))
        setItems(mergedItems)
      }
    } catch {
      // Backend unavailable — keep localStorage cart
    }
  }, [])

  const totalItems = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items])
  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0), [items])

  return (
    <CartContext.Provider value={{ isCartOpen, openCart, closeCart, items, addItem, removeItem, updateQuantity, clearCart, totalItems, subtotal, syncCartWithBackend }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
