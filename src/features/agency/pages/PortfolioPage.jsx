import { ArrowRight, FlaskConical, Globe, LayoutDashboard } from 'lucide-react'
import { Link } from 'react-router-dom'
import Reveal from '../../../components/common/Reveal.jsx'
import { CtaBand } from '../components/HomeSections.jsx'
import { BrowserFrame, DashboardPreview, SitePreview } from '../components/Previews.jsx'
import { btn } from '../components/buttons.js'
import { Container, PageHero, SectionHeading } from '../components/ui.jsx'
import { usePageTitle } from '../hooks/usePageTitle.js'

const STORY = [
  { step: 'A customer visits the website', detail: 'They browse services and illustrative pricing.' },
  { step: 'They request a quote', detail: 'The form validates every field before it submits.' },
  { step: 'The enquiry becomes a lead', detail: 'It is saved with a reference number and a “New” status.' },
  { step: 'The owner opens the dashboard', detail: 'The new lead is at the top of the list, ready to action.' },
  { step: 'They update the status and add a note', detail: 'Every change is recorded in the activity timeline.' },
  { step: 'They schedule a follow-up', detail: 'So the quote does not go cold.' },
]

const PARTS = [
  {
    icon: Globe,
    title: 'Public website',
    url: '/demo',
    to: '/demo',
    cta: 'Open the website',
    points: [
      'Hero, services, how-it-works and about sections',
      'Service cards that pre-fill the quote form',
      'Ten-field quote form with inline validation',
      'Mobile-first layout and navigation',
    ],
    preview: <SitePreview />,
  },
  {
    icon: LayoutDashboard,
    title: 'Lead management dashboard',
    url: '/demo/dashboard',
    to: '/demo/dashboard',
    cta: 'Open the dashboard',
    points: [
      'KPI cards and charts for leads, services and statuses',
      'Search, filter, sort and edit every lead',
      'Internal notes and an activity timeline per lead',
      'Follow-up tasks with overdue tracking',
    ],
    preview: <DashboardPreview />,
  },
]

export default function PortfolioPage() {
  usePageTitle('Portfolio')

  return (
    <>
      <PageHero eyebrow="Portfolio" title="Cleaning Business Website + Lead Dashboard">
        A fully working demonstration of what we build for service businesses. Try it as a customer, then as the owner.
      </PageHero>

      <section className="py-16 lg:py-24">
        <Container>
          <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            <FlaskConical className="mt-0.5 size-4.5 shrink-0" aria-hidden="true" />
            <p>
              <strong>This is a demonstration project, not client work.</strong> SparklePro Cleaning Co. is a fictional
              business. Its leads, reviews, prices and contact details are sample content, and no emails or text
              messages are sent.
            </p>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            {PARTS.map(({ icon: Icon, title, url, to, cta, points, preview }, index) => (
              <Reveal as="article" key={title} delay={index * 100} className="flex flex-col">
                <div role="img" aria-label={`Preview of the ${title.toLowerCase()}`}>
                  <BrowserFrame url={url}>{preview}</BrowserFrame>
                </div>
                <div className="mt-7 flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h2 className="font-display text-xl font-semibold text-navy-900">{title}</h2>
                </div>
                <ul className="mt-4 flex-1 list-disc space-y-2 pl-5 text-slate-600 marker:text-blue-600">
                  {points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <Link to={to} className={`${btn.outline} mt-6 self-start`}>
                  {cta}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-16 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-3 lg:gap-16">
          <div>
            <SectionHeading eyebrow="The workflow" title="One enquiry, start to finish">
              The demo follows a real business process, and every step works in your browser.
            </SectionHeading>
            <Link to="/demo" className={`${btn.primary} mt-8`}>
              Explore Live Demo
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <ol className="grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:col-span-2">
            {STORY.map((item, index) => (
              <Reveal as="li" key={item.step} delay={(index % 2) * 80} className="flex gap-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-navy-900 text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-display font-semibold text-navy-900">{item.step}</h3>
                  <p className="mt-1 text-[15px] text-slate-600">{item.detail}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-16 lg:py-20">
        <Container>
          <SectionHeading eyebrow="How it was built" title="A front-end demo with a production-ready structure" />
          <dl className="mt-10 grid gap-8 sm:grid-cols-3">
            {[
              ['Technology', 'React, React Router and Tailwind CSS, with Recharts for the dashboard charts.'],
              ['Data', 'One shared lead store used by both the website and the dashboard, saved in the browser.'],
              ['For a real client', 'The same screens connect to a database and send real email notifications.'],
            ].map(([term, text]) => (
              <div key={term} className="border-t-2 border-navy-900 pt-4">
                <dt className="font-display font-semibold text-navy-900">{term}</dt>
                <dd className="mt-2 text-[15px] leading-relaxed text-slate-600">{text}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <CtaBand title="Want something like this for your business?" text="We can adapt this setup to plumbing, landscaping, home services and more." />
    </>
  )
}
