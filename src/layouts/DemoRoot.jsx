import { Outlet } from 'react-router-dom'
import LeadsProvider from '../features/leads/context/LeadsProvider.jsx'

/** Wraps the public cleaning site and its dashboard in one shared lead store. */
export default function DemoRoot() {
  return (
    <LeadsProvider>
      <Outlet />
    </LeadsProvider>
  )
}
