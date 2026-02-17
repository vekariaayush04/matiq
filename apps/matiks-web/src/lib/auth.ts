import { createAuthClient } from 'better-auth/react'

const AUTH_URL = import.meta.env.VITE_AUTH_URL || 'https://matiks.pgstay.in'

export const authClient = createAuthClient({
  baseURL: AUTH_URL,
  basePath: '/api/auth',
  sessionOptions: {
    refetchOnWindowFocus: true,
  },
})

export const { useSession, signIn, signOut, signUp } = authClient
