/**
 * ProgressBar Component
 * Simple progress indicator
 */

import { useMemo } from 'react'
import { getQuestionProgress } from '../../utils'

interface ProgressBarProps {
  currentIndex: number
  totalQuestions: number
}

export const ProgressBar = ({ currentIndex, totalQuestions }: ProgressBarProps) => {
  const percent = useMemo(() => getQuestionProgress(currentIndex, totalQuestions), [currentIndex, totalQuestions])

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-1.5 bg-secondary rounded-full">
        <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${percent}%` }} />
      </div>
      <span className="text-xs text-muted-foreground">{currentIndex + 1}/{totalQuestions}</span>
    </div>
  )
}

export default ProgressBar
