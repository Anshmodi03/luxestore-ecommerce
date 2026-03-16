import { ReactNode, useEffect, useRef } from 'react'
import { useFirebaseAuth } from '../../context/FirebaseAuthContext'

interface ProtectedRouteProps {
  children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, triggerLogin } = useFirebaseAuth()
  const hasTriggered = useRef(false)

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !hasTriggered.current) {
      hasTriggered.current = true
      triggerLogin('signin')
    }
  }, [isLoading, isAuthenticated, triggerLogin])

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return <>{children}</>
}
