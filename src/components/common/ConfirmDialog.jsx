import { TriangleAlert } from 'lucide-react'
import Modal from './Modal.jsx'

/** Confirmation step for destructive actions. */
export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
}) {
  return (
    <Modal
      open={open}
      onClose={onCancel}
      title={title}
      size="sm"
      footer={
        <>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-md bg-red-600 px-3.5 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            {confirmLabel}
          </button>
        </>
      }
    >
      <div className="flex gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
          <TriangleAlert className="size-4.5" aria-hidden="true" />
        </span>
        <p className="pt-1.5 text-sm leading-relaxed text-slate-600">{message}</p>
      </div>
    </Modal>
  )
}
