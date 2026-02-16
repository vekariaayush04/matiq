/**
 * useGameSocket Hook
 * Manages WebSocket connection and game state for React Native
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { GameState, Question, GameStartedMessage, ScoreUpdateMessage, GameOverMessage } from '../types';
import { WS_URL } from '../constants';

// WebSocket event types
const EVENT_TYPES = {
  JOIN: 'JOIN',
  UPDATE: 'UPDATE',
  LEAVE: 'LEAVE',
} as const;

interface UseGameSocketReturn extends GameState {
  /** Connect to game server */
  connect: () => void;
  /** Submit answer */
  updateScore: (isCorrect: boolean) => void;
  /** Disconnect from server */
  disconnect: () => void;
  /** Reset for new game */
  reset: () => void;
}

/**
 * Manages WebSocket connection for real-time gameplay
 * Handles connection, state updates, and cleanup
 */
export const useGameSocket = (playerName: string, userId?: string): UseGameSocketReturn => {
  const [state, setState] = useState<GameState>({ status: 'idle' });
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  /**
   * Establish WebSocket connection and set up event handlers
   */
  const connect = useCallback(() => {
    // Prevent duplicate connections
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      console.log('WebSocket connected');
      // Join matchmaking queue with user info
      ws.send(JSON.stringify({
        type: EVENT_TYPES.JOIN,
        name: playerName,
        userId: userId || null,
      }));
    };

    ws.onmessage = (event) => {
      const data = event.data;

      // Handle non-JSON messages (pairing status)
      if (typeof data === 'string' && (data.includes('pairing') || data.includes('waiting'))) {
        setState((s) => ({ ...s, status: 'waiting' }));
        return;
      }

      // Parse and handle game messages
      try {
        const msg = JSON.parse(data);

        switch (msg.type) {
          case 'GAME_STARTED': {
            const gameMsg = msg as GameStartedMessage;
            const isUser1 = gameMsg.user1 === playerName;
            setState({
              status: 'playing',
              gameId: gameMsg.gameId,
              isUser1,
              opponent: isUser1 ? gameMsg.user2 : gameMsg.user1,
              questions: gameMsg.questions,
              currentQuestionIndex: 0,
              startingTime: gameMsg.startingTime,
              endingTime: gameMsg.endingTime,
            });
            break;
          }

          case 'SCORE_UPDATE': {
            const scoreMsg = msg as ScoreUpdateMessage;
            setState((s) => ({
              ...s,
              userPoints: s.isUser1 ? scoreMsg.user1Points : scoreMsg.user2Points,
              opponentPoints: s.isUser1 ? scoreMsg.user2Points : scoreMsg.user1Points,
            }));
            break;
          }

          case 'GAME_OVER': {
            const gameOverMsg = msg as GameOverMessage;
            setState((s) => {
              const userPts = s.isUser1 ? gameOverMsg.user1Points : gameOverMsg.user2Points;
              const oppPts = s.isUser1 ? gameOverMsg.user2Points : gameOverMsg.user1Points;
              return {
                ...s,
                status: 'ended',
                userPoints: userPts,
                opponentPoints: oppPts,
                winner: userPts > oppPts ? playerName : s.opponent,
              };
            });
            break;
          }
        }
      } catch (error) {
        console.error('Failed to parse game message:', data, error);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket closed');
      // Only reconnect during matchmaking, preserve ended status
      setState((s) => {
        if (s.status === 'ended') return s;
        if (s.status === 'waiting') {
          reconnectTimeoutRef.current = setTimeout(connect, 3000);
          return s;
        }
        return { ...s, status: 'idle' };
      });
    };

    wsRef.current = ws;
  }, [playerName, userId]);

  /**
   * Submit answer to server
   */
  const updateScore = useCallback((isCorrect: boolean) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: EVENT_TYPES.UPDATE,
        gameId: state.gameId,
        user: playerName,
        isCorrect,
      }));
    }
  }, [playerName, state.gameId]);

  /**
   * Close WebSocket connection
   */
  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current !== undefined) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  }, []);

  /**
   * Reset for new game (reuse connection)
   */
  const reset = useCallback(() => {
    // Send JOIN to start new game
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: EVENT_TYPES.JOIN,
        name: playerName,
        userId: userId || null,
      }));
    } else {
      // Reconnect if needed
      connect();
    }
  }, [playerName, userId, connect]);

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => disconnect();
  }, [disconnect]);

  return { ...state, connect, updateScore, disconnect, reset };
};

export default useGameSocket;
