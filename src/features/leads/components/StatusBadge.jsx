import { STATUS_STYLES } from '../utils/leadConstants.js'

export default function StatusBadge({ status, className = '' }) {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES.Lost
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${style.badge} ${className}`}
    >
      <span className={`size-1.5 rounded-full ${style.dot}`} aria-hidden="true" />
      {status}
    </span>
  )
}
