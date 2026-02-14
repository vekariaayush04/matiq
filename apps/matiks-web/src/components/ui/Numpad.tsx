/**
 * Numpad Component
 * Competitive numeric keypad
 */

import { useCallback } from 'react'

interface NumpadProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

const BUTTONS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['-', '0', '⌫'],
]

export const Numpad = ({ value, onChange, disabled = false }: NumpadProps) => {
  const handlePress = useCallback((btn: string) => {
    if (disabled) return
    if (btn === '-') {
      onChange(value.startsWith('-') ? value.slice(1) : '-' + value)
    } else if (btn === '⌫') {
      onChange(value.slice(0, -1))
    } else {
      if (value.length >= 5) return
      onChange(value + btn)
    }
  }, [value, onChange, disabled])

  return (
    <div className="grid grid-cols-3 gap-2 max-w-[220px] mx-auto">
      {BUTTONS.map((row, i) =>
        row.map((btn) => {
          const isAction = btn === '-' || btn === '⌫'
          return (
            <button
              key={`${i}-${btn}`}
              onClick={() => handlePress(btn)}
              disabled={disabled}
              className={`
                h-16 rounded-xl text-xl font-semibold
                transition-all duration-150 active:scale-95
                disabled:opacity-40 disabled:cursor-not-allowed
                ${isAction
                  ? 'bg-surface-elevated text-foreground-muted hover:bg-opacity-80'
                  : 'bg-secondary text-foreground hover:bg-opacity-80'
                }
              `}
            >
              {btn}
            </button>
          )
        })
      )}
    </div>
  )
}

export default Numpad
