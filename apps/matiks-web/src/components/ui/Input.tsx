/**
 * Input Component
 * Consistent input styling with focus states
 */

import { forwardRef } from 'react'

interface InputProps {
  /** Current input value */
  value: string
  /** Callback when value changes */
  onChange: (value: string) => void
  /** Visual state for correctness feedback */
  correctness?: 'correct' | 'wrong' | null
  /** Optional CSS classes */
  className?: string
  /** Placeholder text */
  placeholder?: string
  /** Auto-focus on mount */
  autoFocus?: boolean
}

/**
 * Styled input component for the game
 * Supports correctness feedback styling
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, correctness = null, className = '', placeholder = '', autoFocus = false }, ref) => {
    /**
     * Determine CSS classes based on correctness state
     */
    const getCorrectnessClass = () => {
      switch (correctness) {
        case 'correct':
          return 'border-win text-win shadow-[0_0_25px_rgba(74,222,128,0.4)]'
        case 'wrong':
          return 'border-lose text-lose shadow-[0_0_25px_rgba(248,113,113,0.4)] animate-shake'
        default:
          return 'border-neutral-700 focus:border-fg focus:shadow-[0_0_0_4px_rgba(255,255,255,0.15)]'
      }
    }

    return (
      <input
        ref={ref}
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={`
          w-full
          bg-surface
          border
          rounded-xl
          px-4
          py-3.5
          text-xl
          md:text-2xl
          font-semibold
          text-center
          outline-none
          transition-all
          [-moz-appearance:textfield]
          [&::-webkit-outer-spin-button]:appearance-none
          [&::-webkit-inner-spin-button]:appearance-none
          ${getCorrectnessClass()}
          ${className}
        `}
      />
    )
  }
)

Input.displayName = 'Input'

export default Input
