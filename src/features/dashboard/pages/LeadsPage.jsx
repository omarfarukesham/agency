import {
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  Eye,
  MessageSquarePlus,
  Pencil,
  Plus,
  Search,
  SearchX,
  Trash2,
  Users,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import ConfirmDialog from '../../../components/common/ConfirmDialog.jsx'
import { formatDate } from '../../../utils/format.js'
import StatusBadge from '../../leads/components/StatusBadge.jsx'
import { useLeads } from '../../leads/context/LeadsContext.js'
import { LEAD_SOURCES, LEAD_STATUSES } from '../../leads/utils/leadConstants.js'
import { matchesLeadSearch } from '../../leads/utils/leadSelectors.js'
import { Card, EmptyState, PageHeader } from '../components/Card.jsx'
import LeadFormModal from '../components/LeadFormModal.jsx'
import { btnPrimary, btnSecondary, control, iconBtn } from '../components/ui.js'
import { useDashboard } from '../hooks/useDashboard.js'

const PAGE_SIZE = 8

function StatusSelect({ lead, onChange }) {
  return (
    <>
      <label htmlFor={`status-${lead.id}`} className="sr-only">
        Change status for {lead.customerName}
      </label>
      <select
        id={`status-${lead.id}`}
        value={lead.status}
        onChange={(event) => onChange(lead, event.target.value)}
        className="rounded-md border border-slate-300 bg-white py-1.5 pr-7 pl-2 text-xs font-medium text-slate-700 focus:border-teal-600 focus:ring-2 focus:ring-teal-100 focus:outline-none"
      >
        {LEAD_STATUSES.map((status) => (
          <option key={status}>{status}</option>
        ))}
      </select>
    </>
  )
}

function RowActions({ lead, onView, onEdit, onDelete }) {
  return (
    <div className="flex items-center gap-0.5">
      <button type="button" onClick={() => onView(lead.id)} className={iconBtn} aria-label={`View ${lead.customerName}`} title="View details">
        <Eye className="size-4" aria-hidden="true" />
      </button>
      <button type="button" onClick={() => onView(lead.id)} className={iconBtn} aria-label={`Add a note for ${lead.customerName}`} title="Add note">
        <MessageSquarePlus className="size-4" aria-hidden="true" />
      </button>
      <button type="button" onClick={() => onEdit(lead)} className={iconBtn} aria-label={`Edit ${lead.customerName}`} title="Edit lead">
        <Pencil className="size-4" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => onDelete(lead)}
        className={`${iconBtn} hover:bg-red-50 hover:text-red-600`}
        aria-label={`Delete ${lead.customerName}`}
        title="Delete lead"
      >
        <Trash2 className="size-4" aria-hidden="true" />
      </button>
    </div>
  )
}

function SourceTag({ lead }) {
  if (lead.source === LEAD_SOURCES.SAMPLE) return null
  return (
    <span className="ml-2 rounded-full bg-teal-50 px-2 py-0.5 text-[11px] font-semibold text-teal-800 ring-1 ring-teal-200 ring-inset">
      {lead.source === LEAD_SOURCES.WEBSITE ? 'Website' : 'Manual'}
    </span>
  )
}

/**
 * A search from the header arrives as `?q=`. Keying the view on it restarts
 * the list with that query, while typing in the page's own search box stays
 * in local state so keystrokes never wait on a URL update.
 */
export default function LeadsPage() {
  const [params] = useSearchParams()
  const { state } = useLocation()
  const headerQuery = params.get('q') ?? ''
  return <LeadsView key={`${headerQuery}:${state?.searchId ?? ''}`} initialQuery={headerQuery} />
}

