import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { globalProjects, globalWorkStats } from '../../../data/globalWorkContent.js'
import Flag from '../components/Flag.jsx'
import { FlagshipCaseStudy, ProjectShowcase } from '../components/GlobalWork.jsx'
import { CtaBand } from '../components/HomeSections.jsx'
import { btn } from '../components/buttons.js'
import { Container, Eyebrow, SectionHeading } from '../components/ui.jsx'
import { usePageTitle } from '../hooks/usePageTitle.js'

const flagship = globalProjects.find((project) => project.highlighted) ?? globalProjects[0]
const otherProjects = globalProjects.filter((project) => project !== flagship)

function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-900">
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

      <Container className="relative pt-16 pb-14 lg:pt-24 lg:pb-16">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="animate-rise lg:col-span-7">
            <Eyebrow onDark>Global work</Eyebrow>
            <h1 className="mt-5 font-display text-4xl leading-[1.1] font-semibold tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
              Software built for founders in five countries.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
              Hospital automation in India, a 14-module commerce platform in Sweden, airline booking in Bhutan, a
              mobile app in the USA and enterprise systems in Saudi Arabia.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link to="/contact" className={btn.primary}>
                Discuss your project
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link to={`#${flagship.id}`} className={btn.outlineOnDark}>
                View the featured case study
              </Link>
            </div>
          </div>

          <nav aria-label="Projects by country" className="animate-rise [animation-delay:120ms] lg:col-span-5">
            <p className="text-xs font-semibold tracking-[0.16em] text-slate-400 uppercase">Projects by country</p>
            <ul className="mt-4 divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
              {globalProjects.map((project) => (
                <li key={project.id}>
                  <Link
                    to={`#${project.id}`}
                    className="group flex items-center gap-4 px-4 py-3.5 transition-colors hover:bg-white/[0.06]"
                  >
                    <Flag code={project.countryCode} className="size-9 rounded-full" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs text-slate-400">
                        {project.country} · {project.industry}
                      </span>
                      <span className="block truncate text-[15px] font-medium text-white">{project.shortTitle}</span>
                    </span>
                    {project.highlighted ? (
                      <span className="hidden rounded-full bg-blue-600 px-2 py-0.5 text-[11px] font-semibold text-white sm:inline">
                        Featured
                      </span>
                    ) : null}
                    <ArrowRight
                      className="size-4 shrink-0 text-slate-500 transition-transform group-hover:translate-x-0.5 group-hover:text-white"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/10 pt-10 lg:grid-cols-4">
          {globalWorkStats.map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <dt className="order-2 mt-2 text-sm font-semibold text-white">{stat.label}</dt>
              <dd className="order-1 font-display text-4xl leading-none font-semibold text-white">
                {stat.value}
                <span className="text-blue-400">.</span>
              </dd>
              <dd className="order-3 mt-1 text-xs leading-snug text-slate-400">{stat.context}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}

export default function GlobalWorkPage() {
  usePageTitle('Global Work')

  return (
    <>
      <Hero />
      <FlagshipCaseStudy project={flagship} />

      <section className="py-20 lg:py-28">
        <Container>
          <SectionHeading eyebrow="More projects" title="E-commerce, mobile, aviation and enterprise">
            Different industries, the same approach: understand the business first, then build software that fits it.
          </SectionHeading>
          <div className="mt-16 space-y-24 lg:space-y-32">
            {otherProjects.map((project, index) => (
              <ProjectShowcase key={project.id} project={project} reverse={index % 2 === 1} />
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        title="Have a complex system in mind?"
        text="Healthcare, commerce, travel or internal tools: tell us what you need and we will reply with a clear plan."
      />
    </>
  )
}
