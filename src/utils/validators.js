const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const isBlank = (value) => !String(value ?? '').trim()

export const isEmail = (value) => EMAIL.test(String(value ?? '').trim())

/** Accepts common formats: +1 512 555 0100, (512) 555-0100, 512.555.0100 */
export function isPhone(value) {
  const text = String(value ?? '').trim()
  if (!/^[+(\d][\d\s().-]*$/.test(text)) return false
  const digits = text.replace(/\D/g, '')
  return digits.length >= 10 && digits.length <= 15
}

/**
 * Builds a validate(values) function from a rule map:
 *   { email: [required('Enter your email'), email()] }
 * Each rule returns an error string or undefined. The first error per field wins.
 */
export function createValidator(rules) {
  return (values) => {
    const errors = {}
    for (const [field, fieldRules] of Object.entries(rules)) {
      for (const rule of fieldRules) {
        const error = rule(values[field], values)
        if (error) {
          errors[field] = error
          break
        }
      }
    }
    return errors
  }
}

export const required =
  (message = 'This field is required') =>
  (value) =>
    isBlank(value) ? message : undefined

export const email =
  (message = 'Enter a valid email address, like name@example.com') =>
  (value) =>
    isBlank(value) || isEmail(value) ? undefined : message

export const phone =
  (message = 'Enter a valid phone number with area code') =>
  (value) =>
    isBlank(value) || isPhone(value) ? undefined : message

export const minLength = (length, message) => (value) =>
  isBlank(value) || String(value).trim().length >= length
    ? undefined
    : (message ?? `Use at least ${length} characters`)

export const notBefore = (minDateKey, message) => (value) =>
  isBlank(value) || value >= minDateKey ? undefined : message
