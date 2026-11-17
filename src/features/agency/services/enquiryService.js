import { agencyConfig } from '../../../data/agencyContent.js'

const PREVIEW_KEY = 'techsphere64:enquiries-preview'

/**
 * Sends a contact-form enquiry.
 * With agencyConfig.enquiryEndpoint set, the enquiry is POSTed there as JSON.
 * Without it the form runs in preview mode: the enquiry is kept in this
 * browser's localStorage and is NOT delivered to anyone.
 */
export async function submitEnquiry(enquiry) {
  const payload = { ...enquiry, submittedAt: new Date().toISOString() }

  if (agencyConfig.enquiryEndpoint) {
    const response = await fetch(agencyConfig.enquiryEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!response.ok) throw new Error(`Enquiry failed with status ${response.status}`)
    return { delivered: true }
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
