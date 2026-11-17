import {
  ACTIVITY_TYPES as T,
  FOLLOW_UP_STATUS,
  LEAD_SOURCES,
} from '../features/leads/utils/leadConstants.js'
import { dateKey } from '../utils/format.js'

/**
 * Fictional sample leads. Names, emails (example.com) and phone numbers
 * (555-01xx range) are invented. Dates are stored as offsets so the demo
 * always looks recent on first visit.
 *
 * daysAgo/hour: when the enquiry arrived. preferredIn: days from today.
 * history: status changes and notes after submission, as [daysAgo, hour, kind, value].
 */
const SAMPLE_LEADS = [
  {
    customerName: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+1 512 555 0100',
    serviceType: 'Deep Cleaning',
    propertyType: 'Home',
    propertySize: '3 Bedrooms',
    preferredIn: 6,
    preferredTime: 'Morning',
    address: 'Zilker, Austin, TX',
    message: 'Looking for a deep clean before family visits next weekend. We have one dog.',
    daysAgo: 0,
    hour: 8,
    history: [],
  },
  {
    customerName: 'Marcus Rivera',
    email: 'marcus.rivera@example.com',
    phone: '+1 512 555 0117',
    serviceType: 'Office Cleaning',
    propertyType: 'Office',
    propertySize: 'Small office (under 1,500 sq ft)',
    preferredIn: 9,
    preferredTime: 'Evening',
    address: 'Downtown Austin, TX',
    message: 'Twelve-person office. We need cleaning twice a week after 6pm.',
    daysAgo: 1,
    hour: 14,
    history: [],
  },
  {
    customerName: 'Emily Chen',
    email: 'emily.chen@example.com',
    phone: '+1 512 555 0123',
    serviceType: 'Recurring Cleaning',
    propertyType: 'Apartment',
    propertySize: '2 Bedrooms',
    preferredIn: 4,
    preferredTime: 'Afternoon',
    address: 'Mueller, Austin, TX',
    message: 'Interested in bi-weekly cleaning. Do you bring your own supplies?',
    daysAgo: 2,
    hour: 10,
    history: [
      [1, 9, 'status', 'Contacted'],
      [1, 9, 'note', 'Called Emily. She prefers eco-friendly products and Thursday afternoons.'],
    ],
  },
  {
    customerName: 'David Thompson',
    email: 'david.thompson@example.com',
    phone: '+1 512 555 0131',
    serviceType: 'Move-In / Move-Out Cleaning',
    propertyType: 'Home',
    propertySize: '4+ Bedrooms',
    preferredIn: 3,
    preferredTime: 'Morning',
    address: 'Round Rock, TX',
    message: 'Moving out at the end of the month. The landlord needs the place handed back clean.',
    daysAgo: 3,
    hour: 16,
    history: [
      [3, 17, 'status', 'Contacted'],
      [2, 11, 'status', 'Quote Sent'],
      [2, 11, 'note', 'Quoted $340 for a 4-bedroom move-out clean including inside the oven and fridge.'],
    ],
  },
  {
    customerName: 'Priya Patel',
    email: 'priya.patel@example.com',
    phone: '+1 512 555 0148',
    serviceType: 'Standard House Cleaning',
    propertyType: 'Home',
    propertySize: '3 Bedrooms',
    preferredIn: 5,
    preferredTime: 'Flexible',
    address: 'Cedar Park, TX',
    message: 'First time booking a cleaner. Could you tell me roughly how long a visit takes?',
    daysAgo: 4,
    hour: 9,
    history: [
      [4, 12, 'status', 'Contacted'],
      [3, 10, 'status', 'Quote Sent'],
      [2, 15, 'status', 'Follow-up'],
      [2, 15, 'note', 'Priya is comparing two quotes. Check back in after the weekend.'],
    ],
    followUp: { dueIn: 1, note: 'Call to see whether she has decided on the quote.' },
  },
  {
    customerName: 'James Walker',
    email: 'james.walker@example.com',
    phone: '+1 512 555 0155',
    serviceType: 'Deep Cleaning',
    propertyType: 'Apartment',
    propertySize: 'Studio / 1 Bedroom',
    preferredIn: -2,
    preferredTime: 'Afternoon',
    address: 'East Austin, TX',
    message: 'One-bedroom apartment. Kitchen and bathroom need the most attention.',
    daysAgo: 6,
    hour: 13,
    history: [
      [6, 15, 'status', 'Contacted'],
      [5, 9, 'status', 'Quote Sent'],
      [4, 10, 'status', 'Converted'],
      [4, 10, 'note', 'Booked. James paid the deposit and confirmed the afternoon slot.'],
    ],
  },
  {
    customerName: 'Olivia Martinez',
    email: 'olivia.martinez@example.com',
    phone: '+1 512 555 0162',
    serviceType: 'Recurring Cleaning',
    propertyType: 'Home',
    propertySize: '2 Bedrooms',
    preferredIn: 2,
    preferredTime: 'Morning',
    address: 'South Congress, Austin, TX',
    message: 'Weekly cleaning, ideally on Tuesday mornings.',
    daysAgo: 7,
    hour: 11,
    history: [
      [7, 13, 'status', 'Contacted'],
      [6, 10, 'status', 'Quote Sent'],
      [5, 16, 'status', 'Converted'],
      [5, 16, 'note', 'Signed up for weekly visits starting next Tuesday.'],
    ],
  },
  {
    customerName: 'Ethan Brooks',
    email: 'ethan.brooks@example.com',
    phone: '+1 512 555 0170',
    serviceType: 'Office Cleaning',
    propertyType: 'Office',
    propertySize: 'Large office (1,500+ sq ft)',
    preferredIn: 12,
    preferredTime: 'Evening',
    address: 'The Domain, Austin, TX',
    message: 'We are reviewing cleaning providers for our new office. Please send pricing.',
    daysAgo: 8,
    hour: 15,
    history: [
      [8, 16, 'status', 'Contacted'],
      [7, 9, 'status', 'Quote Sent'],
      [5, 9, 'status', 'Follow-up'],
    ],
    followUp: { dueIn: -1, note: 'Send the revised quote for three visits per week.' },
  },
  {
    customerName: 'Hannah Kim',
    email: 'hannah.kim@example.com',
    phone: '+1 512 555 0186',
    serviceType: 'Standard House Cleaning',
    propertyType: 'Apartment',
    propertySize: '2 Bedrooms',
    preferredIn: -4,
    preferredTime: 'Flexible',
    address: 'Hyde Park, Austin, TX',
    message: 'Just need a one-off clean this month.',
    daysAgo: 10,
    hour: 10,
    history: [
      [10, 14, 'status', 'Contacted'],
      [9, 9, 'status', 'Quote Sent'],
      [6, 12, 'status', 'Lost'],
      [6, 12, 'note', 'Hannah went with another provider who could come sooner.'],
    ],
  },
  {
    customerName: 'Noah Bennett',
    email: 'noah.bennett@example.com',
    phone: '+1 512 555 0193',
    serviceType: 'Move-In / Move-Out Cleaning',
    propertyType: 'Apartment',
    propertySize: '2 Bedrooms',
    preferredIn: 8,
    preferredTime: 'Morning',
    address: 'Pflugerville, TX',
    message: 'Moving into a new apartment and would like it cleaned before the furniture arrives.',
    daysAgo: 11,
    hour: 17,
    history: [
      [10, 9, 'status', 'Contacted'],
      [10, 9, 'note', 'Left a voicemail and sent the service checklist.'],
    ],
    followUp: { dueIn: 2, note: 'Try calling again. Confirm the move-in date.' },
  },
  {
    customerName: 'Grace Nguyen',
    email: 'grace.nguyen@example.com',
    phone: '+1 512 555 0199',
    serviceType: 'Deep Cleaning',
    propertyType: 'Home',
    propertySize: '4+ Bedrooms',
    preferredIn: -6,
    preferredTime: 'Morning',
    address: 'Westlake, Austin, TX',
    message: 'Post-renovation deep clean. There is a lot of dust.',
    daysAgo: 13,
    hour: 9,
    history: [
      [13, 11, 'status', 'Contacted'],
      [12, 10, 'status', 'Quote Sent'],
      [11, 14, 'status', 'Converted'],
    ],
    followUp: {
      dueIn: -3,
      note: 'Ask how the clean went and offer a recurring plan.',
      completed: true,
    },
  },
]

