import { ArrowRight, Check, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import Reveal from '../../../components/common/Reveal.jsx'
import { useLeads } from '../../leads/context/LeadsContext.js'
import SectionTitle from './SectionTitle.jsx'
import { ServiceIcon } from './serviceIcons.js'

function ServiceCard({ service, onRequestQuote }) {
  const [expanded, setExpanded] = useState(false)
  const detailsId = `service-${service.id}-details`

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-sky-100 transition-shadow hover:shadow-lg hover:shadow-sky-900/5">
      <div className="relative">
        <img
          src={service.image}
          alt=""
          loading="lazy"
          width="900"
          height="600"
          className="aspect-16/10 w-full bg-sky-100 object-cover"
        />
        <span className="absolute -bottom-5 left-5 flex size-11 items-center justify-center rounded-2xl bg-teal-600 text-white shadow-md ring-4 ring-white">
          <ServiceIcon name={service.icon} className="size-5" />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 pt-9">
        <h3 className="text-xl font-bold text-slate-900">{service.name}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{service.description}</p>

        {expanded ? (
          <ul id={detailsId} className="mt-4 space-y-2 text-sm font-medium text-slate-700">
            {service.includes.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <Check className="mt-0.5 size-4 shrink-0 text-teal-600" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-auto pt-6">
          <p className="flex items-baseline gap-1.5">
            <span className="text-sm font-medium text-slate-500">From</span>
            <span className="text-2xl font-extrabold text-slate-900">${service.startingPrice}</span>
            <span className="text-sm text-slate-500">{service.priceUnit}</span>
          </p>
          <p className="text-xs text-slate-400">Illustrative demo pricing</p>

          <div className="mt-4 flex items-center gap-2">
            <button
              type="button"
              onClick={() => onRequestQuote(service.name)}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-teal-700 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-teal-800"
            >
              Request Quote
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setExpanded((value) => !value)}
              aria-expanded={expanded}
              aria-controls={detailsId}
              className="inline-flex items-center gap-1 rounded-full px-3 py-2.5 text-sm font-bold text-teal-700 hover:bg-teal-50"
            >
              {expanded ? 'Show less' : 'Learn more'}
              <ChevronDown className={`size-4 transition-transform ${expanded ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function ServicesSection({ onRequestQuote }) {
  const { services } = useLeads()

  return (
    <section id="services" className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle eyebrow="Our services" title="Cleaning that fits your home, office and schedule">
          Choose a one-off clean or a regular plan. Every quote is tailored to your space.
        </SectionTitle>

        <div className="mt-12 flex flex-wrap justify-center gap-6">
          {services.map((service, index) => (
            <Reveal
              key={service.id}
              delay={(index % 3) * 80}
              className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
            >
              <ServiceCard service={service} onRequestQuote={onRequestQuote} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
