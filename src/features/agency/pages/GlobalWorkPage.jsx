import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Layers,
  QrCode,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Reveal from '../../../components/common/Reveal.jsx'
import { globalMarkets, globalProjects, globalWorkStats } from '../../../data/globalWorkContent.js'
import { CtaBand } from '../components/HomeSections.jsx'
import { btn } from '../components/buttons.js'
import { Container, PageHero, SectionHeading } from '../components/ui.jsx'
import { usePageTitle } from '../hooks/usePageTitle.js'

export default function GlobalWorkPage() {
  usePageTitle('Global Work — International Engineering & Case Studies')

  const indiaProject = globalProjects.find((p) => p.id === 'india-abdm-hospital')
  const otherProjects = globalProjects.filter((p) => p.id !== 'india-abdm-hospital')

  return (
    <>
      <PageHero
        eyebrow="Global Portfolio"
        title="Engineering Solutions Across Saudi Arabia, Bhutan, USA, India & Sweden"
      >
        From mission-critical hospital automation complying with government standards to 14-module distributed
        microservices, aviation reservation systems, and mobile platforms — discover how Techsphere64 partners with
        global founders to build high-impact software.
      </PageHero>

      {/* Global Impact Numbers Ribbon */}
      <section className="border-b border-slate-200 bg-white py-12">
        <Container>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {globalWorkStats.map((stat, i) => (
              <Reveal
                key={stat.label}
                delay={i * 80}
                className="rounded-xl border border-slate-100 bg-slate-50/80 p-5 text-center shadow-xs"
              >
                <p className="font-display text-3xl font-extrabold text-blue-600 sm:text-4xl">{stat.value}</p>
                <p className="mt-1 text-sm font-medium text-slate-700">{stat.label}</p>
              </Reveal>
            ))}
          </div>

          {/* Countries List Pill Ribbon */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
              Global Presence:
            </span>
            {globalMarkets.map((m) => (
              <div
                key={m.code}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-800 shadow-xs"
              >
                <span className="text-base" role="img" aria-label={m.country}>
                  {m.flag}
                </span>
                <span>{m.country}</span>
                <span className="text-[11px] text-slate-400">· {m.headline.split(' ')[0]}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* HIGHLIGHTED FLAGSHIP: INDIA ABDM HOSPITAL SYSTEM */}
      {indiaProject && (
        <section id="india-abdm-hospital" className="scroll-mt-20 bg-slate-50 py-16 lg:py-24">
          <Container>
            <div className="rounded-3xl border-2 border-blue-500/30 bg-white p-6 shadow-xl sm:p-10 lg:p-12">
              {/* Header Badges */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                    <Sparkles className="size-3.5 text-blue-600" />
                    {indiaProject.badge}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
                    <ShieldCheck className="size-3.5 text-emerald-600" />
                    ABDM Govt. Compliant
                  </span>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
                    {indiaProject.flag} {indiaProject.country}
                  </span>
                </div>

                <div className="inline-flex items-center gap-1 rounded-full bg-amber-100/80 px-3 py-1 text-xs font-semibold text-amber-900">
                  <QrCode className="size-3.5 text-amber-700" />
                  100% Zero Paperwork Architecture
                </div>
              </div>

              {/* Title & Overview */}
              <div className="mt-6 max-w-4xl">
                <h2 className="font-display text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
                  {indiaProject.title}
                </h2>
                <p className="mt-2 text-base font-medium text-blue-600 sm:text-lg">
                  {indiaProject.subtitle}
                </p>
                <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
                  {indiaProject.description}
                </p>
              </div>

              {/* Screenshots Gallery */}
              <div className="mt-10 grid gap-6 md:grid-cols-2">
                {indiaProject.images.map((img, idx) => (
                  <div
                    key={img.src}
                    className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-md transition-all hover:shadow-xl"
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute right-4 bottom-3 left-4 flex items-center justify-between text-xs text-white">
                      <span className="font-medium drop-shadow">{img.caption}</span>
                      <span className="rounded bg-blue-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                        Module 0{idx + 1}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* 6 Key Modules Grid */}
              <div className="mt-12">
                <h3 className="flex items-center gap-2 font-display text-xl font-bold text-navy-900">
                  <Layers className="size-5 text-blue-600" />
                  Comprehensive End-to-End Hospital Modules
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  How doctors, reception, pharmacy, diagnostic labs, and mobile patient app interconnect with zero friction:
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {indiaProject.modules.map((m) => (
                    <div
                      key={m.title}
                      className="rounded-xl border border-slate-200 bg-slate-50/60 p-5 transition-colors hover:border-blue-500/50 hover:bg-white"
                    >
                      <div className="flex items-center gap-2 font-display text-base font-semibold text-navy-900">
                        <CheckCircle2 className="size-4 shrink-0 text-emerald-500" />
                        <span>{m.title}</span>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">{m.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Impact / Deliverables & Tech Stack */}
              <div className="mt-10 grid gap-8 border-t border-slate-200 pt-8 lg:grid-cols-2">
                <div>
                  <h4 className="font-display text-base font-semibold text-navy-900">
                    Clinical & Operational Impact
                  </h4>
                  <ul className="mt-3 space-y-2 text-sm text-slate-600">
                    {indiaProject.impact.map((imp) => (
                      <li key={imp} className="flex items-start gap-2.5">
                        <span className="mt-1 size-1.5 shrink-0 rounded-full bg-blue-600" />
                        <span>{imp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-display text-base font-semibold text-navy-900">
                    Compliance & Architecture Stack
                  </h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {indiaProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Link to="/contact" className={`${btn.primary} w-full justify-center sm:w-auto`}>
                      Discuss a Healthcare or Compliance Project
                      <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* OTHER GLOBAL CASE STUDIES: SWEDEN, USA, BHUTAN, SAUDI ARABIA */}
      <section className="py-16 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow="International Portfolio"
            title="More Visionary Work Across Continents"
          >
            Real systems delivered for founders in Sweden, USA, Bhutan, and Saudi Arabia.
          </SectionHeading>

          <div className="mt-12 space-y-16">
            {otherProjects.map((project, idx) => (
              <Reveal
                as="article"
                key={project.id}
                delay={idx * 100}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition-shadow hover:shadow-lg"
              >
                <div className="p-6 sm:p-8 lg:p-10">
                  {/* Top Metadata */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-800">
                        <span className="text-base" role="img" aria-label={project.country}>
                          {project.flag}
                        </span>
                        {project.country}
                      </span>
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                        {project.badge}
                      </span>
                    </div>

                    <span className="text-xs font-medium text-slate-500">Client: {project.client}</span>
                  </div>

                  {/* Title & description */}
                  <h3 className="mt-4 font-display text-2xl font-bold text-navy-900 sm:text-3xl">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-blue-600 sm:text-base">
                    {project.subtitle}
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-slate-600">
                    {project.description}
                  </p>

                  {/* Images if available */}
                  {project.images && project.images.length > 0 && (
                    <div className="mt-8 grid gap-5 sm:grid-cols-2">
                      {project.images.map((img) => (
                        <div
                          key={img.src}
                          className="group relative overflow-hidden rounded-xl border border-slate-200 bg-slate-900"
                        >
                          <img
                            src={img.src}
                            alt={img.alt}
                            className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-72"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent pointer-events-none" />
                          <p className="absolute right-3 bottom-2.5 left-3 text-xs font-medium text-white drop-shadow">
                            {img.caption}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Highlighted Architecture Modules */}
                  <div className="mt-8">
                    <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                      Architecture & Core Capabilities
                    </h4>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      {project.modules.map((m) => (
                        <div key={m.title} className="rounded-lg bg-slate-50 p-3.5">
                          <p className="font-display text-sm font-semibold text-navy-900">{m.title}</p>
                          <p className="mt-1 text-xs text-slate-600">{m.detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Impact & Tech Stack footer */}
                  <div className="mt-8 flex flex-col gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold text-slate-400">Stack:</span>
                      {project.techStack.map((t) => (
                        <span
                          key={t}
                          className="rounded bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700"
                    >
                      Build something similar
                      <ChevronRight className="size-4" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Global Founder Trust Quote / Reassurance */}
      <section className="border-t border-slate-200 bg-slate-50 py-16">
        <Container className="text-center">
          <div className="mx-auto max-w-3xl">
            <span className="text-3xl" role="img" aria-label="Globe">
              🌍
            </span>
            <h2 className="mt-4 font-display text-2xl font-bold text-navy-900 sm:text-3xl">
              Partnering Across Time Zones & Technical Complexity
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              Whether you are an airline in Bhutan, a healthcare provider in India needing strict ABDM compliance, a
              Nordic e-commerce brand scaling across 14 microservices, or an American or Saudi startup founder — we bring
              institutional-grade engineering, reliable delivery, and transparent communication.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/contact" className={btn.primary}>
                Start Your Project Consultation
                <ArrowRight className="size-4" />
              </Link>
              <Link to="/portfolio" className={btn.outline}>
                View Cleaning Demo & Lead Store
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  )
}
