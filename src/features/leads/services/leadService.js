import { buildSeedData } from '../../../data/demoLeads.js'
import { demoServices, demoSettings } from '../../../data/demoServices.js'
import {
  ACTIVITY_TYPES as T,
  FOLLOW_UP_STATUS,
  LEAD_SOURCES,
  LEAD_STATUSES,
} from '../utils/leadConstants.js'
import { formatDate } from '../../../utils/format.js'
import { storage } from './storage.js'

/**
 * Single source of truth for the SparklePro demo.
 * All reads and writes go through this module; UI code never touches
 * localStorage directly. Swapping this file for real API calls is the
 * only change needed to connect a backend later.
 */
export const STORAGE_KEY = 'techsphere64:sparklepro-demo:v1'

const clone = (value) => JSON.parse(JSON.stringify(value))

function seed() {
  const db = {
    ...buildSeedData(new Date()),
    services: clone(demoServices),
    settings: clone(demoSettings),
    seededAt: new Date().toISOString(),
  }
  storage.set(STORAGE_KEY, db)
  return db
}

/** Loads the database, seeding sample data on the first visit only. */
function load() {
  const db = storage.get(STORAGE_KEY)
  if (db && Array.isArray(db.leads) && db.counters) return db
  return seed()
}

function save(db) {
  storage.set(STORAGE_KEY, db)
  return db
}

function logActivity(db, type, lead, message, createdAt = new Date().toISOString()) {
  const id = `ACT-${String(db.counters.activity).padStart(4, '0')}`
  db.counters.activity += 1
  db.activities.push({
    id,
    type,
    leadId: lead?.id ?? null,
    customerName: lead?.customerName ?? null,
    message,
    createdAt,
  })
}

function findLead(db, id) {
  const lead = db.leads.find((item) => item.id === id)
  if (!lead) throw new Error(`Lead ${id} was not found`)
  return lead
}

const LEAD_FIELDS = [
  'customerName',
  'email',
  'phone',
  'serviceType',
  'propertyType',
  'propertySize',
  'preferredDate',
  'preferredTime',
  'address',
  'message',
]

function pickLeadFields(data) {
  const picked = {}
  for (const key of LEAD_FIELDS) {
    if (data[key] !== undefined) picked[key] = String(data[key]).trim()
  }
  return picked
}

/* ----------------------------- Leads ----------------------------- */

export function getDatabase() {
  return load()
}

export function getLeads() {
  return load().leads
}

export function getLead(id) {
  return load().leads.find((lead) => lead.id === id) ?? null
}

/**
 * Creates a lead with status "New". Website submissions also log the
 * simulated acknowledgement and owner notification (no message is sent).
 */
export function createLead(data, { source = LEAD_SOURCES.WEBSITE } = {}) {
  const db = load()
  const now = new Date().toISOString()
  const lead = {
    id: `LEAD-${db.counters.lead}`,
    ...pickLeadFields(data),
    status: 'New',
    notes: [],
    source,
    createdAt: now,
    updatedAt: now,
  }
  db.counters.lead += 1
  db.leads.push(lead)

  if (source === LEAD_SOURCES.WEBSITE) {
    logActivity(db, T.LEAD_CREATED, lead, `New enquiry for ${lead.serviceType} from the website quote form`, now)
    logActivity(
      db,
      T.SIMULATED_MESSAGE,
      lead,
      `Demo: acknowledgement to ${lead.email} simulated. No email was sent.`,
      now,
    )
    if (db.settings.notifications.emailOnNewLead) {
      logActivity(
        db,
        T.SIMULATED_MESSAGE,
        lead,
        `Demo: new-lead alert to ${db.settings.businessEmail} simulated. No email was sent.`,
        now,
      )
    }
  } else {
    logActivity(db, T.LEAD_CREATED, lead, `Lead added manually for ${lead.serviceType}`, now)
  }

  save(db)
  return lead
}

export function updateLead(id, updates) {
  const db = load()
  const lead = findLead(db, id)
  Object.assign(lead, pickLeadFields(updates), { updatedAt: new Date().toISOString() })
  logActivity(db, T.LEAD_UPDATED, lead, 'Lead details edited')
  save(db)
  return lead
}

export function deleteLead(id) {
  const db = load()
  const lead = findLead(db, id)
  db.leads = db.leads.filter((item) => item.id !== id)
  db.followUps = db.followUps.filter((item) => item.leadId !== id)
  logActivity(db, T.LEAD_DELETED, lead, `Lead ${lead.id} deleted`)
  save(db)
  return lead
}

