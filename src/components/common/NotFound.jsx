import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function NotFound({ homeTo = '/', homeLabel = 'Back to home' }) {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-sm font-semibold tracking-widest text-blue-600 uppercase">404</p>
      <h1 className="mt-3 text-3xl font-semibold text-slate-900">This page doesn’t exist</h1>
      <p className="mt-3 text-slate-600">
        The address may be mistyped, or the page may have moved.
      </p>
      <Link
        to={homeTo}
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        {homeLabel}
      </Link>
    </section>
  )
}
