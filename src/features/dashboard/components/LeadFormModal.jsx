import Field from '../../../components/common/Field.jsx'
import Modal from '../../../components/common/Modal.jsx'
import { useForm } from '../../../hooks/useForm.js'
import { createValidator, email, phone, required } from '../../../utils/validators.js'
import { useLeads } from '../../leads/context/LeadsContext.js'
import {
  LEAD_SOURCES,
  PREFERRED_TIMES,
  PROPERTY_SIZES,
  PROPERTY_TYPES,
} from '../../leads/utils/leadConstants.js'
import { btnPrimary, btnSecondary, control } from './ui.js'

const validate = createValidator({
  customerName: [required('Enter the customer’s name')],
  email: [required('Enter an email address'), email()],
  phone: [required('Enter a phone number'), phone()],
  serviceType: [required('Choose a service')],
})

function LeadForm({ lead, onClose, onSaved }) {
  const { services, createLead, updateLead } = useLeads()
  const editing = Boolean(lead)

  const form = useForm({
    initialValues: {
      customerName: lead?.customerName ?? '',
      email: lead?.email ?? '',
      phone: lead?.phone ?? '',
      serviceType: lead?.serviceType ?? '',
      propertyType: lead?.propertyType ?? '',
      propertySize: lead?.propertySize ?? '',
      preferredDate: lead?.preferredDate ?? '',
      preferredTime: lead?.preferredTime ?? '',
      address: lead?.address ?? '',
      message: lead?.message ?? '',
    },
    validate,
    onSubmit: (values) => {
      if (editing) {
        updateLead(lead.id, values)
        onSaved?.('Lead updated')
      } else {
        const created = createLead(values, { source: LEAD_SOURCES.MANUAL })
        onSaved?.(`Lead ${created.id} added`, created)
      }
      onClose()
    },
  })
  const { field, errorFor } = form

  // Keep a lead's current value selectable even if it is no longer in the list.
  const withCurrent = (options, current) => (current && !options.includes(current) ? [current, ...options] : options)
  const serviceNames = withCurrent(
    services.map((service) => service.name),
    lead?.serviceType,
  )

  return (
    <form onSubmit={form.handleSubmit} noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Customer name" htmlFor="customerName" required error={errorFor('customerName')} className="sm:col-span-2">
          <input {...field('customerName')} type="text" className={control} />
        </Field>
        <Field label="Email" htmlFor="email" required error={errorFor('email')}>
          <input {...field('email')} type="email" className={control} />
        </Field>
        <Field label="Phone" htmlFor="phone" required error={errorFor('phone')}>
          <input {...field('phone')} type="tel" className={control} />
        </Field>
        <Field label="Requested service" htmlFor="serviceType" required error={errorFor('serviceType')} className="sm:col-span-2">
          <select {...field('serviceType')} className={control}>
            <option value="">Select a service</option>
            {serviceNames.map((name) => (
              <option key={name}>{name}</option>
            ))}
          </select>
        </Field>
        <Field label="Property type" htmlFor="propertyType">
          <select {...field('propertyType')} className={control}>
            <option value="">Not specified</option>
            {withCurrent(PROPERTY_TYPES, lead?.propertyType).map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </Field>
        <Field label="Property size" htmlFor="propertySize">
          <select {...field('propertySize')} className={control}>
            <option value="">Not specified</option>
            {withCurrent(PROPERTY_SIZES, lead?.propertySize).map((size) => (
              <option key={size}>{size}</option>
            ))}
          </select>
        </Field>
        <Field label="Preferred date" htmlFor="preferredDate">
          <input {...field('preferredDate')} type="date" className={control} />
        </Field>
        <Field label="Preferred time" htmlFor="preferredTime">
          <select {...field('preferredTime')} className={control}>
            <option value="">Not specified</option>
            {PREFERRED_TIMES.map((time) => (
              <option key={time}>{time}</option>
            ))}
          </select>
        </Field>
        <Field label="Address or service area" htmlFor="address" className="sm:col-span-2">
          <input {...field('address')} type="text" className={control} />
        </Field>
        <Field label="Customer message" htmlFor="message" className="sm:col-span-2">
          <textarea {...field('message')} rows={3} className={control} />
        </Field>
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <button type="button" onClick={onClose} className={btnSecondary}>
          Cancel
        </button>
        <button type="submit" className={btnPrimary}>
          {editing ? 'Save changes' : 'Add lead'}
        </button>
      </div>
    </form>
  )
}

/** Add a lead by hand (e.g. from a phone call) or edit an existing one. */
export default function LeadFormModal({ open, onClose, lead = null, onSaved }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={lead ? `Edit ${lead.customerName}` : 'Add a lead'}
      description={lead ? lead.id : 'For enquiries that arrive by phone or in person.'}
      size="lg"
    >
      <LeadForm lead={lead} onClose={onClose} onSaved={onSaved} />
    </Modal>
  )
}
