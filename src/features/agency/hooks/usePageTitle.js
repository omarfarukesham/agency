import { useEffect } from 'react'

/** Sets the document title, suffixed with the agency name unless `exact`. */
export function usePageTitle(title, { exact = false } = {}) {
  useEffect(() => {
    document.title = exact ? title : `${title} — Techsphere64`
  }, [title, exact])
}
