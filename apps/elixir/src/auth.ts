import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { expo } from '@better-auth/expo'
import { db } from './db'
import * as schema from './db/schema'

const BASE_URL = process.env.BETTER_AUTH_URL || 'https://matiks.pgstay.in'

console.log('=== BASE_URL:', BASE_URL, '===')

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user: schema.users,
      session: schema.sessions,
      account: schema.accounts,
      verification: schema.verifications,
    },
  }),
  plugins: [
    expo({
      disableOriginOverride: true,
    }),
  ],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    },
  },
  trustedOrigins: [
    'http://localhost:5173',
    'matiks://',
    'matiks://*',
    'exp://',
    'exp://*',
    'exp://192.168.0.69:8081',
    'exp://192.168.0.69:*',
    BASE_URL,
    'https://matiks.pgstay.in',
    'https://pgstay.in',
    'matiks://auth/callback',
  ],
  secret: process.env.BETTER_AUTH_SECRET || '',
  baseURL: BASE_URL,
  cookiePrefix: 'better-auth',
})

export type Session = typeof auth.$Infer.Session
