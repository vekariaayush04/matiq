/**
 * WaitingScreen Component
 * Shown while waiting for an opponent to match
 */

import { Logo } from '../ui'

/**
 * Matchmaking wait screen with spinner
 */
export const WaitingScreen = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6">
      <Logo className="animate-fade-in" />

      {/* Loading spinner */}
      <div className="w-11 h-11 border-2 border-neutral-700 border-t-fg rounded-full animate-spin" />

      {/* Status message */}
      <p className="text-fg-dim text-sm animate-fade-in">
        Waiting for opponent...
      </p>
    </div>
  )
}

export default WaitingScreen
