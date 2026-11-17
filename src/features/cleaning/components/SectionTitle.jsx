export default function SectionTitle({ eyebrow, title, children, align = 'center' }) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow ? <p className="text-sm font-bold tracking-wide text-teal-700 uppercase">{eyebrow}</p> : null}
      <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
      {children ? <p className="mt-4 text-lg leading-relaxed text-slate-600">{children}</p> : null}
    </div>
  )
}
