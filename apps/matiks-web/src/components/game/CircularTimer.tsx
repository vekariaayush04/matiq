/**
 * CircularTimer Component
 * Displays countdown as a shrinking ring with numeric display
 */

import { useMemo } from 'react'
import { GAME_DURATION_SECONDS } from '../../constants'
import { getTimerProgress, getCircleOffset } from '../../utils'

interface CircularTimerProps {
  /** Current seconds remaining */
  timeLeft: number | null
  /** Optional custom duration (defaults to GAME_DURATION_SECONDS) */
  duration?: number
  /** Optional CSS classes */
  className?: string
}

/**
 * SVG-based circular countdown timer
 * Ring shrinks as time decreases
 */
export const CircularTimer = ({
  timeLeft,
  duration = GAME_DURATION_SECONDS,
  className = '',
}: CircularTimerProps) => {
  const radius = 28
  const circumference = useMemo(
    () => 2 * Math.PI * radius,
    []
  )
  const progress = useMemo(
    () => getTimerProgress(timeLeft, duration),
    [timeLeft, duration]
  )
  const strokeDashoffset = useMemo(
    () => getCircleOffset(progress, radius),
    [progress, radius]
  )

  return (
    <div className={`relative w-[70px] h-[70px] ${className}`}>
      <svg
        width="70"
        height="70"
        viewBox="0 0 70 70"
        className="transform -rotate-90"
      >
        {/* Background ring */}
        <circle
          cx="35"
          cy="35"
          r={radius}
          fill="none"
          stroke="#333"
          strokeWidth="4"
        />
        {/* Progress ring */}
        <circle
          cx="35"
          cy={35}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="text-fg transition-all duration-75"
        />
      </svg>
      {/* Numeric display */}
      <span className="absolute inset-0 flex items-center justify-center text-sm font-bold tabular-nums">
        {timeLeft ?? '--'}
      </span>
    </div>
  )
}

export default CircularTimer
