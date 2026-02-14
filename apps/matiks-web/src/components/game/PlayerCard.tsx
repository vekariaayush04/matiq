/**
 * PlayerCard Component
 * Competitive player display with score, avatar, and stats
 */

interface PlayerCardProps {
  name: string
  score: number
  isLeading?: boolean
  isPlayer?: boolean
  scoreUpdated?: boolean
}

export const PlayerCard = ({
  name,
  score,
  isLeading = false,
  isPlayer = true,
  scoreUpdated = false,
}: PlayerCardProps) => {
  const accentColor = isPlayer ? 'player1' : 'player2'
  const glowColor = isPlayer ? 'player1-glow' : 'player2-glow'

  return (
    <div
      className={`
        relative p-4 rounded-2xl border transition-all duration-300
        ${isLeading
          ? `border-[var(--color-${accentColor})] shadow-[0_0_20px_var(--color-${glowColor})]`
          : 'border-card-border'
        }
        bg-card
      `}
    >
      {/* Avatar */}
      <div
        className={`
          w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold mb-3
          ${isLeading ? `bg-[var(--color-${accentColor})] text-white` : 'bg-secondary text-foreground'}
        `}
      >
        {name?.[0]?.toUpperCase() || '?'}
      </div>

      {/* Name */}
      <div className="text-sm text-foreground-muted mb-1 truncate">{name}</div>

      {/* Score */}
      <div
        className={`
          text-4xl font-bold tabular-nums transition-all duration-200
          ${scoreUpdated ? 'animate-score-pop text-[var(--color-win)]' : 'text-foreground'}
          ${isLeading ? `text-[var(--color-${accentColor})]` : ''}
        `}
      >
        {score}
      </div>

      {/* Leading indicator */}
      {isLeading && (
        <div className="absolute top-3 right-3">
          <div className={`w-2 h-2 rounded-full bg-[var(--color-${accentColor})] animate-pulse`} />
        </div>
      )}
    </div>
  )
}

export default PlayerCard
