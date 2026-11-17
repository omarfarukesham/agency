import { ArrowRight, Check, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import Reveal from '../../../components/common/Reveal.jsx'
import {
  agencyServices,
  faqs,
  growthFlow,
  pricingPlans,
  processSteps,
  reasons,
  socialMediaPlan,
} from '../../../data/agencyContent.js'
import { AgencyIcon } from './icons.js'
import { BrowserFrame, DashboardPreview, SitePreview } from './Previews.jsx'
import { btn } from './buttons.js'
import { Container, Eyebrow, SectionHeading } from './ui.jsx'

export function ServicesOverview() {
  return (
    <section className="pt-24 pb-20 sm:pt-28 lg:pt-32 lg:pb-28">
      <Container>
        <SectionHeading eyebrow="Services" title="Everything you need to win customers online">
          Bring local customers in with social media, turn them into enquiries with a website built to convert, and
          capture and follow up every one.
        </SectionHeading>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {agencyServices.map((service, index) => {
            return (
              <Reveal
                key={service.id}
                delay={index * 80}
                className="group flex flex-col rounded-xl border border-slate-200 bg-white p-7 transition-colors hover:border-blue-600"
              >
                <span className="flex size-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <AgencyIcon name={service.icon} className="size-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-navy-900">{service.name}</h3>
                <p className="mt-2 flex-1 leading-relaxed text-slate-600">{service.summary}</p>
                <Link
                  to={`/services#${service.id}`}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  What’s included
                  <span className="sr-only"> in {service.name}</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </Reveal>
            )
          })}
        </div>

        <GrowthFlow className="mt-14" />
      </Container>
    </section>
  )
}

/** Shows how the four services hand customers from one stage to the next. */
export function GrowthFlow({ className = '', linked = true }) {
  return (
    <Reveal className={`rounded-xl border border-slate-200 bg-slate-50 p-6 sm:p-8 ${className}`}>
      <h3 className="font-display text-base font-semibold text-navy-900">How the services work together</h3>
      <p className="mt-1 text-[15px] text-slate-600">
        Use one on its own, or combine them so every stage hands customers to the next.
      </p>
      <ol className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
        {growthFlow.map((item, index) => {
          const body = (
            <>
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 ring-1 ring-slate-200">
                  <AgencyIcon name={item.icon} className="size-5" />
                </span>
                {index < growthFlow.length - 1 ? (
                  <ArrowRight className="hidden size-4 flex-1 text-slate-300 lg:block" aria-hidden="true" />
                ) : null}
              </div>
              <p className="mt-4 text-xs font-semibold tracking-[0.16em] text-blue-600 uppercase">
                {index + 1}. {item.step}
              </p>
              <p className="mt-1 font-display font-semibold text-navy-900 group-hover:text-blue-700">{item.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{item.text}</p>
            </>
          )
          return (
            <li key={item.step} className="lg:pr-6">
              {linked ? (
                <Link to={`/services#${item.serviceId}`} className="group block rounded-lg">
                  {body}
                </Link>
              ) : (
                body
              )}
            </li>
          )
        })}
      </ol>
    </Reveal>
  )
}

export function WhyChoose() {
  return (
    <section className="border-y border-slate-200 bg-slate-50 py-20 lg:py-28">
      <Container>
        <SectionHeading eyebrow="Why Techsphere64" title="Software that earns its place in your business" />
        <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, index) => {
            return (
              <Reveal key={reason.title} delay={index * 60}>
                <AgencyIcon name={reason.icon} className="size-6 text-blue-600" />
                <h3 className="mt-4 font-display text-base font-semibold text-navy-900">{reason.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{reason.text}</p>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

export function ProcessSteps() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeading eyebrow="How we work" title="Discover → Design → Develop → Launch">
          A simple process with a clear outcome at every stage.
        </SectionHeading>

        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {processSteps.map((step, index) => (
            <Reveal as="li" key={step.name} delay={index * 80} className="lg:pr-8">
              <div className="flex items-center gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-navy-900 font-display text-sm font-semibold text-white">
                  {index + 1}
                </span>
                {index < processSteps.length - 1 ? (
                  <span className="hidden h-px flex-1 bg-slate-200 lg:block" aria-hidden="true" />
                ) : null}
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-navy-900">{step.name}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  )
}

export function FeaturedProject() {
  return (
    <section className="bg-navy-900 py-20 lg:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading eyebrow="Featured project · Demonstration" title="Cleaning Business Website + Lead Dashboard" onDark>
            A complete, working example built for a fictional company, SparklePro Cleaning Co. Submit a quote request on
            the website, then open the dashboard and watch it arrive.
          </SectionHeading>
          <ul className="mt-8 space-y-3 text-slate-200">
            {[
              'Public website with services and a validated quote form',
              'Dashboard with lead statuses, notes and follow-ups',
              'Charts, activity history and search',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check className="mt-0.5 size-5 shrink-0 text-blue-400" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link to="/demo" className={btn.primary}>
              Explore Live Demo
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link to="/portfolio" className={btn.outlineOnDark}>
              Read the project overview
            </Link>
          </div>
        </div>

        <Reveal className="space-y-5" role="img" aria-label="Previews of the demo cleaning website and its lead dashboard">
          <BrowserFrame url="/demo">
            <SitePreview />
          </BrowserFrame>
          <BrowserFrame url="/demo/dashboard" className="sm:ml-16">
            <DashboardPreview />
          </BrowserFrame>
        </Reveal>
      </Container>
    </section>
  )
}

export function Pricing() {
  return (
    <section id="pricing" className="py-20 lg:py-28">
      <Container>
        <SectionHeading eyebrow="Pricing" title="Clear pricing, agreed up front" align="center">
          Starting prices in USD for typical small-business projects, plus an ongoing monthly plan for social media.
          You receive a written proposal before any work begins.
        </SectionHeading>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <Reveal
              key={plan.id}
              delay={index * 80}
              className={`relative flex flex-col rounded-xl border p-8 ${
                plan.featured ? 'border-navy-900 bg-navy-900 text-slate-300' : 'border-slate-200 bg-white'
              }`}
            >
              {plan.featured ? (
                <span className="absolute -top-3 left-8 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                  Shown in our live demo
                </span>
              ) : null}
              <h3 className={`font-display text-lg font-semibold ${plan.featured ? 'text-white' : 'text-navy-900'}`}>
                {plan.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed">{plan.description}</p>
              <p className="mt-6 flex items-baseline gap-2">
                <span className="text-sm">From</span>
                <span className={`font-display text-4xl font-semibold ${plan.featured ? 'text-white' : 'text-navy-900'}`}>
                  ${plan.price}
                </span>
                <span className="text-sm">per project</span>
              </p>
              <ul className="mt-7 flex-1 space-y-3 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check className={`mt-0.5 size-4 shrink-0 ${plan.featured ? 'text-blue-400' : 'text-blue-600'}`} aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                to={`/contact?project=${encodeURIComponent(plan.projectType)}`}
                className={`${plan.featured ? btn.primary : btn.outline} mt-8 w-full`}
              >
                Discuss this package
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-6 grid gap-8 rounded-xl border border-slate-200 bg-slate-50 p-8 lg:grid-cols-4 lg:items-center">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-blue-600 uppercase">
              <AgencyIcon name="megaphone" className="size-4" />
              Ongoing · Monthly
            </p>
            <h3 className="mt-3 font-display text-lg font-semibold text-navy-900">{socialMediaPlan.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{socialMediaPlan.description}</p>
          </div>
          <ul className="grid gap-3 text-sm text-slate-700 sm:grid-cols-2 lg:col-span-2 lg:gap-x-8">
            {socialMediaPlan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5">
                <Check className="mt-0.5 size-4 shrink-0 text-blue-600" aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>
          <div className="lg:pl-6">
            <p className="font-display text-2xl font-semibold text-navy-900">{socialMediaPlan.priceLabel}</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">{socialMediaPlan.priceNote}</p>
            <Link
              to={`/contact?project=${encodeURIComponent(socialMediaPlan.projectType)}`}
              className={`${btn.dark} mt-5 w-full`}
            >
              Discuss social media
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

export function Faq() {
  return (
    <section id="faq" className="border-t border-slate-200 bg-slate-50 py-20 lg:py-28">
      <Container className="grid gap-10 lg:grid-cols-3 lg:gap-16">
        <div>
          <SectionHeading eyebrow="FAQ" title="Questions we hear most">
            Something else on your mind?{' '}
            <Link to="/contact" className="font-semibold text-blue-600 hover:underline">
              Ask us directly
            </Link>
            .
          </SectionHeading>
        </div>
        <div className="divide-y divide-slate-200 border-y border-slate-200 lg:col-span-2">
          {faqs.map((item) => (
            <details key={item.q} className="group">
              <summary className="flex list-none items-center justify-between gap-4 py-5 font-display text-base font-semibold text-navy-900 [&::-webkit-details-marker]:hidden">
                {item.q}
                <ChevronDown className="size-5 shrink-0 text-slate-400 transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="pr-10 pb-6 leading-relaxed text-slate-600">{item.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  )
}

export function CtaBand({
  title = 'Ready to turn more enquiries into customers?',
  text = 'Tell us about your business. We will suggest the simplest setup that fits, with a clear price.',
}) {
  return (
    <section className="bg-white py-20">
      <Container>
        <Reveal className="rounded-2xl bg-navy-900 px-6 py-14 text-center sm:px-12">
          <Eyebrow onDark>Free consultation</Eyebrow>
          <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl leading-tight font-semibold text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-300">{text}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/contact" className={btn.primary}>
              Book a Free Consultation
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link to="/demo" className={btn.outlineOnDark}>
              Explore Our Demo
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
