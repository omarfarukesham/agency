import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Reveal from '../../../components/common/Reveal.jsx'
import { globalMarkets, globalWorkStats } from '../../../data/globalWorkContent.js'
import Flag from './Flag.jsx'
import { Container } from './ui.jsx'

const listCountries = (names) => names.join(', ').replace(/, ([^,]*)$/, ' and $1')

/** Stats card that overlaps the bottom edge of the home hero. */
export function GlobalHeroStats({ className = '' }) {
  return (
    <div className={`relative z-20 ${className}`}>
      <Container>
        <Reveal className="overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 shadow-navy-950/15 ring-slate-200">
          <dl className="grid grid-cols-2 gap-px bg-slate-200 lg:grid-cols-4">
            {globalWorkStats.map((stat) => (
              <div key={stat.label} className="flex flex-col bg-white px-5 py-6 sm:px-7 sm:py-8">
                <dt className="order-2 mt-2 text-sm font-semibold text-navy-900 sm:text-base">{stat.label}</dt>
                <dd className="order-1 font-display text-4xl leading-none font-semibold tracking-tight text-navy-900 sm:text-5xl">
                  {stat.value}
                  <span className="text-blue-600">.</span>
                </dd>
                <dd className="order-3 mt-1.5 flex items-start gap-1.5 text-xs leading-snug text-slate-500 sm:text-[13px]">
                  {stat.flag ? <Flag code={stat.flag} className="mt-px h-3 w-4.5 rounded-xs" /> : null}
                  {stat.context}
                </dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-col gap-4 border-t border-slate-200 bg-slate-50 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div className="flex items-center gap-4">
              <ul className="flex shrink-0 -space-x-2" aria-hidden="true">
                {globalMarkets.map((market) => (
                  <li key={market.code}>
                    <Flag
                      code={market.code}
                      className="size-8 rounded-full ring-2 ring-white sm:size-9"
                    />
                  </li>
                ))}
              </ul>
              <p className="text-sm leading-snug text-slate-600">
                <span className="font-semibold text-navy-900">Happy founders in {globalMarkets.length} countries</span>
                <span className="block">{listCountries(globalMarkets.map((market) => market.country))}</span>
              </p>
            </div>
            <Link
              to="/global-work"
              className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              See our global work
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </Container>
    </div>
  )
}
