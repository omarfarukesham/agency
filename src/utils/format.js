const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/

/** Parses ISO timestamps and plain YYYY-MM-DD strings (as local dates). */
export function toDate(value) {
  if (!value) return null
  if (value instanceof Date) return value
  if (DATE_ONLY.test(value)) {
    const [y, m, d] = value.split('-').map(Number)
    return new Date(y, m - 1, d)
  }
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

/** Local calendar date as YYYY-MM-DD, optionally offset by a number of days. */
export function dateKey(date = new Date(), offsetDays = 0) {
  const d = new Date(date)
  d.setDate(d.getDate() + offsetDays)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function formatDate(value, options = { month: 'short', day: 'numeric', year: 'numeric' }) {
  const date = toDate(value)
  return date ? date.toLocaleDateString('en-US', options) : '—'
}

export function formatShortDate(value) {
  return formatDate(value, { month: 'short', day: 'numeric' })
}

export function formatDateTime(value) {
  const date = toDate(value)
  if (!date) return '—'
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export function formatTime(value) {
  const date = toDate(value)
  return date ? date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) : ''
}

export function timeAgo(value, now = new Date()) {
  const date = toDate(value)
  if (!date) return ''
  const seconds = Math.round((now - date) / 1000)
  if (seconds < 45) return 'just now'
  const minutes = Math.round(seconds / 60)
  if (minutes < 60) return `${minutes} min ago`
  const hours = Math.round(minutes / 60)
  if (hours < 24) return `${hours} hr ago`
  const days = Math.round(hours / 24)
  if (days < 7) return `${days} day${days === 1 ? '' : 's'} ago`
  return formatDate(date)
}

/** "Today", "Yesterday" or a full date, for grouping feeds by day. */
export function dayLabel(value, now = new Date()) {
  const key = dateKey(toDate(value))
  if (key === dateKey(now)) return 'Today'
  if (key === dateKey(now, -1)) return 'Yesterday'
  return formatDate(value, { weekday: 'long', month: 'long', day: 'numeric' })
}

export function initials(name = '') {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}
