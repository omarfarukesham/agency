export const LEAD_STATUSES = ['New', 'Contacted', 'Quote Sent', 'Follow-up', 'Converted', 'Lost']

/** Tailwind classes and chart colours per status. */
export const STATUS_STYLES = {
  New: { badge: 'bg-blue-50 text-blue-700 ring-blue-200', dot: 'bg-blue-500', color: '#3b82f6' },
  Contacted: { badge: 'bg-amber-50 text-amber-800 ring-amber-200', dot: 'bg-amber-500', color: '#f59e0b' },
  'Quote Sent': { badge: 'bg-violet-50 text-violet-700 ring-violet-200', dot: 'bg-violet-500', color: '#8b5cf6' },
  'Follow-up': { badge: 'bg-orange-50 text-orange-800 ring-orange-200', dot: 'bg-orange-500', color: '#f97316' },
  Converted: { badge: 'bg-emerald-50 text-emerald-700 ring-emerald-200', dot: 'bg-emerald-500', color: '#10b981' },
  Lost: { badge: 'bg-slate-100 text-slate-600 ring-slate-200', dot: 'bg-slate-400', color: '#94a3b8' },
}

export const PROPERTY_TYPES = ['Home', 'Apartment', 'Office', 'Other']

export const PROPERTY_SIZES = [
  'Studio / 1 Bedroom',
  '2 Bedrooms',
  '3 Bedrooms',
  '4+ Bedrooms',
  'Small office (under 1,500 sq ft)',
  'Large office (1,500+ sq ft)',
  'Not sure',
]

export const PREFERRED_TIMES = ['Morning', 'Afternoon', 'Evening', 'Flexible']

export const LEAD_SOURCES = {
  SAMPLE: 'Sample data',
  WEBSITE: 'Website form',
  MANUAL: 'Added manually',
}

export const FOLLOW_UP_STATUS = {
  PENDING: 'Pending',
  COMPLETED: 'Completed',
}

export const ACTIVITY_TYPES = {
  LEAD_CREATED: 'lead_created',
  LEAD_UPDATED: 'lead_updated',
  LEAD_DELETED: 'lead_deleted',
  STATUS_CHANGED: 'status_changed',
  NOTE_ADDED: 'note_added',
  FOLLOW_UP_SCHEDULED: 'follow_up_scheduled',
  FOLLOW_UP_COMPLETED: 'follow_up_completed',
  SIMULATED_MESSAGE: 'simulated_message',
}

export const ACTIVITY_LABELS = {
  lead_created: 'New leads',
  status_changed: 'Status updates',
  note_added: 'Notes',
  follow_up_scheduled: 'Follow-ups scheduled',
  follow_up_completed: 'Follow-ups completed',
  simulated_message: 'Simulated messages',
  lead_updated: 'Lead edits',
  lead_deleted: 'Deleted leads',
}
