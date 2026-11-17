import { CalendarCheck, CalendarClock, Check, Pencil, Plus, RotateCcw, Trash2 } from 'lucide-react'
import { useState } from 'react'
import ConfirmDialog from '../../../components/common/ConfirmDialog.jsx'
import { formatDate } from '../../../utils/format.js'
import { useLeads } from '../../leads/context/LeadsContext.js'
import { FOLLOW_UP_STATUS } from '../../leads/utils/leadConstants.js'
import { isDueToday, isOverdue } from '../../leads/utils/leadSelectors.js'
import { Card, EmptyState, PageHeader } from '../components/Card.jsx'
import FollowUpModal from '../components/FollowUpModal.jsx'
import { btnPrimary, btnSecondary, iconBtn } from '../components/ui.js'
import { useDashboard } from '../hooks/useDashboard.js'

const done = (item) => item.status === FOLLOW_UP_STATUS.COMPLETED

const TABS = [
  { id: 'open', label: 'Open', test: (item) => !done(item) },
  { id: 'overdue', label: 'Overdue', test: (item) => isOverdue(item) },
  { id: 'completed', label: 'Completed', test: done },
  { id: 'all', label: 'All', test: () => true },
]

function FollowUpStatus({ item }) {
  if (done(item)) {
    return <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200 ring-inset">Completed</span>
  }
  if (isOverdue(item)) {
    return <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-700 ring-1 ring-red-200 ring-inset">Overdue</span>
  }
  if (isDueToday(item)) {
    return <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-800 ring-1 ring-amber-200 ring-inset">Due today</span>
  }
  return <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 ring-1 ring-slate-200 ring-inset">Pending</span>
}

export default function FollowUpsPage() {
  const { leads, followUps, setFollowUpCompleted, deleteFollowUp } = useLeads()
  const { notify, openLead } = useDashboard()
  const [tab, setTab] = useState('open')
  const [modal, setModal] = useState(undefined) // undefined: closed, null: new, object: edit
  const [deleting, setDeleting] = useState(null)

  const leadById = new Map(leads.map((lead) => [lead.id, lead]))
  const active = TABS.find((item) => item.id === tab)
  const visible = followUps.filter(active.test).sort((a, b) => {
    if (done(a) !== done(b)) return done(a) ? 1 : -1
    return done(a) ? b.dueDate.localeCompare(a.dueDate) : a.dueDate.localeCompare(b.dueDate)
  })

  return (
    <>
      <PageHeader
        title="Follow-ups"
        description="The calls and messages you have promised to make."
        actions={
          <button type="button" onClick={() => setModal(null)} className={btnPrimary} disabled={leads.length === 0}>
            <Plus className="size-4" aria-hidden="true" />
            New follow-up
          </button>
        }
      />

      <div className="mb-4 flex gap-1 overflow-x-auto rounded-lg border border-slate-200 bg-white p-1 sm:inline-flex" role="group" aria-label="Filter follow-ups">
        {TABS.map((item) => {
          const count = followUps.filter(item.test).length
          const selected = item.id === tab
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              aria-pressed={selected}
              className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors sm:flex-none ${
                selected ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {item.label}
              <span className={`ml-1.5 text-xs tabular-nums ${selected ? 'text-slate-300' : item.id === 'overdue' && count > 0 ? 'text-red-600' : 'text-slate-400'}`}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      <Card>
        {visible.length === 0 ? (
          <EmptyState
            icon={tab === 'overdue' ? CalendarCheck : CalendarClock}
            title={
              tab === 'overdue'
                ? 'Nothing overdue'
                : tab === 'completed'
                  ? 'No completed follow-ups yet'
                  : 'No follow-ups scheduled'
            }
          >
            {tab === 'overdue'
              ? 'You are on top of every follow-up.'
              : 'Schedule a follow-up from a lead, or use “New follow-up”.'}
          </EmptyState>
        ) : (
          <ul className="divide-y divide-slate-100">
            {visible.map((item) => {
              const lead = leadById.get(item.leadId)
              const completed = done(item)
              return (
                <li key={item.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:px-5">
                  <div className="flex min-w-0 flex-1 items-start gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setFollowUpCompleted(item.id, !completed)
                        notify(completed ? 'Follow-up reopened' : 'Follow-up completed')
                      }}
                      aria-label={completed ? `Reopen follow-up: ${item.note}` : `Mark complete: ${item.note}`}
                      className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                        completed
                          ? 'border-emerald-500 bg-emerald-500 text-white'
                          : 'border-slate-300 text-transparent hover:border-teal-600 hover:text-teal-600'
                      }`}
                    >
                      <Check className="size-3.5" aria-hidden="true" />
                    </button>
                    <div className="min-w-0">
                      <p className={`text-sm font-medium break-words ${completed ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
                        {item.note}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {lead ? (
                          <button
                            type="button"
                            onClick={() => openLead(lead.id)}
                            className="font-semibold text-teal-700 hover:underline"
                          >
                            {lead.customerName}
                          </button>
                        ) : (
                          'Deleted lead'
                        )}
                        {lead ? ` · ${lead.id} · ${lead.serviceType}` : null}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 pl-8 sm:justify-end sm:pl-0">
                    <div className="sm:text-right">
                      <p className="text-sm font-medium whitespace-nowrap text-slate-700">{formatDate(item.dueDate)}</p>
                      <div className="mt-1">
                        <FollowUpStatus item={item} />
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {completed ? (
                        <button
                          type="button"
                          onClick={() => {
                            setFollowUpCompleted(item.id, false)
                            notify('Follow-up reopened')
                          }}
                          className={iconBtn}
                          aria-label="Reopen follow-up"
                          title="Reopen"
                        >
                          <RotateCcw className="size-4" aria-hidden="true" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setFollowUpCompleted(item.id, true)
                            notify('Follow-up completed')
                          }}
                          className={`${btnSecondary} px-2.5 py-1.5`}
                        >
                          <Check className="size-4" aria-hidden="true" />
                          Complete
                        </button>
                      )}
                      <button type="button" onClick={() => setModal(item)} className={iconBtn} aria-label="Edit follow-up" title="Edit">
                        <Pencil className="size-4" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleting(item)}
                        className={`${iconBtn} hover:bg-red-50 hover:text-red-600`}
                        aria-label="Delete follow-up"
                        title="Delete"
                      >
                        <Trash2 className="size-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </Card>

      <FollowUpModal open={modal !== undefined} onClose={() => setModal(undefined)} followUp={modal ?? null} onSaved={notify} />
      <ConfirmDialog
        open={Boolean(deleting)}
        title="Delete this follow-up?"
        message={deleting ? `“${deleting.note}” will be removed. This cannot be undone.` : ''}
        confirmLabel="Delete follow-up"
        onCancel={() => setDeleting(null)}
        onConfirm={() => {
          deleteFollowUp(deleting.id)
          notify('Follow-up deleted')
          setDeleting(null)
        }}
      />
    </>
  )
}
