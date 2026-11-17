import { ArrowRight, LayoutDashboard } from 'lucide-react'
import { Link } from 'react-router-dom'

/** Bridges the public site to the owner's dashboard for people viewing the demo. */
export default function DashboardCallout() {
  return (
    <section className="bg-white pb-20 font-sans">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-start gap-6 rounded-3xl bg-slate-900 p-7 text-white sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-teal-500/15 text-teal-300">
              <LayoutDashboard className="size-6" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-semibold tracking-widest text-teal-300 uppercase">For business owners viewing this demo</p>
              <h2 className="mt-1.5 text-xl font-semibold sm:text-2xl">See what happens after a customer hits “send”</h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-300">
                Every quote request on this page lands in a lead dashboard where the owner can track status, add notes
                and schedule follow-ups.
              </p>
            </div>
          </div>
          <Link
            to="/demo/dashboard"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-teal-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-teal-400"
          >
            Open the demo dashboard
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
