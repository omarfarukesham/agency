import { Link } from 'react-router-dom'
import { agencyConfig, agencyServices } from '../../../data/agencyContent.js'
import Logo from './Logo.jsx'
import SocialIcon from './SocialIcon.jsx'

const COLUMNS = [
  {
    title: 'Services',
    links: agencyServices.map((service) => ({ to: `/services#${service.id}`, label: service.name })),
  },
  {
    title: 'Company',
    links: [
      { to: '/global-work', label: 'Global Work' },
      { to: '/services', label: 'Services' },
      { to: '/about', label: 'About' },
      { to: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Live demo',
    links: [
      { to: '/demo', label: 'Cleaning business website' },
      { to: '/demo/dashboard', label: 'Lead management dashboard' },
      { to: '/#pricing', label: 'Pricing' },
      { to: '/#faq', label: 'FAQ' },
    ],
  },
]

const YEAR = new Date().getFullYear()

export default function AgencyFooter() {
  return (
    <footer className="bg-navy-950 text-slate-400">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-3 lg:grid-cols-5">
        <div className="md:col-span-3 lg:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed">{agencyConfig.tagline}</p>
          <p className="mt-4 text-sm">Working with clients in {agencyConfig.markets.join(', ')}.</p>
          {agencyConfig.contactEmail ? (
            <a href={`mailto:${agencyConfig.contactEmail}`} className="mt-2 inline-block text-sm font-medium text-white hover:text-blue-300">
              {agencyConfig.contactEmail}
            </a>
          ) : null}
          <ul className="mt-6 flex gap-3" aria-label="Techsphere64 on social media">
            {agencyConfig.social.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${item.label} (opens in a new tab)`}
                  className="flex size-10 items-center justify-center rounded-lg bg-white/5 text-slate-300 ring-1 ring-white/10 transition-colors hover:bg-blue-600 hover:text-white hover:ring-blue-600"
                >
                  <SocialIcon name={item.id} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {COLUMNS.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h2 className="text-sm font-semibold text-white">{column.title}</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {column.links.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs sm:px-8">
          © {YEAR} Techsphere64. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
