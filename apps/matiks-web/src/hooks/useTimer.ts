/**
 * useTimer Hook
 * Manages game timer with countdown and game phase transitions
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import { GamePhase } from '../types'
// Note: COUNTDOWN_SECONDS available for future use

interface UseTimerProps {
  /** WebSocket game start time */
  startingTime: string | undefined
  /** WebSocket game end time */
  endingTime: string | undefined
  /** Current game status */
  status: string
  /** Callback when game phase ends */
  onGameEnd: () => void
}

interface UseTimerReturn {
  /** Seconds remaining */
  timeLeft: number | null
  /** Current game phase */
  gamePhase: GamePhase
}

/**
 * Manages game timer and phase transitions
 * Handles countdown, active play, and game end
 */
export const useTimer = ({
  startingTime,
  endingTime,
  status,
  onGameEnd,
}: UseTimerProps): UseTimerReturn => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const [gamePhase, setGamePhase] = useState<GamePhase>('waiting')
  const animationFrameRef = useRef<number | null>(null)

  /**
   * Update timer based on current time vs start/end times
   */
  const updateTimer = useCallback(() => {
    if (!startingTime || !endingTime) return

    const now = Date.now()
    const start = new Date(startingTime).getTime()
    const end = new Date(endingTime).getTime()

    if (now < start) {
      // Countdown phase
      setGamePhase('waiting')
      setTimeLeft(Math.ceil((start - now) / 1000))
    } else if (now >= start && now < end) {
      // Active play phase
      setGamePhase('playing')
      setTimeLeft(Math.max(0, Math.ceil((end - now) / 1000)))
    } else {
      // Game ended
      setGamePhase('ended')
      setTimeLeft(0)
    }
  }, [startingTime, endingTime])

  /**
   * Timer loop using requestAnimationFrame
   */
  useEffect(() => {
    if (status !== 'playing' || !startingTime || !endingTime) return

    const tick = () => {
      updateTimer()
      animationFrameRef.current = requestAnimationFrame(tick)
    }

    updateTimer()
    animationFrameRef.current = requestAnimationFrame(tick)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [status, startingTime, endingTime, updateTimer])

  /**
   * Trigger onGameEnd when timer hits zero
   */
  useEffect(() => {
    if (gamePhase === 'ended' && status === 'playing') {
      onGameEnd()
    }
  }, [gamePhase, status, onGameEnd])

  return { timeLeft, gamePhase }
}

export default useTimer
