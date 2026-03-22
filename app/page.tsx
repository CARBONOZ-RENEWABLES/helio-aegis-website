import Navigation from '@/components/shared/Navigation';
import Footer from '@/components/shared/Footer';
import Hero from '@/components/home/Hero';
import MarketTicker from '@/components/home/MarketTicker';
import CapabilitiesServer from '@/components/home/CapabilitiesServer';
import PortfolioImpact from '@/components/home/PortfolioImpactServer';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import ProjectMap from '@/components/home/ProjectMap';
import InvestmentThesis from '@/components/home/InvestmentThesis';
import InsightsTeaser from '@/components/home/InsightsTeaser';
import PartnersCredentials from '@/components/home/PartnersCredentials';
import CTASection from '@/components/home/CTASection';
import FAQSection from '@/components/FAQ/FAQSectionServer';

export default function Home() {
  return (
    <main className="w-full bg-void">
      <Navigation />
      <Hero />
      <MarketTicker />
      <CapabilitiesServer />
      <PortfolioImpact />
      <FeaturedProjects />
      <ProjectMap />
      <InvestmentThesis />
      <InsightsTeaser />
      <PartnersCredentials />
      <FAQSection category="all" showHeader={true} />
      <CTASection />
      <Footer />
    </main>
  );
}
