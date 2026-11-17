import { useEffect, useMemo, useState } from 'react'
import * as leadService from '../services/leadService.js'
import { LeadsContext } from './LeadsContext.js'

/**
 * Exposes the lead database and its actions to both the public cleaning
 * website and the dashboard. Every action writes through leadService and
 * then re-reads, so React state always mirrors what is persisted.
 */
export default function LeadsProvider({ children }) {
  const [db, setDb] = useState(() => leadService.getDatabase())

  // Keep other open tabs in sync (e.g. /demo in one tab, dashboard in another).
  useEffect(() => {
    const onStorage = (event) => {
      if (event.key === null || event.key === leadService.STORAGE_KEY) {
        setDb(leadService.getDatabase())
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const actions = useMemo(() => {
    const sync =
      (method) =>
      (...args) => {
        const result = method(...args)
        setDb(leadService.getDatabase())
        return result
      }
    return {
      createLead: sync(leadService.createLead),
      updateLead: sync(leadService.updateLead),
      deleteLead: sync(leadService.deleteLead),
      updateLeadStatus: sync(leadService.updateLeadStatus),
      addLeadNote: sync(leadService.addLeadNote),
      createFollowUp: sync(leadService.createFollowUp),
      updateFollowUp: sync(leadService.updateFollowUp),
      setFollowUpCompleted: sync(leadService.setFollowUpCompleted),
      deleteFollowUp: sync(leadService.deleteFollowUp),
      updateService: sync(leadService.updateService),
      updateSettings: sync(leadService.updateSettings),
      resetDemoData: sync(leadService.resetDemoData),
    }
  }, [])

  const value = useMemo(
    () => ({
      leads: db.leads,
      followUps: db.followUps,
      activities: db.activities,
      services: db.services,
      settings: db.settings,
      ...actions,
    }),
    [db, actions],
  )

  return <LeadsContext.Provider value={value}>{children}</LeadsContext.Provider>
}
