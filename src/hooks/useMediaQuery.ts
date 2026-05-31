import { useEffect, useState } from 'react'

/** Subscribe to a CSS media query and re-render when it changes. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  )

  useEffect(() => {
    const mql = window.matchMedia(query)
    const handler = () => setMatches(mql.matches)
    handler()
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [query])

  return matches
}

/**
 * True on a phone-sized screen held in portrait — the case where wide lab
 * content (logs, request dumps, IP tables) can't fit without sideways scroll,
 * so we ask the user to rotate to landscape.
 */
export function usePhonePortrait(): boolean {
  return useMediaQuery('(max-width: 767px) and (orientation: portrait)')
}
