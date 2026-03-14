import { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { setTokenGetter } from '../services/api'
import { useCart } from './CartContext'

/**
 * AuthSync — connects Auth0 token to the API service layer
 * and syncs cart with backend on login.
 * Renders nothing. Must be placed inside both Auth0Provider and CartProvider.
 */
export function AuthSync() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0()
  const { syncCartWithBackend } = useCart()

  useEffect(() => {
    if (isAuthenticated) {
      setTokenGetter(getAccessTokenSilently)
      syncCartWithBackend()
    }
  }, [isAuthenticated, getAccessTokenSilently, syncCartWithBackend])

  return null
}

/**
 * AuthSyncSafe — wrapper that only renders AuthSync when Auth0Provider is available.
 * Used in main.tsx to avoid errors when Auth0 is not configured.
 */
export function AuthSyncSafe() {
  try {
    return <AuthSync />
  } catch {
    return null
  }
}
