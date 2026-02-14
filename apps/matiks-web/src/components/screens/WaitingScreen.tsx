/**
 * WaitingScreen Component
 * Clean matchmaking screen
 */

export const WaitingScreen = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-8 h-8 border-2 border-foreground-muted border-t-foreground rounded-full animate-spin mb-4" />
      <p className="text-foreground-muted">Finding opponent...</p>
    </div>
  )
}

export default WaitingScreen
