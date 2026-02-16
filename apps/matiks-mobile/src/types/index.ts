// Types for Matiks Mobile

export interface Question {
  operator: string;
  operand1: number;
  operand2: number;
  answer: number;
}

export type GameStatus = 'idle' | 'waiting' | 'ready' | 'playing' | 'ended';

export interface GameState {
  status: GameStatus;
  gameId?: string;
  isUser1?: boolean;
  opponent?: string;
  questions?: Question[];
  currentQuestionIndex?: number;
  startingTime?: string;
  endingTime?: string;
  userPoints?: number;
  opponentPoints?: number;
  winner?: string;
}

// WebSocket message types
export interface WSMessage {
  type: string;
  [key: string]: unknown;
}

export interface JoinMessage {
  type: 'JOIN';
  name: string;
  userId?: string;
}

export interface UpdateMessage {
  type: 'UPDATE';
  gameId: string;
  user: string;
  isCorrect: boolean;
}

export interface LeaveMessage {
  type: 'LEAVE';
}

// Server message types
export interface GameStartedMessage {
  type: 'GAME_STARTED';
  gameId: string;
  user1: string;
  user2: string;
  questions: Question[];
  startingTime: string;
  endingTime: string;
}

export interface ScoreUpdateMessage {
  type: 'SCORE_UPDATE';
  user1Points: number;
  user2Points: number;
}

export interface GameOverMessage {
  type: 'GAME_OVER';
  user1Points: number;
  user2Points: number;
  winner: string;
}

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}
