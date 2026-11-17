import {
  CalendarPlus,
  Check,
  CircleCheck,
  CircleX,
  FileText,
  Mail,
  MapPin,
  Pencil,
  Phone,
  PhoneCall,
  SearchX,
  Trash2,
} from 'lucide-react'
import { useState } from 'react'
import ConfirmDialog from '../../../components/common/ConfirmDialog.jsx'
import Modal from '../../../components/common/Modal.jsx'
import { formatDate, formatDateTime, initials } from '../../../utils/format.js'
import StatusBadge from '../../leads/components/StatusBadge.jsx'
import { useLeads } from '../../leads/context/LeadsContext.js'
import { FOLLOW_UP_STATUS, LEAD_SOURCES, LEAD_STATUSES } from '../../leads/utils/leadConstants.js'
import { byNewest, isOverdue } from '../../leads/utils/leadSelectors.js'
import ActivityItem from './ActivityItem.jsx'
import { EmptyState } from './Card.jsx'
import FollowUpModal from './FollowUpModal.jsx'
import LeadFormModal from './LeadFormModal.jsx'
import { btnDanger, btnPrimary, btnSecondary, control } from './ui.js'

function Section({ title, children, action }) {
  return (
    <section className="border-t border-slate-100 py-5">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="text-xs font-semibold tracking-wider text-slate-500 uppercase">{title}</h3>
        {action}
      </div>
      {children}
    </section>
  )
}

function Detail({ label, children }) {
  return (
    <div className="min-w-0">
      <dt className="text-xs text-slate-500">{label}</dt>
      <dd className="mt-0.5 text-sm font-medium break-words text-slate-900">{children || '—'}</dd>
    </div>
  )
}

function NoteForm({ onAdd }) {
  const [text, setText] = useState('')
  const [error, setError] = useState('')

  const submit = (event) => {
    event.preventDefault()
    if (!text.trim()) {
      setError('Write a note before saving')
      return
    }
    onAdd(text)
    setText('')
    setError('')
  }

  return (
    <form onSubmit={submit} noValidate>
      <label htmlFor="new-note" className="sr-only">
        Add an internal note
      </label>
      <textarea
        id="new-note"
        rows={2}
        value={text}
        onChange={(event) => {
          setText(event.target.value)
          if (error) setError('')
        }}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? 'new-note-error' : undefined}
        placeholder="Add an internal note (only visible to your team)…"
        className={control}
      />
      {error ? (
        <p id="new-note-error" role="alert" className="mt-1 text-xs font-medium text-red-600">
          {error}
        </p>
      ) : null}
      <div className="mt-2 flex justify-end">
        <button type="submit" className={btnSecondary}>
          Add note
        </button>
      </div>
    </form>
  )
}

