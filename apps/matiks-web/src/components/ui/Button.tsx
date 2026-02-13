/**
 * Button Component
 * Reusable button with consistent styling and hover effects
 */

import { ReactNode, ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button content */
  children: ReactNode
  /** Whether the button is disabled */
  disabled?: boolean
  /** Optional CSS classes */
  className?: string
}

/**
 * Primary button styled for the game UI
 * Features lift effect and shadow on hover
 */
export const Button = ({
  children,
  disabled = false,
  className = '',
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`
        bg-fg text-bg
        px-10 py-4
        text-base font-semibold
        rounded-xl
        cursor-pointer
        transition-all
        hover:-translate-y-0.5
        hover:shadow-[0_8px_30px_rgba(255,255,255,0.25)]
        active:translate-y-0
        disabled:opacity-40
        disabled:cursor-not-allowed
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
