import { Link } from 'react-router-dom'
import { useLeads } from '../../leads/context/LeadsContext.js'
import SparkleLogo from './SparkleLogo.jsx'

export default function CleaningFooter() {
  const { services, settings } = useLeads()

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div>
          <SparkleLogo light />
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            A cleaner space. A better day. Residential and commercial cleaning across the Austin area.
          </p>
        </div>

        <nav aria-label="Services">
          <h2 className="text-sm font-bold text-white">Services</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.map((service) => (
              <li key={service.id}>
                <a href="#services" className="hover:text-white">
                  {service.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <h2 className="text-sm font-bold text-white">Company</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a href="#about" className="hover:text-white">
                About
              </a>
            </li>
            <li>
              <a href="#how-it-works" className="hover:text-white">
                How it works
              </a>
            </li>
            <li>
              <a href="#quote" className="hover:text-white">
                Get a free quote
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-bold text-white">Contact</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>{settings.businessPhone}</li>
            <li className="break-all">{settings.businessEmail}</li>
            <li>{settings.businessLocation}</li>
          </ul>
          <p className="mt-3 text-xs text-slate-500">Fictional contact details.</p>
        </div>
      </div>

      <div className="border-t border-slate-800 font-sans">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            SparklePro Cleaning Co. is a fictional business created as a demonstration by{' '}
            <Link to="/" className="font-semibold text-slate-200 hover:text-white">
              Techsphere64
            </Link>
            .
          </p>
          <p className="flex gap-4">
            <Link to="/demo/dashboard" className="hover:text-white">
              Demo dashboard
            </Link>
            <Link to="/portfolio" className="hover:text-white">
              About this demo
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
