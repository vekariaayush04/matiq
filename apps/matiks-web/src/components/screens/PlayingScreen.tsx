/**
 * PlayingScreen Component
 * Main game screen with question, timer, and scoreboard
 */

import { CircularTimer, ProgressBar, QuestionCard } from '../game'
import { Question } from '../../types'

interface PlayingScreenProps {
  /** Current player's name */
  playerName: string
  /** Current player's score */
  playerScore: number | null
  /** Opponent's name */
  opponentName: string
  /** Opponent's score */
  opponentScore: number | null
  /** Current question to display */
  question: Question
  /** Current answer input value */
  answer: string
  /** Callback when answer changes */
  onAnswerChange: (value: string) => void
  /** Visual correctness state */
  correctness: 'correct' | 'wrong' | null
  /** Seconds remaining */
  timeLeft: number | null
  /** Current question index (0-based) */
  currentQuestionIndex: number
  /** Total questions count */
  totalQuestions: number
  /** Whether player's score was just updated */
  scoreUpdated?: boolean
}

/**
 * Main gameplay screen
 * Contains all game elements during active play
 */
export const PlayingScreen = ({
  playerName,
  playerScore,
  opponentName,
  opponentScore,
  question,
  answer,
  onAnswerChange,
  correctness,
  timeLeft,
  currentQuestionIndex,
  totalQuestions,
  scoreUpdated = false,
}: PlayingScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6">
      {/* Scoreboard with timer */}
      <ScoreBoard
        playerName={playerName}
        playerScore={playerScore}
        opponentName={opponentName}
        opponentScore={opponentScore}
        scoreUpdated={scoreUpdated}
        timer={<CircularTimer timeLeft={timeLeft} />}
      />

      {/* Question and answer input */}
      <QuestionCard
        question={question}
        answer={answer}
        onAnswerChange={onAnswerChange}
        correctness={correctness}
      />

      {/* Progress indicator */}
      <ProgressBar
        currentIndex={currentQuestionIndex}
        totalQuestions={totalQuestions}
      />
    </div>
  )
}

// ScoreBoard sub-component
const ScoreBoard = ({
  playerName,
  playerScore,
  opponentName,
  opponentScore,
  scoreUpdated,
  timer,
}: {
  playerName: string
  playerScore: number | null
  opponentName: string
  opponentScore: number | null
  scoreUpdated?: boolean
  timer: React.ReactNode
}) => {
  return (
    <div className="flex items-center gap-8 md:gap-12 animate-slide-up">
      {/* Player score */}
      <div className="flex flex-col items-center gap-1">
        <span className="text-xs text-fg-dim uppercase tracking-widest font-semibold">
          {playerName}
        </span>
        <span className={`text-2xl md:text-4xl font-bold transition-all duration-300 ${scoreUpdated ? 'scale-125 text-win' : ''}`}>
          {playerScore ?? 0}
        </span>
      </div>

      {/* Timer */}
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

export default PlayingScreen
