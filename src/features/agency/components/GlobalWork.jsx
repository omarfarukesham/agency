import {
  ArrowRight,
  CalendarCheck,
  Check,
  CheckCircle2,
  ChevronRight,
  ConciergeBell,
  FileHeart,
  FlaskConical,
  Pill,
  QrCode,
  ScrollText,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Stethoscope,
} from 'lucide-react'
import { createElement, useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../../../components/common/Reveal.jsx'
import Flag from './Flag.jsx'
import { btn } from './buttons.js'
import { Container } from './ui.jsx'

const CASE_ICONS = {
  smartphone: Smartphone,
  qr: QrCode,
  stethoscope: Stethoscope,
  pill: Pill,
  records: FileHeart,
  reception: ConciergeBell,
  lab: FlaskConical,
  calendar: CalendarCheck,
  prescription: ScrollText,
  cart: ShoppingBag,
}

/** The patient-facing mobile app: mock-up image beside its features. */
function PatientApp({ app }) {
  return (
    <div className="mt-20 grid grid-cols-1 items-center gap-10 overflow-hidden rounded-2xl bg-white p-6 ring-1 ring-slate-200 sm:p-10 lg:grid-cols-2 lg:gap-14">
      <Reveal>
        <img
          src={app.image.src}
          alt={app.image.alt}
          width={app.image.width}
          height={app.image.height}
          loading="lazy"
          decoding="async"
          className="mx-auto block h-auto w-full max-w-lg rounded-xl"
        />
      </Reveal>
      <Reveal delay={80}>
        <p className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.16em] text-blue-600 uppercase">
          <Smartphone className="size-4" aria-hidden="true" />
          Patient mobile app
        </p>
        <h3 className="mt-3 font-display text-2xl leading-tight font-semibold text-navy-900 sm:text-3xl">{app.title}</h3>
        <p className="mt-3 leading-relaxed text-slate-600">{app.text}</p>
        <ul className="mt-7 grid gap-5 sm:grid-cols-2">
          {app.features.map((feature) => (
            <li key={feature.title}>
              <span className="flex size-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <CaseIcon name={feature.icon} className="size-4.5" />
              </span>
              <p className="mt-3 font-display text-[15px] font-semibold text-navy-900">{feature.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{feature.text}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  )
}

function CaseIcon({ name, ...props }) {
  return createElement(CASE_ICONS[name] ?? Check, { 'aria-hidden': true, ...props })
}

function CountryTag({ project, onDark = false }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
        onDark ? 'bg-white/10 text-slate-200' : 'bg-white text-slate-700 ring-1 ring-slate-200'
      }`}
    >
      <Flag code={project.countryCode} className="h-3 w-4.5 rounded-xs" />
      {project.country}
      <span className={onDark ? 'text-slate-500' : 'text-slate-300'} aria-hidden="true">
        ·
      </span>
      <span className={onDark ? 'text-slate-400' : 'text-slate-500'}>{project.industry}</span>
    </span>
  )
}

function StackList({ items, onDark = false }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Technology used">
      {items.map((tech) => (
        <li
          key={tech}
          className={`rounded-md px-2.5 py-1 text-xs font-medium ${
            onDark ? 'bg-white/10 text-slate-200' : 'bg-slate-100 text-slate-700'
          }`}
        >
          {tech}
        </li>
      ))}
    </ul>
  )
}

/**
 * Screenshot viewer. Browser-framed by default; `plain` suits marketing
 * images such as phone mock-ups. With several images, the captions double
 * as buttons that switch the main view.
 */
export function ProjectGallery({ images, frame = 'browser' }) {
  const [active, setActive] = useState(0)
  const image = images[active] ?? images[0]

  const picture = (
    <img
      key={image.src}
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading="lazy"
      decoding="async"
      className="animate-fade block h-auto w-full"
    />
  )

  return (
    <figure>
      {frame === 'plain' ? (
        <div className="mx-auto max-w-md overflow-hidden rounded-2xl shadow-2xl ring-1 shadow-navy-950/15 ring-slate-200">
          {picture}
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl bg-white shadow-2xl ring-1 shadow-navy-950/15 ring-slate-200">
          <div className="flex items-center gap-1.5 border-b border-slate-200 bg-slate-50 px-3.5 py-2.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-slate-300" />
            <span className="size-2.5 rounded-full bg-slate-300" />
            <span className="size-2.5 rounded-full bg-slate-300" />
          </div>
          {picture}
        </div>
      )}

      {images.length > 1 ? (
        <div className="mt-4 grid gap-3 sm:grid-cols-2" role="group" aria-label="Choose a screenshot">
          {images.map((item, index) => {
            const selected = index === active
            return (
              <button
                key={item.src}
                type="button"
                aria-pressed={selected}
                onClick={() => setActive(index)}
                className={`flex items-center gap-3 rounded-lg p-2 text-left transition ${
                  selected
                    ? 'bg-white shadow-sm ring-2 ring-blue-600'
                    : 'bg-white/70 ring-1 ring-slate-200 hover:bg-white hover:ring-slate-300'
                }`}
              >
                <img
                  src={item.src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-11 w-18 shrink-0 rounded object-cover object-top ring-1 ring-slate-200"
                />
                <span className={`text-xs leading-snug font-medium ${selected ? 'text-navy-900' : 'text-slate-600'}`}>
                  {item.caption}
                </span>
              </button>
            )
          })}
        </div>
      ) : (
        <figcaption className={`mt-4 text-sm text-slate-500 ${frame === 'plain' ? 'text-center' : ''}`}>
          {image.caption}
        </figcaption>
      )}
    </figure>
  )
}

/** The highlighted India hospital project. */
export function FlagshipCaseStudy({ project }) {
  return (
    <section id={project.id} className="scroll-mt-16 bg-slate-50 py-20 lg:py-28">
      <Container>
        <Reveal className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Featured case study
          </span>
          <CountryTag project={project} />
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
            <ShieldCheck className="size-3.5" aria-hidden="true" />
            ABDM govt. compliant
          </span>
        </Reveal>

        <div className="mt-7 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-7">
            <h2 className="font-display text-3xl leading-tight font-semibold tracking-tight text-navy-900 sm:text-4xl lg:text-[2.75rem]">
              {project.title}
            </h2>
            <p className="mt-3 font-medium text-blue-600 sm:text-lg">{project.subtitle}</p>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">{project.description}</p>
          </Reveal>

          <Reveal delay={100} className="self-start rounded-xl bg-white p-6 ring-1 ring-slate-200 sm:p-7 lg:col-span-5">
            <h3 className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">Outcomes</h3>
            <ul className="mt-4 space-y-3.5">
              {project.impact.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] leading-snug text-slate-700">
                  <CheckCircle2 className="mt-0.5 size-4.5 shrink-0 text-emerald-500" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="mt-14">
          <ProjectGallery images={project.images} />
        </Reveal>

        {project.app ? <PatientApp app={project.app} /> : null}

        {project.journey ? (
          <div className="mt-20">
            <Reveal className="max-w-2xl">
              <h3 className="font-display text-2xl font-semibold text-navy-900">A paper-free patient journey</h3>
              <p className="mt-2 text-slate-600">
                Doctors, reception, pharmacy, diagnostics and the patient app share one system, so every step runs on a
                scan or a screen.
              </p>
            </Reveal>
            <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {project.journey.map((step, index) => (
                <Reveal as="li" key={step.title} delay={index * 70} className="relative rounded-xl bg-white p-5 ring-1 ring-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="flex size-10 items-center justify-center rounded-lg bg-blue-600 text-white">
                      <CaseIcon name={step.icon} className="size-5" />
                    </span>
                    <span className="font-display text-sm font-semibold text-slate-300">0{index + 1}</span>
                  </div>
                  <p className="mt-4 font-display font-semibold text-navy-900">{step.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{step.text}</p>
                  {index < project.journey.length - 1 ? (
                    <span
                      className="absolute top-10 -right-5 z-10 hidden size-6 items-center justify-center rounded-full bg-slate-50 text-slate-400 ring-1 ring-slate-200 lg:flex"
                      aria-hidden="true"
                    >
                      <ChevronRight className="size-3.5" />
                    </span>
                  ) : null}
                </Reveal>
              ))}
            </ol>
          </div>
        ) : null}

        <div className="mt-20">
          <Reveal className="max-w-2xl">
            <h3 className="font-display text-2xl font-semibold text-navy-900">Connected hospital modules</h3>
            <p className="mt-2 text-slate-600">Each department works in its own screen, on the same patient record.</p>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.modules.map((module, index) => (
              <Reveal key={module.title} delay={(index % 3) * 70} className="rounded-xl bg-white p-6 ring-1 ring-slate-200">
                <span className="flex size-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <CaseIcon name={module.icon} className="size-5" />
                </span>
                <h4 className="mt-4 font-display font-semibold text-navy-900">{module.title}</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{module.detail}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mt-16 flex flex-col gap-6 rounded-2xl bg-navy-900 p-7 sm:p-9 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] text-blue-300 uppercase">Built with</p>
            <div className="mt-3">
              <StackList items={project.techStack} onDark />
            </div>
          </div>
          <Link to="/contact" className={`${btn.primary} shrink-0`}>
            Discuss a healthcare project
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </Container>
    </section>
  )
}

/** One secondary project; alternates the image side on large screens. */
export function ProjectShowcase({ project, reverse = false }) {
  return (
    <article id={project.id} className="grid scroll-mt-24 grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
      <Reveal className={`lg:col-span-7 ${reverse ? 'lg:order-2' : ''}`}>
        <ProjectGallery images={project.images} frame={project.frame} />
      </Reveal>

      <Reveal delay={80} className="lg:col-span-5">
        <CountryTag project={project} />
        <h3 className="mt-4 font-display text-2xl leading-tight font-semibold tracking-tight text-navy-900 sm:text-3xl">
          {project.title}
        </h3>
        <p className="mt-2 text-sm font-semibold text-blue-600">{project.subtitle}</p>
        <p className="mt-4 leading-relaxed text-slate-600">{project.description}</p>

        <ul className="mt-6 space-y-3.5 border-t border-slate-200 pt-6">
          {project.modules.map((module) => (
            <li key={module.title} className="flex items-start gap-3">
              <Check className="mt-1 size-4 shrink-0 text-blue-600" aria-hidden="true" />
              <p className="text-sm leading-relaxed text-slate-600">
                <span className="font-semibold text-navy-900">{module.title}.</span> {module.detail}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <StackList items={project.techStack} />
        </div>

        <Link
          to="/contact"
          className="group mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          Build something similar
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </Reveal>
    </article>
  )
}
