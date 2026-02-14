/**
 * CircularTimer Component
 */

import { useMemo } from 'react'
import { GAME_DURATION_SECONDS } from '../../constants'
import { getTimerProgress, getCircleOffset } from '../../utils'

interface CircularTimerProps {
  timeLeft: number | null
  duration?: number
}

export const CircularTimer = ({
  timeLeft,
  duration = GAME_DURATION_SECONDS,
}: CircularTimerProps) => {
  const radius = 20
  const circumference = useMemo(() => 2 * Math.PI * radius, [])
  const progress = useMemo(() => getTimerProgress(timeLeft, duration), [timeLeft, duration])
  const strokeDashoffset = useMemo(() => getCircleOffset(progress, radius), [progress, radius])

  const isCritical = timeLeft !== null && timeLeft <= 30
  const isWarning = timeLeft !== null && timeLeft <= 60

  const color = timeLeft === null ? '#a1a1aa' : isCritical ? '#f43f5e' : isWarning ? '#f97316' : '#fafafa'
  const trackColor = timeLeft === null ? '#27272a' : isCritical ? 'rgba(244, 63, 94, 0.2)' : isWarning ? 'rgba(249, 115, 22, 0.2)' : 'rgba(250, 250, 250, 0.1)'

  const formatTime = (seconds: number | null) => {
    if (seconds === null) return '--'
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="flex flex-col items-center">
      <div className={`text-2xl font-bold tabular-nums ${isCritical ? 'text-[#f43f5e]' : isWarning ? 'text-[#f97316]' : ''}`}>
        {formatTime(timeLeft)}
      </div>
      <div className="relative mt-1">
        <svg width="50" height="50" viewBox="0 0 50 50" className="-rotate-90">
          <circle cx="25" cy="25" r={radius} fill="none" stroke={trackColor} strokeWidth="2.5" />
          <circle cx="25" cy="25" r={radius} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} />
        </svg>
      </div>
    </div>
  )
}

export default CircularTimer
