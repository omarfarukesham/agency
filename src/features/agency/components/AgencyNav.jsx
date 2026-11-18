import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logo from './Logo.jsx'
import { btn } from './buttons.js'

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/global-work', label: 'Global Work' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function AgencyNav() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy-900/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8" aria-label="Main">
        <Link to="/" aria-label="Techsphere64 home" onClick={close}>
          <Logo />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'text-white' : 'text-slate-300 hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/contact" className={`${btn.primary} ml-3 px-4 py-2.5`}>
            Book a Free Consultation
          </Link>
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-white hover:bg-white/10 md:hidden"
          aria-expanded={open}
          aria-controls="agency-mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
        </button>
      </nav>

      {open ? (
        <div id="agency-mobile-menu" className="animate-fade border-t border-white/10 bg-navy-900 px-5 pt-2 pb-6 md:hidden">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={close}
              className={({ isActive }) =>
                `block border-b border-white/10 py-3.5 text-base font-medium ${isActive ? 'text-white' : 'text-slate-300'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/contact" onClick={close} className={`${btn.primary} mt-5 w-full`}>
            Book a Free Consultation
          </Link>
        </div>
      ) : null}
    </header>
  )
}
