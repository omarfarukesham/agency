import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

/**
 * The lead detail drawer is driven by the `?lead=LEAD-1001` URL parameter,
 * so it can be opened from any dashboard page and survives a refresh.
 */
export function useLeadDrawer() {
  const [params, setParams] = useSearchParams()
  const leadId = params.get('lead')

  const openLead = useCallback(
    (id) => {
      setParams((prev) => {
        const next = new URLSearchParams(prev)
        next.set('lead', id)
        return next
      })
    },
    [setParams],
  )

  const closeLead = useCallback(() => {
    setParams((prev) => {
      const next = new URLSearchParams(prev)
      next.delete('lead')
      return next
    })
  }, [setParams])

  return { leadId, openLead, closeLead }
}
