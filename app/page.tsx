import { Header } from "@/components/layout/header"
import { HeroSection } from "@/components/layout/hero-section"
import { FeaturesSection } from "@/components/layout/features-section"
import { DownloadSection } from "@/components/layout/download-section"
import { ContactSection } from "@/components/layout/contact-section"
import { Footer } from "@/components/layout/footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-blue-50 via-white to-emerald-50">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <DownloadSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
