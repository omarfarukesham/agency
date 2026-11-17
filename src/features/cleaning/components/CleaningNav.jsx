import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import SparkleLogo from './SparkleLogo.jsx'

const LINKS = [
  { href: '#top', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About' },
  { href: '#quote', label: 'Contact' },
]

export default function CleaningNav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-sky-100 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex h-18 max-w-6xl items-center justify-between px-4 sm:px-6" aria-label="SparklePro">
        <a href="#top" aria-label="SparklePro Cleaning Co. home">
          <SparkleLogo />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-semibold text-slate-600 hover:text-teal-700">
              {link.label}
            </a>
          ))}
          <a
            href="#quote"
            className="rounded-full bg-teal-700 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-teal-800"
          >
            Get a Free Quote
          </a>
        </div>

        <button
          type="button"
          className="rounded-xl p-2 text-slate-700 hover:bg-sky-50 md:hidden"
          aria-expanded={open}
          aria-controls="cleaning-mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
        </button>
      </nav>

      {open ? (
        <div id="cleaning-mobile-menu" className="border-t border-sky-100 bg-white px-4 pt-2 pb-5 md:hidden">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-3 py-3 text-base font-semibold text-slate-700 hover:bg-sky-50"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#quote"
            onClick={() => setOpen(false)}
            className="mt-3 block rounded-full bg-teal-700 px-5 py-3 text-center text-base font-bold text-white"
          >
            Get a Free Quote
          </a>
        </div>
      ) : null}
    </header>
  )
}
