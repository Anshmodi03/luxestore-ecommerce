import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeSlash, ArrowRight, ArrowLeft, GoogleLogo, AppleLogo } from '@phosphor-icons/react'
import { gsap } from 'gsap'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'
import PageTransition from '../components/common/PageTransition'
import AuthSuccessOverlay from '../components/auth/AuthSuccessOverlay'

// Safe Auth0 hook — returns mock when Auth0 is not configured
function useAuth0Safe() {
  const auth0Configured = !!import.meta.env.VITE_AUTH0_DOMAIN
  if (auth0Configured) {
    return useAuth0()
  }
  return {
    loginWithRedirect: (() => {}) as any,
    isAuthenticated: false,
    isLoading: false,
  }
}

type AuthView = 'signin' | 'register' | 'recover'

const AuthPage = () => {
  const [activeView, setActiveView] = useState<AuthView>('signin')
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [recoverSent, setRecoverSent] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [successType, setSuccessType] = useState<'signin' | 'register'>('signin')
  const navigate = useNavigate()

  const { loginWithRedirect, isAuthenticated } = useAuth0Safe()

  // GSAP refs
  const leftPanelRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)
  const decorLineRef = useRef<HTMLDivElement>(null)
  const authorRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const orbOneRef = useRef<HTMLDivElement>(null)
  const orbTwoRef = useRef<HTMLDivElement>(null)
  const verticalLineRef = useRef<HTMLDivElement>(null)

  // GSAP timeline on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // Image reveal with Ken Burns drift
      tl.fromTo(imageRef.current, 
        { scale: 1.3, opacity: 0 },
        { scale: 1, opacity: 0.22, duration: 2.5 }
      )

      // Decorative line draws in
      tl.fromTo(decorLineRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 1.2 },
        '-=1.8'
      )

      // Quote text fades up word by word
      tl.fromTo(quoteRef.current,
        { opacity: 0, y: 50, clipPath: 'inset(100% 0 0 0)' },
        { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', duration: 1.4 },
        '-=1'
      )

      // Author attribution slides in
      tl.fromTo(authorRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8 },
        '-=0.5'
      )

      // Vertical accent line grows
      tl.fromTo(verticalLineRef.current,
        { scaleY: 0, transformOrigin: 'top center' },
        { scaleY: 1, duration: 1.5 },
        '-=1'
      )

      // Ambient orbs pulse infinitely
      gsap.to(orbOneRef.current, {
        scale: 1.3, opacity: 0.08,
        duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut'
      })
      gsap.to(orbTwoRef.current, {
        scale: 1.2, opacity: 0.12,
        duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2
      })

      // Continuous Ken Burns on image
      gsap.to(imageRef.current, {
        scale: 1.08, x: 15, y: -10,
        duration: 20, repeat: -1, yoyo: true, ease: 'none'
      })

    }, leftPanelRef)

    return () => ctx.revert()
  }, [])

  // Redirect authenticated users away from auth page
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const auth0Configured = !!import.meta.env.VITE_AUTH0_DOMAIN

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!auth0Configured) {
      // Dev mode — show mock success overlay
      if (activeView === 'recover') {
        setRecoverSent(true)
      } else {
        setSuccessType(activeView as 'signin' | 'register')
        setShowSuccess(true)
      }
      return
    }

    // Auth0 mode — redirect to Auth0 Universal Login
    if (activeView === 'recover') {
      loginWithRedirect({
        authorizationParams: {
          screen_hint: 'login',
          login_hint: email,
        },
      })
      setRecoverSent(true)
    } else if (activeView === 'register') {
      loginWithRedirect({
        authorizationParams: {
          screen_hint: 'signup',
          login_hint: email,
        },
      })
    } else {
      loginWithRedirect({
        authorizationParams: {
          login_hint: email,
        },
      })
    }
  }

  const handleGoogleLogin = () => {
    loginWithRedirect({
      authorizationParams: {
        connection: 'google-oauth2',
      },
    })
  }

  const switchView = (view: AuthView) => {
    setRecoverSent(false)
    setActiveView(view)
  }

  return (
    <PageTransition>
      <div className="h-screen flex flex-col lg:flex-row bg-[#0a0a0a] text-white font-body overflow-hidden">
        
        {/* ──── Success Overlay ──── */}
        {showSuccess && (
          <AuthSuccessOverlay 
            type={successType} 
            onComplete={() => setShowSuccess(false)} 
          />
        )}
        
        {/* ──────── LEFT PANEL: GSAP Cinematic ──────── */}
        <div 
          ref={leftPanelRef}
          className="hidden lg:flex lg:w-1/2 relative items-end justify-start overflow-hidden bg-[#080808]"
        >
          {/* Ambient orbs */}
          <div ref={orbOneRef} className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[180px]" />
          <div ref={orbTwoRef} className="absolute -bottom-20 -left-20 w-[350px] h-[350px] bg-amber-800/8 rounded-full blur-[140px]" />

          {/* GSAP parallax image */}
          <div ref={imageRef} className="absolute inset-0 opacity-0">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600"
              alt="Luxury fashion"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Vignette overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-[#080808] via-[#080808]/70 to-[#080808]/30" />
          <div className="absolute inset-0 bg-linear-to-r from-[#080808]/40 to-transparent" />

          {/* Vertical decorative line */}
          <div 
            ref={verticalLineRef}
            className="absolute top-24 left-12 xl:left-16 w-px h-[40%] bg-linear-to-b from-primary/60 via-primary/20 to-transparent"
          />

          {/* Quote content */}
          <div className="relative z-10 p-12 xl:p-20 pb-16 xl:pb-24 max-w-lg">
            {/* Decorative line */}
            <div ref={decorLineRef} className="w-16 h-[2px] bg-primary mb-10" />
            
            {/* Quote */}
            <div ref={quoteRef}>
              <blockquote className="text-2xl xl:text-3xl 2xl:text-4xl font-serif italic leading-[1.3] text-white/90 mb-8">
                "Fashion is the armor to survive the reality of everyday life."
              </blockquote>
            </div>
            
            {/* Author */}
            <div ref={authorRef} className="flex items-center gap-4">
              <div className="w-10 h-[2px] bg-primary" />
              <span className="text-[10px] uppercase tracking-[0.35em] text-primary font-semibold">
                Bill Cunningham
              </span>
            </div>

            {/* Subtle bottom branding */}
            <div className="mt-16 flex items-center gap-3 opacity-20">
              <div className="w-6 h-px bg-white/50" />
              <span className="text-[8px] uppercase tracking-[0.4em] text-white/60">Est. 2025</span>
            </div>
          </div>
        </div>

        {/* ──────── RIGHT PANEL: Auth Forms ──────── */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 flex flex-col justify-between h-screen overflow-hidden"
        >
          {/* Top accent line */}
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="h-px bg-linear-to-r from-transparent via-primary to-transparent origin-left shrink-0"
          />

          <div className="flex-1 flex items-center justify-center px-6 sm:px-10 lg:px-14 xl:px-20 py-4">
            <div className="w-full max-w-md">
              
              {/* Animated heading */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeView}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {activeView === 'recover' ? (
                    <>
                      <button
                        onClick={() => switchView('signin')}
                        className="flex items-center gap-2 text-white/40 hover:text-primary transition-colors mb-6 group"
                      >
                        <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" />
                        <span className="text-[10px] uppercase tracking-[0.25em]">Back to Sign In</span>
                      </button>
                      <h1 className="text-3xl sm:text-4xl font-serif italic font-medium tracking-tight mb-1">
                        Account Recovery
                      </h1>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-7">
                        We'll send you a recovery link
                      </p>
                    </>
                  ) : (
                    <>
                      <h1 className="text-3xl sm:text-4xl font-serif italic font-medium tracking-tight mb-1">
                        {activeView === 'signin' ? 'Welcome Back' : 'Join Us'}
                      </h1>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-7">
                        {activeView === 'signin' ? 'The curated experience awaits' : 'Begin your curated journey'}
                      </p>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Tabs (only for signin/register) */}
              {activeView !== 'recover' && (
                <div className="flex gap-8 mb-7 border-b border-white/10">
                  {(['signin', 'register'] as AuthView[]).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => switchView(tab)}
                      className={`relative pb-3 text-[11px] uppercase tracking-[0.25em] font-semibold transition-colors duration-300 ${
                        activeView === tab ? 'text-primary' : 'text-white/30 hover:text-white/60'
                      }`}
                    >
                      {tab === 'signin' ? 'Sign In' : 'Register'}
                      {activeView === tab && (
                        <motion.div
                          layoutId="auth-tab-indicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Form */}
              <AnimatePresence mode="wait">
                <motion.form
                  key={activeView + (recoverSent ? '-sent' : '')}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5"
                >
                  {/* ── RECOVER VIEW ── */}
                  {activeView === 'recover' && (
                    recoverSent ? (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-8"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                          className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center"
                        >
                          <span className="text-primary text-2xl">✓</span>
                        </motion.div>
                        <h3 className="text-lg font-serif italic text-white/90 mb-2">Recovery Link Sent</h3>
                        <p className="text-xs text-white/40 leading-relaxed max-w-xs mx-auto mb-6">
                          If an account exists for <span className="text-white/70">{email || 'your email'}</span>, you'll receive a password reset link within minutes.
                        </p>
                        <button
                          type="button"
                          onClick={() => switchView('signin')}
                          className="text-[10px] uppercase tracking-[0.25em] text-primary hover:text-white transition-colors font-semibold"
                        >
                          Return to Sign In
                        </button>
                      </motion.div>
                    ) : (
                      <>
                        <p className="text-xs text-white/35 leading-relaxed -mt-2 mb-1">
                          Enter the email address associated with your account and we'll send you a link to reset your password.
                        </p>
                        <div className="relative">
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email Address"
                            className="w-full bg-transparent border-b border-white/10 focus:border-primary pb-2.5 pt-1 text-sm text-white placeholder:text-white/25 focus:outline-none transition-colors duration-300 font-light tracking-wide"
                          />
                        </div>
                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.01, boxShadow: "0 0 30px rgba(255,255,255,0.08)" }}
                          whileTap={{ scale: 0.99 }}
                          className="group relative w-full mt-2 py-3.5 px-8 bg-white text-[#0a0a0a] text-[11px] uppercase tracking-[0.25em] font-bold flex items-center justify-center gap-3 hover:bg-primary hover:text-white transition-all duration-500 overflow-hidden"
                        >
                          <motion.div 
                            className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                            animate={{ x: ['-200%', '200%'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
                          />
                          <span className="relative z-10">Send Recovery Link</span>
                          <ArrowRight size={14} weight="bold" className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                        </motion.button>
                      </>
                    )
                  )}

                  {/* ── SIGNIN / REGISTER VIEW ── */}
                  {activeView !== 'recover' && (
                    <>
                      {/* Register: Name fields */}
                      {activeView === 'register' && (
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="First Name"
                            className="w-full bg-transparent border-b border-white/10 focus:border-primary pb-2.5 pt-1 text-sm text-white placeholder:text-white/25 focus:outline-none transition-colors duration-300 font-light tracking-wide"
                          />
                          <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Last Name"
                            className="w-full bg-transparent border-b border-white/10 focus:border-primary pb-2.5 pt-1 text-sm text-white placeholder:text-white/25 focus:outline-none transition-colors duration-300 font-light tracking-wide"
                          />
                        </div>
                      )}

                      {/* Email */}
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                        className="w-full bg-transparent border-b border-white/10 focus:border-primary pb-2.5 pt-1 text-sm text-white placeholder:text-white/25 focus:outline-none transition-colors duration-300 font-light tracking-wide"
                      />

                      {/* Password */}
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Password"
                          className="w-full bg-transparent border-b border-white/10 focus:border-primary pb-2.5 pt-1 text-sm text-white placeholder:text-white/25 focus:outline-none transition-colors duration-300 font-light tracking-wide pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-0 top-1 text-white/30 hover:text-white/60 transition-colors"
                        >
                          {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
                        </button>
                      </div>

                      {/* Sign In extras */}
                      {activeView === 'signin' && (
                        <div className="flex items-center justify-between">
                          <label className="flex items-center gap-2 cursor-pointer group">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-4 h-4 border border-white/20 peer-checked:border-primary peer-checked:bg-primary/20 transition-all duration-300 flex items-center justify-center">
                              <div className="w-1.5 h-1.5 bg-primary scale-0 peer-checked:scale-100 transition-transform" />
                            </div>
                            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 group-hover:text-white/60 transition-colors">
                              Stay Signed In
                            </span>
                          </label>
                          <button 
                            type="button" 
                            onClick={() => switchView('recover')}
                            className="flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-primary transition-colors group"
                          >
                            <span>Recover</span>
                            <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                          </button>
                        </div>
                      )}

                      {/* Submit */}
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.01, boxShadow: "0 0 30px rgba(255,255,255,0.08)" }}
                        whileTap={{ scale: 0.99 }}
                        className="group relative w-full mt-2 py-3.5 px-8 bg-white text-[#0a0a0a] text-[11px] uppercase tracking-[0.25em] font-bold flex items-center justify-center gap-3 hover:bg-primary hover:text-white transition-all duration-500 overflow-hidden"
                      >
                        <motion.div 
                          className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                          animate={{ x: ['-200%', '200%'] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
                        />
                        <span className="relative z-10">
                          {activeView === 'signin' ? 'Enter the Gallery' : 'Begin Your Journey'}
                        </span>
                        <ArrowRight size={14} weight="bold" className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                      </motion.button>

                      {/* Divider */}
                      <div className="flex items-center gap-4 my-2">
                        <div className="flex-1 h-px bg-white/10" />
                        <span className="text-[9px] uppercase tracking-[0.3em] text-white/25 font-medium">
                          External Access
                        </span>
                        <div className="flex-1 h-px bg-white/10" />
                      </div>

                      {/* Social Login */}
                      <div className="grid grid-cols-2 gap-3">
                        <motion.button
                          type="button"
                          onClick={handleGoogleLogin}
                          whileHover={{ borderColor: "rgba(255,255,255,0.3)", y: -1 }}
                          className="flex items-center justify-center gap-2 py-2.5 border border-white/10 text-white/60 hover:text-white transition-all duration-300 text-[10px] uppercase tracking-[0.2em] font-medium"
                        >
                          <GoogleLogo size={16} />
                          <span>Google</span>
                        </motion.button>
                        <motion.button
                          type="button"
                          onClick={() => loginWithRedirect()}
                          whileHover={{ borderColor: "rgba(255,255,255,0.3)", y: -1 }}
                          className="flex items-center justify-center gap-2 py-2.5 border border-white/10 text-white/60 hover:text-white transition-all duration-300 text-[10px] uppercase tracking-[0.2em] font-medium"
                        >
                          <AppleLogo size={16} weight="fill" />
                          <span>Apple</span>
                        </motion.button>
                      </div>
                    </>
                  )}
                </motion.form>
              </AnimatePresence>
            </div>
          </div>

          {/* Footer */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex items-center justify-center gap-6 py-4 text-[9px] uppercase tracking-[0.2em] text-white/20 shrink-0"
          >
            <span>© 2025 LuxeStore</span>
            <span>·</span>
            <button className="hover:text-white/50 transition-colors">Privacy Policy</button>
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  )
}

export default AuthPage
