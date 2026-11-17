import {
  Inbox,
  Megaphone,
  MessagesSquare,
  Monitor,
  Settings2,
  ShieldCheck,
  Target,
  Workflow,
  Wrench,
} from 'lucide-react'
import { createElement } from 'react'

const ICONS = {
  monitor: Monitor,
  workflow: Workflow,
  settings: Settings2,
  target: Target,
  wrench: Wrench,
  messages: MessagesSquare,
  shield: ShieldCheck,
  megaphone: Megaphone,
  inbox: Inbox,
}

/** Renders a named icon from agency content, e.g. <AgencyIcon name="monitor" />. */
export function AgencyIcon({ name, ...props }) {
  return createElement(ICONS[name] ?? Monitor, { 'aria-hidden': true, ...props })
}
