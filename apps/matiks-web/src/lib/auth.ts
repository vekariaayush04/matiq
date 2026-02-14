import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({
  baseURL: 'http://localhost:3000',
  basePath: '/api/auth',
  sessionOptions: {
    refetchOnWindowFocus: true,
  },
})

export const { useSession, signIn, signOut, signUp } = authClient
