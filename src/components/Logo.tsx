import logoHorizontal from '../assets/logo-horizontal.png'
import logoIcon from '../assets/logo-icon.png'

/**
 * Cyber Vidya logo — the official brand asset extracted from the brand guide.
 * - withWordmark (default): horizontal lockup (icon + "CYBER VIDYA").
 * - withWordmark={false}:   icon mark only.
 * `size` sets the rendered pixel height; width scales automatically.
 */
interface LogoProps {
  withWordmark?: boolean
  /** Rendered height in px. */
  size?: number
  className?: string
}

export function Logo({ withWordmark = true, size = 40, className = '' }: LogoProps) {
  const src = withWordmark ? logoHorizontal : logoIcon
  return (
    <img
      src={src}
      alt="Cyber Vidya"
      height={size}
      style={{ height: size, width: 'auto' }}
      className={className}
      decoding="async"
    />
  )
}
