import { useState, useEffect, useRef, useCallback } from 'react'
import { useGameSocket } from './useGameSocket'

function App() {
  const [name, setName] = useState('')
  const { state, connect, updateScore } = useGameSocket(name)
  const [currentQIndex, setCurrentQIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [correct, setCorrect] = useState<boolean | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<number | null>(null)

  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const [gamePhase, setGamePhase] = useState<'waiting' | 'ready' | 'playing' | 'ended'>('waiting')

  useEffect(() => {
    if (state.status === 'playing' && inputRef.current && gamePhase === 'playing') {
      inputRef.current.focus()
    }
  }, [state.status, gamePhase])

  // Timer and phase management
  useEffect(() => {
    if (state.status !== 'playing' || !state.startingTime || !state.endingTime) return

    const updateTimer = () => {
      const now = Date.now()
      const start = new Date(state.startingTime!).getTime()
      const end = new Date(state.endingTime!).getTime()

      if (now < start) {
        setGamePhase('waiting')
        setTimeLeft(Math.ceil((start - now) / 1000))
      } else if (now >= start && now < end) {
        setGamePhase('playing')
        setTimeLeft(Math.max(0, Math.ceil((end - now) / 1000)))
      } else {
        setGamePhase('ended')
        setTimeLeft(0)
      }
    }

    updateTimer()
    const interval = setInterval(updateTimer, 100)
    return () => clearInterval(interval)
  }, [state.status, state.startingTime, state.endingTime])

  // End game when timer hits 0
  useEffect(() => {
    if (gamePhase === 'ended' && state.status === 'playing') {
      updateScore(false)
    }
  }, [gamePhase])

  // Auto-submit on correct answer
  const handleInputChange = useCallback((value: string) => {
    if (gamePhase !== 'playing' || !state.questions) {
      setAnswer(value)
      return
    }

    setAnswer(value)
    const currentQ = state.questions[currentQIndex]
    const numValue = Number(value)

    // Clear any existing timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    // Check if answer matches
    if (value.length > 0 && numValue === currentQ.answer) {
      // Correct! Submit immediately
      setCorrect(true)
      updateScore(true)
      debounceRef.current = window.setTimeout(() => {
        setCorrect(null)
        setAnswer('')
        setCurrentQIndex((i) => i + 1)
        if (inputRef.current) inputRef.current.focus()
      }, 100)
    } else if (value.length > 0) {
      // Wrong answer - mark but allow continuing
      setCorrect(false)
    } else {
      setCorrect(null)
    }
  }, [gamePhase, state.questions, currentQIndex, updateScore])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Submit on Enter for manual submission
    if (correct === false && answer) {
      const currentQ = state.questions![currentQIndex]
      const isCorrect = Number(answer) === currentQ.answer
      setCorrect(isCorrect)
      if (isCorrect) {
        updateScore(true)
        setTimeout(() => {
          setCorrect(null)
          setAnswer('')
          setCurrentQIndex((i) => i + 1)
          if (inputRef.current) inputRef.current.focus()
        }, 150)
      }
    }
  }

  const getOperatorSymbol = (op: string) => {
    switch (op) {
      case 'ADDITION': return '+'
      case 'SUBTRACTION': return '-'
      case 'MULTIPLICATION': return '×'
      default: return op
    }
  }

  if (state.status === 'idle') {
    return (
      <div className="screen idle">
        <h1 className="logo">Matiq</h1>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={12}
          onKeyDown={(e) => e.key === 'Enter' && connect()}
        />
        <button onClick={connect} disabled={!name.trim()}>Play</button>
      </div>
    )
  }

  if (state.status === 'waiting') {
    return (
      <div className="screen waiting">
        <h1 className="logo">Matiks</h1>
        <div className="loader" />
        <p>Waiting for opponent...</p>
      </div>
    )
  }

  if (state.status === 'playing' && state.questions) {
    const currentQ = state.questions[currentQIndex]
    if (!currentQ) return null

    // Show "Be Ready" screen before game starts
    if (gamePhase === 'waiting') {
      return (
        <div className="screen ready">
          <h1 className="logo">Matiks</h1>
          <div className="matchup">
            <span className="player">{name}</span>
            <span className="vs">vs</span>
            <span className="player">{state.opponent}</span>
          </div>
          <div className="countdown">Game starts in {timeLeft}s</div>
        </div>
      )
    }

    return (
      <div className="screen playing">
        <div className="header">
          <div className="score you">
            <span className="label">{name}</span>
            <span className="value">{state.userPoints ?? 0}</span>
          </div>
          <div className="timer-block">
            <span className="timer-value">{timeLeft ?? '--'}s</span>
          </div>
          <div className="score them">
            <span className="label">{state.opponent}</span>
            <span className="value">{state.opponentPoints ?? 0}</span>
          </div>
        </div>

        <div className="question">
          <span className="operands">
            {currentQ.operand1} {getOperatorSymbol(currentQ.operator)} {currentQ.operand2}
          </span>
          <form onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="number"
              value={answer}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="?"
              className={correct === true ? 'correct' : correct === false ? 'wrong' : ''}
              autoFocus
            />
          </form>
        </div>

        <div className="progress">
          {currentQIndex + 1} / {state.questions.length}
        </div>
      </div>
    )
  }

  if (state.status === 'ended') {
    const isWinner = state.winner === name

    return (
      <div className="screen ended">
        <h1 className="logo">Matiks</h1>
        <div className="result">
          <div className={`outcome ${isWinner ? 'win' : 'lose'}`}>
            {isWinner ? 'You Win' : 'You Lose'}
          </div>
          <div className="final-score">
            {state.userPoints} - {state.opponentPoints}
          </div>
        </div>
        <button onClick={() => window.location.reload()}>Play Again</button>
      </div>
    )
  }

  return null
}

export default App
