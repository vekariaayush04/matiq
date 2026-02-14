/**
 * Input Component
 * Clean input for desktop
 */

import { forwardRef } from 'react'

interface InputProps {
  value: string
  onChange: (value: string) => void
  correctness?: 'correct' | 'wrong' | null
  className?: string
  placeholder?: string
  autoFocus?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, correctness = null, className = '', placeholder = '', autoFocus = false }, ref) => {
    const getCorrectnessClass = () => {
      switch (correctness) {
        case 'correct':
          return 'border-win text-win'
        case 'wrong':
          return 'border-lose text-lose'
        default:
          return 'border-surface-elevated focus:border-fg-secondary'
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
          border-2
          rounded-2xl
          px-4
          py-3.5
          text-xl
          font-medium
          text-center
          placeholder:text-fg-tertiary
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
