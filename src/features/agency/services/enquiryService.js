import { agencyConfig } from '../../../data/agencyContent.js'

const PREVIEW_KEY = 'techsphere64:enquiries-preview'
const TIMEOUT_MS = 15000

/** A failed submission. `status` is the HTTP status (0 for network or timeout), `fields` holds per-field messages from a 422. */
export class EnquiryError extends Error {
  constructor(message, { status = 0, code = 'network_error', fields = null } = {}) {
    super(message)
    this.name = 'EnquiryError'
    this.status = status
    this.code = code
    this.fields = fields
  }
}

/**
 * Sends a contact-form enquiry (contract: docs/consultation-api.md).
 * With agencyConfig.enquiryEndpoint set, the enquiry is POSTed there as JSON
 * and resolves with the API's 201 body. Without it the form runs in preview
 * mode: the enquiry is kept in this browser's localStorage and is NOT
 * delivered to anyone.
 */
export async function submitEnquiry(enquiry) {
  const payload = { ...enquiry, submittedAt: new Date().toISOString() }

  if (agencyConfig.enquiryEndpoint) {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
    let response
    try {
      response = await fetch(agencyConfig.enquiryEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      })
    } catch (error) {
      const timedOut = error?.name === 'AbortError'
      throw new EnquiryError(timedOut ? 'The request timed out' : 'Network error', {
        code: timedOut ? 'timeout' : 'network_error',
      })
    } finally {
      clearTimeout(timer)
    }

    const body = await response.json().catch(() => null)
    if (!response.ok) {
      throw new EnquiryError(body?.message ?? `Enquiry failed with status ${response.status}`, {
        status: response.status,
        code: body?.error ?? 'server_error',
        fields: body?.fields ?? null,
      })
    }
    return { delivered: true, id: body?.id ?? null }
  }

  await new Promise((resolve) => setTimeout(resolve, 800))
  try {
    const saved = JSON.parse(window.localStorage.getItem(PREVIEW_KEY) ?? '[]')
    window.localStorage.setItem(PREVIEW_KEY, JSON.stringify([...saved, payload]))
  } catch {
    /* Storage unavailable: nothing else to do in preview mode. */
  }
  return { delivered: false }
}
