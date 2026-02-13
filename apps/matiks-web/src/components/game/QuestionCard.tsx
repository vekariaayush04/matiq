/**
 * QuestionCard Component
 * Displays a math problem with answer input
 */

import { useEffect, useRef } from 'react'
import { Question } from '../../types'
import { getOperatorSymbol } from '../../utils'
import { Input } from '../ui'

interface QuestionCardProps {
  /** Current question to display */
  question: Question
  /** Current answer input value */
  answer: string
  /** Callback when answer changes */
  onAnswerChange: (value: string) => void
  /** Visual correctness state */
  correctness: 'correct' | 'wrong' | null
  /** Optional CSS classes */
  className?: string
  /** Auto-focus on mount */
  autoFocus?: boolean
}

/**
 * Math problem display with answer input
 * Auto-focuses input on mount and when question changes
 */
export const QuestionCard = ({
  question,
  answer,
  onAnswerChange,
  correctness,
  className = '',
  autoFocus = true,
}: QuestionCardProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  /**
   * Auto-focus input when component mounts or question changes
   * This ensures the input is ready for typing on each new question
   */
  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus()
    }
  }, [autoFocus, question.operand1, question.operator, question.operand2])

  return (
    <div className={`flex flex-col items-center gap-6 animate-scale-in ${className}`}>
      {/* Math expression */}
      <span className="text-5xl md:text-7xl font-extrabold tabular-nums leading-none tracking-tight">
        {question.operand1}{' '}
        {getOperatorSymbol(question.operator)}{' '}
        {question.operand2}
      </span>

      {/* Answer input */}
      <div className="w-full max-w-[180px]">
        <Input
          ref={inputRef}
          value={answer}
          onChange={onAnswerChange}
          placeholder="?"
          correctness={correctness}
          autoFocus={autoFocus}
        />
      </div>
    </div>
  )
}

export default QuestionCard
