/**
 * Main Application Component
 * Orchestrates game flow and renders appropriate screens
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import {
  AuthScreen,
  IdleScreen,
  WaitingScreen,
  ReadyScreen,
  PlayingScreen,
  EndedScreen,
} from './components/screens'
import { AuthHeader } from './components/ui'
import { AuthProvider, useAuth } from './context/AuthContext'
import { useGameSocket, useTimer } from './hooks'
import { ANSWER_DEBOUNCE_MS, SCORE_ANIMATION_MS } from './constants'

function AppContent() {
  const { session, isLoading } = useAuth()

  // Player state - use session name if available
  const [name, setName] = useState('')

  // WebSocket and game state
  const gameState = useGameSocket(name, session?.user?.id)
  const {
    status,
    opponent,
    questions,
    startingTime,
    endingTime,
    userPoints,
    opponentPoints,
    winner,
    connect,
    updateScore,
    reset,
  } = gameState

  // Local game state
  const [currentQIndex, setCurrentQIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [correct, setCorrect] = useState<'correct' | 'wrong' | null>(null)
  const [scoreUpdated, setScoreUpdated] = useState(false)

  // Refs for answer handling
  const processingRef = useRef(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  // Timer hook
  const { timeLeft, gamePhase } = useTimer({
    startingTime,
    endingTime,
    status,
    onGameEnd: () => updateScore(false),
  })

  // Set name from session on load
  useEffect(() => {
    if (session?.user?.name && !name) {
      setName(session.user.name)
    }
  }, [session, name])

  /**
   * Reset local state when new game starts
   */
  useEffect(() => {
    if (status === 'playing') {
      setCurrentQIndex(0)
      setAnswer('')
      setCorrect(null)
      setScoreUpdated(false)
      processingRef.current = false
    }
  }, [status])

  /**
   * Animate score when it updates
   */
  useEffect(() => {
    if (userPoints !== undefined) {
      setScoreUpdated(true)
      const timer = setTimeout(() => setScoreUpdated(false), SCORE_ANIMATION_MS)
      return () => clearTimeout(timer)
    }
  }, [userPoints])

  /**
   * Cleanup timeout on unmount
   */
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  /**
   * Move to next question after correct answer
   * Uses functional update to avoid stale closure issues
   */
  const moveToNextQuestion = useCallback(() => {
    processingRef.current = false
    setCorrect(null)
    setAnswer('')
    setCurrentQIndex((i) => i + 1)
  }, [])

  /**
   * Process answer input
   */
  const handleAnswerChange = useCallback((value: string) => {
    // Skip if not playing or already processing
    if (gamePhase !== 'playing' || !questions) {
      setAnswer(value)
      return
    }

    // Skip if already processing an answer
    if (processingRef.current) {
      setAnswer(value)
      return
    }

    setAnswer(value)
    const currentQ = questions[currentQIndex]
    const numValue = Number(value)

    if (value.length > 0) {
      if (numValue === currentQ.answer) {
        // Correct answer
        processingRef.current = true
        setCorrect('correct')
        updateScore(true)
        timeoutRef.current = setTimeout(moveToNextQuestion, ANSWER_DEBOUNCE_MS)
      } else {
        // Wrong answer - allow retry
        setCorrect('wrong')
      }
    } else {
      // Empty input
      setCorrect(null)
    }
  }, [gamePhase, questions, currentQIndex, updateScore, moveToNextQuestion])

  /**
   * Handle auth success - start playing
   */
  const handleAuthSuccess = useCallback(() => {
    if (session?.user?.name) {
      setName(session.user.name)
    }
  }, [session])

  /**
   * Render appropriate screen based on game state
   */
  // Show loading while checking auth
  if (isLoading) {
    return (
      <>
        <AuthHeader>
          <div className="flex-1" />
        </AuthHeader>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-2 border-fg border-t-transparent rounded-full" />
        </div>
      </>
    )
  }

  // Show auth screen if not logged in
  if (!session) {
    return <AuthScreen onAuthSuccess={handleAuthSuccess} />
  }

  // Render game screens based on status
  const renderGameScreen = () => {
    switch (status) {
      case 'idle':
        return (
          <IdleScreen
            name={session.user.name || name}
            onNameChange={setName}
            onPlay={connect}
          />
        )

      case 'waiting':
        return <WaitingScreen />

      case 'playing':
        if (!questions) return null

        // Ready screen (countdown)
        if (gamePhase === 'waiting') {
          return (
            <ReadyScreen
              playerName={session.user.name || name}
              opponentName={opponent ?? ''}
              countDown={timeLeft}
            />
          )
        }

        // Playing screen
        const currentQuestion = questions[currentQIndex]
        if (!currentQuestion) return null

        return (
          <PlayingScreen
            playerName={session.user.name || name}
            playerScore={userPoints ?? null}
            opponentName={opponent ?? ''}
            opponentScore={opponentPoints ?? null}
            question={currentQuestion}
            answer={answer}
            onAnswerChange={handleAnswerChange}
            correctness={correct}
            timeLeft={timeLeft}
            currentQuestionIndex={currentQIndex}
            totalQuestions={questions.length}
            scoreUpdated={scoreUpdated}
          />
        )

      case 'ended':
        return (
          <EndedScreen
            isWinner={winner === (session.user.name || name)}
            playerScore={userPoints ?? 0}
            opponentScore={opponentPoints ?? 0}
            onPlayAgain={reset}
          />
        )

      default:
        return null
    }
  }

  return (
    <>
      <AuthHeader>
        <div className="flex-1" />
      </AuthHeader>
      {renderGameScreen()}
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
