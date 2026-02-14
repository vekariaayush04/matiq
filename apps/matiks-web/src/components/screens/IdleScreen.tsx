/**
 * IdleScreen Component
 * Clean entry screen
 */

import { useCallback } from 'react'
import { Logo, Button } from '../ui'

interface IdleScreenProps {
  name: string
  onNameChange: (name: string) => void
  onPlay: () => void
}

export const IdleScreen = ({ name, onNameChange, onPlay }: IdleScreenProps) => {
  const handlePlay = useCallback(() => {
    if (name.trim()) onPlay()
  }, [name, onPlay])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Logo />

      <div className="mt-8 w-full max-w-[200px]">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          maxLength={12}
          onKeyDown={(e) => e.key === 'Enter' && handlePlay()}
          className="w-full p-3 rounded-xl border border-card-border bg-card text-center mb-4 text-foreground placeholder:text-foreground-muted"
        />
        <Button onClick={handlePlay} disabled={!name.trim()} className="w-full">
          Play
        </Button>
      </div>
    </div>
  )
}

export default IdleScreen
