import { Activity } from 'lucide-react'
import { useMemo, useState } from 'react'
import { dateKey, dayLabel, toDate } from '../../../utils/format.js'
import { useLeads } from '../../leads/context/LeadsContext.js'
import { ACTIVITY_LABELS } from '../../leads/utils/leadConstants.js'
import { byNewest } from '../../leads/utils/leadSelectors.js'
import ActivityItem from '../components/ActivityItem.jsx'
import { Card, EmptyState, PageHeader } from '../components/Card.jsx'
import { btnSecondary, control } from '../components/ui.js'
import { useDashboard } from '../hooks/useDashboard.js'

const STEP = 25

export default function ActivityPage() {
  const { activities } = useLeads()
  const { openLead } = useDashboard()
  const [type, setType] = useState('all')
  const [limit, setLimit] = useState(STEP)

  const filtered = useMemo(
    () => activities.filter((item) => type === 'all' || item.type === type).sort(byNewest),
    [activities, type],
  )

  // Group the visible slice by calendar day, newest day first.
  const groups = useMemo(() => {
    const byDay = new Map()
    for (const item of filtered.slice(0, limit)) {
      const key = dateKey(toDate(item.createdAt))
      if (!byDay.has(key)) byDay.set(key, [])
      byDay.get(key).push(item)
    }
    return [...byDay]
  }, [filtered, limit])

  const typesInUse = Object.keys(ACTIVITY_LABELS).filter((key) => activities.some((item) => item.type === key))

  return (
    <>
      <PageHeader
        title="Activity"
        description="A running record of everything that happens to your leads."
        actions={
          <>
            <label htmlFor="activity-type" className="sr-only">
              Filter by activity type
            </label>
            <select
              id="activity-type"
              value={type}
              onChange={(event) => {
                setType(event.target.value)
                setLimit(STEP)
              }}
              className={`${control} w-auto`}
            >
              <option value="all">All activity</option>
              {typesInUse.map((key) => (
                <option key={key} value={key}>
                  {ACTIVITY_LABELS[key]}
                </option>
              ))}
            </select>
          </>
        }
      />

      <Card>
        {filtered.length === 0 ? (
          <EmptyState icon={Activity} title="No activity to show">
            Actions on leads and follow-ups are recorded here as they happen.
          </EmptyState>
        ) : (
          <div className="divide-y divide-slate-100">
            {groups.map(([day, items]) => (
              <section key={day} className="px-5 py-5">
                <h2 className="mb-4 text-xs font-semibold tracking-wider text-slate-500 uppercase">{dayLabel(day)}</h2>
                <ul className="space-y-4">
                  {items.map((activity) => (
                    <ActivityItem key={activity.id} activity={activity} onOpenLead={openLead} timeFormat="time" />
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}

        {filtered.length > limit ? (
          <div className="border-t border-slate-100 p-4 text-center">
            <button type="button" onClick={() => setLimit((value) => value + STEP)} className={btnSecondary}>
              Show older activity ({filtered.length - limit} more)
            </button>
          </div>
        ) : null}
      </Card>
    </>
  )
}
