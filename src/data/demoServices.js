/**
 * SparklePro Cleaning Co. is a fictional business.
 * Prices are illustrative and exist only to make the demo realistic.
 */
export const demoServices = [
  {
    id: 'standard',
    name: 'Standard House Cleaning',
    shortName: 'Standard',
    description:
      'A thorough routine clean of kitchens, bathrooms, bedrooms and living areas to keep your home fresh week to week.',
    includes: ['Dusting and surfaces', 'Kitchen and bathrooms', 'Vacuuming and mopping'],
    startingPrice: 120,
    priceUnit: 'per visit',
    image: '/images/cleaning/standard.jpg',
    icon: 'home',
  },
  {
    id: 'deep',
    name: 'Deep Cleaning',
    shortName: 'Deep',
    description:
      'A top-to-bottom clean that reaches the places routine cleaning skips: baseboards, grout, inside appliances and more.',
    includes: ['Inside oven and fridge', 'Baseboards and vents', 'Grout and tile detail'],
    startingPrice: 220,
    priceUnit: 'per visit',
    image: '/images/cleaning/deep.jpg',
    icon: 'sparkles',
  },
  {
    id: 'move',
    name: 'Move-In / Move-Out Cleaning',
    shortName: 'Move-In/Out',
    description:
      'Leave your old place spotless or start fresh in a new one. Designed around empty homes and handover checklists.',
    includes: ['Inside cabinets and closets', 'Appliances inside and out', 'Walls and doors spot-cleaned'],
    startingPrice: 260,
    priceUnit: 'per visit',
    image: '/images/cleaning/move.jpg',
    icon: 'truck',
  },
  {
    id: 'office',
    name: 'Office Cleaning',
    shortName: 'Office',
    description:
      'Dependable cleaning for offices and small commercial spaces, scheduled around your working hours.',
    includes: ['Desks and shared areas', 'Kitchens and restrooms', 'Trash and recycling'],
    startingPrice: 180,
    priceUnit: 'per visit',
    image: '/images/cleaning/office.jpg',
    icon: 'building',
  },
  {
    id: 'recurring',
    name: 'Recurring Cleaning',
    shortName: 'Recurring',
    description:
      'Weekly, bi-weekly or monthly visits from the same team, with a lower rate for keeping a regular schedule.',
    includes: ['Same team each visit', 'Flexible frequency', 'Pause or reschedule anytime'],
    startingPrice: 99,
    priceUnit: 'per visit',
    image: '/images/cleaning/recurring.jpg',
    icon: 'repeat',
  },
]

export const demoSettings = {
  businessName: 'SparklePro Cleaning Co.',
  businessEmail: 'hello@sparklepro.example',
  businessPhone: '+1 512 555 0142',
  businessLocation: 'Austin, Texas',
  notifications: {
    emailOnNewLead: true,
    smsOnNewLead: false,
    dailySummary: true,
    followUpReminders: true,
  },
}
