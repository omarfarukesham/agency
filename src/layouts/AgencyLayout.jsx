import { Outlet } from 'react-router-dom'
import RouteTracker from '../components/common/RouteTracker.jsx'
import ScrollToTop from '../components/common/ScrollToTop.jsx'
import AgencyFooter from '../features/agency/components/AgencyFooter.jsx'
import AgencyNav from '../features/agency/components/AgencyNav.jsx'

export default function AgencyLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-600">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <ScrollToTop />
      <RouteTracker />
      <AgencyNav />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <AgencyFooter />
    </div>
  )
}
