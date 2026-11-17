const base =
  'inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2'

/** Button class strings for the agency site. */
export const btn = {
  primary: `${base} bg-blue-600 text-white hover:bg-blue-500`,
  dark: `${base} bg-navy-900 text-white hover:bg-navy-700`,
  outline: `${base} border border-slate-300 bg-white text-navy-900 hover:border-navy-900`,
  outlineOnDark: `${base} border border-white/25 text-white hover:border-white hover:bg-white/5`,
}
