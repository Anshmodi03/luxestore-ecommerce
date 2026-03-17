import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react'
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
  signOut as firebaseSignOut,
} from 'firebase/auth'
import { auth, googleProvider } from '../config/firebase'
import { setTokenGetter } from '../services/api'
import AuthSuccessOverlay from '../components/auth/AuthSuccessOverlay'

interface FirebaseAuthContextValue {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  triggerLogin: (type?: 'signin' | 'register') => Promise<void>
  signOut: () => Promise<void>
}

const FirebaseAuthContext = createContext<FirebaseAuthContextValue>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  triggerLogin: async () => {},
  signOut: async () => {},
})

export function FirebaseAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showSuccess, setShowSuccess] = useState(false)
  const [successType, setSuccessType] = useState<'signin' | 'register'>('signin')

  useEffect(() => {
    // Use localStorage persistence so popup state is not lost due to
    // browser cross-origin sessionStorage partitioning
    setPersistence(auth, browserLocalPersistence).catch(() => {})

    return onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setIsLoading(false)
      setTokenGetter(firebaseUser ? () => firebaseUser.getIdToken() : null)
    })
  }, [])

  const triggerLogin = useCallback(async (type: 'signin' | 'register' = 'signin') => {
    const attemptPopup = async () => {
      await setPersistence(auth, browserLocalPersistence)
      await signInWithPopup(auth, googleProvider)
    }
    try {
      await attemptPopup()
      setSuccessType(type)
      setShowSuccess(true)
    } catch (err: any) {
      // "missing initial state" in private tabs / partitioned storage — retry once
      if (err?.message?.includes('missing initial state') || err?.code === 'auth/internal-error') {
        try {
          await attemptPopup()
          setSuccessType(type)
          setShowSuccess(true)
        } catch {
          // second attempt also failed — user closed popup or browser blocked it
        }
        return
      }
      // any other error (popup closed by user, blocked) — ignore silently
    }
  }, [])

  const signOut = useCallback(async () => {
    await firebaseSignOut(auth)
  }, [])

  return (
    <FirebaseAuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, triggerLogin, signOut }}>
      {children}
      {showSuccess && (
        <AuthSuccessOverlay type={successType} onComplete={() => setShowSuccess(false)} />
      )}
    </FirebaseAuthContext.Provider>
  )
}

export const useFirebaseAuth = () => useContext(FirebaseAuthContext)
