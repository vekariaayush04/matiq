/**
 * AuthHeader Component
 * Shows user avatar/name and sign out button
 */

import { useAuth } from '../../context/AuthContext'

interface AuthHeaderProps {
  children?: React.ReactNode
}

export const AuthHeader = ({ children }: AuthHeaderProps) => {
  const { session, signOut } = useAuth()

  if (!session?.user) return <>{children}</>

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <div className="fixed top-0 left-0 right-0 flex items-center justify-between px-4 py-3 bg-card/80 backdrop-blur-xl border-b border-white/5 z-50">
      {children}

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          {session.user.image ? (
            <img
              src={session.user.image}
              alt={session.user.name || 'User'}
              className="w-8 h-8 rounded-full ring-2 ring-white/10"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-fg text-sm font-medium ring-2 ring-white/10">
              {session.user.name?.[0]?.toUpperCase() || '?'}
            </div>
          )}
          <span className="text-fg text-sm font-medium hidden sm:block">
            {session.user.name}
          </span>
        </div>

        <button
          onClick={handleSignOut}
          className="p-2 text-fg-tertiary hover:text-fg hover:bg-secondary rounded-lg transition-all"
          title="Sign Out"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default AuthHeader
