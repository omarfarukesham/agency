export default function Logo({ onDark = true }) {
  return (
    <span className="flex items-center gap-2.5">
      <svg viewBox="0 0 32 32" className="size-8" aria-hidden="true">
        <rect width="32" height="32" rx="7" className={onDark ? 'fill-white/10' : 'fill-navy-900'} />
        <circle cx="16" cy="16" r="8.5" fill="none" stroke="#3b82f6" strokeWidth="2.5" />
        <path
          d="M7.5 16h17M16 7.5c3.2 2.4 3.2 14.6 0 17M16 7.5c-3.2 2.4-3.2 14.6 0 17"
          fill="none"
          stroke="#fff"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <span className={`font-display text-lg font-semibold tracking-tight ${onDark ? 'text-white' : 'text-navy-900'}`}>
        Techsphere<span className="text-blue-400">64</span>
      </span>
    </span>
  )
}
