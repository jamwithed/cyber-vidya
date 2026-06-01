import { useEffect, useState } from 'react'
import { site, social } from '../data/site'

/* ---- Behold.so JSON feed shapes (minimal subset we use) ---- */
interface BeholdPost {
  id: string
  mediaType?: string
  mediaUrl?: string
  thumbnailUrl?: string
  permalink?: string
  caption?: string
  prunedCaption?: string
  timestamp?: string
  sizes?: {
    small?: { mediaUrl: string }
    medium?: { mediaUrl: string }
    large?: { mediaUrl: string }
  }
}

function postImage(p: BeholdPost): string | undefined {
  // For videos prefer the thumbnail; otherwise use a sensibly sized image.
  if (p.mediaType === 'VIDEO' && p.thumbnailUrl) return p.thumbnailUrl
  return p.sizes?.medium?.mediaUrl || p.sizes?.small?.mediaUrl || p.mediaUrl || p.thumbnailUrl
}

function shortDate(iso?: string): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString(undefined, { day: 'numeric', month: 'short' })
}

function InstagramIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s0-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2Zm0 1.62c-3.15 0-3.52.01-4.76.07-.9.04-1.39.19-1.71.32-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.13.32-.28.81-.32 1.71-.06 1.24-.07 1.61-.07 4.76s.01 3.52.07 4.76c.04.9.19 1.39.32 1.71.17.43.37.74.69 1.06.32.32.63.52 1.06.69.32.13.81.28 1.71.32 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c.9-.04 1.39-.19 1.71-.32.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.13-.32.28-.81.32-1.71.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.04-.9-.19-1.39-.32-1.71a2.86 2.86 0 0 0-.69-1.06 2.86 2.86 0 0 0-1.06-.69c-.32-.13-.81-.28-1.71-.32-1.24-.06-1.61-.07-4.76-.07Zm0 2.76a5.42 5.42 0 1 1 0 10.84 5.42 5.42 0 0 1 0-10.84Zm0 1.62a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6Zm5.6-2.9a1.27 1.27 0 1 1 0 2.54 1.27 1.27 0 0 1 0-2.54Z" />
    </svg>
  )
}

function LinkedinIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}

/* ---- Instagram column ---- */
function InstagramColumn() {
  const [posts, setPosts] = useState<BeholdPost[] | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (!social.beholdFeedId) return
    let alive = true
    fetch(`https://feeds.behold.so/${social.beholdFeedId}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) => {
        if (!alive) return
        const list: BeholdPost[] = Array.isArray(data) ? data : (data.posts ?? [])
        setPosts(list.slice(0, 4))
      })
      .catch(() => alive && setFailed(true))
    return () => {
      alive = false
    }
  }, [])

  const showGrid = social.beholdFeedId && !failed

  return (
    <div className="lg:col-span-2">
      <div className="mb-4 flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient text-midnight">
          <InstagramIcon />
        </span>
        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider">Instagram</h3>
          <a
            href={site.contact.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white/55 hover:text-aqua"
          >
            {site.contact.instagram.handle}
          </a>
        </div>
      </div>

      {showGrid ? (
        posts === null ? (
          // loading skeletons
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-square animate-pulse rounded-xl border border-white/10 bg-white/[0.04]" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <FollowCard kind="instagram" />
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {posts.map((p) => (
                <a
                  key={p.id}
                  href={p.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-midnight-900"
                >
                  <img
                    src={postImage(p)}
                    alt={p.prunedCaption || p.caption || 'Instagram post'}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-midnight/90 via-midnight/10 to-transparent p-3 opacity-0 transition group-hover:opacity-100">
                    <p className="line-clamp-3 text-[11px] leading-snug text-white/90">
                      {p.prunedCaption || p.caption}
                    </p>
                    <span className="mt-1 text-[10px] text-aqua">{shortDate(p.timestamp)}</span>
                  </div>
                </a>
              ))}
            </div>
            <a
              href={site.contact.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 font-display text-xs uppercase tracking-wider text-aqua hover:underline"
            >
              View all on Instagram →
            </a>
          </>
        )
      ) : (
        <FollowCard kind="instagram" />
      )}
    </div>
  )
}

/* ---- LinkedIn column ---- */
function LinkedinColumn() {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0A66C2] text-white">
          <LinkedinIcon />
        </span>
        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider">LinkedIn</h3>
          <a
            href={site.contact.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white/55 hover:text-aqua"
          >
            {site.contact.linkedin.handle}
          </a>
        </div>
      </div>

      <div className="card flex h-full flex-col p-5">
        {social.linkedinFeatured ? (
          <>
            <span className="section-eyebrow">Latest post</span>
            <p className="mt-2 flex-1 text-sm text-white/80">{social.linkedinFeatured.text}</p>
            <a
              href={social.linkedinFeatured.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 font-display text-xs uppercase tracking-wider text-aqua hover:underline"
            >
              Read on LinkedIn →
            </a>
          </>
        ) : (
          <>
            <p className="flex-1 text-sm text-white/70">
              Follow <span className="text-white">Cyber Vidya</span> on LinkedIn for the latest
              updates, openings, batch announcements and security insights.
            </p>
            <a
              href={site.contact.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-4 w-full"
            >
              Follow on LinkedIn
            </a>
          </>
        )}
      </div>
    </div>
  )
}

/* ---- Generic follow card (fallback for IG before a feed is connected) ---- */
function FollowCard({ kind }: { kind: 'instagram' }) {
  return (
    <div className="card flex flex-col items-start p-6">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient text-midnight">
        <InstagramIcon />
      </span>
      <p className="mt-4 text-sm text-white/70">
        See behind-the-scenes, student wins and tips on our Instagram.
      </p>
      <a
        href={site.contact.instagram.url}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary mt-4"
      >
        Follow {site.contact.instagram.handle}
      </a>
      <span className="sr-only">{kind}</span>
    </div>
  )
}

export function SocialFeed() {
  return (
    <section id="social" className="scroll-mt-24 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-10 max-w-2xl">
          <span className="section-eyebrow">// Live feed</span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Latest from Social</h2>
          <p className="mt-3 text-white/65">
            Stay in the loop — fresh posts, announcements and community highlights straight
            from our channels.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <InstagramColumn />
          <LinkedinColumn />
        </div>
      </div>
    </section>
  )
}
