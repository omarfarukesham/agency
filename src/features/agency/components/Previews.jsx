/**
 * Decorative, non-interactive miniatures of the demo project, drawn in CSS.
 * They illustrate the live demo; the parent supplies the accessible label.
 */

export function BrowserFrame({ url, className = '', children }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl shadow-navy-950/20 ${className}`}>
      <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-100 px-3 py-2">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-slate-300" />
          <span className="size-2.5 rounded-full bg-slate-300" />
          <span className="size-2.5 rounded-full bg-slate-300" />
        </span>
        <span className="flex-1 truncate rounded-md bg-white px-2.5 py-1 text-center text-[10px] text-slate-500">{url}</span>
      </div>
      {children}
    </div>
  )
}

export function SitePreview() {
  return (
    <div className="bg-white font-friendly" aria-hidden="true">
      <div className="flex items-center justify-between border-b border-sky-100 px-4 py-2.5">
        <span className="flex items-center gap-1.5 text-[11px] font-extrabold text-slate-900">
          <span className="size-4 rounded-md bg-linear-to-br from-sky-400 to-teal-500" />
          SparklePro
        </span>
        <span className="hidden gap-3 text-[9px] font-semibold text-slate-500 sm:flex">
          <span>Home</span>
          <span>Services</span>
          <span>About</span>
          <span>Contact</span>
        </span>
        <span className="rounded-full bg-teal-700 px-2.5 py-1 text-[9px] font-bold text-white">Get a Free Quote</span>
      </div>

      <div className="grid grid-cols-5 items-center gap-3 bg-linear-to-b from-sky-50 to-white p-4">
        <div className="col-span-3">
          <span className="inline-block rounded-full bg-white px-2 py-0.5 text-[8px] font-bold text-teal-700 ring-1 ring-teal-100">
            A cleaner space. A better day.
          </span>
          <p className="mt-2 text-[15px] leading-tight font-extrabold text-slate-900 sm:text-lg">
            Enjoy a Spotless Home <span className="text-teal-600">Without the Stress.</span>
          </p>
          <p className="mt-1.5 text-[9px] leading-snug text-slate-500">
            Reliable residential and commercial cleaning services tailored to your schedule.
          </p>
          <div className="mt-2.5 flex gap-1.5">
            <span className="rounded-full bg-teal-700 px-2.5 py-1 text-[9px] font-bold text-white">Get a Free Quote</span>
            <span className="rounded-full border border-sky-200 px-2.5 py-1 text-[9px] font-bold text-slate-700">Services</span>
          </div>
        </div>
        <img
          src="/images/cleaning/hero.jpg"
          alt=""
          loading="lazy"
          className="col-span-2 aspect-4/3 w-full rounded-xl bg-sky-100 object-cover"
        />
      </div>

      <div className="grid grid-cols-3 gap-2 px-4 pb-4">
        {['Standard Cleaning', 'Deep Cleaning', 'Office Cleaning'].map((name, index) => (
          <div key={name} className="rounded-lg p-2 ring-1 ring-sky-100">
            <span className="block size-4 rounded-md bg-teal-100" />
            <p className="mt-1.5 text-[9px] font-bold text-slate-900">{name}</p>
            <p className="text-[8px] text-slate-500">From ${[120, 220, 180][index]}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const ROWS = [
  { name: 'Sarah Johnson', service: 'Deep Cleaning', status: 'New', tone: 'bg-blue-50 text-blue-700' },
  { name: 'Emily Chen', service: 'Recurring Cleaning', status: 'Contacted', tone: 'bg-amber-50 text-amber-800' },
  { name: 'David Thompson', service: 'Move-Out Cleaning', status: 'Quote Sent', tone: 'bg-violet-50 text-violet-700' },
  { name: 'Olivia Martinez', service: 'Recurring Cleaning', status: 'Converted', tone: 'bg-emerald-50 text-emerald-700' },
]

const KPIS = [
  { label: 'Total', value: 11 },
  { label: 'New', value: 2 },
  { label: 'Quotes', value: 1 },
  { label: 'Won', value: 3 },
]

const BARS = [30, 55, 40, 70, 45, 85, 60, 50, 75, 95]

/** `compact` drops the sidebar and chart for the small floating card in the hero. */
export function DashboardPreview({ compact = false }) {
  return (
    <div className="flex bg-slate-50 font-sans" aria-hidden="true">
      {compact ? null : (
        <div className="hidden w-24 shrink-0 space-y-1.5 bg-slate-900 p-2.5 sm:block">
          <span className="mb-3 block h-4 w-14 rounded bg-teal-500/80" />
          {['Overview', 'Leads', 'Follow-ups', 'Activity'].map((item, index) => (
            <span
              key={item}
              className={`block rounded px-1.5 py-1 text-[8px] font-medium ${index === 0 ? 'bg-white/10 text-white' : 'text-slate-400'}`}
            >
              {item}
            </span>
          ))}
        </div>
      )}

      <div className="min-w-0 flex-1 p-3">
        <div className="grid grid-cols-4 gap-1.5">
          {KPIS.map((kpi) => (
            <div key={kpi.label} className="rounded-md border border-slate-200 bg-white p-1.5">
              <p className="text-[8px] text-slate-500">{kpi.label}</p>
              <p className="text-sm leading-tight font-semibold text-slate-900">{kpi.value}</p>
            </div>
          ))}
        </div>

        {compact ? null : (
          <div className="mt-2 rounded-md border border-slate-200 bg-white p-2">
            <p className="text-[8px] font-semibold text-slate-700">Leads over time</p>
            <div className="mt-1.5 flex h-12 items-end gap-1">
              {BARS.map((height, index) => (
                <span key={index} className="flex-1 rounded-t-sm bg-teal-500/70" style={{ height: `${height}%` }} />
              ))}
            </div>
          </div>
        )}

        <div className="mt-2 divide-y divide-slate-100 rounded-md border border-slate-200 bg-white">
          {ROWS.slice(0, compact ? 3 : 4).map((row) => (
            <div key={row.name} className="flex items-center gap-2 px-2 py-1.5">
              <div className="min-w-0 flex-1">
                <p className="truncate text-[9px] font-semibold text-slate-900">{row.name}</p>
                <p className="truncate text-[8px] text-slate-500">{row.service}</p>
              </div>
              <span className={`rounded-full px-1.5 py-0.5 text-[8px] font-medium whitespace-nowrap ${row.tone}`}>
                {row.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