export function updateLeadStatus(id, status) {
  if (!LEAD_STATUSES.includes(status)) throw new Error(`Unknown status: ${status}`)
  const db = load()
  const lead = findLead(db, id)
  if (lead.status === status) return lead
  const previous = lead.status
  lead.status = status
  lead.updatedAt = new Date().toISOString()
  logActivity(db, T.STATUS_CHANGED, lead, `Status changed from ${previous} to ${status}`)
  save(db)
  return lead
}

export function addLeadNote(id, text) {
  const note = String(text ?? '').trim()
  if (!note) throw new Error('A note cannot be empty')
  const db = load()
  const lead = findLead(db, id)
  const now = new Date().toISOString()
  lead.notes.push({ id: `NOTE-${Date.now()}`, text: note, createdAt: now })
  lead.updatedAt = now
  logActivity(db, T.NOTE_ADDED, lead, `Note added: “${note}”`, now)
  save(db)
  return lead
}

/* --------------------------- Follow-ups --------------------------- */

export function getFollowUps() {
  return load().followUps
}

/**
 * Schedules a follow-up. Open leads move to the "Follow-up" status so the
 * pipeline reflects that the next step is on the business.
 */
export function createFollowUp({ leadId, dueDate, note }) {
  const db = load()
  const lead = findLead(db, leadId)
  const now = new Date().toISOString()
  const followUp = {
    id: `FU-${db.counters.followUp}`,
    leadId,
    dueDate,
    note: String(note ?? '').trim(),
    status: FOLLOW_UP_STATUS.PENDING,
    createdAt: now,
    completedAt: null,
  }
  db.counters.followUp += 1
  db.followUps.push(followUp)
  logActivity(db, T.FOLLOW_UP_SCHEDULED, lead, `Follow-up scheduled for ${formatDate(dueDate)}: ${followUp.note}`, now)

  if (!['Converted', 'Lost', 'Follow-up'].includes(lead.status)) {
    logActivity(db, T.STATUS_CHANGED, lead, `Status changed from ${lead.status} to Follow-up`, now)
    lead.status = 'Follow-up'
  }
  lead.updatedAt = now
  save(db)
  return followUp
}

export function updateFollowUp(id, updates) {
  const db = load()
  const followUp = db.followUps.find((item) => item.id === id)
  if (!followUp) throw new Error(`Follow-up ${id} was not found`)
  if (updates.dueDate !== undefined) followUp.dueDate = updates.dueDate
  if (updates.note !== undefined) followUp.note = String(updates.note).trim()
  save(db)
  return followUp
}

export function setFollowUpCompleted(id, completed = true) {
  const db = load()
  const followUp = db.followUps.find((item) => item.id === id)
  if (!followUp) throw new Error(`Follow-up ${id} was not found`)
  followUp.status = completed ? FOLLOW_UP_STATUS.COMPLETED : FOLLOW_UP_STATUS.PENDING
  followUp.completedAt = completed ? new Date().toISOString() : null
  if (completed) {
    const lead = db.leads.find((item) => item.id === followUp.leadId)
    logActivity(db, T.FOLLOW_UP_COMPLETED, lead, `Follow-up completed: ${followUp.note}`)
  }
  save(db)
  return followUp
}

export function deleteFollowUp(id) {
  const db = load()
  db.followUps = db.followUps.filter((item) => item.id !== id)
  save(db)
}

/* ------------------- Activity, services, settings ------------------- */

export function getActivities() {
  return load().activities
}

export function getServices() {
  return load().services
}

export function updateService(id, updates) {
  const db = load()
  const service = db.services.find((item) => item.id === id)
  if (!service) throw new Error(`Service ${id} was not found`)
  if (updates.description !== undefined) service.description = String(updates.description).trim()
  if (updates.startingPrice !== undefined) service.startingPrice = Number(updates.startingPrice)
  save(db)
  return service
}

export function getSettings() {
  return load().settings
}

export function updateSettings(updates) {
  const db = load()
  db.settings = {
    ...db.settings,
    ...updates,
    notifications: { ...db.settings.notifications, ...updates.notifications },
  }
  save(db)
  return db.settings
}

/** Restores the original sample data, discarding everything else. */
export function resetDemoData() {
  storage.remove(STORAGE_KEY)
  return seed()
}
