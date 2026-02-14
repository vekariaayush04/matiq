/**
 * ReadyScreen Component
 * Clean countdown screen
 */

interface ReadyScreenProps {
  playerName: string
  opponentName: string
  countDown: number | null
}

export const ReadyScreen = ({ playerName, opponentName, countDown }: ReadyScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {/* Countdown */}
      <div className="text-8xl font-bold mb-8 animate-countdown">
        {countDown}
      </div>

      {/* Players */}
      <div className="flex items-center gap-4 text-lg">
        <span className="font-medium">{playerName}</span>
        <span className="text-foreground-muted">vs</span>
        <span className="font-medium">{opponentName}</span>
      </div>
    </div>
  )
}

export default ReadyScreen
