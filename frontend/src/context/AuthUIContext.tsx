// Thin wrapper — preserves useAuthUI() interface used by Navbar
import { useFirebaseAuth } from './FirebaseAuthContext'

export const useAuthUI = useFirebaseAuth

export function AuthUIProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
