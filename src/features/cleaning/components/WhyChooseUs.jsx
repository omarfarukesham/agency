import { CalendarClock, HeartHandshake, ReceiptText, UserCheck } from 'lucide-react'
import Reveal from '../../../components/common/Reveal.jsx'
import SectionTitle from './SectionTitle.jsx'

const REASONS = [
  {
    icon: CalendarClock,
    title: 'Flexible scheduling',
    text: 'Mornings, afternoons or evenings. Pick a time that works and reschedule when plans change.',
  },
  {
    icon: UserCheck,
    title: 'Reliable cleaning professionals',
    text: 'The same friendly team on recurring visits, so they get to know your space.',
  },
  {
    icon: ReceiptText,
    title: 'Transparent pricing',
    text: 'A clear quote before we start. No surprise charges added after the clean.',
  },
  {
    icon: HeartHandshake,
    title: 'Customer-focused service',
    text: 'Tell us what matters most and we will shape the visit around it.',
  },
]

export default function WhyChooseUs() {
  return (
    <section id="about" className="bg-sky-50/70 py-20 lg:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <Reveal className="relative">
          <img
            src="/images/cleaning/about.jpg"
            alt="A cleaner wearing gloves wiping down white window shutters"
            loading="lazy"
            width="1100"
            height="733"
            className="aspect-4/3 w-full rounded-[2rem] bg-sky-100 object-cover shadow-lg shadow-sky-900/10"
          />
          <p className="absolute right-4 bottom-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-slate-600 shadow">
            Austin, Texas
          </p>
        </Reveal>

        <div>
          <SectionTitle eyebrow="Why choose us" title="A local team that treats your space like their own" align="left">
            SparklePro Cleaning Co. looks after homes and offices across the Austin area, with a simple promise: show up
            on time, do the job properly and keep things easy for you.
          </SectionTitle>

          <ul className="mt-8 grid gap-5 sm:grid-cols-2">
            {REASONS.map(({ icon: Icon, title, text }, index) => (
              <Reveal as="li" key={title} delay={index * 60} className="rounded-2xl bg-white p-5 ring-1 ring-sky-100">
                <span className="flex size-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-3 text-base font-bold text-slate-900">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{text}</p>
              </Reveal>
            ))}
          </ul>
          <p className="mt-4 text-xs text-slate-400">
            Illustrative copy for a fictional business, shown for demonstration purposes.
          </p>
        </div>
      </div>
    </section>
  )
}
