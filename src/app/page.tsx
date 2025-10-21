import { Button, AnimatedSection } from '@/components/ui';
import { Hero, MissionVision, ProductShowcase, TeamHighlights, MarketTraction } from '@/components/sections';

export default function Home() {
  return (
    <div className="bg-white">
        {/* Hero Section */}
        <Hero />

        {/* Mission and Vision Section */}
        <MissionVision />

        {/* Product Showcase Section */}
        <ProductShowcase />

        {/* Team Highlights Section */}
        <TeamHighlights />

        {/* Market Opportunity and Traction Section */}
        <MarketTraction />

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-lusitech-blue text-white">
          <div className="container mx-auto px-4 text-center">
            <AnimatedSection animation="slideUp">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Partner with us to leverage AI for sustainable growth and innovation
              </p>
              <Button variant="secondary" size="lg">
                Get in Touch
              </Button>
            </AnimatedSection>
          </div>
        </section>
    </div>
  );
}