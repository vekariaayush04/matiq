/**
 * IdleScreen Component
 * Initial screen where player enters their name
 */

import { Logo } from '../ui'

interface IdleScreenProps {
  /** Current player name */
  name: string
  /** Callback when name changes */
  onNameChange: (name: string) => void
  /** Callback when play button is clicked */
  onPlay: () => void
}

/**
 * Entry screen with name input and play button
 * Disabled until a name is entered
 */
export const IdleScreen = ({
  name,
  onNameChange,
  onPlay,
}: IdleScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 px-6 animate-fade-in">
      <Logo />

      <div className="flex flex-col items-center gap-8 w-full">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          maxLength={12}
          onKeyDown={(e) => e.key === 'Enter' && name.trim() && onPlay()}
          className="bg-surface border border-neutral-700 rounded-xl px-6 py-4 text-lg text-fg w-full max-w-[280px] text-center outline-none transition-all focus:border-fg focus:shadow-[0_0_0_4px_rgba(255,255,255,0.15)]"
        />

        <button
          onClick={onPlay}
          disabled={!name.trim()}
          className="bg-fg text-bg px-10 py-4 text-base font-semibold rounded-xl cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(255,255,255,0.25)] active:translate-y-0 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Play
        </button>
      </div>
    </div>
  )
}

export default IdleScreen
