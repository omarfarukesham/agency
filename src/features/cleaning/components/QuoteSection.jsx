import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { useLeads } from '../../leads/context/LeadsContext.js'
import QuoteForm from './QuoteForm.jsx'
import SectionTitle from './SectionTitle.jsx'

export default function QuoteSection({ selectedService }) {
  const { settings } = useLeads()

  const details = [
    { icon: Phone, label: 'Phone', value: settings.businessPhone },
    { icon: Mail, label: 'Email', value: settings.businessEmail },
    { icon: MapPin, label: 'Service area', value: `${settings.businessLocation} and nearby` },
    { icon: Clock, label: 'Hours', value: 'Mon–Sat, 8am–6pm' },
  ]

  return (
    <section id="quote" className="bg-white py-20 lg:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-5 lg:gap-12">
        <div className="lg:col-span-2">
          <SectionTitle eyebrow="Free quote" title="Tell us about your space" align="left">
            Fill in the form and we will come back to you with a tailored quote. No obligation.
          </SectionTitle>

          <dl className="mt-8 space-y-4">
            {details.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-teal-700">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <dt className="text-xs font-semibold text-slate-500">{label}</dt>
                  <dd className="truncate font-bold text-slate-900">{value}</dd>
                </div>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-xs leading-relaxed text-slate-400">
            Demo contact details. The phone number and email address are fictional and not monitored.
          </p>
        </div>

        <div className="rounded-[2rem] bg-white p-6 shadow-xl ring-1 shadow-sky-900/5 ring-sky-100 sm:p-9 lg:col-span-3">
          <QuoteForm selectedService={selectedService} />
        </div>
      </div>
    </section>
  )
}
