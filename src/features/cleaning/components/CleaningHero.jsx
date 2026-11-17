import { ArrowRight, CalendarCheck, MapPin, ShieldCheck } from 'lucide-react'

const POINTS = [
  { icon: CalendarCheck, text: 'Flexible scheduling' },
  { icon: ShieldCheck, text: 'Transparent pricing' },
  { icon: MapPin, text: 'Serving the Austin area' },
]

export default function CleaningHero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-sky-50 to-white">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pt-12 pb-16 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:pt-20 lg:pb-24">
        <div className="animate-rise">
          <p className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold tracking-wide text-teal-700 ring-1 ring-teal-100">
            <span className="size-1.5 rounded-full bg-teal-500" aria-hidden="true" />A cleaner space. A better day.
          </p>
          <h1 className="mt-5 text-4xl leading-[1.1] font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.4rem]">
            Enjoy a Spotless Home <span className="text-teal-600">Without the Stress.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
            Reliable residential and commercial cleaning services tailored to your schedule.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#quote"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-700 px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-teal-700/20 transition-colors hover:bg-teal-800"
            >
              Get a Free Quote
              <ArrowRight className="size-4.5" aria-hidden="true" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center rounded-full border-2 border-sky-200 bg-white px-7 py-3.5 text-base font-bold text-slate-800 transition-colors hover:border-teal-500 hover:text-teal-700"
            >
              Explore Our Services
            </a>
          </div>

          <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-slate-700">
            {POINTS.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-2">
                <Icon className="size-4.5 text-teal-600" aria-hidden="true" />
                {text}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="absolute -top-6 -right-6 size-40 rounded-full bg-teal-100/70 blur-2xl" aria-hidden="true" />
          <img
            src="/images/cleaning/hero.jpg"
            alt="Bright, tidy living room with a light grey sofa and open-plan kitchen"
            width="1600"
            height="1087"
            fetchPriority="high"
            className="relative aspect-4/3 w-full rounded-[2rem] bg-sky-100 object-cover shadow-xl shadow-sky-900/10"
          />
          <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-lg ring-1 ring-sky-100 sm:left-8">
            <span className="flex size-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
              <CalendarCheck className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-bold text-slate-900">Request a quote in 2 minutes</p>
              <p className="text-xs text-slate-500">No obligation, no card required</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
