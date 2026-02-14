/**
 * PlayingScreen Component
 * Custom layout - no scroll, everything visible
 */

import { CircularTimer, QuestionCard } from '../game'
import { Question } from '../../types'

interface PlayingScreenProps {
  playerName: string
  playerScore: number | null
  opponentName: string
  opponentScore: number | null
  question: Question
  answer: string
  onAnswerChange: (value: string) => void
  correctness: 'correct' | 'wrong' | null
  timeLeft: number | null
  currentQuestionIndex: number
  totalQuestions: number
  scoreUpdated?: boolean
}

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
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-2 border-b border-card-border shrink-0">
        <h1 className="text-lg font-bold">MATIKS</h1>
        <span className="text-xs text-foreground-muted uppercase">60 Min</span>
      </header>

      {/* Center Section - Player Info + Timer */}
      <div className="flex items-center justify-between px-4 py-3">
        {/* Player 1 */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-sm font-bold">
            {playerName?.[0]?.toUpperCase() || 'P'}
          </div>
          <div>
            <div className="text-xs text-foreground-muted">{playerName}</div>
            <div className={`text-lg font-bold ${scoreUpdated ? 'text-[var(--color-win)]' : ''}`}>
              {playerScore ?? 0}
            </div>
          </div>
        </div>

        {/* Timer */}
        <CircularTimer timeLeft={timeLeft} />

        {/* Player 2 */}
        <div className="flex items-center gap-2">
          <div className="text-right">
            <div className="text-xs text-foreground-muted">{opponentName}</div>
            <div className="text-lg font-bold">{opponentScore ?? 0}</div>
          </div>
          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-sm font-bold">
            {opponentName?.[0]?.toUpperCase() || 'O'}
          </div>
        </div>
      </div>

      {/* Question - Centered */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-2">
        <QuestionCard
          question={question}
          answer={answer}
          onAnswerChange={onAnswerChange}
          correctness={correctness}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={totalQuestions}
        />
      </div>
    </div>
  )
}

export default PlayingScreen
