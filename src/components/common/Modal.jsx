import { X } from 'lucide-react'
import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'

const SIZES = { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-2xl' }

/** Open dialogs, bottom to top. */
const openModals = []

/**
 * Accessible dialog. `variant="drawer"` docks it to the right edge.
 * Closes on Escape and backdrop click, locks body scroll and restores focus.
 */
export default function Modal({ open, onClose, title, description, size = 'md', variant = 'modal', children, footer }) {
  const titleId = useId()
  const panelRef = useRef(null)
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    if (!open) return undefined
    const previouslyFocused = document.activeElement
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    panelRef.current?.focus()

    const token = {}
    openModals.push(token)

    const onKeyDown = (event) => {
      // With stacked dialogs (a form over the drawer) only the top one reacts.
      if (openModals[openModals.length - 1] !== token) return
      if (event.key === 'Escape') {
        event.stopPropagation()
        onCloseRef.current?.()
      }
      if (event.key === 'Tab' && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        )
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && (document.activeElement === first || document.activeElement === panelRef.current)) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      openModals.splice(openModals.indexOf(token), 1)
      document.body.style.overflow = overflow
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus()
    }
  }, [open])

  if (!open) return null

  const isDrawer = variant === 'drawer'

  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex ${isDrawer ? 'justify-end' : 'items-end justify-center sm:items-center sm:p-4'}`}
    >
      <div
        className="animate-fade absolute inset-0 bg-slate-900/50"
        onClick={() => onClose?.()}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={
          isDrawer
            ? 'animate-slide-in relative flex h-full w-full max-w-xl flex-col bg-white shadow-2xl outline-none'
            : `animate-rise relative flex max-h-[92vh] w-full flex-col rounded-t-2xl bg-white shadow-2xl outline-none sm:rounded-xl ${SIZES[size]}`
        }
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4 sm:px-6">
          <div className="min-w-0">
            <h2 id={titleId} className="text-base font-semibold text-slate-900">
              {title}
            </h2>
            {description ? <p className="mt-0.5 text-sm text-slate-500">{description}</p> : null}
          </div>
          <button
            type="button"
            onClick={() => onClose?.()}
            className="-mr-1.5 rounded-md p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            aria-label="Close"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">{children}</div>
        {footer ? (
          <div className="flex flex-wrap items-center justify-end gap-2 border-t border-slate-200 bg-slate-50 px-5 py-3.5 sm:px-6 sm:rounded-b-xl">
            {footer}
          </div>
        ) : null}
      </div>
    </div>,
    document.body,
  )
}
