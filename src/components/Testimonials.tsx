import { testimonials } from '../data/testimonials'

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill={i < rating ? '#4FFFF2' : 'none'}
          stroke={i < rating ? '#4FFFF2' : 'rgba(255,255,255,0.25)'}
          strokeWidth="1.5"
        >
          <path d="M12 2l3 6.5 7 .9-5 4.9 1.2 7-6.4-3.4L5.2 21l1.2-7-5-4.9 7-.9L12 2z" strokeLinejoin="round" />
        </svg>
      ))}
    </div>
  )
}

export function Testimonials() {
  // Hide the whole section until real testimonials are added.
  if (testimonials.length === 0) return null

  return (
    <section id="testimonials" className="scroll-mt-24 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-12 max-w-2xl">
          <span className="section-eyebrow">Success Stories</span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">What our learners say</h2>
          <p className="mt-3 text-white/65">
            Real-world training, real outcomes. Here's what students and professionals
            say about learning with Cyber Vidya.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="card flex flex-col p-6 transition hover:-translate-y-1 hover:border-aqua/40"
            >
              <Stars rating={t.rating} />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-white/80">
                <span className="mr-1 font-display text-2xl leading-none text-aqua/60">“</span>
                {t.quote}
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-gradient font-display text-sm font-bold text-midnight">
                  {t.initials}
                </span>
                <span>
                  <span className="block font-display text-sm font-semibold">{t.name}</span>
                  <span className="block text-xs text-white/55">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
