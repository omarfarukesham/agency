import { ArrowRight, CircleCheck, Clock, Info, LoaderCircle, Mail, MessageSquareText, TriangleAlert } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Field from '../../../components/common/Field.jsx'
import { agencyConfig, budgetRanges, projectTypes } from '../../../data/agencyContent.js'
import { useForm } from '../../../hooks/useForm.js'
import { createValidator, email, minLength, required } from '../../../utils/validators.js'
import { btn } from '../components/buttons.js'
import { Container, PageHero } from '../components/ui.jsx'
import { usePageTitle } from '../hooks/usePageTitle.js'
import { submitEnquiry } from '../services/enquiryService.js'
import { trackEvent } from '../../../utils/metaPixel.js'

const validate = createValidator({
  name: [required('Enter your name')],
  email: [required('Enter your email address'), email()],
  businessName: [required('Enter your business name')],
  projectType: [required('Choose a project type')],
  budget: [required('Choose a budget range')],
  message: [
    required('Tell us a little about your project'),
    minLength(20, 'Add a little more detail (at least 20 characters)'),
  ],
})

const FORM_FIELDS = ['name', 'email', 'businessName', 'projectType', 'budget', 'message']

/** Turns a failed submission into a message for the visitor; server field errors go next to their fields. */
function submitErrorMessage(error, setFieldErrors) {
  if (error?.status === 422) {
    const known = Object.fromEntries(
      Object.entries(error.fields ?? {}).filter(([key, message]) => FORM_FIELDS.includes(key) && message),
    )
    if (Object.keys(known).length > 0) {
      setFieldErrors(known)
      return 'Please check the highlighted fields and try again.'
    }
    return 'Some details could not be accepted. Please check the form and try again.'
  }
  if (error?.status === 429) return 'Too many attempts. Please wait a few minutes and try again.'
  if (error?.code === 'timeout') return 'The server is taking too long to respond. Please try again in a moment.'
  if (error?.status >= 500) return 'Something went wrong on our side. Please try again in a few minutes.'
  return 'We could not send your message. Please check your connection and try again.'
}

const NEXT_STEPS = [
  { icon: MessageSquareText, title: 'We read your message', text: 'And reply with any questions about your business and goals.' },
  { icon: Clock, title: 'Free consultation', text: 'A short call to talk through what you need. No obligation.' },
  { icon: Mail, title: 'Written proposal', text: 'Scope, price and timeline in writing before any work starts.' },
]

function Success({ result, name, onReset }) {
  const headingRef = useRef(null)
  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  return (
    <div className="animate-rise py-6 text-center" role="status">
      <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
        <CircleCheck className="size-8" aria-hidden="true" />
      </span>
      <h2 ref={headingRef} tabIndex={-1} className="mt-5 font-display text-2xl font-semibold text-navy-900 outline-none">
        Thanks, {name.split(' ')[0]}.{result.delivered ? ' Your message has been sent.' : ''}
      </h2>
      {result.delivered ? (
        <p className="mx-auto mt-3 max-w-md text-slate-600">
          We will review your project details and get back to you by email to arrange a free consultation.
        </p>
      ) : null}

      {result.delivered ? null : (
        <p className="mx-auto mt-6 flex max-w-md items-start gap-2.5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-left text-sm text-amber-900">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <span>
            <strong>Preview mode:</strong> this form is not connected to an inbox yet, so the message was not delivered.
            Set <code className="rounded bg-amber-100 px-1">VITE_ENQUIRY_ENDPOINT</code> when building the site to
            go live.
          </span>
        </p>
      )}

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link to="/demo" className={btn.dark}>
          Explore the live demo
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
        <button type="button" onClick={onReset} className={btn.outline}>
          Send another message
        </button>
      </div>
    </div>
  )
}

