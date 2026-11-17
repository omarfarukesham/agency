import { createContext, useContext } from 'react'

export const LeadsContext = createContext(null)

/** Access the shared lead store. Must be used under <LeadsProvider>. */
export function useLeads() {
  const context = useContext(LeadsContext)
  if (!context) throw new Error('useLeads must be used inside <LeadsProvider>')
  return context
}
