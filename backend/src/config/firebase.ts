import admin from 'firebase-admin'
import { env } from './env'

if (!admin.apps.length) {
  // No service account needed for token verification —
  // Firebase uses Google's public JWKS endpoint to verify ID tokens.
  admin.initializeApp({
    projectId: env.FIREBASE_PROJECT_ID,
  })
}

export default admin
