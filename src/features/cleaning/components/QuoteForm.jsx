import { ArrowRight, CircleCheck, LoaderCircle, TriangleAlert } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Field from '../../../components/common/Field.jsx'
import { useForm } from '../../../hooks/useForm.js'
import { dateKey, formatDate } from '../../../utils/format.js'
import { createValidator, email, minLength, notBefore, phone, required } from '../../../utils/validators.js'
import { useLeads } from '../../leads/context/LeadsContext.js'
import { PREFERRED_TIMES, PROPERTY_SIZES, PROPERTY_TYPES } from '../../leads/utils/leadConstants.js'

const EMPTY = {
  customerName: '',
  email: '',
  phone: '',
  serviceType: '',
  propertyType: '',
  propertySize: '',
  preferredDate: '',
  preferredTime: '',
  address: '',
  message: '',
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function SuccessPanel({ lead, onReset }) {
  const headingRef = useRef(null)
  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  return (
    <div className="animate-rise text-center" role="status">
      <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-teal-50 text-teal-600">
        <CircleCheck className="size-9" aria-hidden="true" />
      </span>
      <h3 ref={headingRef} tabIndex={-1} className="mt-5 text-2xl font-extrabold text-slate-900 outline-none">
        Thanks, {lead.customerName.split(' ')[0]}! Your request is in.
      </h3>
      <p className="mx-auto mt-2 max-w-md text-slate-600">
        We have your details for <strong className="text-slate-900">{lead.serviceType}</strong> on{' '}
        <strong className="text-slate-900">{formatDate(lead.preferredDate)}</strong> and will be in touch with a quote.
      </p>

      <dl className="mx-auto mt-6 grid max-w-sm grid-cols-2 gap-3 text-left text-sm">
        <div className="rounded-2xl bg-sky-50 p-4">
          <dt className="text-xs font-semibold text-slate-500">Reference</dt>
          <dd className="mt-0.5 font-bold text-slate-900">{lead.id}</dd>
        </div>
        <div className="rounded-2xl bg-sky-50 p-4">
          <dt className="text-xs font-semibold text-slate-500">Status</dt>
          <dd className="mt-0.5 font-bold text-slate-900">Received</dd>
        </div>
      </dl>

      <div className="mx-auto mt-6 max-w-md rounded-2xl border border-dashed border-teal-300 bg-teal-50/60 p-4 text-left font-sans text-sm text-slate-700">
        <p className="font-semibold text-teal-900">What just happened in this demo</p>
        <p className="mt-1 leading-relaxed">
          Your enquiry was saved as lead <strong>{lead.id}</strong> and is now in the business owner’s dashboard. No
          email or SMS was sent; a live site would notify the owner and the customer at this point.
        </p>
      </div>

      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          to={`/demo/dashboard/leads?lead=${lead.id}`}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-700 px-6 py-3 text-sm font-bold text-white hover:bg-teal-800"
        >
          See it in the demo dashboard
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
        <button
          type="button"
          onClick={onReset}
          className="rounded-full border-2 border-sky-200 px-6 py-3 text-sm font-bold text-slate-700 hover:border-teal-500 hover:text-teal-700"
        >
          Submit another request
        </button>
      </div>
    </div>
  )
}

export default function QuoteForm({ selectedService }) {
  const { services, createLead } = useLeads()
  const [submittedLead, setSubmittedLead] = useState(null)
  const [submitError, setSubmitError] = useState('')
  const today = dateKey()

  const validate = useMemo(
    () =>
      createValidator({
        customerName: [required('Enter your full name'), minLength(2, 'Enter your full name')],
        email: [required('Enter your email address'), email()],
        phone: [required('Enter your phone number'), phone('Enter a valid phone number, like (512) 555-0100')],
        serviceType: [required('Choose the service you need')],
        propertyType: [required('Choose a property type')],
        propertySize: [required('Choose the closest property size')],
        preferredDate: [required('Choose a preferred date'), notBefore(today, 'Choose today or a future date')],
        preferredTime: [required('Choose a preferred time')],
        address: [required('Enter your address or neighbourhood')],
      }),
    [today],
  )

  const form = useForm({
    initialValues: EMPTY,
    validate,
    onSubmit: async (values) => {
      setSubmitError('')
      await wait(900) // Simulates the network round-trip a live site would make.
      try {
        setSubmittedLead(createLead(values))
      } catch {
        setSubmitError('Something went wrong saving your request. Please try again.')
      }
    },
  })

  // A "Request Quote" click on a service card pre-selects that service.
  const { setValue } = form
  useEffect(() => {
    if (selectedService) setValue('serviceType', selectedService)
  }, [selectedService, setValue])

  if (submittedLead) {
    return (
      <SuccessPanel
        lead={submittedLead}
        onReset={() => {
          form.reset()
          setSubmittedLead(null)
        }}
      />
    )
  }

  const { field, errorFor, submitting } = form
  const control = 'control control-clean'

  return (
    <form onSubmit={form.handleSubmit} noValidate aria-busy={submitting}>
      <fieldset disabled={submitting} className="grid gap-5 sm:grid-cols-2">
        <legend className="sr-only">Quote request</legend>

        <Field label="Full name" htmlFor="customerName" required error={errorFor('customerName')}>
          <input {...field('customerName')} type="text" autoComplete="name" className={control} />
        </Field>

        <Field label="Email address" htmlFor="email" required error={errorFor('email')}>
          <input {...field('email')} type="email" autoComplete="email" inputMode="email" className={control} />
        </Field>

        <Field label="Phone number" htmlFor="phone" required error={errorFor('phone')}>
          <input {...field('phone')} type="tel" autoComplete="tel" placeholder="(512) 555-0100" className={control} />
        </Field>

        <Field label="Service type" htmlFor="serviceType" required error={errorFor('serviceType')}>
          <select {...field('serviceType')} className={control}>
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service.id} value={service.name}>
                {service.name}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Property type" htmlFor="propertyType" required error={errorFor('propertyType')}>
          <select {...field('propertyType')} className={control}>
            <option value="">Select a property type</option>
            {PROPERTY_TYPES.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </Field>

        <Field label="Property size" htmlFor="propertySize" required error={errorFor('propertySize')}>
          <select {...field('propertySize')} className={control}>
            <option value="">Select a size</option>
            {PROPERTY_SIZES.map((size) => (
              <option key={size}>{size}</option>
            ))}
          </select>
        </Field>

        <Field label="Preferred cleaning date" htmlFor="preferredDate" required error={errorFor('preferredDate')}>
          <input {...field('preferredDate')} type="date" min={today} className={control} />
        </Field>

        <Field label="Preferred time" htmlFor="preferredTime" required error={errorFor('preferredTime')}>
          <select {...field('preferredTime')} className={control}>
            <option value="">Select a time</option>
            {PREFERRED_TIMES.map((time) => (
              <option key={time}>{time}</option>
            ))}
          </select>
        </Field>

        <Field
          label="Address or service area"
          htmlFor="address"
          required
          error={errorFor('address')}
          className="sm:col-span-2"
        >
          <input
            {...field('address')}
            type="text"
            autoComplete="street-address"
            placeholder="Street address or neighbourhood, e.g. South Congress, Austin"
            className={control}
          />
        </Field>

        <Field label="Additional details" htmlFor="message" error={errorFor('message')} className="sm:col-span-2">
          <textarea
            {...field('message')}
            rows={4}
            placeholder="Pets, parking, areas that need extra attention…"
            className={control}
          />
        </Field>
      </fieldset>

      {submitError ? (
        <p role="alert" className="mt-5 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          <TriangleAlert className="size-4 shrink-0" aria-hidden="true" />
          {submitError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-teal-700 px-7 py-4 text-base font-bold text-white shadow-lg shadow-teal-700/20 transition-colors hover:bg-teal-800 disabled:bg-teal-700/70"
      >
        {submitting ? (
          <>
            <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />
            Sending your request…
          </>
        ) : (
          <>
            Get My Free Quote
            <ArrowRight className="size-5" aria-hidden="true" />
          </>
        )}
      </button>
      <p className="mt-3 text-center font-sans text-xs text-slate-500">
        Demo form: nothing is sent anywhere. Your entry is stored only in this browser.
      </p>
    </form>
  )
}
