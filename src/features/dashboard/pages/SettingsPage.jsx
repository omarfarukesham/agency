import { RotateCcw } from 'lucide-react'
import { useState } from 'react'
import ConfirmDialog from '../../../components/common/ConfirmDialog.jsx'
import Field from '../../../components/common/Field.jsx'
import { useForm } from '../../../hooks/useForm.js'
import { createValidator, email, phone, required } from '../../../utils/validators.js'
import { useLeads } from '../../leads/context/LeadsContext.js'
import { Card, CardHeader, PageHeader } from '../components/Card.jsx'
import { btnDanger, btnPrimary, control } from '../components/ui.js'
import { useDashboard } from '../hooks/useDashboard.js'

const validate = createValidator({
  businessName: [required('Enter your business name')],
  businessEmail: [required('Enter a business email'), email()],
  businessPhone: [required('Enter a business phone number'), phone()],
  businessLocation: [required('Enter your location')],
})

const NOTIFICATIONS = [
  { key: 'emailOnNewLead', label: 'Email me when a new lead arrives', hint: 'Sent to your business email.' },
  { key: 'smsOnNewLead', label: 'Text me when a new lead arrives', hint: 'Sent to your business phone.' },
  { key: 'followUpReminders', label: 'Remind me about follow-ups due today', hint: 'One reminder each morning.' },
  { key: 'dailySummary', label: 'Daily summary email', hint: 'New leads and open follow-ups, every evening.' },
]

function Toggle({ id, checked, onChange, label, hint }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3.5">
      <div>
        <label htmlFor={id} className="text-sm font-medium text-slate-900">
          {label}
        </label>
        <p className="text-xs text-slate-500">{hint}</p>
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative mt-0.5 inline-flex h-6 w-11 shrink-0 rounded-full transition-colors ${checked ? 'bg-teal-600' : 'bg-slate-300'}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-5' : ''}`}
          aria-hidden="true"
        />
      </button>
    </div>
  )
}

export default function SettingsPage() {
  const { settings, updateSettings, resetDemoData } = useLeads()
  const { notify } = useDashboard()
  const [confirmingReset, setConfirmingReset] = useState(false)

  const form = useForm({
    initialValues: {
      businessName: settings.businessName,
      businessEmail: settings.businessEmail,
      businessPhone: settings.businessPhone,
      businessLocation: settings.businessLocation,
    },
    validate,
    onSubmit: (values) => {
      updateSettings(values)
      notify('Business details saved')
    },
  })
  const { field, errorFor } = form

  return (
    <>
      <PageHeader title="Settings" description="Business details and notification preferences for this demo." />

      <div className="grid max-w-4xl gap-6">
        <Card>
          <CardHeader title="Business details" description="Shown in the dashboard and on the public website." />
          <form onSubmit={form.handleSubmit} noValidate className="p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Business name" htmlFor="businessName" required error={errorFor('businessName')}>
                <input {...field('businessName')} type="text" className={control} />
              </Field>
              <Field label="Business location" htmlFor="businessLocation" required error={errorFor('businessLocation')}>
                <input {...field('businessLocation')} type="text" className={control} />
              </Field>
              <Field label="Business email" htmlFor="businessEmail" required error={errorFor('businessEmail')}>
                <input {...field('businessEmail')} type="email" className={control} />
              </Field>
              <Field label="Business phone" htmlFor="businessPhone" required error={errorFor('businessPhone')}>
                <input {...field('businessPhone')} type="tel" className={control} />
              </Field>
            </div>
            <div className="mt-5 flex justify-end">
              <button type="submit" className={btnPrimary}>
                Save details
              </button>
            </div>
          </form>
        </Card>

        <Card>
          <CardHeader
            title="Notification preferences"
            description="Visual demo settings only. No emails or text messages are sent from this demo."
          />
          <div className="divide-y divide-slate-100 px-5 py-1.5">
            {NOTIFICATIONS.map((item) => (
              <Toggle
                key={item.key}
                id={`notify-${item.key}`}
                label={item.label}
                hint={item.hint}
                checked={Boolean(settings.notifications[item.key])}
                onChange={(value) => {
                  updateSettings({ notifications: { [item.key]: value } })
                  notify('Preference saved')
                }}
              />
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Demo data" description="Everything in this dashboard is stored in your browser’s local storage." />
          <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-lg text-sm text-slate-600">
              Reset to restore the original sample leads, follow-ups, services and settings. Leads you submitted or
              edited will be removed.
            </p>
            <button type="button" onClick={() => setConfirmingReset(true)} className={`${btnDanger} shrink-0`}>
              <RotateCcw className="size-4" aria-hidden="true" />
              Reset demo data
            </button>
          </div>
        </Card>
      </div>

      <ConfirmDialog
        open={confirmingReset}
        title="Reset all demo data?"
        message="Every lead, note, follow-up and setting will be replaced with the original sample data. This cannot be undone."
        confirmLabel="Reset demo data"
        onCancel={() => setConfirmingReset(false)}
        onConfirm={() => {
          const fresh = resetDemoData()
          form.reset({
            businessName: fresh.settings.businessName,
            businessEmail: fresh.settings.businessEmail,
            businessPhone: fresh.settings.businessPhone,
            businessLocation: fresh.settings.businessLocation,
          })
          setConfirmingReset(false)
          notify('Demo data reset')
        }}
      />
    </>
  )
}
