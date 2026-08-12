import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import ConceptSection from '@/components/sections/ConceptSection'
import BuildingExplorerSection from '@/components/sections/BuildingExplorerSection'
import ResidencesGrid from '@/components/sections/ResidencesGrid'
import AmenitiesShowcase from '@/components/sections/AmenitiesShowcase'
import InteractiveMapSection from '@/components/sections/InteractiveMapSection'
import ContactSection from '@/components/sections/ContactSection'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <main className="flex-1 bg-[#0b0e14]">
      <Navbar />
      <Hero />
      <ConceptSection />
      <BuildingExplorerSection />
      <ResidencesGrid />
      <AmenitiesShowcase />
      <InteractiveMapSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
