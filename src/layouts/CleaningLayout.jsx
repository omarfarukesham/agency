import { Outlet } from 'react-router-dom'
import ScrollToTop from '../components/common/ScrollToTop.jsx'
import CleaningFooter from '../features/cleaning/components/CleaningFooter.jsx'
import CleaningNav from '../features/cleaning/components/CleaningNav.jsx'
import DemoRibbon from '../features/cleaning/components/DemoRibbon.jsx'

export default function CleaningLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-friendly text-slate-600">
      <ScrollToTop />
      <DemoRibbon />
      <CleaningNav />
      <main id="top" className="flex-1">
        <Outlet />
      </main>
      <CleaningFooter />
    </div>
  )
}
