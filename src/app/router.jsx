import { createBrowserRouter } from 'react-router-dom'
import NotFound from '../components/common/NotFound.jsx'
import AboutPage from '../features/agency/pages/AboutPage.jsx'
import ContactPage from '../features/agency/pages/ContactPage.jsx'
import GlobalWorkPage from '../features/agency/pages/GlobalWorkPage.jsx'
import HomePage from '../features/agency/pages/HomePage.jsx'
import PortfolioPage from '../features/agency/pages/PortfolioPage.jsx'
import ServicesPage from '../features/agency/pages/ServicesPage.jsx'
import CleaningHomePage from '../features/cleaning/pages/CleaningHomePage.jsx'
import ActivityPage from '../features/dashboard/pages/ActivityPage.jsx'
import FollowUpsPage from '../features/dashboard/pages/FollowUpsPage.jsx'
import LeadsPage from '../features/dashboard/pages/LeadsPage.jsx'
import OverviewPage from '../features/dashboard/pages/OverviewPage.jsx'
import ServicesAdminPage from '../features/dashboard/pages/ServicesAdminPage.jsx'
import SettingsPage from '../features/dashboard/pages/SettingsPage.jsx'
import AgencyLayout from '../layouts/AgencyLayout.jsx'
import CleaningLayout from '../layouts/CleaningLayout.jsx'
import DashboardLayout from '../layouts/DashboardLayout.jsx'
import DemoRoot from '../layouts/DemoRoot.jsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AgencyLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'global-work', element: <GlobalWorkPage /> },
      { path: 'services', element: <ServicesPage /> },
      { path: 'portfolio', element: <PortfolioPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: '*', element: <NotFound /> },
    ],
  },
  {
    // The public cleaning site and its dashboard share one lead store.
    path: '/demo',
    element: <DemoRoot />,
    children: [
      {
        element: <CleaningLayout />,
        children: [{ index: true, element: <CleaningHomePage /> }],
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        children: [
          { index: true, element: <OverviewPage /> },
          { path: 'leads', element: <LeadsPage /> },
          { path: 'follow-ups', element: <FollowUpsPage /> },
          { path: 'services', element: <ServicesAdminPage /> },
          { path: 'activity', element: <ActivityPage /> },
          { path: 'settings', element: <SettingsPage /> },
          { path: '*', element: <NotFound homeTo="/demo/dashboard" homeLabel="Back to dashboard" /> },
        ],
      },
    ],
  },
])
