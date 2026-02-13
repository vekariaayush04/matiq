/**
 * ReadyScreen Component
 * Countdown screen before game starts showing matchup
 */

import { Logo } from '../ui'

interface ReadyScreenProps {
  /** Current player's name */
  playerName: string
  /** Opponent's name */
  opponentName: string
  /** Seconds until game starts */
  countDown: number | null
}

/**
 * Pre-game screen showing both players and countdown
 * Builds excitement before gameplay begins
 */
export const ReadyScreen = ({
  playerName,
  opponentName,
  countDown,
}: ReadyScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-12 px-6">
      <Logo className="animate-fade-in" />

      {/* Matchup display */}
      <div className="flex items-center gap-6 text-xl animate-slide-up">
        <span className="font-semibold">{playerName}</span>

        {/* VS badge */}
        <span className="text-fg-dim text-sm font-medium px-3 py-1 bg-white/10 rounded-full">
          vs
        </span>

        <span className="font-semibold">{opponentName}</span>
      </div>

      {/* Countdown timer */}
      <div className="text-5xl md:text-6xl font-bold animate-scale-in">
        {countDown}s
      </div>
    </div>
  )
}

export default ReadyScreen
