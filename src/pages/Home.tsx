import { useEffect, useState } from 'react'
import { Hero } from '../components/Hero'
import { Roadmap } from '../components/Roadmap'
import { TrackComparison } from '../components/TrackComparison'
import { Labs } from '../components/Labs'
import { Estimator } from '../components/Estimator'
import { Testimonials } from '../components/Testimonials'
import { HackerTerminal } from '../components/HackerTerminal'

export function Home() {
  // Lab-open state lives here so the Track Comparison section can deep-link into
  // a specific lab and scroll the Labs section into view.
  const [openLabId, setOpenLabId] = useState<string | null>(null)

  const openLabFromTrack = (labId: string) => {
    setOpenLabId(labId)
    document.getElementById('labs')?.scrollIntoView({ behavior: 'smooth' })
  }

  // If we arrived on Home via a section anchor (e.g. clicking "Roadmap" from the
  // About page), the target element didn't exist at navigation time — scroll now.
  useEffect(() => {
    const id = window.location.hash.replace(/^#\/?/, '')
    if (id) {
      const el = document.getElementById(id)
      if (el) requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth' }))
    }
  }, [])

  return (
    <>
      <Hero />
      <HackerTerminal />
      <Roadmap />
      <TrackComparison onOpenLab={openLabFromTrack} />
      <Labs openLabId={openLabId} onOpenLab={setOpenLabId} />
      <Testimonials />
      <Estimator />
    </>
  )
}
