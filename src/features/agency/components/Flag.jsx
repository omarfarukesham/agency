/**
 * Country flag from /public/images/flags (ISO 3166 alpha-2 code).
 * Images instead of emoji, because Windows does not render flag emoji.
 */
export default function Flag({ code, label, className = 'h-4 w-6 rounded-[3px]' }) {
  return (
    <img
      src={`/images/flags/${code.toLowerCase()}.svg`}
      alt={label ?? ''}
      aria-hidden={label ? undefined : true}
      width="24"
      height="16"
      loading="lazy"
      className={`shrink-0 object-cover ring-1 ring-black/10 ${className}`}
    />
  )
}