export default function ContactPage() {
  usePageTitle('Contact')
  const [params] = useSearchParams()
  const requested = params.get('project')
  const [result, setResult] = useState(null)
  const [sentName, setSentName] = useState('')
  const [submitError, setSubmitError] = useState('')

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      businessName: '',
      projectType: projectTypes.includes(requested) ? requested : '',
      budget: '',
      message: '',
    },
    validate,
    onSubmit: async (values, { setFieldErrors }) => {
      setSubmitError('')
      try {
        const outcome = await submitEnquiry(values)
        // Conversion for Meta ads: a real visitor finished the enquiry form.
        trackEvent('Lead', { content_name: values.projectType || 'General enquiry' })
        setSentName(values.name)
        setResult(outcome)
      } catch (error) {
        setSubmitError(submitErrorMessage(error, setFieldErrors))
      }
    },
  })
  const { field, errorFor, submitting } = form
  const control = 'control control-agency'

  return (
    <>
      <PageHero eyebrow="Contact" title="Let’s discuss your project">
        Tell us about your business and what you would like to improve. The first consultation is free.
      </PageHero>

      <section className="py-16 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-2">
            <h2 className="font-display text-xl font-semibold text-navy-900">What happens next</h2>
            <ol className="mt-6 space-y-6">
              {NEXT_STEPS.map(({ icon: Icon, title, text }) => (
                <li key={title} className="flex gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-navy-900">{title}</h3>
                    <p className="mt-0.5 text-[15px] text-slate-600">{text}</p>
                  </div>
                </li>
              ))}
            </ol>

            {agencyConfig.contactEmail ? (
              <p className="mt-8 border-t border-slate-200 pt-6 text-[15px] text-slate-600">
                Prefer email?{' '}
                <a href={`mailto:${agencyConfig.contactEmail}`} className="font-semibold text-blue-600 hover:underline">
                  {agencyConfig.contactEmail}
                </a>
              </p>
            ) : null}

            <div className="mt-8 rounded-xl bg-slate-50 p-6">
              <p className="font-display font-semibold text-navy-900">Want to see our work first?</p>
              <p className="mt-1 text-[15px] text-slate-600">Try the cleaning business demo as a customer and as the owner.</p>
              <Link to="/demo" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700">
                Explore Live Demo
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-9 lg:col-span-3">
            {result ? (
              <Success
                result={result}
                name={sentName}
                onReset={() => {
                  form.reset()
                  setResult(null)
                }}
              />
            ) : (
              <form onSubmit={form.handleSubmit} noValidate aria-busy={submitting}>
                <h2 className="font-display text-xl font-semibold text-navy-900">Tell us about your project</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Fields marked <span className="text-red-500">*</span> are required.
                </p>

                <fieldset disabled={submitting} className="mt-6 grid gap-5 sm:grid-cols-2">
                  <legend className="sr-only">Project enquiry</legend>
                  <Field label="Your name" htmlFor="name" required error={errorFor('name')}>
                    <input {...field('name')} type="text" autoComplete="name" maxLength={100} className={control} />
                  </Field>
                  <Field label="Email address" htmlFor="email" required error={errorFor('email')}>
                    <input {...field('email')} type="email" autoComplete="email" maxLength={254} className={control} />
                  </Field>
                  <Field label="Business name" htmlFor="businessName" required error={errorFor('businessName')} className="sm:col-span-2">
                    <input {...field('businessName')} type="text" autoComplete="organization" maxLength={150} className={control} />
                  </Field>
                  <Field label="Project type" htmlFor="projectType" required error={errorFor('projectType')}>
                    <select {...field('projectType')} className={control}>
                      <option value="">Select a project type</option>
                      {projectTypes.map((type) => (
                        <option key={type}>{type}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Budget" htmlFor="budget" required error={errorFor('budget')}>
                    <select {...field('budget')} className={control}>
                      <option value="">Select a budget range</option>
                      {budgetRanges.map((range) => (
                        <option key={range}>{range}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Message" htmlFor="message" required error={errorFor('message')} className="sm:col-span-2">
                    <textarea
                      {...field('message')}
                      rows={5}
                      maxLength={5000}
                      placeholder="What does your business do, and what would you like help with?"
                      className={control}
                    />
                  </Field>
                </fieldset>

                {submitError ? (
                  <p role="alert" className="mt-5 flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                    <TriangleAlert className="size-4 shrink-0" aria-hidden="true" />
                    {submitError}
                  </p>
                ) : null}

                <button type="submit" disabled={submitting} className={`${btn.primary} mt-6 w-full disabled:bg-blue-600/70 sm:w-auto`}>
                  {submitting ? (
                    <>
                      <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Book a Free Consultation
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </Container>
      </section>
    </>
  )
}
