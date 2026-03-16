import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { ToastProvider } from './context/ToastContext'
import { FirebaseAuthProvider } from './context/FirebaseAuthContext'
import { WishlistProvider } from './context/WishlistContext'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <FirebaseAuthProvider>
        <CartProvider>
          <ToastProvider>
            <WishlistProvider>
              <App />
            </WishlistProvider>
          </ToastProvider>
        </CartProvider>
      </FirebaseAuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
