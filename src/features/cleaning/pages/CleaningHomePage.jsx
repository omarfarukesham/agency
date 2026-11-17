import { useEffect, useState } from 'react'
import CleaningHero from '../components/CleaningHero.jsx'
import DashboardCallout from '../components/DashboardCallout.jsx'
import HowItWorks from '../components/HowItWorks.jsx'
import QuoteSection from '../components/QuoteSection.jsx'
import ServicesSection from '../components/ServicesSection.jsx'
import Testimonials from '../components/Testimonials.jsx'
import WhyChooseUs from '../components/WhyChooseUs.jsx'

export default function CleaningHomePage() {
  const [selectedService, setSelectedService] = useState('')

  useEffect(() => {
    document.title = 'SparklePro Cleaning Co. — Demo website by Techsphere64'
  }, [])

  const handleRequestQuote = (serviceName) => {
    setSelectedService(serviceName)
    document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <CleaningHero />
      <ServicesSection onRequestQuote={handleRequestQuote} />
      <WhyChooseUs />
      <HowItWorks />
      <Testimonials />
      <QuoteSection selectedService={selectedService} />
      <DashboardCallout />
    </>
  )
}