function LeadDetails({ lead, onClose, notify }) {
  const { activities, followUps, updateLeadStatus, addLeadNote, deleteLead, setFollowUpCompleted } = useLeads()
  const [editing, setEditing] = useState(false)
  const [scheduling, setScheduling] = useState(false)
  const [confirmingDelete, setConfirmingDelete] = useState(false)

  const timeline = activities.filter((item) => item.leadId === lead.id).sort(byNewest)
  const leadFollowUps = followUps
    .filter((item) => item.leadId === lead.id)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
  const notes = [...lead.notes].sort(byNewest)

  const setStatus = (status) => {
    if (status === lead.status) return
    updateLeadStatus(lead.id, status)
    notify(`${lead.customerName} marked as ${status}`)
  }

  const quickActions = [
    { status: 'Contacted', label: 'Mark as Contacted', icon: PhoneCall },
    { status: 'Quote Sent', label: 'Mark as Quote Sent', icon: FileText },
    { status: 'Converted', label: 'Mark as Converted', icon: CircleCheck },
    { status: 'Lost', label: 'Mark as Lost', icon: CircleX },
  ]

  return (
    <>
      <div className="flex items-start gap-4 pb-5">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-teal-50 text-sm font-semibold text-teal-800">
          {initials(lead.customerName)}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-lg font-semibold text-slate-900">{lead.customerName}</p>
          <p className="text-sm text-slate-500">Submitted {formatDateTime(lead.createdAt)}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <StatusBadge status={lead.status} />
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${
                lead.source === LEAD_SOURCES.SAMPLE
                  ? 'bg-slate-50 text-slate-600 ring-slate-200'
                  : 'bg-teal-50 text-teal-800 ring-teal-200'
              }`}
            >
              {lead.source}
            </span>
          </div>
        </div>
      </div>

      <Section title="Status and quick actions">
        <label htmlFor="drawer-status" className="sr-only">
          Lead status
        </label>
        <select
          id="drawer-status"
          value={lead.status}
          onChange={(event) => setStatus(event.target.value)}
          className={`${control} sm:max-w-56`}
        >
          {LEAD_STATUSES.map((status) => (
            <option key={status}>{status}</option>
          ))}
        </select>
        <div className="mt-3 flex flex-wrap gap-2">
          {quickActions.map(({ status, label, icon: Icon }) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatus(status)}
              disabled={lead.status === status}
              className={btnSecondary}
            >
              <Icon className="size-4" aria-hidden="true" />
              {label}
            </button>
          ))}
          <button type="button" onClick={() => setScheduling(true)} className={btnPrimary}>
            <CalendarPlus className="size-4" aria-hidden="true" />
            Schedule Follow-up
          </button>
        </div>
      </Section>

      <Section title="Contact">
        <ul className="space-y-2.5 text-sm">
          <li className="flex items-center gap-2.5">
            <Mail className="size-4 shrink-0 text-slate-400" aria-hidden="true" />
            <a href={`mailto:${lead.email}`} className="font-medium break-all text-teal-700 hover:underline">
              {lead.email}
            </a>
          </li>
          <li className="flex items-center gap-2.5">
            <Phone className="size-4 shrink-0 text-slate-400" aria-hidden="true" />
            <a href={`tel:${lead.phone.replace(/[^\d+]/g, '')}`} className="font-medium text-teal-700 hover:underline">
              {lead.phone}
            </a>
          </li>
          <li className="flex items-center gap-2.5">
            <MapPin className="size-4 shrink-0 text-slate-400" aria-hidden="true" />
            <span className="font-medium text-slate-900">{lead.address || '—'}</span>
          </li>
        </ul>
      </Section>

      <Section title="Request">
        <dl className="grid grid-cols-2 gap-x-4 gap-y-4">
          <Detail label="Requested service">{lead.serviceType}</Detail>
          <Detail label="Property type">{lead.propertyType}</Detail>
          <Detail label="Property size">{lead.propertySize}</Detail>
          <Detail label="Preferred schedule">
            {lead.preferredDate ? formatDate(lead.preferredDate) : null}
            {lead.preferredDate && lead.preferredTime ? ' · ' : null}
            {lead.preferredTime}
          </Detail>
        </dl>
        <div className="mt-4">
          <p className="text-xs text-slate-500">Customer message</p>
          <p className="mt-1 rounded-lg bg-slate-50 px-3.5 py-3 text-sm leading-relaxed text-slate-700">
            {lead.message || 'No message provided.'}
          </p>
        </div>
      </Section>

      <Section title={`Follow-ups (${leadFollowUps.length})`}>
        {leadFollowUps.length === 0 ? (
          <p className="text-sm text-slate-500">No follow-ups scheduled for this lead yet.</p>
        ) : (
          <ul className="space-y-2">
            {leadFollowUps.map((item) => {
              const done = item.status === FOLLOW_UP_STATUS.COMPLETED
              return (
                <li key={item.id} className="flex items-start gap-3 rounded-lg border border-slate-200 px-3.5 py-3">
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm font-medium ${done ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
                      {item.note}
                    </p>
                    <p className={`mt-0.5 text-xs ${isOverdue(item) ? 'font-semibold text-red-600' : 'text-slate-500'}`}>
                      {done ? 'Completed' : isOverdue(item) ? 'Overdue' : 'Due'} · {formatDate(item.dueDate)}
                    </p>
                  </div>
                  {done ? null : (
                    <button
                      type="button"
                      onClick={() => {
                        setFollowUpCompleted(item.id, true)
                        notify('Follow-up completed')
                      }}
                      className={btnSecondary}
                    >
                      <Check className="size-4" aria-hidden="true" />
                      Complete
                    </button>
                  )}
                </li>
              )
            })}
          </ul>
        )}
      </Section>

      <Section title={`Internal notes (${notes.length})`}>
        <NoteForm
          onAdd={(text) => {
            addLeadNote(lead.id, text)
            notify('Note added')
          }}
        />
        {notes.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {notes.map((note) => (
              <li key={note.id} className="rounded-lg border border-amber-200 bg-amber-50/60 px-3.5 py-3">
                <p className="text-sm leading-relaxed break-words whitespace-pre-wrap text-slate-800">{note.text}</p>
                <p className="mt-1 text-xs text-slate-500">Demo Admin · {formatDateTime(note.createdAt)}</p>
              </li>
            ))}
          </ul>
        ) : null}
      </Section>

      <Section title="Activity timeline">
        <ul className="space-y-4">
          {timeline.map((activity) => (
            <ActivityItem key={activity.id} activity={activity} showCustomer={false} />
          ))}
        </ul>
      </Section>

      <div className="flex flex-wrap justify-between gap-2 border-t border-slate-100 pt-5">
        <button type="button" onClick={() => setConfirmingDelete(true)} className={btnDanger}>
          <Trash2 className="size-4" aria-hidden="true" />
          Delete lead
        </button>
        <button type="button" onClick={() => setEditing(true)} className={btnSecondary}>
          <Pencil className="size-4" aria-hidden="true" />
          Edit lead
        </button>
      </div>

      <LeadFormModal open={editing} onClose={() => setEditing(false)} lead={lead} onSaved={notify} />
      <FollowUpModal open={scheduling} onClose={() => setScheduling(false)} leadId={lead.id} onSaved={notify} />
      <ConfirmDialog
        open={confirmingDelete}
        title="Delete this lead?"
        message={`${lead.customerName} (${lead.id}) and any follow-ups will be permanently removed. This cannot be undone.`}
        confirmLabel="Delete lead"
        onCancel={() => setConfirmingDelete(false)}
        onConfirm={() => {
          setConfirmingDelete(false)
          deleteLead(lead.id)
          notify(`${lead.customerName} deleted`)
          onClose()
        }}
      />
    </>
  )
}

/** Slide-over with everything about one lead. Open state lives in the URL. */
export default function LeadDrawer({ leadId, onClose, notify }) {
  const { leads } = useLeads()
  const lead = leadId ? leads.find((item) => item.id === leadId) : null

  return (
    <Modal
      open={Boolean(leadId)}
      onClose={onClose}
      variant="drawer"
      title="Lead details"
      description={leadId ?? undefined}
    >
      {lead ? (
        <LeadDetails key={lead.id} lead={lead} onClose={onClose} notify={notify} />
      ) : (
        <EmptyState icon={SearchX} title="Lead not found">
          {leadId} may have been deleted, or the demo data was reset.
        </EmptyState>
      )}
    </Modal>
  )
}
