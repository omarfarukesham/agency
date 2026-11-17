import {
  ArrowRightLeft,
  CalendarCheck,
  CalendarPlus,
  MailCheck,
  Pencil,
  StickyNote,
  Trash2,
  UserPlus,
} from 'lucide-react'
import { formatTime, timeAgo } from '../../../utils/format.js'

const STYLES = {
  lead_created: { icon: UserPlus, tone: 'bg-blue-50 text-blue-600' },
  status_changed: { icon: ArrowRightLeft, tone: 'bg-violet-50 text-violet-600' },
  note_added: { icon: StickyNote, tone: 'bg-amber-50 text-amber-700' },
  follow_up_scheduled: { icon: CalendarPlus, tone: 'bg-orange-50 text-orange-700' },
  follow_up_completed: { icon: CalendarCheck, tone: 'bg-emerald-50 text-emerald-600' },
  simulated_message: { icon: MailCheck, tone: 'bg-teal-50 text-teal-700' },
  lead_updated: { icon: Pencil, tone: 'bg-slate-100 text-slate-600' },
  lead_deleted: { icon: Trash2, tone: 'bg-red-50 text-red-600' },
}

/**
 * One row in an activity feed or timeline.
 * `onOpenLead` makes the customer name a button; omit it inside the lead drawer.
 */
export default function ActivityItem({ activity, onOpenLead, timeFormat = 'ago', showCustomer = true }) {
  const { icon: Icon, tone } = STYLES[activity.type] ?? STYLES.lead_updated
  const canOpen = onOpenLead && activity.leadId && activity.type !== 'lead_deleted'

  return (
    <li className="flex gap-3">
      <span className={`mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full ${tone}`}>
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm leading-snug break-words text-slate-700">
          {showCustomer && activity.customerName ? (
            canOpen ? (
              <button
                type="button"
                onClick={() => onOpenLead(activity.leadId)}
                className="font-semibold text-slate-900 hover:text-teal-700 hover:underline"
              >
                {activity.customerName}
              </button>
            ) : (
              <span className="font-semibold text-slate-900">{activity.customerName}</span>
            )
          ) : null}
          {showCustomer && activity.customerName ? ' · ' : null}
          {activity.message}
        </p>
        <p className="mt-0.5 text-xs text-slate-400">
          {timeFormat === 'time' ? formatTime(activity.createdAt) : timeAgo(activity.createdAt)}
        </p>
      </div>
    </li>
  )
}
