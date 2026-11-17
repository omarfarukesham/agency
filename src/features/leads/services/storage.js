/**
 * Thin localStorage wrapper. Falls back to memory when storage is blocked
 * (private browsing, disabled cookies) so the demo still works for the session.
 */
const memory = new Map()

function available() {
  try {
    const probe = '__storage_probe__'
    window.localStorage.setItem(probe, '1')
    window.localStorage.removeItem(probe)
    return true
  } catch {
    return false
  }
}

const hasStorage = typeof window !== 'undefined' && available()

export const storage = {
  get(key) {
    try {
      const raw = hasStorage ? window.localStorage.getItem(key) : memory.get(key)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  },
  set(key, value) {
    const raw = JSON.stringify(value)
    try {
      if (hasStorage) window.localStorage.setItem(key, raw)
      else memory.set(key, raw)
    } catch {
      memory.set(key, raw)
    }
  },
  remove(key) {
    try {
      if (hasStorage) window.localStorage.removeItem(key)
    } catch {
      /* ignore */
    }
    memory.delete(key)
  },
}
