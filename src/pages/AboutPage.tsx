import AboutHero from '../components/about/AboutHero'
import HeritageSection from '../components/about/HeritageSection'
import Milestones from '../components/about/Milestones'
import Sustainability from '../components/about/Sustainability'
import Materiality from '../components/about/Materiality'
import FoundersQuote from '../components/about/FoundersQuote'
import PersonalCommitment from '../components/about/PersonalCommitment'
import Footer from '../components/common/Footer'

export default function AboutPage() {
  return (
    <main className="flex-1 w-full flex flex-col pt-0">
      <AboutHero />
      <HeritageSection />
      <Milestones />
      <Sustainability />
      <Materiality />
      <FoundersQuote />
      <PersonalCommitment />
      <Footer />
    </main>
  )
}
