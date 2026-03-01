import PageTransition from '../components/common/PageTransition'
import Footer from '../components/common/Footer'
import ServicesCarousel from '../components/services/ServicesCarousel'
import ServicesHero from '../components/services/ServicesHero'
import ServicesConsultancy from '../components/services/ServicesConsultancy'
import ServicesLogistics from '../components/services/ServicesLogistics'
import ServicesFAQ from '../components/services/ServicesFAQ'
import ServicesPromise from '../components/services/ServicesPromise'
import ServicesCTA from '../components/services/ServicesCTA'

export default function ClientServicesPage() {
  return (
    <PageTransition>
      <main className="min-h-screen flex flex-col bg-white dark:bg-[#050505] overflow-x-hidden">
        <ServicesCarousel />
        <ServicesHero />
        <ServicesConsultancy />
        <ServicesLogistics />
        <ServicesFAQ />
        <ServicesPromise />
        <ServicesCTA />
      </main>
      <Footer />
    </PageTransition>
  )
}
