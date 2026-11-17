import { ArrowRight, FlaskConical } from 'lucide-react'
import { Link } from 'react-router-dom'

/** Makes it unmistakable that SparklePro is a demonstration, not a real business. */
export default function DemoRibbon() {
  return (
    <div className="bg-slate-900 font-sans text-xs text-slate-200">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-4 gap-y-1 px-4 py-2 sm:justify-between">
        <p className="flex items-center gap-2">
          <FlaskConical className="size-3.5 shrink-0 text-teal-300" aria-hidden="true" />
          <span>
            Demo website by{' '}
            <Link to="/" className="font-semibold text-white underline-offset-2 hover:underline">
              Techsphere64
            </Link>
            . SparklePro is a fictional business.
          </span>
        </p>
        <Link
          to="/demo/dashboard"
          className="inline-flex items-center gap-1 font-semibold text-teal-300 hover:text-teal-200"
        >
          Open the owner’s demo dashboard
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}
