import { CalendarCheck, ClipboardList, MessageSquareText, Sparkles } from 'lucide-react'
import Reveal from '../../../components/common/Reveal.jsx'
import SectionTitle from './SectionTitle.jsx'

const STEPS = [
  {
    icon: ClipboardList,
    title: 'Submit a quote request',
    text: 'Tell us about your space and the service you need. It takes about two minutes.',
  },
  {
    icon: MessageSquareText,
    title: 'Receive a response',
    text: 'We review your request and get back to you with a clear, itemised quote.',
  },
  {
    icon: CalendarCheck,
    title: 'Confirm your cleaning schedule',
    text: 'Pick the date and time that suits you and we will lock it in.',
  },
  {
    icon: Sparkles,
    title: 'Enjoy a clean space',
    text: 'Our team arrives on time and leaves your home or office spotless.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle eyebrow="How it works" title="From request to a spotless space in four steps" />

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ icon: Icon, title, text }, index) => (
            <Reveal as="li" key={title} delay={index * 80} className="relative rounded-3xl bg-sky-50/70 p-6">
              <span className="absolute top-5 right-6 text-4xl font-extrabold text-sky-200" aria-hidden="true">
                {index + 1}
              </span>
              <span className="flex size-12 items-center justify-center rounded-2xl bg-white text-teal-700 shadow-sm ring-1 ring-sky-100">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-slate-900">
                <span className="sr-only">Step {index + 1}: </span>
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
