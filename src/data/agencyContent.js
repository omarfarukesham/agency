/**
 * Site-wide settings for the Techsphere64 agency website.
 *
 * contactEmail:     shown on the Contact page and in the footer when set.
 * enquiryEndpoint:  URL that accepts a JSON POST (your own API, or a form
 *                   service such as Formspree or Basin). While this is empty
 *                   the contact form runs in preview mode: it validates and
 *                   shows the success state, but nothing is delivered.
 */
export const agencyConfig = {
  name: 'Techsphere64',
  tagline:
    'We engineer cutting-edge digital products, microservices, enterprise health-tech and workflow automations for visionary global founders.',
  contactEmail: '',
  enquiryEndpoint: '',
  markets: ['Saudi Arabia', 'Bhutan', 'USA', 'India', 'Sweden'],
  social: [
    { id: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/techsphere64' },
    { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/techsphere-64/posts/?feedView=all' },
  ],
}

export const agencyServices = [
  {
    id: 'website',
    icon: 'monitor',
    name: 'Business Website Development',
    summary: 'A fast, professional website that explains what you do and makes it easy for customers to get in touch.',
    value:
      'Most customers check your website before they call. A clear, modern site makes a small business look established and turns visitors into enquiries.',
    deliverables: [
      'Custom design that matches your brand',
      'Mobile-first, responsive pages',
      'Service pages and a contact or quote form',
      'On-page SEO basics: titles, descriptions, headings',
      'Deployment to your domain',
    ],
    price: 399,
  },
  {
    id: 'lead-automation',
    icon: 'workflow',
    name: 'Website + Lead Capture Automation',
    summary: 'Your website plus a dashboard that catches every enquiry, so no lead is lost in an inbox.',
    value:
      'Enquiries that sit unanswered go to a competitor. A lead dashboard shows who asked for what, where each conversation stands and who needs a follow-up today.',
    deliverables: [
      'Everything in Business Website Development',
      'Quote or booking form connected to a lead dashboard',
      'Lead statuses, internal notes and follow-up reminders',
      'New-enquiry notifications for you and your team',
      'Activity history for every lead',
    ],
    price: 649,
  },
  {
    id: 'workflow',
    icon: 'settings',
    name: 'Business Workflow Automation',
    summary: 'Replace repetitive admin, spreadsheets and manual follow-ups with a system that does the work for you.',
    value:
      'Time spent copying details between tools is time not spent on customers. We map how your business runs today and automate the steps that slow you down.',
    deliverables: [
      'Review of your current process',
      'Automation of repetitive steps such as follow-ups and reminders',
      'Connections to tools you already use, where they allow it',
      'A simple dashboard to see what is happening',
      'Handover notes so your team can run it',
    ],
    price: 799,
  },
  {
    id: 'social-media',
    icon: 'megaphone',
    name: 'Social Media Management',
    summary:
      'We run your Facebook and Instagram every day, with posts, service posters and paid campaigns that send customers to your website.',
    value:
      'Local customers scroll before they search. Showing up daily keeps your business in front of them, and paid campaigns tracked with the Meta Pixel show which ads actually turn into quote requests, so your budget goes where it works.',
    deliverables: [
      'A designed post every day on Facebook and Instagram',
      'Service and offer posters in your brand style',
      'Monthly content calendar you approve before anything goes out',
      'Paid ad campaigns: setup, targeting and ongoing optimization',
      'Meta Pixel setup on your website, with quote requests tracked as conversions',
      'Monthly report on reach, clicks and enquiries from your ads',
    ],
    billing: 'monthly',
    note: 'Monthly plan. Ad spend is paid directly to Meta and is not included.',
  },
]

/** How the services connect: attract → convert → capture → follow up. */
export const growthFlow = [
  {
    icon: 'megaphone',
    step: 'Attract',
    title: 'Social media & ads',
    text: 'Daily posts and paid campaigns put your business in front of local customers.',
    serviceId: 'social-media',
  },
  {
    icon: 'monitor',
    step: 'Convert',
    title: 'Website & quote form',
    text: 'Visitors land on a fast, clear website built to turn interest into a quote request.',
    serviceId: 'website',
  },
  {
    icon: 'inbox',
    step: 'Capture',
    title: 'Lead dashboard',
    text: 'Every enquiry is saved with its details, and the Meta Pixel records which ads produced it.',
    serviceId: 'lead-automation',
  },
  {
    icon: 'workflow',
    step: 'Follow up',
    title: 'Automation',
    text: 'Reminders and follow-ups keep each lead moving until it becomes a booked job.',
    serviceId: 'workflow',
  },
]

export const socialMediaPlan = {
  id: 'social',
  name: 'Social Media Management',
  description:
    'Ongoing monthly management of your Facebook and Instagram, so new customers keep finding you between projects.',
  features: [
    'Daily posts, sized for each platform',
    'Service and offer posters',
    'Approved monthly content calendar',
    'Paid campaigns on Facebook and Instagram',
    'Meta Pixel conversion tracking',
    'Monthly results report',
  ],
  priceLabel: 'Quoted monthly',
  priceNote: 'Fee depends on the platforms and campaigns you need. Ad spend is paid directly to Meta.',
  projectType: 'Social media management',
}

export const pricingPlans = [
  {
    id: 'starter',
    name: 'Website Starter',
    price: 399,
    description: 'A professional website for a business that needs a credible online presence.',
    features: [
      'Custom, mobile-friendly design',
      'Core pages: Home, Services, About, Contact',
      'Contact or quote request form',
      'On-page SEO basics',
      'Launch on your domain',
    ],
    projectType: 'Business website',
  },
  {
    id: 'automation',
    name: 'Website + Lead Automation',
    price: 649,
    description: 'A website and a lead dashboard working together, like our cleaning business demo.',
    features: [
      'Everything in Website Starter',
      'Lead management dashboard',
      'Statuses, notes and follow-ups',
      'New-enquiry notifications',
      'Activity history per lead',
    ],
    projectType: 'Website + lead automation',
    featured: true,
  },
  {
    id: 'workflow',
    name: 'Business Workflow Automation',
    price: 799,
    description: 'Automation built around the way your business already works.',
    features: [
      'Process review and plan',
      'Custom workflow automation',
      'Connections to your existing tools',
      'Reporting dashboard',
      'Handover notes',
    ],
    projectType: 'Workflow automation',
  },
]

export const processSteps = [
  {
    name: 'Discover',
    text: 'We learn how your business works, who your customers are and what the project needs to achieve.',
  },
  {
    name: 'Design',
    text: 'You review the layout and content before development starts, so there are no surprises later.',
  },
  {
    name: 'Develop',
    text: 'We build your website or system and share progress as we go, so you can give feedback early.',
  },
  {
    name: 'Launch',
    text: 'We test on phones, tablets and desktops, put it live and hand everything over to you.',
  },
]

export const reasons = [
  {
    icon: 'target',
    title: 'Built for service businesses',
    text: 'We focus on cleaning, plumbing, landscaping and home service companies, so the work is shaped around quotes, bookings and follow-ups.',
  },
  {
    icon: 'wrench',
    title: 'Practical software',
    text: 'We recommend the simplest thing that solves the problem. No features you will never use.',
  },
  {
    icon: 'messages',
    title: 'Transparent communication',
    text: 'Clear scope and a fixed project price agreed before work begins, with regular progress updates.',
  },
  {
    icon: 'shield',
    title: 'Reliable delivery',
    text: 'We test across devices before launch and hand over a system you fully own.',
  },
]

export const faqs = [
  {
    q: 'What kinds of businesses do you work with?',
    a: 'Small service businesses: cleaning companies, plumbers, landscapers, home service providers and similar local companies. We work with clients in the USA, Canada and Australia.',
  },
  {
    q: 'What is included in the project price?',
    a: 'Each price is a starting point for the scope listed under that package. After a free consultation you receive a written proposal with the exact scope and price before any work starts.',
  },
  {
    q: 'How long does a project take?',
    a: 'It depends on the scope and on how quickly content and feedback come back. Your proposal includes a timeline, so you know the expected launch date before you commit.',
  },
  {
    q: 'How does social media management work?',
    a: 'Each month we plan a content calendar with you. Once you approve it, we design and publish a post every day on Facebook and Instagram, create posters for your services and offers, and run any paid campaigns we agreed. You get a report at the end of each month.',
  },
  {
    q: 'Is the ad budget included in the social media fee?',
    a: 'No. Ad spend is paid directly to Meta from your own ad account, so you stay in control of it. Our fee covers planning, creating and managing the content and campaigns.',
  },
  {
    q: 'Why does the Meta Pixel matter?',
    a: 'The Pixel is a small piece of code on your website that tells Meta when someone who saw your ad goes on to request a quote. That shows which ads bring real enquiries, and lets Meta show your ads to people more likely to do the same.',
  },
  {
    q: 'Is the cleaning company in your demo a real client?',
    a: 'No. SparklePro Cleaning Co. is a fictional business we created to demonstrate what we build. The website and dashboard are fully interactive, and the data in them is sample data.',
  },
  {
    q: 'I already have a website. Can you add a lead dashboard to it?',
    a: 'In many cases, yes. It depends on how your current site is built. Tell us what you have and we will let you know what is possible.',
  },
  {
    q: 'Do I need to be technical to use the dashboard?',
    a: 'No. It is designed for busy owners: open it, see new enquiries, update a status, add a note and set a follow-up. Try the live demo to see how it feels.',
  },
]

export const projectTypes = [
  'Business website',
  'Website + lead automation',
  'Workflow automation',
  'Social media management',
  'Website + social media',
  'Something else / not sure yet',
]

export const budgetRanges = ['Under $500', '$500 – $1,000', '$1,000 – $2,500', '$2,500+', 'Not sure yet']
