import { card } from './ui.js'

export function Card({ className = '', children, ...rest }) {
  return (
    <section className={`${card} ${className}`} {...rest}>
      {children}
    </section>
  )
}

export function CardHeader({ title, description, action }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-slate-100 px-5 py-4">
      <div className="min-w-0">
        <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
        {description ? <p className="mt-0.5 text-xs text-slate-500">{description}</p> : null}
      </div>
      {action}
    </div>
  )
}

export function EmptyState({ icon: Icon, title, children, action }) {
  return (
    <div className="flex flex-col items-center px-6 py-12 text-center">
      {Icon ? (
        <span className="flex size-11 items-center justify-center rounded-full bg-slate-100 text-slate-500">
          <Icon className="size-5" aria-hidden="true" />
        </span>
      ) : null}
      <p className="mt-3 text-sm font-semibold text-slate-900">{title}</p>
      {children ? <p className="mt-1 max-w-sm text-sm text-slate-500">{children}</p> : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  )
}

export function PageHeader({ title, description, actions }) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">{title}</h1>
        {description ? <p className="mt-1 text-sm text-slate-500">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  )
}
