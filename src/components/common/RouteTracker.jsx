import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { trackPageView } from '../../utils/metaPixel.js'

/** Reports in-app page changes to the Meta Pixel. Query strings and #hash jumps don't count as new pages. */
export default function RouteTracker() {
  const { pathname } = useLocation()

  useEffect(() => {
    trackPageView(pathname)
  }, [pathname])

  return null
}
