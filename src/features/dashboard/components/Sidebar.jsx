import {
  Activity,
  ArrowUpRight,
  CalendarClock,
  Globe,
  LayoutDashboard,
  Settings,
  Sparkles,
  Tags,
  Users,
  X,
} from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { useLeads } from '../../leads/context/LeadsContext.js'
import { isOverdue } from '../../leads/utils/leadSelectors.js'

const NAV = [
  { to: '/demo/dashboard', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/demo/dashboard/leads', label: 'Leads', icon: Users, badge: 'new' },
  { to: '/demo/dashboard/follow-ups', label: 'Follow-ups', icon: CalendarClock, badge: 'overdue' },
  { to: '/demo/dashboard/services', label: 'Services', icon: Tags },
  { to: '/demo/dashboard/activity', label: 'Activity', icon: Activity },
  { to: '/demo/dashboard/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar({ open, onClose }) {
  const { leads, followUps, settings } = useLeads()
  const badges = {
    new: leads.filter((lead) => lead.status === 'New').length,
    overdue: followUps.filter((item) => isOverdue(item)).length,
  }

  return (
    <>
      {open ? <div className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden" onClick={onClose} aria-hidden="true" /> : null}

      <aside
        id="dashboard-sidebar"
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-slate-900 text-slate-300 transition-transform duration-200 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between gap-2 border-b border-white/10 px-5">
          <Link to="/demo/dashboard" onClick={onClose} className="flex min-w-0 items-center gap-2.5">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-teal-500 text-slate-950">
              <Sparkles className="size-4.5" aria-hidden="true" />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-sm font-semibold text-white">{settings.businessName}</span>
              <span className="block text-[11px] text-slate-400">Lead dashboard · Demo</span>
            </span>
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-slate-400 hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Close navigation"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Dashboard">
          <ul className="space-y-1">
            {NAV.map(({ to, label, icon: Icon, end, badge }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive ? 'bg-white/10 text-white' : 'hover:bg-white/5 hover:text-white'
                    }`
                  }
                >
                  <Icon className="size-4.5 shrink-0" aria-hidden="true" />
                  <span className="flex-1">{label}</span>
                  {badge && badges[badge] > 0 ? (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                        badge === 'overdue' ? 'bg-red-500/20 text-red-300' : 'bg-teal-500/20 text-teal-300'
                      }`}
                    >
                      {badges[badge]}
                      <span className="sr-only">{badge === 'overdue' ? ' overdue' : ' new'}</span>
                    </span>
                  ) : null}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-1 border-t border-white/10 px-3 py-4">
          <Link
            to="/demo"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-white/5 hover:text-white"
          >
            <Globe className="size-4.5 shrink-0" aria-hidden="true" />
            Back to Public Website
          </Link>
          <Link
            to="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-white/5 hover:text-white"
          >
            <ArrowUpRight className="size-4.5 shrink-0" aria-hidden="true" />
            Built by Techsphere64
          </Link>
        </div>
      </aside>
    </>
  )
}
