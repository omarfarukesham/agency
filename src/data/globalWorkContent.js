/**
 * Global Work showcase data: Projects built by Techsphere64 for clients in
 * Saudi Arabia, Bhutan, USA, India, and Sweden.
 */

/** Each stat points back to a delivered project, so every number can be explained. */
export const globalWorkStats = [
  { value: '5', label: 'Countries delivered to', context: 'Asia, Europe, Middle East & North America' },
  { value: '4', label: 'Industries', context: 'Healthcare · Aviation · E‑commerce · Mobile apps' },
  { value: '14', label: 'Distributed modules', context: 'Multi‑vendor e‑commerce', flag: 'SE' },
  { value: '0', label: 'Paper forms', context: 'QR-based digital hospital', flag: 'IN' },
]

export const globalMarkets = [
  {
    code: 'IN',
    country: 'India',
    flag: '🇮🇳',
    headline: 'Healthcare & ABDM Digital Ecosystem',
    scope: 'Enterprise Hospital OS & Patient Mobile App',
  },
  {
    code: 'SE',
    country: 'Sweden',
    flag: '🇸🇪',
    headline: 'Multi-Vendor Microservice E-Commerce',
    scope: '14 Distributed Modules Architecture',
  },
  {
    code: 'US',
    country: 'USA',
    flag: '🇺🇸',
    headline: 'Islami Journal & Lifestyle App',
    scope: 'Mobile & Web Spiritual Journey Platform',
  },
  {
    code: 'BT',
    country: 'Bhutan',
    flag: '🇧🇹',
    headline: 'Airlines Booking & Flight Operations',
    scope: 'Ticketing, Inventory & Travel Booking System',
  },
  {
    code: 'SA',
    country: 'Saudi Arabia',
    flag: '🇸🇦',
    headline: 'Enterprise Digital Transformation',
    scope: 'Bilingual Custom Solutions & Automations',
  },
]

