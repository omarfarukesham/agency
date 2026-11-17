import { Bell, Menu, Search } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useLeads } from '../../leads/context/LeadsContext.js'
import { byNewest } from '../../leads/utils/leadSelectors.js'
import ActivityItem from './ActivityItem.jsx'

const TITLES = {
  '/demo/dashboard': 'Overview',
  '/demo/dashboard/leads': 'Leads',
  '/demo/dashboard/follow-ups': 'Follow-ups',
  '/demo/dashboard/services': 'Services',
  '/demo/dashboard/activity': 'Activity',
  '/demo/dashboard/settings': 'Settings',
}

function Notifications({ onOpenLead }) {
  const { leads, activities } = useLeads()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const newCount = leads.filter((lead) => lead.status === 'New').length
  const recent = [...activities].sort(byNewest).slice(0, 5)

  useEffect(() => {
    if (!open) return undefined
    const onPointerDown = (event) => {
      if (!ref.current?.contains(event.target)) setOpen(false)
    }
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={`Notifications, ${newCount} new lead${newCount === 1 ? '' : 's'}`}
        className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
      >
        <Bell className="size-5" aria-hidden="true" />
        {newCount > 0 ? (
          <span className="absolute top-1 right-1 flex min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] leading-4 font-bold text-white">
            {newCount}
          </span>
        ) : null}
      </button>

      {open ? (
        <div className="animate-fade absolute right-0 z-30 mt-2 w-[min(22rem,calc(100vw-2rem))] rounded-xl border border-slate-200 bg-white shadow-xl">
          <div className="border-b border-slate-100 px-4 py-3">
            <p className="text-sm font-semibold text-slate-900">Notifications</p>
            <p className="text-xs text-slate-500">
              {newCount > 0
                ? `${newCount} new lead${newCount === 1 ? '' : 's'} waiting for a reply`
                : 'No new leads waiting'}
            </p>
          </div>
          <ul className="max-h-80 space-y-4 overflow-y-auto px-4 py-4">
            {recent.map((activity) => (
              <ActivityItem
                key={activity.id}
                activity={activity}
                onOpenLead={(id) => {
                  setOpen(false)
                  onOpenLead(id)
                }}
              />
            ))}
          </ul>
          <Link
            to="/demo/dashboard/activity"
            onClick={() => setOpen(false)}
            className="block rounded-b-xl border-t border-slate-100 px-4 py-3 text-center text-sm font-semibold text-teal-700 hover:bg-slate-50"
          >
            View all activity
          </Link>
        </div>
      ) : null}
    </div>
  )
}

export default function Topbar({ onMenuClick, onOpenLead }) {
  const { settings } = useLeads()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const onLeadsPage = pathname === '/demo/dashboard/leads'
  const [query, setQuery] = useState(onLeadsPage ? (params.get('q') ?? '') : '')

  const title = TITLES[pathname.replace(/\/$/, '')] ?? 'Dashboard'

  const submitSearch = (event) => {
    event.preventDefault()
    const q = query.trim()
    // searchId makes a repeated search for the same text restart the list too.
    navigate(q ? `/demo/dashboard/leads?q=${encodeURIComponent(q)}` : '/demo/dashboard/leads', {
      state: { searchId: Date.now() },
    })
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-200 bg-white px-4 sm:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        className="-ml-1.5 rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
        aria-label="Open navigation"
        aria-controls="dashboard-sidebar"
      >
        <Menu className="size-5" aria-hidden="true" />
      </button>

      <p className="hidden text-base font-semibold text-slate-900 sm:block lg:w-40">{title}</p>

      <form onSubmit={submitSearch} role="search" className="relative min-w-0 flex-1 sm:max-w-sm">
        <label htmlFor="global-search" className="sr-only">
          Search leads by name, email or phone
        </label>
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
        <input
          id="global-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search leads…"
          className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pr-3 pl-9 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-100 focus:outline-none"
        />
      </form>

      <div className="ml-auto flex items-center gap-1 sm:gap-3">
        <Notifications onOpenLead={onOpenLead} />
        <div className="flex items-center gap-2.5 border-l border-slate-200 pl-3 sm:pl-4">
          <span className="flex size-9 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
            DA
          </span>
          <span className="hidden leading-tight md:block">
            <span className="block text-sm font-semibold text-slate-900">Demo Admin</span>
            <span className="block max-w-40 truncate text-xs text-slate-500">{settings.businessName}</span>
          </span>
        </div>
      </div>
    </header>
  )
}
