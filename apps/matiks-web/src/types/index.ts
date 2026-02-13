/**
 * Game-related type definitions
 * Centralized for easy reference and type safety across the app
 */

/** WebSocket message types from server */
export interface GameStartedMessage {
  type: 'GAME_STARTED'
  gameId: string
  user1: string
  user2: string
  startingTime: string
  endingTime: string
  questions: Question[]
}

export interface ScoreUpdateMessage {
  type: 'SCORE_UPDATE'
  user1Points: number
  user2Points: number
}

export interface GameOverMessage {
  type: 'GAME_OVER'
  user1Points: number
  user2Points: number
}

export type GameMessage = GameStartedMessage | ScoreUpdateMessage | GameOverMessage

/** Question structure for math problems */
export interface Question {
  operator: string
  operand1: number
  operand2: number
  answer: number
}

/** Game lifecycle states */
export type GameStatus = 'idle' | 'waiting' | 'playing' | 'ended'

/** Local game phase within 'playing' status */
export type GamePhase = 'waiting' | 'ready' | 'playing' | 'ended'

/** Complete game state from WebSocket */
export interface GameState {
  status: GameStatus
  gameId?: string
  isUser1?: boolean
  opponent?: string
  questions?: Question[]
  startingTime?: string
  endingTime?: string
  userPoints?: number
  opponentPoints?: number
  winner?: string
}

/** Math operator types supported by the game */
export type Operator = 'ADDITION' | 'SUBTRACTION' | 'MULTIPLICATION'
