// Constants for Matiks Mobile

// API Configuration - uses environment variables
// Set these in .env file or use defaults for development
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://192.168.0.69:3000';
export const WS_URL = process.env.EXPO_PUBLIC_WS_URL || 'ws://192.168.0.69:3000/ws';

// Game Configuration
export const GAME_DURATION_SECONDS = 60;
export const COUNTDOWN_SECONDS = 5;
export const DEFAULT_QUESTION_COUNT = 40;
export const ANSWER_DEBOUNCE_MS = 150;
export const SCORE_ANIMATION_MS = 300;
export const STORAGE_KEY_NAME = 'matiks_player_name';

// UI Colors (matching the web theme)
export const COLORS = {
  background: '#0a0a0f',
  surface: '#16161e',
  surfaceLight: '#1e1e2a',
  primary: '#6366f1', // Indigo
  primaryHover: '#818cf8',
  accent: '#22d3ee', // Cyan
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
  text: '#ffffff',
  textSecondary: '#9ca3af',
  textMuted: '#6b7280',
  border: '#2d2d3a',
};

// Operator symbols
export const OPERATORS = {
  ADD: '+',
  SUBTRACT: '−',
  MULTIPLY: '×',
  DIVIDE: '÷',
};
