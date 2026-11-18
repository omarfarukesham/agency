import { ArrowRight, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { agencyConfig } from '../../../data/agencyContent.js'
import { GlobalHeroStats } from '../components/GlobalHeroStats.jsx'
import {
  CtaBand,
  Faq,
  FeaturedProject,
  Pricing,
  ProcessSteps,
  ServicesOverview,
  WhyChoose,
} from '../components/HomeSections.jsx'
import { BrowserFrame, DashboardPreview, SitePreview } from '../components/Previews.jsx'
import { btn } from '../components/buttons.js'
import { Container, Eyebrow } from '../components/ui.jsx'
import { usePageTitle } from '../hooks/usePageTitle.js'

function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-900">
      {/* Faint grid, fading out toward the bottom */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'linear-gradient(to bottom, black, transparent 85%)',
        }}
        aria-hidden="true"
      />

      <Container className="relative grid items-center gap-14 pt-16 pb-24 lg:grid-cols-2 lg:gap-10 lg:pt-24 lg:pb-32">
        <div className="animate-rise">
          <Eyebrow onDark>Websites · Automation · Social media</Eyebrow>
          <h1 className="mt-5 font-display text-4xl leading-[1.1] font-semibold tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
            Websites & Automation That Help Service Businesses Grow.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
            We design and build professional websites for small service businesses, then connect them to simple
            lead-management tools so every enquiry is captured, tracked and followed up. Our social media management
            keeps new customers finding you every day.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link to="/contact" className={btn.primary}>
              Book a Free Consultation
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link to="/demo" className={btn.outlineOnDark}>
              Explore Our Demo
            </Link>
          </div>
          <p className="mt-9 flex items-center gap-2 text-sm text-slate-400">
            <MapPin className="size-4 text-blue-400" aria-hidden="true" />
            Delivering for clients in {agencyConfig.markets.join(', ').replace(/, ([^,]*)$/, ' and $1')}
          </p>
        </div>

        <div
          className="animate-rise relative pb-16 [animation-delay:120ms] sm:pb-20 lg:pl-6"
          role="img"
          aria-label="Preview of a cleaning company website with a lead dashboard showing new enquiries"
        >
          <BrowserFrame url="sparklepro.example">
            <SitePreview />
          </BrowserFrame>
          <div className="absolute right-0 bottom-0 w-[72%] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl shadow-navy-950/40 sm:w-[58%] lg:-right-2">
            <p className="flex items-center justify-between border-b border-slate-200 px-3 py-2 text-[10px] font-semibold text-slate-900">
              Lead dashboard
              <span className="flex items-center gap-1 font-medium text-emerald-600">
                <span className="size-1.5 rounded-full bg-emerald-500" />2 new
              </span>
            </p>
            <DashboardPreview compact />
          </div>
        </div>
      </Container>
    </section>
  )
}

export default function HomePage() {
  usePageTitle('Techsphere64 — Websites & Automation for Service Businesses', { exact: true })

  return (
    <>
      <Hero />
      <GlobalHeroStats className="-mt-14 sm:-mt-16 lg:-mt-20" />
      <ServicesOverview />
      <WhyChoose />
      <ProcessSteps />
      <FeaturedProject />
      <Pricing />
      <Faq />
      <CtaBand />
    </>
  )
}
