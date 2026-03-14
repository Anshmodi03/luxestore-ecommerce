import { env } from './env';

export const auth0Config = {
  issuerBaseURL: env.AUTH0_ISSUER_BASE_URL,
  audience: env.AUTH0_AUDIENCE,
  clientId: env.AUTH0_CLIENT_ID,
  clientSecret: env.AUTH0_CLIENT_SECRET,
};
