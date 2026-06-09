import { useEffect, useState } from 'react'

export type Route = 'home' | 'about' | 'contact' | 'courses' | 'portal' | 'learn'

/**
 * Minimal, dependency-free hash router.
 *
 * - `#/about`        → About page
 * - `#/contact`      → Contact page
 * - `#/learn/<id>`   → Learn page (self-paced course player for course <id>)
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
  if (h === '/learn' || h.startsWith('/learn/')) return 'learn'
  return 'home'
}

/** Extract the course id from a `#/learn/<courseId>` hash (empty if none). */
export function learnCourseId(hash: string): string {
  const h = hash.replace(/^#/, '')
  if (!h.startsWith('/learn/')) return ''
  return decodeURIComponent(h.slice('/learn/'.length).split('/')[0] ?? '')
}

/**
 * Reactive full-hash subscription. Needed by the Learn page because the route
 * name stays `learn` while the course id changes — useRoute() alone would not
 * re-render on `#/learn/a` → `#/learn/b`.
 */
export function useHash(): string {
  const [hash, setHash] = useState<string>(() => window.location.hash)
  useEffect(() => {
    const onHash = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  return hash
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
