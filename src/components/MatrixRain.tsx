import { useEffect, useRef } from 'react'

/**
 * Lightweight "Matrix" digital-rain on a canvas, used as a subtle hero
 * background. Brand-colored (cerulean trail, aqua heads), throttled to ~16fps,
 * pauses when the tab is hidden, and disables itself under prefers-reduced-motion.
 */
export function MatrixRain({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const parent = canvas?.parentElement
    if (!canvas || !parent) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const chars = 'アカサタナ0123456789ABCDEF<>/\\{}[]=$#%*'.split('')
    const fontSize = 14
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let cols = 0
    let drops: number[] = []
    let raf = 0
    let last = 0

    const resize = () => {
      const w = parent.clientWidth
      const h = parent.clientHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cols = Math.ceil(w / fontSize)
      drops = Array.from({ length: cols }, () => Math.floor((Math.random() * -h) / fontSize))
      ctx.fillStyle = '#06062e'
      ctx.fillRect(0, 0, w, h)
    }

    const draw = (t: number) => {
      raf = requestAnimationFrame(draw)
      if (t - last < 60) return // ~16 fps
      last = t
      const w = parent.clientWidth
      const h = parent.clientHeight

      // translucent fade creates the trailing tails
      ctx.fillStyle = 'rgba(6,6,46,0.28)'
      ctx.fillRect(0, 0, w, h)
      ctx.font = `${fontSize}px ui-monospace, monospace`

      for (let i = 0; i < cols; i++) {
        const ch = chars[(Math.random() * chars.length) | 0]
        const x = i * fontSize
        const y = drops[i] * fontSize
        ctx.fillStyle = Math.random() > 0.97 ? '#4FFFF2' : '#22A7C8'
        ctx.fillText(ch, x, y)
        if (y > h && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      }
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(parent)

    const onVisibility = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden && !reduce) raf = requestAnimationFrame(draw)
    }
    document.addEventListener('visibilitychange', onVisibility)

    if (!reduce) raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas ref={ref} aria-hidden className={`pointer-events-none ${className}`} />
}
