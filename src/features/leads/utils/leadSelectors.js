import { dateKey, toDate } from '../../../utils/format.js'
import { FOLLOW_UP_STATUS, LEAD_STATUSES } from './leadConstants.js'

export const byNewest = (a, b) => new Date(b.createdAt) - new Date(a.createdAt)

export function countByStatus(leads) {
  const counts = Object.fromEntries(LEAD_STATUSES.map((status) => [status, 0]))
  for (const lead of leads) counts[lead.status] = (counts[lead.status] ?? 0) + 1
  return counts
}

export function countByService(leads, services) {
  return services.map((service) => ({
    name: service.shortName ?? service.name,
    fullName: service.name,
    leads: leads.filter((lead) => lead.serviceType === service.name).length,
  }))
}

/** Daily lead counts for the last `days` days, oldest first. */
export function leadsPerDay(leads, days = 14, now = new Date()) {
  const buckets = new Map()
  for (let i = days - 1; i >= 0; i -= 1) buckets.set(dateKey(now, -i), 0)
  for (const lead of leads) {
    const key = dateKey(toDate(lead.createdAt))
    if (buckets.has(key)) buckets.set(key, buckets.get(key) + 1)
  }
  return [...buckets].map(([date, count]) => ({
    date,
    label: toDate(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    leads: count,
  }))
}

export function isOverdue(followUp, now = new Date()) {
  return followUp.status === FOLLOW_UP_STATUS.PENDING && followUp.dueDate < dateKey(now)
}

export function isDueToday(followUp, now = new Date()) {
  return followUp.status === FOLLOW_UP_STATUS.PENDING && followUp.dueDate === dateKey(now)
}

/** Pending follow-ups, soonest (and overdue) first. */
export function pendingFollowUps(followUps) {
  return followUps
    .filter((item) => item.status === FOLLOW_UP_STATUS.PENDING)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
}

export function matchesLeadSearch(lead, query) {
  const q = query.trim().toLowerCase()
  if (!q) return true
  const digits = q.replace(/\D/g, '')
  return (
    lead.customerName.toLowerCase().includes(q) ||
    lead.email.toLowerCase().includes(q) ||
    lead.id.toLowerCase().includes(q) ||
    (digits.length >= 3 && lead.phone.replace(/\D/g, '').includes(digits))
  )
}
