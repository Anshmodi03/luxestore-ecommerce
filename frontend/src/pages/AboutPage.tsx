import AboutHero from '../components/about/AboutHero'
import HeritageSection from '../components/about/HeritageSection'
import Milestones from '../components/about/Milestones'
import Sustainability from '../components/about/Sustainability'
import Materiality from '../components/about/Materiality'
import FoundersQuote from '../components/about/FoundersQuote'
import PersonalCommitment from '../components/about/PersonalCommitment'
import Footer from '../components/common/Footer'
import PageTransition from '../components/common/PageTransition'

export default function AboutPage() {
  return (
    <PageTransition>
      <main className="min-h-screen bg-background-light dark:bg-background-dark">
      <AboutHero />
      <HeritageSection />
      <Milestones />
      <Sustainability />
      <Materiality />
      <FoundersQuote />
        <PersonalCommitment />
        <Footer />
      </main>
    </PageTransition>
  )
}
