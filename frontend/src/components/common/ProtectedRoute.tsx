import { ReactNode } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

interface ProtectedRouteProps {
  children: ReactNode
}

function ProtectedRouteInner({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!isAuthenticated) {
    loginWithRedirect({
      appState: { returnTo: window.location.pathname },
    })
    return null
  }

  return <>{children}</>
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  // If Auth0 is not configured (no Auth0Provider), render children directly
  const auth0Configured = !!import.meta.env.VITE_AUTH0_DOMAIN
  if (!auth0Configured) {
    return <>{children}</>
  }
  return <ProtectedRouteInner>{children}</ProtectedRouteInner>
}
