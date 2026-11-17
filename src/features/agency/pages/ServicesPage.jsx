import { ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import Reveal from '../../../components/common/Reveal.jsx'
import { agencyServices } from '../../../data/agencyContent.js'
import { CtaBand, GrowthFlow, ProcessSteps } from '../components/HomeSections.jsx'
import { AgencyIcon } from '../components/icons.js'
import { btn } from '../components/buttons.js'
import { Container, PageHero } from '../components/ui.jsx'
import { usePageTitle } from '../hooks/usePageTitle.js'

export default function ServicesPage() {
  usePageTitle('Services')

  return (
    <>
      <PageHero eyebrow="Services" title="Websites, automation and social media for small service businesses">
        Focused services with a clear scope, a clear price and a clear benefit to your business. Start with the one you
        need most, or combine them.
      </PageHero>

      <section className="py-16 lg:py-24">
        <Container className="space-y-8">
          <GrowthFlow />
          {agencyServices.map((service) => {
            return (
              <Reveal
                as="article"
                key={service.id}
                id={service.id}
                className="grid gap-8 rounded-xl border border-slate-200 bg-white p-7 sm:p-10 lg:grid-cols-5 lg:gap-12"
              >
                <div className="lg:col-span-3">
                  <span className="flex size-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <AgencyIcon name={service.icon} className="size-6" />
                  </span>
                  <h2 className="mt-5 font-display text-2xl font-semibold text-navy-900 sm:text-3xl">{service.name}</h2>
                  <p className="mt-3 text-lg leading-relaxed text-slate-600">{service.summary}</p>

                  <h3 className="mt-7 text-xs font-semibold tracking-[0.18em] text-blue-600 uppercase">
                    Why it matters
                  </h3>
                  <p className="mt-2 leading-relaxed text-slate-600">{service.value}</p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Link to={`/contact?project=${encodeURIComponent(projectTypeFor(service.id))}`} className={btn.dark}>
                      Discuss this service
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                    {service.billing === 'monthly' ? (
                      <p className="text-sm text-slate-500">{service.note}</p>
                    ) : (
                      <p className="text-sm text-slate-500">
                        From <span className="font-semibold text-navy-900">${service.price}</span> per project
                      </p>
                    )}
                  </div>
                </div>

                <div className="rounded-lg bg-slate-50 p-6 lg:col-span-2">
                  <h3 className="font-display text-sm font-semibold text-navy-900">What you get</h3>
                  <ul className="mt-4 space-y-3 text-[15px] text-slate-700">
                    {service.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <Check className="mt-0.5 size-4.5 shrink-0 text-blue-600" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )
          })}
        </Container>
      </section>

      <div className="border-t border-slate-200 bg-slate-50">
        <ProcessSteps />
      </div>
      <CtaBand title="Not sure which service fits?" text="Tell us what is slowing you down and we will recommend a starting point." />
    </>
  )
}

function projectTypeFor(serviceId) {
  return {
    website: 'Business website',
    'lead-automation': 'Website + lead automation',
    workflow: 'Workflow automation',
    'social-media': 'Social media management',
  }[serviceId]
}
