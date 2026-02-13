import { useState, useEffect, useCallback, useRef } from 'react'

interface Question {
  operator: string
  operand1: number
  operand2: number
  answer: number
}

interface GameStarted {
  type: 'GAME_STARTED'
  gameId: string
  user1: string
  user2: string
  startingTime: string
  endingTime: string
  questions: Question[]
}

interface ScoreUpdate {
  type: 'SCORE_UPDATE'
  user1Points: number
  user2Points: number
}

interface GameOver {
  type: 'GAME_OVER'
  user1Points: number
  user2Points: number
}

type GameMessage = GameStarted | ScoreUpdate | GameOver

interface GameState {
  status: 'idle' | 'waiting' | 'playing' | 'ended'
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

const EVENT_TYPES = {
  JOIN: 'JOIN',
  UPDATE: 'UPDATE',
  LEAVE: 'LEAVE',
} as const

export function useGameSocket(name: string) {
  const [state, setState] = useState<GameState>({ status: 'idle' })
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const gameIdRef = useRef<string>()

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return

    const ws = new WebSocket(`ws://${location.host}/ws`)

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: EVENT_TYPES.JOIN, name }))
    }

    ws.onmessage = (event) => {
      const data = event.data

      if (typeof data !== 'string') return

      if (data.includes('pairing') || data.includes('waiting')) {
        setState((s) => ({ ...s, status: 'waiting' }))
        return
      }

      try {
        const msg: GameMessage = JSON.parse(data)

        switch (msg.type) {
          case 'GAME_STARTED':
            gameIdRef.current = msg.gameId
            const isUser1 = msg.user1 === name
            setState({
              status: 'playing',
              gameId: msg.gameId,
              isUser1,
              opponent: isUser1 ? msg.user2 : msg.user1,
              questions: msg.questions,
              startingTime: msg.startingTime,
              endingTime: msg.endingTime,
            })
            break

          case 'SCORE_UPDATE':
            setState((s) => ({
              ...s,
              userPoints: s.isUser1 ? msg.user1Points : msg.user2Points,
              opponentPoints: s.isUser1 ? msg.user2Points : msg.user1Points,
            }))
            break

          case 'GAME_OVER':
            setState((s) => {
              const userPts = s.isUser1 ? msg.user1Points : msg.user2Points
              const oppPts = s.isUser1 ? msg.user2Points : msg.user1Points
              return {
                status: 'ended',
                userPoints: userPts,
                opponentPoints: oppPts,
                winner: userPts > oppPts ? name : s.opponent,
              }
            })
            break
        }
      } catch {
        console.log(data)
      }
    }

    ws.onclose = () => {
      reconnectTimeoutRef.current = setTimeout(connect, 3000)
    }

    wsRef.current = ws
  }, [name])

  const updateScore = useCallback((isCorrect: boolean) => {
    if (wsRef.current?.readyState === WebSocket.OPEN && gameIdRef.current) {
      wsRef.current.send(JSON.stringify({
        type: EVENT_TYPES.UPDATE,
        gameId: gameIdRef.current,
        user: name,
        isCorrect,
      }))
    }
  }, [name])

  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close()
      wsRef.current = null
    }
    if (reconnectTimeoutRef.current !== undefined) {
      clearTimeout(reconnectTimeoutRef.current)
    }
  }, [])

  useEffect(() => {
    return () => disconnect()
  }, [disconnect])


  return { state, connect, updateScore, disconnect }
}
