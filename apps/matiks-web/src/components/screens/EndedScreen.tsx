/**
 * EndedScreen Component
 * Competitive results screen
 */

import { Button } from '../ui'

interface EndedScreenProps {
  isWinner: boolean
  playerScore: number
  opponentScore: number
  onPlayAgain: () => void
}

export const EndedScreen = ({ isWinner, playerScore, opponentScore, onPlayAgain }: EndedScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Winner Banner */}
      <div
        className={`
          text-5xl font-bold mb-2
          ${isWinner ? 'text-[var(--color-win)]' : 'text-[var(--color-lose)]'}
        `}
      >
        {isWinner ? 'Victory' : 'Defeat'}
      </div>

      {/* Score Comparison */}
      <div className="flex items-center gap-6 mb-8">
        <div className="text-center">
          <div className={`text-4xl font-bold ${isWinner ? 'text-[var(--color-win)]' : 'text-foreground'}`}>
            {playerScore}
          </div>
          <div className="text-xs text-foreground-muted mt-1">You</div>
        </div>

        <div className="text-2xl text-foreground-muted">-</div>

        <div className="text-center">
          <div className={`text-4xl font-bold ${!isWinner ? 'text-[var(--color-lose)]' : 'text-foreground'}`}>
            {opponentScore}
          </div>
          <div className="text-xs text-foreground-muted mt-1">Opp</div>
        </div>
      </div>

      {/* Stats (placeholder for future) */}
      <div className="flex gap-8 mb-8 text-sm text-foreground-muted">
        <div className="text-center">
          <div className="font-medium">{Math.round((playerScore / (playerScore + opponentScore)) * 100) || 0}%</div>
          <div className="text-xs">Score Share</div>
        </div>
      </div>

      {/* Play Again Button */}
      <Button
        onClick={onPlayAgain}
        size="lg"
        className="w-full max-w-[200px]"
      >
        Play Again
      </Button>
    </div>
  )
}

export default EndedScreen
