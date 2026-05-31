import { Logo } from './Logo'
import { site } from '../data/site'

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-midnight-900/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo size={34} />
          <p className="mt-3 max-w-xs text-xs text-white/45">
            {site.tagline}. Practical, hands-on cybersecurity &amp; AI education that
            prepares you for real-world challenges.
          </p>
        </div>

        <div>
          <h4 className="font-display text-xs uppercase tracking-wider text-white/50">Explore</h4>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li><a href="#roadmap" className="hover:text-aqua">Roadmap</a></li>
            <li><a href="#tracks" className="hover:text-aqua">Tracks</a></li>
            <li><a href="#labs" className="hover:text-aqua">Labs &amp; CTF</a></li>
            <li><a href="#testimonials" className="hover:text-aqua">Testimonials</a></li>
            <li><a href="#estimator" className="hover:text-aqua">Estimator</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-xs uppercase tracking-wider text-white/50">Company</h4>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li><a href="#/courses" className="hover:text-aqua">Courses</a></li>
            <li><a href="#/about" className="hover:text-aqua">About Us</a></li>
            <li><a href="#/contact" className="hover:text-aqua">Contact Us</a></li>
            <li><a href={site.contact.instagram.url} target="_blank" rel="noopener noreferrer" className="hover:text-aqua">Instagram</a></li>
            <li><a href={site.contact.linkedin.url} target="_blank" rel="noopener noreferrer" className="hover:text-aqua">LinkedIn</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-xs uppercase tracking-wider text-white/50">Get in touch</h4>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li><a href={`mailto:${site.contact.email}`} className="hover:text-aqua">{site.contact.email}</a></li>
            <li><a href={`tel:${site.contact.phoneHref}`} className="hover:text-aqua">{site.contact.phone}</a></li>
            <li className="text-white/55">{site.contact.address}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-5 text-xs text-white/45 sm:flex-row">
          <p>© {2026} {site.name}. Learn. Defend. Lead.</p>
          <p className="italic">Salary figures are indicative for the Indian market and for educational guidance only.</p>
        </div>
      </div>
    </footer>
  )
}
