import { ArrowRight, CalendarClock, CircleCheck, FileText, Inbox, PhoneCall, Users } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { formatDate, formatShortDate } from '../../../utils/format.js'
import StatusBadge from '../../leads/components/StatusBadge.jsx'
import { useLeads } from '../../leads/context/LeadsContext.js'
import {
  byNewest,
  countByService,
  countByStatus,
  isOverdue,
  leadsPerDay,
  pendingFollowUps,
} from '../../leads/utils/leadSelectors.js'
import ActivityItem from '../components/ActivityItem.jsx'
import { Card, CardHeader, EmptyState, PageHeader } from '../components/Card.jsx'
import { LeadsByServiceChart, LeadsOverTimeChart, StatusDistributionChart } from '../components/Charts.jsx'
import { useDashboard } from '../hooks/useDashboard.js'

const viewAll = 'inline-flex items-center gap-1 text-xs font-semibold text-teal-700 hover:text-teal-800'

function Kpi({ label, value, icon: Icon, tone, hint }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <span className={`flex size-8 items-center justify-center rounded-lg ${tone}`}>
          <Icon className="size-4" aria-hidden="true" />
        </span>
      </div>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 tabular-nums">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{hint}</p>
    </div>
  )
}

export default function OverviewPage() {
  const { leads, followUps, activities, services } = useLeads()
  const { openLead } = useDashboard()
  const [today] = useState(() => new Date())

  const counts = countByStatus(leads)
  const recentLeads = [...leads].sort(byNewest).slice(0, 6)
  const upcoming = pendingFollowUps(followUps).slice(0, 5)
  const recentActivity = [...activities].sort(byNewest).slice(0, 7)
  const leadById = new Map(leads.map((lead) => [lead.id, lead]))
  const conversion = leads.length ? Math.round((counts.Converted / leads.length) * 100) : 0

  const kpis = [
    { label: 'Total Leads', value: leads.length, icon: Users, tone: 'bg-slate-100 text-slate-700', hint: 'All enquiries received' },
    { label: 'New Leads', value: counts.New, icon: Inbox, tone: 'bg-blue-50 text-blue-600', hint: 'Waiting for a first reply' },
    { label: 'Contacted', value: counts.Contacted, icon: PhoneCall, tone: 'bg-amber-50 text-amber-700', hint: 'In conversation' },
    { label: 'Quotes Sent', value: counts['Quote Sent'], icon: FileText, tone: 'bg-violet-50 text-violet-600', hint: 'Awaiting a decision' },
    { label: 'Converted', value: counts.Converted, icon: CircleCheck, tone: 'bg-emerald-50 text-emerald-600', hint: `${conversion}% of all leads` },
  ]

  return (
    <>
      <PageHeader
        title="Overview"
        description={`${formatDate(today, { weekday: 'long', month: 'long', day: 'numeric' })} · Here is where your enquiries stand.`}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        {kpis.map((kpi, index) => (
          <div key={kpi.label} className={index === 0 ? 'col-span-2 lg:col-span-1' : ''}>
            <Kpi {...kpi} />
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="min-w-0 lg:col-span-2">
          <CardHeader title="Leads over time" description="New enquiries per day, last 14 days" />
          <div className="p-5">
            <LeadsOverTimeChart data={leadsPerDay(leads, 14)} />
          </div>
        </Card>

        <Card className="min-w-0">
          <CardHeader title="Lead status" description="Where every lead is in the pipeline" />
          <div className="p-5">
            <StatusDistributionChart counts={counts} />
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="min-w-0 lg:col-span-2">
          <CardHeader
            title="Recent leads"
            action={
              <Link to="/demo/dashboard/leads" className={viewAll}>
                View all <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            }
          />
          {recentLeads.length === 0 ? (
            <EmptyState icon={Inbox} title="No leads yet">
              Enquiries from the website quote form will appear here.
            </EmptyState>
          ) : (
            <ul className="divide-y divide-slate-100">
              {recentLeads.map((lead) => (
                <li key={lead.id}>
                  <button
                    type="button"
                    onClick={() => openLead(lead.id)}
                    className="flex w-full items-center gap-3 px-5 py-3 text-left hover:bg-slate-50"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-900">{lead.customerName}</p>
                      <p className="truncate text-xs text-slate-500">
                        {lead.serviceType} · {formatShortDate(lead.createdAt)}
                      </p>
                    </div>
                    <StatusBadge status={lead.status} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card className="min-w-0">
          <CardHeader title="Leads by service" description="What customers are asking for" />
          <div className="p-5">
            <LeadsByServiceChart data={countByService(leads, services)} />
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="min-w-0">
          <CardHeader
            title="Upcoming follow-ups"
            action={
              <Link to="/demo/dashboard/follow-ups" className={viewAll}>
                View all <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            }
          />
          {upcoming.length === 0 ? (
            <EmptyState icon={CalendarClock} title="Nothing to follow up">
              Schedule a follow-up from any lead to see it here.
            </EmptyState>
          ) : (
            <ul className="divide-y divide-slate-100">
              {upcoming.map((item) => {
                const lead = leadById.get(item.leadId)
                const overdue = isOverdue(item)
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => openLead(item.leadId)}
                      className="flex w-full items-start gap-3 px-5 py-3 text-left hover:bg-slate-50"
                    >
                      <span
                        className={`mt-0.5 w-14 shrink-0 rounded-md py-1 text-center text-xs font-semibold ${
                          overdue ? 'bg-red-50 text-red-700' : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {formatShortDate(item.dueDate)}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-slate-900">
                          {lead?.customerName ?? 'Deleted lead'}
                        </span>
                        <span className="block truncate text-xs text-slate-500">{item.note}</span>
                      </span>
                      {overdue ? <span className="text-xs font-semibold text-red-600">Overdue</span> : null}
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </Card>

        <Card className="min-w-0">
          <CardHeader
            title="Recent activity"
            action={
              <Link to="/demo/dashboard/activity" className={viewAll}>
                View all <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            }
          />
          <ul className="space-y-4 p-5">
            {recentActivity.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} onOpenLead={openLead} />
            ))}
          </ul>
        </Card>
      </div>
    </>
  )
}
