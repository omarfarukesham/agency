import { Building2, Home, Repeat, Sparkles, Truck } from 'lucide-react'
import { createElement } from 'react'

const ICONS = {
  home: Home,
  sparkles: Sparkles,
  truck: Truck,
  building: Building2,
  repeat: Repeat,
}

/** Renders the icon registered for a service, e.g. <ServiceIcon name="home" />. */
export function ServiceIcon({ name, ...props }) {
  return createElement(ICONS[name] ?? Sparkles, { 'aria-hidden': true, ...props })
}
