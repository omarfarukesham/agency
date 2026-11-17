import { Quote } from 'lucide-react'
import Reveal from '../../../components/common/Reveal.jsx'
import SectionTitle from './SectionTitle.jsx'

/** Fictional reviews, labelled as such on every card. */
const SAMPLE_REVIEWS = [
  {
    text: 'Booking took a couple of minutes and the team arrived exactly when they said they would. The kitchen has never looked better.',
    name: 'Sample Customer A',
    detail: 'Deep Cleaning',
  },
  {
    text: 'We switched to a bi-weekly plan and it has taken a real weight off. Same two cleaners every visit.',
    name: 'Sample Customer B',
    detail: 'Recurring Cleaning',
  },
  {
    text: 'Our office is cleaned after hours and we simply never have to think about it. Clear quote, no surprises.',
    name: 'Sample Customer C',
    detail: 'Office Cleaning',
  },
]

export default function Testimonials() {
  return (
    <section className="bg-sky-50/70 py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle eyebrow="Sample reviews" title="What a review section could look like">
          These are fictional example reviews written for this demonstration. They are not from real customers.
        </SectionTitle>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {SAMPLE_REVIEWS.map((review, index) => (
            <Reveal
              as="figure"
              key={review.name}
              delay={index * 80}
              className="flex flex-col rounded-3xl bg-white p-7 ring-1 ring-sky-100"
            >
              <div className="flex items-center justify-between">
                <Quote className="size-7 text-teal-500" aria-hidden="true" />
                <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold tracking-wide text-amber-800 uppercase ring-1 ring-amber-200">
                  Demo review
                </span>
              </div>
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-slate-700">“{review.text}”</blockquote>
              <figcaption className="mt-5 border-t border-sky-100 pt-4 text-sm">
                <span className="font-bold text-slate-900">{review.name}</span>
                <span className="block text-slate-500">{review.detail}</span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
