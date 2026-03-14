import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Product } from '../data/products'

interface ProductModalContextType {
  isOpen: boolean
  activeProduct: Product | null
  openProductModal: (product: Product) => void
  closeProductModal: () => void
}

const ProductModalContext = createContext<ProductModalContextType | undefined>(undefined)

export function ProductModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeProduct, setActiveProduct] = useState<Product | null>(null)

  const openProductModal = (product: Product) => {
    setActiveProduct(product)
    setIsOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeProductModal = () => {
    setIsOpen(false)
    setTimeout(() => {
      setActiveProduct(null)
      document.body.style.overflow = 'auto'
    }, 300) // wait for exit animation
  }

  return (
    <ProductModalContext.Provider value={{ isOpen, activeProduct, openProductModal, closeProductModal }}>
      {children}
    </ProductModalContext.Provider>
  )
}

export function useProductModal() {
  const context = useContext(ProductModalContext)
  if (context === undefined) {
    throw new Error('useProductModal must be used within a ProductModalProvider')
  }
  return context
}
