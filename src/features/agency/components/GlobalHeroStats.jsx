import { Link } from 'react-router-dom'
import Reveal from '../../../components/common/Reveal.jsx'
import { globalMarkets, globalWorkStats } from '../../../data/globalWorkContent.js'
import { Container } from './ui.jsx'

export function GlobalHeroStats({ className = '' }) {
  return (
    <div className={`relative z-20 ${className}`}>
      <Container>
        <Reveal className="overflow-hidden rounded-2xl border border-white/10 bg-navy-900/95 p-6 shadow-2xl shadow-navy-950/40 backdrop-blur-md sm:p-8">
          {/* Top row: Stats Grid */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {globalWorkStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-white/5 bg-white/[0.03] p-4 text-center transition-colors hover:border-blue-500/30 hover:bg-white/[0.06] sm:p-5"
              >
                <p className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">{stat.value}</p>
                <p className="mt-1 text-xs font-medium text-slate-300 sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Bottom row: Happy Working Partners with Flag & Country pills */}
          <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-5 lg:flex-row">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-slate-300 uppercase">
              <span className="size-2 rounded-full bg-emerald-400" />
              <span>Happy Working Partners</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {globalMarkets.map((m) => (
                <Link
                  key={m.code}
                  to="/global-work"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:border-blue-400/50 hover:bg-white/10 hover:text-white"
                >
                  <span className="text-base leading-none" role="img" aria-label={m.country}>
                    {m.flag}
                  </span>
                  <span>{m.country}</span>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </div>
  )
}
