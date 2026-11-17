import { useMemo, useState } from 'react'
import Field from '../../../components/common/Field.jsx'
import Modal from '../../../components/common/Modal.jsx'
import { useForm } from '../../../hooks/useForm.js'
import { dateKey } from '../../../utils/format.js'
import { createValidator, required } from '../../../utils/validators.js'
import { useLeads } from '../../leads/context/LeadsContext.js'
import { btnPrimary, btnSecondary, control } from './ui.js'

const validate = createValidator({
  leadId: [required('Choose the lead this follow-up is for')],
  dueDate: [required('Choose a follow-up date')],
  note: [required('Add a short note about what to do')],
})

function FollowUpForm({ followUp, leadId, onClose, onSaved }) {
  const { leads, createFollowUp, updateFollowUp } = useLeads()
  const editing = Boolean(followUp)
  const lockedLead = editing || Boolean(leadId)
  const [defaultDueDate] = useState(() => dateKey(new Date(), 2))

  const sortedLeads = useMemo(
    () => [...leads].sort((a, b) => a.customerName.localeCompare(b.customerName)),
    [leads],
  )

  const form = useForm({
    initialValues: {
      leadId: followUp?.leadId ?? leadId ?? '',
      dueDate: followUp?.dueDate ?? defaultDueDate,
      note: followUp?.note ?? '',
    },
    validate,
    onSubmit: (values) => {
      if (editing) updateFollowUp(followUp.id, { dueDate: values.dueDate, note: values.note })
      else createFollowUp(values)
      onSaved?.(editing ? 'Follow-up updated' : 'Follow-up scheduled')
      onClose()
    },
  })
  const { field, errorFor } = form

  return (
    <form onSubmit={form.handleSubmit} noValidate className="space-y-4">
      <Field label="Lead" htmlFor="leadId" required error={errorFor('leadId')}>
        <select {...field('leadId')} disabled={lockedLead} className={`${control} disabled:bg-slate-50 disabled:text-slate-500`}>
          <option value="">Select a lead</option>
          {sortedLeads.map((lead) => (
            <option key={lead.id} value={lead.id}>
              {lead.customerName} · {lead.id}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Follow-up date" htmlFor="dueDate" required error={errorFor('dueDate')}>
        <input {...field('dueDate')} type="date" className={control} />
      </Field>

      <Field label="Follow-up note" htmlFor="note" required error={errorFor('note')}>
        <textarea {...field('note')} rows={3} placeholder="e.g. Call to confirm the quote" className={control} />
      </Field>

      <div className="flex justify-end gap-2 pt-2">
        <button type="button" onClick={onClose} className={btnSecondary}>
          Cancel
        </button>
        <button type="submit" className={btnPrimary}>
          {editing ? 'Save changes' : 'Schedule follow-up'}
        </button>
      </div>
    </form>
  )
}

/** Create a follow-up (optionally for a fixed lead) or edit an existing one. */
export default function FollowUpModal({ open, onClose, followUp = null, leadId = null, onSaved }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={followUp ? 'Edit follow-up' : 'Schedule a follow-up'}
      description={followUp ? undefined : 'Open leads move to the “Follow-up” status.'}
      size="sm"
    >
      {/* Mounted only while open so the form always starts from fresh values. */}
      <FollowUpForm followUp={followUp} leadId={leadId} onClose={onClose} onSaved={onSaved} />
    </Modal>
  )
}
