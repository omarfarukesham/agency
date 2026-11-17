import { CircleCheck, FlaskConical } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import ScrollToTop from '../components/common/ScrollToTop.jsx'
import LeadDrawer from '../features/dashboard/components/LeadDrawer.jsx'
import Sidebar from '../features/dashboard/components/Sidebar.jsx'
import Topbar from '../features/dashboard/components/Topbar.jsx'
import { useLeadDrawer } from '../features/dashboard/hooks/useLeadDrawer.js'

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [toast, setToast] = useState(null)
  const timer = useRef(null)
  const { leadId, openLead, closeLead } = useLeadDrawer()
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = 'Lead Dashboard (Demo) — SparklePro Cleaning Co.'
  }, [])

  // Short confirmation message after an action, announced to screen readers.
  const notify = useCallback((message) => {
    window.clearTimeout(timer.current)
    setToast({ message, id: Date.now() })
    timer.current = window.setTimeout(() => setToast(null), 3200)
  }, [])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const context = useMemo(() => ({ notify, openLead }), [notify, openLead])

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-700">
      <ScrollToTop />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-64">
        <Topbar key={pathname} onMenuClick={() => setSidebarOpen(true)} onOpenLead={openLead} />

        <div className="border-b border-teal-100 bg-teal-50 px-4 py-2 text-xs text-teal-900 sm:px-6">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <FlaskConical className="size-3.5 shrink-0" aria-hidden="true" />
            <span>
              <strong>Demo dashboard.</strong> Sample data, stored only in this browser. No emails or SMS are sent.
            </span>
            <Link to="/demo" className="font-semibold underline underline-offset-2 hover:text-teal-700">
              Submit a test enquiry
            </Link>
          </p>
        </div>

        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
          <Outlet context={context} />
        </main>
      </div>

      <LeadDrawer leadId={leadId} onClose={closeLead} notify={notify} />

      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-5 z-[60] flex justify-center px-4">
        {toast ? (
          <p
            key={toast.id}
            className="animate-rise pointer-events-auto flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-xl"
          >
            <CircleCheck className="size-4 text-teal-300" aria-hidden="true" />
            {toast.message}
          </p>
        ) : null}
      </div>
    </div>
  )
}
