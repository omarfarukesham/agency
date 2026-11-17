import { Sparkles } from 'lucide-react'

export default function SparkleLogo({ light = false }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="flex size-9 items-center justify-center rounded-xl bg-linear-to-br from-sky-400 to-teal-500 text-white">
        <Sparkles className="size-5" aria-hidden="true" />
      </span>
      <span className="leading-tight">
        <span className={`block text-lg font-extrabold tracking-tight ${light ? 'text-white' : 'text-slate-900'}`}>
          SparklePro
        </span>
        <span className={`block text-[11px] font-semibold tracking-wide ${light ? 'text-sky-200' : 'text-teal-700'}`}>
          Cleaning Co.
        </span>
      </span>
    </span>
  )
}