function LeadsView({ initialQuery }) {
  const { leads, services, updateLeadStatus, deleteLead } = useLeads()
  const { notify, openLead } = useDashboard()
  const [query, setQueryState] = useState(initialQuery)

  const [status, setStatus] = useState('All')
  const [service, setService] = useState('All')
  const [newestFirst, setNewestFirst] = useState(true)
  const [page, setPage] = useState(1)
  const [formLead, setFormLead] = useState(undefined) // undefined: closed, null: new, object: edit
  const [deleting, setDeleting] = useState(null)

  // Any change to the filters returns to the first page.
  const changeFilter = (setter) => (value) => {
    setter(value)
    setPage(1)
  }

  const setQuery = changeFilter(setQueryState)

  const filtered = useMemo(() => {
    const result = leads.filter(
      (lead) =>
        matchesLeadSearch(lead, query) &&
        (status === 'All' || lead.status === status) &&
        (service === 'All' || lead.serviceType === service),
    )
    result.sort((a, b) => {
      const diff = new Date(b.createdAt) - new Date(a.createdAt)
      return newestFirst ? diff : -diff
    })
    return result
  }, [leads, query, status, service, newestFirst])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, pageCount)
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
  const filtersActive = Boolean(query) || status !== 'All' || service !== 'All'

  const changeStatus = (lead, nextStatus) => {
    updateLeadStatus(lead.id, nextStatus)
    notify(`${lead.customerName} marked as ${nextStatus}`)
  }

  const clearFilters = () => {
    setQuery('')
    setStatus('All')
    setService('All')
  }

  const serviceNames = [...new Set([...services.map((item) => item.name), ...leads.map((lead) => lead.serviceType)])]
  const SortIcon = newestFirst ? ArrowDown : ArrowUp

  return (
    <>
      <PageHeader
        title="Leads"
        description="Every enquiry from your website, in one place."
        actions={
          <button type="button" onClick={() => setFormLead(null)} className={btnPrimary}>
            <Plus className="size-4" aria-hidden="true" />
            Add lead
          </button>
        }
      />

      <Card>
        <div className="grid gap-3 border-b border-slate-100 p-4 sm:grid-cols-2 lg:grid-cols-[1fr_auto_auto_auto]">
          <div className="relative sm:col-span-2 lg:col-span-1">
            <label htmlFor="lead-search" className="sr-only">
              Search by customer name, email or phone
            </label>
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              id="lead-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name, email or phone"
              className={`${control} pl-9`}
            />
          </div>
          <div>
            <label htmlFor="filter-status" className="sr-only">
              Filter by status
            </label>
            <select id="filter-status" value={status} onChange={(event) => changeFilter(setStatus)(event.target.value)} className={control}>
              <option value="All">All statuses</option>
              {LEAD_STATUSES.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="filter-service" className="sr-only">
              Filter by service
            </label>
            <select id="filter-service" value={service} onChange={(event) => changeFilter(setService)(event.target.value)} className={control}>
              <option value="All">All services</option>
              {serviceNames.map((name) => (
                <option key={name}>{name}</option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={() => changeFilter(setNewestFirst)(!newestFirst)}
            className={`${btnSecondary} sm:col-span-2 lg:col-span-1`}
            aria-label={`Sorted by submission date, ${newestFirst ? 'newest' : 'oldest'} first. Click to reverse.`}
          >
            <SortIcon className="size-4" aria-hidden="true" />
            {newestFirst ? 'Newest first' : 'Oldest first'}
          </button>
        </div>

        {visible.length === 0 ? (
          filtersActive ? (
            <EmptyState
              icon={SearchX}
              title="No leads match these filters"
              action={
                <button type="button" onClick={clearFilters} className={btnSecondary}>
                  Clear filters
                </button>
              }
            >
              Try a different name, or clear the filters to see every lead.
            </EmptyState>
          ) : (
            <EmptyState
              icon={Users}
              title="No leads yet"
              action={
                <button type="button" onClick={() => setFormLead(null)} className={btnPrimary}>
                  <Plus className="size-4" aria-hidden="true" />
                  Add your first lead
                </button>
              }
            >
              New enquiries from the website quote form will appear here automatically.
            </EmptyState>
          )
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-slate-100 bg-slate-50 text-xs font-semibold tracking-wide text-slate-500 uppercase">
                  <tr>
                    <th scope="col" className="px-5 py-3">Customer</th>
                    <th scope="col" className="px-3 py-3">Contact</th>
                    <th scope="col" className="px-3 py-3">Requested service</th>
                    <th scope="col" className="px-3 py-3" aria-sort={newestFirst ? 'descending' : 'ascending'}>
                      Submitted
                    </th>
                    <th scope="col" className="px-3 py-3">Preferred date</th>
                    <th scope="col" className="px-3 py-3">Status</th>
                    <th scope="col" className="px-3 py-3 pr-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {visible.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50/70">
                      <td className="px-5 py-3">
                        <button
                          type="button"
                          onClick={() => openLead(lead.id)}
                          className="text-left font-semibold text-slate-900 hover:text-teal-700 hover:underline"
                        >
                          {lead.customerName}
                        </button>
                        <SourceTag lead={lead} />
                        <p className="text-xs text-slate-400">{lead.id}</p>
                      </td>
                      <td className="px-3 py-3">
                        <p className="max-w-52 truncate text-slate-700">{lead.email}</p>
                        <p className="text-xs whitespace-nowrap text-slate-500">{lead.phone}</p>
                      </td>
                      <td className="px-3 py-3 text-slate-700">{lead.serviceType}</td>
                      <td className="px-3 py-3 whitespace-nowrap text-slate-600">{formatDate(lead.createdAt)}</td>
                      <td className="px-3 py-3 whitespace-nowrap text-slate-600">
                        {lead.preferredDate ? formatDate(lead.preferredDate) : '—'}
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex flex-col items-start gap-1.5">
                          <StatusBadge status={lead.status} />
                          <StatusSelect lead={lead} onChange={changeStatus} />
                        </div>
                      </td>
                      <td className="px-3 py-3 pr-5">
                        <div className="flex justify-end">
                          <RowActions lead={lead} onView={openLead} onEdit={setFormLead} onDelete={setDeleting} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile and tablet cards */}
            <ul className="divide-y divide-slate-100 lg:hidden">
              {visible.map((lead) => (
                <li key={lead.id} className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <button
                        type="button"
                        onClick={() => openLead(lead.id)}
                        className="text-left text-sm font-semibold text-slate-900 hover:text-teal-700"
                      >
                        {lead.customerName}
                      </button>
                      <SourceTag lead={lead} />
                      <p className="truncate text-xs text-slate-500">{lead.email}</p>
                      <p className="text-xs text-slate-500">{lead.phone}</p>
                    </div>
                    <StatusBadge status={lead.status} />
                  </div>
                  <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <dt className="text-slate-400">Service</dt>
                      <dd className="font-medium text-slate-700">{lead.serviceType}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-400">Submitted</dt>
                      <dd className="font-medium text-slate-700">{formatDate(lead.createdAt)}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-400">Preferred date</dt>
                      <dd className="font-medium text-slate-700">
                        {lead.preferredDate ? formatDate(lead.preferredDate) : '—'}
                      </dd>
                    </div>
                  </dl>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <StatusSelect lead={lead} onChange={changeStatus} />
                    <RowActions lead={lead} onView={openLead} onEdit={setFormLead} onDelete={setDeleting} />
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 px-5 py-3 text-sm text-slate-500 sm:flex-row">
              <p aria-live="polite">
                Showing {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filtered.length)} of{' '}
                {filtered.length} lead{filtered.length === 1 ? '' : 's'}
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={btnSecondary}
                >
                  <ChevronLeft className="size-4" aria-hidden="true" />
                  Previous
                </button>
                <span className="px-1 tabular-nums">
                  Page {currentPage} of {pageCount}
                </span>
                <button
                  type="button"
                  onClick={() => setPage(currentPage + 1)}
                  disabled={currentPage === pageCount}
                  className={btnSecondary}
                >
                  Next
                  <ChevronRight className="size-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </>
        )}
      </Card>

      <LeadFormModal
        open={formLead !== undefined}
        onClose={() => setFormLead(undefined)}
        lead={formLead ?? null}
        onSaved={(message, created) => {
          notify(message)
          if (created) openLead(created.id)
        }}
      />
      <ConfirmDialog
        open={Boolean(deleting)}
        title="Delete this lead?"
        message={
          deleting
            ? `${deleting.customerName} (${deleting.id}) and any follow-ups will be permanently removed. This cannot be undone.`
            : ''
        }
        confirmLabel="Delete lead"
        onCancel={() => setDeleting(null)}
        onConfirm={() => {
          deleteLead(deleting.id)
          notify(`${deleting.customerName} deleted`)
          setDeleting(null)
        }}
      />
    </>
  )
}
