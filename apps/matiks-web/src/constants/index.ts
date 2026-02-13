/**
 * Game configuration constants
 * Centralized for easy tuning and maintenance
 */

/** Maximum game duration in seconds */
export const GAME_DURATION_SECONDS = 60

/** Countdown duration before game starts (in seconds) */
export const COUNTDOWN_SECONDS = 5

/** Default number of questions per game */
export const DEFAULT_QUESTION_COUNT = 40

/** Debounce delay for answer submission (milliseconds) */
export const ANSWER_DEBOUNCE_MS = 150

/** Score update animation duration (milliseconds) */
export const SCORE_ANIMATION_MS = 300

/** Local storage key for player name */
export const STORAGE_KEY_NAME = 'matiks_player_name'

/** WebSocket connection URL environment variable */
export const WS_URL = import.meta.env.API_BASE_URL || 'localhost:3000'
