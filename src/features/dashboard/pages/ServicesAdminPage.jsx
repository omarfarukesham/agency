import { Pencil } from 'lucide-react'
import { useState } from 'react'
import Field from '../../../components/common/Field.jsx'
import Modal from '../../../components/common/Modal.jsx'
import { ServiceIcon } from '../../cleaning/components/serviceIcons.js'
import { useLeads } from '../../leads/context/LeadsContext.js'
import { Card, PageHeader } from '../components/Card.jsx'
import { btnPrimary, btnSecondary, control } from '../components/ui.js'
import { useDashboard } from '../hooks/useDashboard.js'

function ServiceForm({ service, onClose }) {
  const { updateService } = useLeads()
  const { notify } = useDashboard()
  const [description, setDescription] = useState(service.description)
  const [price, setPrice] = useState(String(service.startingPrice))
  const [errors, setErrors] = useState({})

  const submit = (event) => {
    event.preventDefault()
    const next = {}
    if (!description.trim()) next.description = 'Enter a description'
    const amount = Number(price)
    if (price.trim() === '' || !Number.isFinite(amount) || amount < 0) next.price = 'Enter a price of 0 or more'
    setErrors(next)
    if (Object.keys(next).length > 0) return
    updateService(service.id, { description, startingPrice: Math.round(amount) })
    notify(`${service.name} updated`)
    onClose()
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <Field label="Description" htmlFor="service-description" required error={errors.description}>
        <textarea
          id="service-description"
          rows={4}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          aria-invalid={errors.description ? 'true' : undefined}
          className={control}
        />
      </Field>
      <Field
        label="Starting price (USD)"
        htmlFor="service-price"
        required
        error={errors.price}
        hint="Shown on the public website as “From $…”."
      >
        <input
          id="service-price"
          type="number"
          min="0"
          step="1"
          inputMode="numeric"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          aria-invalid={errors.price ? 'true' : undefined}
          className={`${control} sm:max-w-40`}
        />
      </Field>
      <div className="flex justify-end gap-2 pt-2">
        <button type="button" onClick={onClose} className={btnSecondary}>
          Cancel
        </button>
        <button type="submit" className={btnPrimary}>
          Save changes
        </button>
      </div>
    </form>
  )
}

export default function ServicesAdminPage() {
  const { services, leads } = useLeads()
  const [editing, setEditing] = useState(null)

  return (
    <>
      <PageHeader
        title="Services"
        description="What you offer and your starting prices. Edits appear on the public website straight away."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => {
          const requests = leads.filter((lead) => lead.serviceType === service.name).length
          return (
            <Card key={service.id} className="flex flex-col p-5">
              <div className="flex items-start justify-between gap-3">
                <span className="flex size-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                  <ServiceIcon name={service.icon} className="size-5" />
                </span>
                <button type="button" onClick={() => setEditing(service)} className={`${btnSecondary} px-2.5 py-1.5`}>
                  <Pencil className="size-3.5" aria-hidden="true" />
                  Edit
                  <span className="sr-only"> {service.name}</span>
                </button>
              </div>
              <h2 className="mt-4 text-base font-semibold text-slate-900">{service.name}</h2>
              <p className="mt-1.5 flex-1 text-sm leading-relaxed text-slate-600">{service.description}</p>
              <dl className="mt-5 flex items-end justify-between border-t border-slate-100 pt-4">
                <div>
                  <dt className="text-xs text-slate-500">Starting price (illustrative)</dt>
                  <dd className="text-xl font-semibold text-slate-900">
                    ${service.startingPrice}
                    <span className="ml-1 text-xs font-normal text-slate-500">{service.priceUnit}</span>
                  </dd>
                </div>
                <div className="text-right">
                  <dt className="text-xs text-slate-500">Enquiries</dt>
                  <dd className="text-xl font-semibold text-slate-900 tabular-nums">{requests}</dd>
                </div>
              </dl>
            </Card>
          )
        })}
      </div>

      <Modal open={Boolean(editing)} onClose={() => setEditing(null)} title={editing ? `Edit ${editing.name}` : ''} size="sm">
        {editing ? <ServiceForm service={editing} onClose={() => setEditing(null)} /> : null}
      </Modal>
    </>
  )
}
