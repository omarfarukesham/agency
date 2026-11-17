import { useOutletContext } from 'react-router-dom'

/** Layout-level helpers shared with dashboard pages: `notify(message)`. */
export function useDashboard() {
  return useOutletContext()
}
