/**
 * Logo Component
 * Displays the game logo with consistent styling
 */

interface LogoProps {
  /** Optional additional CSS classes */
  className?: string
}

export const Logo = ({ className = '' }: LogoProps) => {
  return (
    <h1
      className={`text-4xl md:text-5xl font-extrabold tracking-tight lowercase ${className}`}
    >
      matiks
    </h1>
  )
}

export default Logo
