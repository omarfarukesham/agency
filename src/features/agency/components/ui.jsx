import Reveal from '../../../components/common/Reveal.jsx'

export function Container({ className = '', children }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>
}

export function Eyebrow({ children, onDark = false }) {
  return (
    <p className={`text-xs font-semibold tracking-[0.18em] uppercase ${onDark ? 'text-blue-300' : 'text-blue-600'}`}>
      {children}
    </p>
  )
}

export function SectionHeading({ eyebrow, title, children, align = 'left', onDark = false }) {
  return (
    <Reveal className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow ? <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow> : null}
      <h2
        className={`mt-3 font-display text-3xl leading-tight font-semibold tracking-tight sm:text-4xl ${onDark ? 'text-white' : 'text-navy-900'}`}
      >
        {title}
      </h2>
      {children ? (
        <p className={`mt-4 text-lg leading-relaxed ${onDark ? 'text-slate-300' : 'text-slate-600'}`}>{children}</p>
      ) : null}
    </Reveal>
  )
}

/** Navy banner used at the top of every inner page. */
export function PageHero({ eyebrow, title, children }) {
  return (
    <section className="bg-navy-900">
      <Container className="py-16 sm:py-20">
        <div className="animate-rise max-w-3xl">
          <Eyebrow onDark>{eyebrow}</Eyebrow>
          <h1 className="mt-4 font-display text-4xl leading-tight font-semibold tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
          {children ? <p className="mt-5 text-lg leading-relaxed text-slate-300">{children}</p> : null}
        </div>
      </Container>
    </section>
  )
}
