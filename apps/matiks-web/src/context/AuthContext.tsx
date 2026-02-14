/**
 * AuthProvider
 * Wraps the app to provide authentication state
 */

import { createContext, useContext, ReactNode } from 'react'
import { useSession, signIn as baSignIn, signOut as baSignOut, signUp as baSignUp } from '../lib/auth'

interface AuthContextType {
  session: ReturnType<typeof useSession>['data']
  isLoading: boolean
  signIn: typeof baSignIn
  signUp: typeof baSignUp
  signOut: typeof baSignOut
}

const AuthContext = createContext<AuthContextType | null>(null)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const session = useSession()

  return (
    <AuthContext.Provider
      value={{
        session: session.data,
        isLoading: session.isPending,
        signIn: baSignIn,
        signUp: baSignUp,
        signOut: baSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