export const globalProjects = [
  {
    id: 'india-abdm-hospital',
    country: 'India',
    countryCode: 'IN',
    flag: '🇮🇳',
    industry: 'Healthcare',
    shortTitle: 'Digital hospital system',
    title: 'Fully Automated Digital Hospital Management System',
    subtitle: 'ABDM Govt. Compliant Healthcare Automation Suite',
    highlighted: true,
    badge: 'Flagship Healthcare Case Study',
    description:
      'A mission-critical, end-to-end digital hospital ecosystem engineered for Ayushman Bharat Digital Mission (ABDM) government compliance. Replaces all physical clipboards and queues with completely automated, QR-based patient bookings, diagnostic reporting, and real-time electronic medical records (EMR).',
    images: [
      {
        src: '/images/working/IndianProjects.webp',
        width: 1903, height: 862,
        alt: 'India digital hospital module overview, diagnostic tracking and billing',
        caption: 'Integrated Diagnostic, Pharmacy & Patient Records View',
      },
      {
        src: '/images/working/IndianProject.webp',
        width: 1912, height: 868,
        alt: 'India ABDM compliant digital hospital management dashboard and analytics',
        caption: 'Central Hospital Control Center & ABDM Health Records',
      },
    ],
    client: 'Private Hospital Network & Diagnostics',
    impact: [
      '100% paperless patient admission and discharge flow',
      'Instant QR-based registration reducing check-in wait times by 85%',
      'National ABDM ABHA health record synchronization for clinical data portability',
      'Real-time prescription-to-pharmacy fulfillment with barcode validation',
    ],
    /** The patient-facing mobile app, shown beside its feature list. */
    app: {
      image: {
        src: '/images/working/IndianPatientApp.webp',
        width: 1254,
        height: 1254,
        alt: 'Three screens of the patient mobile app: medicine ordering with order tracking, doctor appointments, and medicine categories',
      },
      title: 'Book doctors, order medicines, track every step',
      text: 'Patients handle their whole hospital visit from their phone, and every action lands directly in the hospital system.',
      features: [
        {
          icon: 'calendar',
          title: 'Doctor appointments',
          text: 'Book in-clinic consultations by specialty, pay in the app and book again in one tap.',
        },
        {
          icon: 'prescription',
          title: 'Digital prescriptions',
          text: 'Prescriptions from each visit are saved in the app, ready to view or reorder.',
        },
        {
          icon: 'cart',
          title: 'Medicine orders',
          text: 'Order from the hospital pharmacy and follow the order to the counter with a token.',
        },
        {
          icon: 'records',
          title: 'Health records',
          text: 'Reports, prescriptions and visits kept together in one place.',
        },
      ],
    },
    /** The patient's paper-free path through the hospital, shown as a flow. */
    journey: [
      { icon: 'smartphone', title: 'Book in the app', text: 'Patient picks a doctor and slot, and gets a QR pass.' },
      { icon: 'qr', title: 'Scan at reception', text: 'One scan checks them in and issues a queue token.' },
      { icon: 'stethoscope', title: 'Consultation', text: 'The doctor sees the history and writes a digital prescription.' },
      { icon: 'pill', title: 'Pharmacy & labs', text: 'Medicines and tests arrive as orders, not paper slips.' },
      { icon: 'records', title: 'Records in the app', text: 'Reports and prescriptions sync to the app and ABHA record.' },
    ],
    modules: [
      {
        icon: 'stethoscope',
        title: 'Doctor Consultation Suite',
        detail: 'Digital prescriptions, past medical history, automated dosage calculations & vitals monitor.',
      },
      {
        icon: 'reception',
        title: 'Front-Desk & Reception',
        detail: 'Dynamic queue management, token display screens, emergency priority routing.',
      },
      {
        icon: 'pill',
        title: 'Pharmacy Management',
        detail: 'Batch inventory control, automated stock alerts, digital dispenser dispatch.',
      },
      {
        icon: 'lab',
        title: 'Diagnostic & Pathology Labs',
        detail: 'Direct lab analyzer integration, barcode sample tagging, automated SMS/WhatsApp test reports.',
      },
      {
        icon: 'smartphone',
        title: 'Patient Mobile App',
        detail: 'Self check-in, ABHA integration, appointment booking, digital billing & prescription archive.',
      },
      {
        icon: 'qr',
        title: 'Zero Paperwork QR Flow',
        detail: 'Patients simply scan at the door to retrieve records, queue, and settle copayments seamlessly.',
      },
    ],
    techStack: ['ABDM Standards', 'React', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'FHIR / HL7'],
  },
  {
    id: 'sweden-microservices-ecommerce',
    country: 'Sweden',
    countryCode: 'SE',
    flag: '🇸🇪',
    industry: 'E-commerce',
    shortTitle: 'Multi-vendor e-commerce platform',
    title: 'Multi-Vendor Microservice E-Commerce Engine',
    subtitle: 'High-Concurrency Distributed Cloud Architecture',
    highlighted: false,
    badge: 'Nordic Scalable Commerce',
    description:
      'Engineered an enterprise multi-vendor commerce platform running on 14 independent distributed microservice modules. Designed for high resilience, seamless vendor onboarding, Nordic payment integrations, and ultra-low latency checkout experiences.',
    images: [
      {
        src: '/images/working/swedenproject.webp',
        width: 1200, height: 763,
        alt: 'Sweden multi-vendor microservice ecommerce platform interface',
        caption: 'Storefront Experience & Merchant Catalog Engine',
      },
      {
        src: '/images/working/swedenproject2.webp',
        width: 1200, height: 748,
        alt: 'Sweden ecommerce backend management and distributed vendor control',
        caption: 'Vendor Analytics & Multi-tenant Admin Suite',
      },
    ],
    client: 'Nordic Retail & Marketplace Group',
    impact: [
      'Decomposed monolithic workflow into 14 decoupled microservices',
      'Sub-200ms page loads with distributed edge caching',
      'Automated vendor payout calculations and tax reconciliation',
      'Zero-downtime rolling updates with Docker & Kubernetes',
    ],
    modules: [
      { title: 'Vendor Portal & Onboarding', detail: 'Automated KYC, store branding and catalog ingestion.' },
      { title: 'Order & Inventory Service', detail: 'Event-driven stock synchronization across multi-location warehouses.' },
      { title: 'Payment & Escrow Splitter', detail: 'Klarna, Stripe, and SEPA automated split-settlement routing.' },
      { title: 'Recommendation Engine', detail: 'AI-assisted personalized shopping feeds and cart accelerators.' },
    ],
    techStack: ['Distributed Microservices', 'React', 'Go / Node.js', 'Kafka', 'PostgreSQL', 'Kubernetes'],
  },
  {
    id: 'usa-islami-journal',
    country: 'USA',
    countryCode: 'US',
    flag: '🇺🇸',
    industry: 'Mobile app',
    shortTitle: 'Islami Journal mobile app',
    /** Square marketing image of phone screens: shown without a browser frame. */
    frame: 'plain',
    title: 'Islami Journal & Mindfulness App',
    subtitle: 'Daily Reflection, Habit Tracking & Spiritual Growth',
    highlighted: false,
    badge: 'US Mobile Platform',
    description:
      'A beautifully crafted spiritual journaling and mindfulness mobile application tailored for global Muslims. Features guided prompts, daily habit tracking, Quranic insights, and encrypted private reflections.',
    images: [
      {
        src: '/images/working/usaproject.webp',
        width: 1080, height: 1080,
        alt: 'USA Islami Journal mobile application interface',
        caption: 'Mobile Application Screens, Daily Prompts & Habit Tracking',
      },
    ],
    client: 'US-based Digital Lifestyle Startup',
    impact: [
      'High engagement with retention rates exceeding 65% across 30 days',
      'End-to-end encrypted personal notes and audio reflection logs',
      'Offline-first synchronization with lightning-fast cloud backups',
    ],
    modules: [
      { title: 'Interactive Guided Prompts', detail: 'Curated daily themes for gratitude, repentance, and goals.' },
      { title: 'Habit & Prayer Tracker', detail: 'Visual progress streaks, widget support, and customizable notifications.' },
      { title: 'Encrypted Vault', detail: 'Biometric unlock and client-side encryption for personal journal entries.' },
    ],
    techStack: ['React Native', 'TypeScript', 'Node.js', 'Tailwind', 'Cloud Firestore'],
  },
  {
    id: 'bhutan-airlines-booking',
    country: 'Bhutan',
    countryCode: 'BT',
    flag: '🇧🇹',
    industry: 'Aviation',
    shortTitle: 'Airline booking system',
    title: 'Airlines Flight Booking & Operations System',
    subtitle: 'High-Altitude Aviation Ticketing & Passenger Scheduling',
    highlighted: false,
    badge: 'Aviation & Travel Tech',
    description:
      'A comprehensive airline booking and passenger management system built for regional aviation routes. Handled dynamic seat mapping, GDS connectivity, passenger manifest generation, and instant boarding pass verification.',
    images: [
      {
        src: '/images/working/BhutanProject.webp',
        width: 1893, height: 881,
        alt: 'Bhutan airlines booking system search and flight schedule dashboard',
        caption: 'Flight Search, Fare Engine & Seat Selection System',
      },
      {
        src: '/images/working/BhutanProject2.webp',
        width: 1867, height: 857,
        alt: 'Bhutan airlines flight management and passenger manifest console',
        caption: 'Operations Console, Manifests & Digital Boarding Management',
      },
    ],
    client: 'Regional Aviation & Tourism Operator',
    impact: [
      'Eliminated manual overbooking errors with atomic seat inventory locking',
      'Instant QR-coded boarding pass generation via email and mobile',
      'Multi-currency passenger checkouts with tourist visa fee calculation',
    ],
    modules: [
      { title: 'Dynamic Fare & Schedule Matrix', detail: 'Real-time seasonal pricing, bag allowance, and flight routes.' },
      { title: 'Interactive Aircraft Seat Map', detail: 'SVG-driven live seat availability, bulkhead selection, and meal requests.' },
      { title: 'Passenger Manifest & Operations', detail: 'Ground crew check-in terminal with barcode and passport scanning.' },
    ],
    techStack: ['React', 'Next.js', 'Python / FastAPI', 'PostgreSQL', 'Redis'],
  },
  {
    id: 'saudi-arabia-enterprise',
    country: 'Saudi Arabia',
    countryCode: 'SA',
    flag: '🇸🇦',
    industry: 'Enterprise',
    shortTitle: 'Enterprise digital platform',
    title: 'Enterprise Digital Transformation & Bilingual Workflows',
    subtitle: 'Modernization & Process Automation Suite',
    highlighted: false,
    badge: 'GCC Enterprise Suite',
    description:
      'Enterprise-grade custom web platforms and automated business process suites built for Saudi business founders, with full Arabic (RTL) & English localization and regional compliance.',
    images: [
      {
        src: '/images/working/sudiaProject.webp',
        width: 1908, height: 863,
        alt: 'Saudi Arabia enterprise digital platform interface and management console',
        caption: 'Saudi Arabia Enterprise Workflow & Management System',
      },
    ],
    client: 'GCC Business Services & Logistics',
    impact: [
      'Streamlined inter-departmental approvals with automated SLA tracking',
      'Seamless Arabic RTL layout support with zero typography compromises',
      'Localized VAT & ZATCA-compliant reporting modules',
    ],
    modules: [
      { title: 'Bilingual Interface Engine', detail: 'High-performance Arabic and English instant language switching.' },
      { title: 'Workflow Approvals Matrix', detail: 'Hierarchical approval chains with instant digital signatures.' },
      { title: 'Audit & Compliance Archive', detail: 'Tamper-proof event logs and exportable audit documentation.' },
    ],
    techStack: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'PostgreSQL'],
  },
]
