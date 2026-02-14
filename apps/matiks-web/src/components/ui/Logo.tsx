interface LogoProps {
  className?: string
}

export const Logo = ({ className = '' }: LogoProps) => {
  return <h1 className={`text-3xl font-bold tracking-tight ${className}`}>MATIKS</h1>
}

export default Logo
