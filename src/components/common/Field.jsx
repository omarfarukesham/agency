import { CircleAlert } from 'lucide-react'

/**
 * Label + control + inline error. Pass the control as children and give it
 * the same `id` as `htmlFor` (useForm's field() does this for you).
 */
export default function Field({ label, htmlFor, error, hint, required, className = '', children }) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-slate-800">
        {label}
        {required ? (
          <span className="text-red-500" aria-hidden="true">
            {' '}
            *
          </span>
        ) : (
          <span className="font-normal text-slate-400"> (optional)</span>
        )}
      </label>
      {children}
      {hint && !error ? <p className="mt-1.5 text-xs text-slate-500">{hint}</p> : null}
      {error ? (
        <p id={`${htmlFor}-error`} role="alert" className="mt-1.5 flex items-start gap-1.5 text-xs font-medium text-red-600">
          <CircleAlert className="mt-px size-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : null}
    </div>
  )
}
