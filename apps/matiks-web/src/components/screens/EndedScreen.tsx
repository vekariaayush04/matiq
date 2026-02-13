/**
 * EndedScreen Component
 * Game over screen showing results
 */

import { Logo, Button } from '../ui'

interface EndedScreenProps {
  /** Whether the current player won */
  isWinner: boolean
  /** Current player's final score */
  playerScore: number
  /** Opponent's final score */
  opponentScore: number
  /** Callback when play again button is clicked */
  onPlayAgain: () => void
}

/**
 * Results screen showing win/lose status and final scores
 */
export const EndedScreen = ({
  isWinner,
  playerScore,
  opponentScore,
  onPlayAgain,
}: EndedScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 px-6">
      <Logo className="animate-fade-in" />

      {/* Game result */}
      <div className="text-center animate-scale-in">
        <div
          className={`text-5xl md:text-6xl font-extrabold tracking-tight leading-none ${
            isWinner ? 'text-win' : 'text-lose'
          }`}
        >
          {isWinner ? 'You Win' : 'You Lose'}
        </div>

        <div className="mt-2 text-lg text-fg-dim font-medium tracking-wide">
          {playerScore} - {opponentScore}
        </div>
      </div>

      {/* Play again button */}
      <Button onClick={onPlayAgain}>
        Play Again
      </Button>
    </div>
  )
}

export default EndedScreen
