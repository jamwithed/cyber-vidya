import { useEffect, useState } from 'react'

export type Route = 'home' | 'about' | 'contact' | 'courses' | 'portal'

/**
 * Minimal, dependency-free hash router.
 *
 * - `#/about`   → About page
 * - `#/contact` → Contact page
 * - anything else (empty, `#/`, or in-page anchors like `#roadmap`) → Home
 *
 * In-page section anchors keep working natively: when the route resolves to
 * `home`, the browser still scrolls to the matching element id.
 */
function parse(hash: string): Route {
  const h = hash.replace(/^#/, '')
  if (h === '/about') return 'about'
  if (h === '/contact') return 'contact'
  if (h === '/courses') return 'courses'
  if (h === '/portal') return 'portal'
  return 'home'
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parse(window.location.hash))

  useEffect(() => {
    const onHash = () => {
      const next = parse(window.location.hash)
      setRoute(next)
      // Top-align dedicated pages; let home anchors scroll themselves.
      if (next !== 'home') window.scrollTo({ top: 0, behavior: 'auto' })
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return route
}
