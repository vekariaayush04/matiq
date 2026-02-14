/**
 * QuestionCard Component
 * Custom layout for mobile and desktop
 */

import { Question } from '../../types'
import { getOperatorSymbol } from '../../utils'

interface QuestionCardProps {
  question: Question
  answer: string
  onAnswerChange: (value: string) => void
  correctness: 'correct' | 'wrong' | null
  currentQuestionIndex: number
  totalQuestions: number
}

export const QuestionCard = ({
  question,
  answer,
  onAnswerChange,
  correctness,
  currentQuestionIndex,
  totalQuestions,
}: QuestionCardProps) => {
  const handlePress = (btn: string) => {
    if (correctness === 'correct') return
    if (btn === '-') {
      onAnswerChange(answer.startsWith('-') ? answer.slice(1) : '-' + answer)
    } else if (btn === '⌫') {
      onAnswerChange(answer.slice(0, -1))
    } else {
      if (answer.length >= 5) return
      onAnswerChange(answer + btn)
    }
  }

  return (
    <div className="w-full max-w-sm">
      {/* Question Card */}
      <div className="w-full p-6 rounded-2xl border border-card-border bg-card text-center">
        <span className="text-4xl font-bold">
          {question.operand1}{' '}
          <span className="text-foreground-muted">{getOperatorSymbol(question.operator)}</span>{' '}
          {question.operand2}
        </span>
      </div>

      {/* Answer - PC: Input, Mobile: Display */}
      <div className="mt-4">
        {/* PC: Input box */}
        <div className="hidden md:block">
          <input
            type="text"
            inputMode="numeric"
            value={answer}
            onChange={(e) => {
              const val = e.target.value.replace(/[^0-9-]/g, '')
              onAnswerChange(val.slice(0, 5))
            }}
            placeholder="?"
            className={`
              w-full h-14 px-4 rounded-xl border text-2xl font-bold text-center
              transition-all
              ${correctness === 'correct'
                ? 'border-[var(--color-win)] text-[var(--color-win)]'
                : correctness === 'wrong'
                  ? 'border-[var(--color-lose)] text-[var(--color-lose)]'
                  : 'border-card-border bg-card'
              }
            `}
          />
        </div>

        {/* Mobile: Answer display */}
        <div className="md:hidden">
          <div
            className={`
              w-full h-14 flex items-center justify-center
              rounded-xl border text-2xl font-bold
              transition-all
              ${correctness === 'correct'
                ? 'border-[var(--color-win)] text-[var(--color-win)]'
                : correctness === 'wrong'
                  ? 'border-[var(--color-lose)] text-[var(--color-lose)]'
                  : 'border-card-border'
              }
            `}
          >
            {answer || '?'}
          </div>
        </div>
      </div>

      {/* PC: Question Counter with more gap */}
      <div className="hidden md:block mt-8">
        <div className="text-center text-sm text-foreground-muted">
          {currentQuestionIndex + 1} / {totalQuestions}
        </div>
      </div>

      {/* Mobile: Keypad + Question Counter */}
      <div className="md:hidden mt-4">
        {/* Keypad - full width, 3 equal columns, 4 rows */}
        <div className="grid grid-cols-3 gap-2">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '-', '0', '⌫'].map((btn) => (
            <button
              key={btn}
              onClick={() => handlePress(btn)}
              disabled={correctness === 'correct'}
              className={`
                h-14 rounded-lg text-lg font-semibold
                ${btn === '-' || btn === '⌫' ? 'bg-surface-elevated text-foreground-muted' : 'bg-secondary'}
                disabled:opacity-50
              `}
            >
              {btn}
            </button>
          ))}
        </div>

        {/* Question Counter below keypad */}
        <div className="mt-4 text-center text-sm text-foreground-muted">
          {currentQuestionIndex + 1} / {totalQuestions}
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
