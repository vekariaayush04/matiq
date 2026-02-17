/**
 * AuthHeader Component
 * Simplified header without auth
 */

interface AuthHeaderProps {
  children?: React.ReactNode
}

export const AuthHeader = ({ children }: AuthHeaderProps) => {
  return (
    <div className="fixed top-0 left-0 right-0 flex items-center justify-between px-4 py-3 bg-card/80 backdrop-blur-xl border-b border-white/5 z-50">
      {children}

      <div className="text-fg text-sm font-medium">
        Matiks
      </div>
    </div>
  )
}

export default AuthHeader