function at(now, daysAgo, hour, minute = 0) {
  const d = new Date(now)
  d.setDate(d.getDate() - daysAgo)
  d.setHours(hour, minute, 0, 0)
  // Never seed anything in the future relative to "now".
  return (d > now ? new Date(now.getTime() - 5 * 60 * 1000) : d).toISOString()
}

/** Builds the full initial database: leads, follow-ups and matching activity. */
export function buildSeedData(now = new Date()) {
  const leads = []
  const followUps = []
  const activities = []
  let activityCount = 0
  let followUpCount = 0

  const log = (type, lead, message, createdAt) => {
    activityCount += 1
    activities.push({
      id: `ACT-${String(activityCount).padStart(4, '0')}`,
      type,
      leadId: lead.id,
      customerName: lead.customerName,
      message,
      createdAt,
    })
  }

  // Oldest first so IDs increase with time.
  const ordered = [...SAMPLE_LEADS].sort((a, b) => b.daysAgo - a.daysAgo || a.hour - b.hour)

  ordered.forEach((sample, index) => {
    const { daysAgo, hour, preferredIn, history, followUp, ...fields } = sample
    const createdAt = at(now, daysAgo, hour, 12)
    const lead = {
      id: `LEAD-${1001 + index}`,
      ...fields,
      preferredDate: dateKey(now, preferredIn),
      status: 'New',
      notes: [],
      source: LEAD_SOURCES.SAMPLE,
      createdAt,
      updatedAt: createdAt,
    }
    log(T.LEAD_CREATED, lead, `New enquiry for ${lead.serviceType}`, createdAt)

    history.forEach(([ago, h, kind, value], step) => {
      const when = at(now, ago, h, 20 + step)
      if (kind === 'status') {
        log(T.STATUS_CHANGED, lead, `Status changed from ${lead.status} to ${value}`, when)
        lead.status = value
      } else {
        lead.notes.push({ id: `NOTE-${lead.id}-${step}`, text: value, createdAt: when })
        log(T.NOTE_ADDED, lead, `Note added: “${value}”`, when)
      }
      lead.updatedAt = when
    })

    if (followUp) {
      followUpCount += 1
      const scheduledAt = lead.updatedAt
      const item = {
        id: `FU-${String(100 + followUpCount)}`,
        leadId: lead.id,
        dueDate: dateKey(now, followUp.dueIn),
        note: followUp.note,
        status: followUp.completed ? FOLLOW_UP_STATUS.COMPLETED : FOLLOW_UP_STATUS.PENDING,
        createdAt: scheduledAt,
        completedAt: null,
      }
      log(T.FOLLOW_UP_SCHEDULED, lead, `Follow-up scheduled: ${followUp.note}`, scheduledAt)
      if (followUp.completed) {
        item.completedAt = at(now, Math.max(0, -followUp.dueIn), 15, 5)
        log(T.FOLLOW_UP_COMPLETED, lead, `Follow-up completed: ${followUp.note}`, item.completedAt)
      }
      followUps.push(item)
    }

    leads.push(lead)
  })

  return {
    leads,
    followUps,
    activities,
    counters: {
      lead: 1001 + leads.length,
      followUp: 100 + followUpCount + 1,
      activity: activityCount + 1,
    },
  }
}
