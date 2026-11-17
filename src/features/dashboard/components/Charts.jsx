import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { LEAD_STATUSES, STATUS_STYLES } from '../../leads/utils/leadConstants.js'

const AXIS = { fontSize: 12, fill: '#64748b' }
const TOOLTIP = {
  contentStyle: {
    borderRadius: 8,
    border: '1px solid #e2e8f0',
    boxShadow: '0 8px 24px rgb(15 23 42 / 0.08)',
    fontSize: 12,
  },
  labelStyle: { color: '#0f172a', fontWeight: 600 },
}

export function LeadsOverTimeChart({ data }) {
  const total = data.reduce((sum, day) => sum + day.leads, 0)
  return (
    <div
      className="h-64"
      role="img"
      aria-label={`Line chart of new leads per day. ${total} leads over the last ${data.length} days.`}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
          <defs>
            <linearGradient id="leadsFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0d9488" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#0d9488" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#f1f5f9" vertical={false} />
          <XAxis dataKey="label" tick={AXIS} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} minTickGap={24} />
          <YAxis allowDecimals={false} tick={AXIS} tickLine={false} axisLine={false} />
          <Tooltip {...TOOLTIP} cursor={{ stroke: '#94a3b8', strokeDasharray: '3 3' }} />
          <Area
            type="monotone"
            dataKey="leads"
            name="New leads"
            stroke="#0d9488"
            strokeWidth={2}
            fill="url(#leadsFill)"
            dot={{ r: 2.5, fill: '#0d9488', strokeWidth: 0 }}
            activeDot={{ r: 5 }}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export function LeadsByServiceChart({ data }) {
  return (
    <div
      className="h-64"
      role="img"
      aria-label={`Bar chart of leads by service: ${data.map((item) => `${item.fullName} ${item.leads}`).join(', ')}.`}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 16, left: 8, bottom: 0 }} barCategoryGap="28%">
          <CartesianGrid stroke="#f1f5f9" horizontal={false} />
          <XAxis type="number" allowDecimals={false} tick={AXIS} tickLine={false} axisLine={false} />
          <YAxis type="category" dataKey="name" width={84} tick={AXIS} tickLine={false} axisLine={false} />
          <Tooltip {...TOOLTIP} cursor={{ fill: '#f8fafc' }} />
          <Bar dataKey="leads" name="Leads" fill="#0ea5e9" radius={[0, 4, 4, 0]} isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function StatusDistributionChart({ counts }) {
  const data = LEAD_STATUSES.map((status) => ({ name: status, value: counts[status] ?? 0 }))
  const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row lg:flex-col xl:flex-row">
      <div
        className="relative size-44 shrink-0"
        role="img"
        aria-label={`Donut chart of lead statuses: ${data.map((item) => `${item.name} ${item.value}`).join(', ')}.`}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={total > 0 ? data.filter((item) => item.value > 0) : [{ name: 'No leads', value: 1 }]}
              dataKey="value"
              nameKey="name"
              innerRadius={54}
              outerRadius={80}
              paddingAngle={total > 0 ? 2 : 0}
              stroke="none"
              isAnimationActive={false}
            >
              {total > 0 ? (
                data
                  .filter((item) => item.value > 0)
                  .map((item) => <Cell key={item.name} fill={STATUS_STYLES[item.name].color} />)
              ) : (
                <Cell fill="#e2e8f0" />
              )}
            </Pie>
            {total > 0 ? <Tooltip {...TOOLTIP} /> : null}
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold text-slate-900">{total}</span>
          <span className="text-xs text-slate-500">leads</span>
        </div>
      </div>

      <ul className="w-full space-y-2 text-sm">
        {data.map((item) => (
          <li key={item.name} className="flex items-center gap-2">
            <span className={`size-2.5 rounded-full ${STATUS_STYLES[item.name].dot}`} aria-hidden="true" />
            <span className="flex-1 text-slate-600">{item.name}</span>
            <span className="font-semibold text-slate-900 tabular-nums">{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
