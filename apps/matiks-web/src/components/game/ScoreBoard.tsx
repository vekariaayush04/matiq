/**
 * ScoreBoard Component
 * Displays player scores with animation support
 */

import { useMemo } from 'react'

interface ScoreBoardProps {
  /** Current player's name */
  playerName: string
  /** Current player's score */
  playerScore: number | null
  /** Opponent's name */
  opponentName: string
  /** Opponent's score */
  opponentScore: number | null
  /** Whether the player's score was just updated */
  scoreUpdated?: boolean
  /** Optional custom timer component */
  timer?: React.ReactNode
}

/**
 * Score display with labels and optional timer in center
 * Features scale animation when player scores
 */
export const ScoreBoard = ({
  playerName,
  playerScore,
  opponentName,
  opponentScore,
  scoreUpdated = false,
  timer,
}: ScoreBoardProps) => {
  /**
   * Generate CSS classes for animated score
   */
  const playerScoreClass = useMemo(
    () =>
      `text-2xl md:text-4xl font-bold transition-all duration-300 ${
        scoreUpdated ? 'scale-125 text-win' : ''
      }`,
    [scoreUpdated]
  )

  return (
    <div className="flex items-center gap-8 md:gap-12 animate-slide-up">
      {/* Player score */}
      <div className="flex flex-col items-center gap-1">
        <span className="text-xs text-fg-dim uppercase tracking-widest font-semibold">
          {playerName}
        </span>
        <span className={playerScoreClass}>
          {playerScore ?? 0}
        </span>
      </div>

      {/* Timer (if provided) */}
      {timer}

      {/* Opponent score */}
      <div className="flex flex-col items-center gap-1">
        <span className="text-xs text-fg-dim uppercase tracking-widest font-semibold">
          {opponentName}
        </span>
        <span className="text-2xl md:text-4xl font-bold">
          {opponentScore ?? 0}
        </span>
      </div>
    </div>
  )
}

export default ScoreBoard
