import { Hammer, Leaf, Home, Sparkles, Wrench } from 'lucide-react'
import Reveal from '../../../components/common/Reveal.jsx'
import { agencyConfig, reasons } from '../../../data/agencyContent.js'
import { CtaBand } from '../components/HomeSections.jsx'
import { AgencyIcon } from '../components/icons.js'
import { Container, PageHero, SectionHeading } from '../components/ui.jsx'
import { usePageTitle } from '../hooks/usePageTitle.js'

const INDUSTRIES = [
  { icon: Sparkles, name: 'Cleaning companies' },
  { icon: Wrench, name: 'Plumbing businesses' },
  { icon: Leaf, name: 'Landscaping businesses' },
  { icon: Home, name: 'Home service providers' },
  { icon: Hammer, name: 'Local service companies' },
]

const PRINCIPLES = [
  {
    title: 'Start with the business, not the technology',
    text: 'Before we suggest anything, we want to understand how enquiries reach you today and where they get lost.',
  },
  {
    title: 'Keep it simple enough to use every day',
    text: 'A tool only helps if you open it. We design for busy owners who are on the move, often on a phone.',
  },
  {
    title: 'Say what we will do, then do it',
    text: 'You get a written scope and price before work starts, and updates while it is under way.',
  },
]

export default function AboutPage() {
  usePageTitle('About')

  return (
    <>
      <PageHero eyebrow="About" title="A software agency for small service businesses">
        {agencyConfig.tagline}
      </PageHero>

      <section className="py-16 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3">
            <SectionHeading eyebrow="Who we are" title="Practical software for people who run real-world businesses" />
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-slate-600">
              <p>
                Techsphere64 builds websites and lead-management tools for small service businesses, and manages their
                social media. Our clients are the companies people call when something needs cleaning, fixing or
                looking after.
              </p>
              <p>
                These businesses usually do not need complicated software. They need to be seen by local customers, a
                website that looks professional, a reliable way to capture every enquiry and a clear view of who to
                call back. That is what we focus on.
              </p>
              <p>
                We work remotely with business owners in {agencyConfig.markets.join(', ').replace(/, ([^,]*)$/, ' and $1')},
                and keep communication straightforward: a clear scope, a fixed project price and regular updates.
              </p>
            </div>
          </div>

          <Reveal as="aside" className="self-start rounded-xl border border-slate-200 bg-slate-50 p-7 lg:col-span-2">
            <h2 className="font-display text-base font-semibold text-navy-900">Who we build for</h2>
            <ul className="mt-5 space-y-4">
              {INDUSTRIES.map(({ icon: Icon, name }) => (
                <li key={name} className="flex items-center gap-3 text-slate-700">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-white text-blue-600 ring-1 ring-slate-200">
                    <Icon className="size-4.5" aria-hidden="true" />
                  </span>
                  {name}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-16 lg:py-24">
        <Container>
          <SectionHeading eyebrow="Our approach" title="How we help small businesses" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {PRINCIPLES.map((item, index) => (
              <Reveal key={item.title} delay={index * 80} className="rounded-xl border border-slate-200 bg-white p-7">
                <p className="font-display text-sm font-semibold text-blue-600">0{index + 1}</p>
                <h3 className="mt-3 font-display text-lg font-semibold text-navy-900">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-slate-600">{item.text}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container>
          <SectionHeading eyebrow="What to expect" title="What working with us looks like" />
          <div className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((reason) => {
              return (
                <div key={reason.title}>
                  <AgencyIcon name={reason.icon} className="size-6 text-blue-600" />
                  <h3 className="mt-4 font-display text-base font-semibold text-navy-900">{reason.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{reason.text}</p>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  )
}
