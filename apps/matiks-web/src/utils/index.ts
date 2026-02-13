/**
 * Utility functions for game logic and formatting
 */

/**
 * Convert operator enum to display symbol
 * @param operator - The operator type from server
 * @returns Visual symbol for the operator
 */
export const getOperatorSymbol = (operator: string): string => {
  const symbols: Record<string, string> = {
    ADDITION: '+',
    SUBTRACTION: '-',
    MULTIPLICATION: '×',
  }
  return symbols[operator] || operator
}

/**
 * Calculate circular timer progress percentage
 * @param timeLeft - Seconds remaining
 * @param maxTime - Total game duration
 * @returns Progress percentage (0-100)
 */
export const getTimerProgress = (timeLeft: number | null, maxTime: number): number => {
  if (timeLeft === null) return 100
  return Math.max(0, Math.min(100, (timeLeft / maxTime) * 100))
}

/**
 * Calculate progress bar percentage for questions answered
 * @param currentIndex - Current question index (0-based)
 * @param totalQuestions - Total questions in game
 * @returns Progress percentage (0-100)
 */
export const getQuestionProgress = (currentIndex: number, totalQuestions: number): number => {
  if (totalQuestions === 0) return 0
  return ((currentIndex + 1) / totalQuestions) * 100
}

/**
 * Calculate stroke dash offset for circular SVG timer
 * @param progress - Progress percentage (0-100)
 * @param radius - Circle radius
 * @returns Stroke dash offset for SVG animation
 */
export const getCircleOffset = (progress: number, radius: number): number => {
  const circumference = 2 * Math.PI * radius
  return circumference - (progress / 100) * circumference
}

/**
 * Determine if player won based on final scores
 * @param userPoints - Current player's points
 * @param opponentPoints - Opponent's points
 * @returns True if player won
 */
export const didPlayerWin = (userPoints: number, opponentPoints: number): boolean => {
  return userPoints > opponentPoints
}

/**
 * Format score for display (e.g., "5 - 3")
 * @param userPoints - Current player's points
 * @param opponentPoints - Opponent's points
 * @returns Formatted score string
 */
export const formatScore = (userPoints: number, opponentPoints: number): string => {
  return `${userPoints} - ${opponentPoints}`
}

/**
 * Safe number conversion from string input
 * @param value - String value from input
 * @returns Number or NaN if invalid
 */
export const parseNumber = (value: string): number => {
  const num = Number(value)
  return Number.isNaN(num) ? NaN : num
}
