/**
 * ProgressBar Component
 * Visual indicator of game progress (questions answered)
 */

import { useMemo } from 'react'
import { getQuestionProgress } from '../../utils'

interface ProgressBarProps {
  /** Current question index (0-based) */
  currentIndex: number
  /** Total number of questions */
  totalQuestions: number
  /** Optional CSS classes for container */
  containerClassName?: string
  /** Optional CSS classes for fill */
  fillClassName?: string
}

/**
 * Progress bar showing game completion status
 * Fills left to right as questions are answered
 */
export const ProgressBar = ({
  currentIndex,
  totalQuestions,
  containerClassName = '',
  fillClassName = '',
}: ProgressBarProps) => {
  const percent = useMemo(
    () => getQuestionProgress(currentIndex, totalQuestions),
    [currentIndex, totalQuestions]
  )

  return (
    <div className={`flex flex-col items-center gap-2 ${containerClassName}`}>
      {/* Progress track */}
      <div className="w-[120px] h-1 bg-neutral-700 rounded-full overflow-hidden">
        {/* Progress fill */}
        <div
          className={`h-full bg-fg rounded-full transition-all duration-300 ${fillClassName}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      {/* Question counter text */}
      <span className="text-fg-dim text-xs font-medium">
        {currentIndex + 1} / {totalQuestions}
      </span>
    </div>
  )
}

export default ProgressBar
