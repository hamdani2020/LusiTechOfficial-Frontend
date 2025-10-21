import type { Metadata } from 'next';
import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Partnerships - LusiTech I.T Consult',
  description: 'Partner with LusiTech to build Africa\'s future with AI technology solutions. Explore strategic partnerships, technology collaborations, and investment opportunities.',
  keywords: 'LusiTech partnerships, AI partnerships Africa, technology collaboration, strategic alliances, AI investment opportunities',
};

export default function PartnershipsPage() {
  const partnershipTypes = [
    {
      title: 'Strategic Partners',
      description: 'Long-term strategic alliances with organizations that share our vision for AI-driven transformation in Africa.',
      benefits: [
        'Joint product development opportunities',
        'Shared market access and distribution',
        'Co-marketing and brand collaboration',
        'Technology integration and interoperability'
      ],
      requirements: [
        'Established presence in African markets',
        'Complementary technology or services',
        'Commitment to ethical AI practices',
        'Minimum 3-year partnership commitment'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: 'Technology Partners',
      description: 'Collaborate with us to integrate cutting-edge technologies and enhance our AI solutions.',
      benefits: [
        'Access to LusiTech AI platforms and APIs',
        'Joint research and development projects',
        'Technical support and integration assistance',
        'Revenue sharing opportunities'
      ],
      requirements: [
        'Proven expertise in relevant technologies',
        'Compatible technical architecture',
        'Commitment to quality and security standards',
        'Willingness to provide technical documentation'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      )
    },
    {
      title: 'Distribution Partners',
      description: 'Help us reach new markets and customers across Africa through your distribution networks.',
      benefits: [
        'Exclusive territorial rights (where applicable)',
        'Comprehensive training and support',
        'Marketing materials and sales tools',
        'Competitive commission structures'
      ],
      requirements: [
        'Established sales and distribution network',
        'Experience in technology or AI solutions',
        'Local market knowledge and relationships',
        'Commitment to sales targets and KPIs'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Investment Partners',
      description: 'Join us as an investor to fuel our growth and expansion across African markets.',
      benefits: [
        'Equity participation in high-growth AI company',
        'Board representation opportunities',
        'Access to proprietary AI technologies',
        'Strategic input on company direction'
      ],
      requirements: [
        'Minimum investment threshold',
        'Alignment with company values and mission',
        'Long-term investment horizon',
        'Due diligence and legal compliance'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  const partnerTestimonials = [
    {
      name: 'Dr. Kwame Asante',
      title: 'CTO, TechAfrica Solutions',
      company: 'TechAfrica Solutions',
      testimonial: 'Partnering with LusiTech has been transformative for our business. Their AI solutions have helped us serve our clients better while expanding into new markets across West Africa.',
      image: '/api/placeholder/80/80'
    },
    {
      name: 'Sarah Okonkwo',
      title: 'Managing Director',
      company: 'Innovation Hub Lagos',
      testimonial: 'LusiTech\'s commitment to ethical AI and their deep understanding of African markets makes them an ideal partner. Together, we\'re building solutions that truly matter.',
      image: '/api/placeholder/80/80'
    },
    {
      name: 'Michael Banda',
      title: 'Head of Partnerships',
      company: 'East Africa Ventures',
      testimonial: 'The partnership with LusiTech has exceeded our expectations. Their technology is cutting-edge, and their team is incredibly responsive and professional.',
      image: '/api/placeholder/80/80'
    }
  ];

  return (
    <div className="bg-white pt-16 lg:pt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#2D2F92] to-[#00ACF8] text-white py-16">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="slideUp">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Partner with LusiTech
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8">
                Join us in building Africa's future with AI technology solutions
              </p>
              <p className="text-lg text-blue-200 mb-8">
                We believe in the power of collaboration. Partner with us to create innovative AI solutions 
                that drive meaningful change across African markets.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" className="bg-white text-[#2D2F92] hover:bg-gray-100">
                  <Link href="#partnership-types">Explore Partnerships</Link>
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#2D2F92]">
                  <Link href="#contact-form">Get Started</Link>
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Partnership Types */}
      <div id="partnership-types" className="py-16">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="slideUp">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#2D2F92] mb-4">
                Partnership Opportunities
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We offer various partnership models to suit different organizations and objectives. 
                Find the partnership type that aligns with your goals.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {partnershipTypes.map((partnership, index) => (
              <AnimatedSection key={partnership.title} animation="slideUp" delay={index * 0.1}>
                <Card className="h-full p-8 hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-[#00ACF8] text-white rounded-lg flex items-center justify-center mr-4">
                      {partnership.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-[#2D2F92]">
                      {partnership.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 mb-6">
                    {partnership.description}
                  </p>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-[#2D2F92] mb-3">Benefits</h4>
                      <ul className="space-y-2">
                        {partnership.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start">
                            <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-600">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#2D2F92] mb-3">Requirements</h4>
                      <ul className="space-y-2">
                        {partnership.requirements.map((requirement, idx) => (
                          <li key={idx} className="flex items-start">
                            <svg className="w-5 h-5 text-[#00ACF8] mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-600">{requirement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>

      {/* Partnership Process */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="slideUp">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#2D2F92] mb-4">
                Partnership Process
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our streamlined partnership process ensures a smooth onboarding experience 
                and sets the foundation for long-term success.
              </p>
            </div>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: '01',
                  title: 'Initial Contact',
                  description: 'Reach out to us through our partnership form or contact us directly to express your interest.'
                },
                {
                  step: '02',
                  title: 'Discovery Call',
                  description: 'We\'ll schedule a call to understand your goals, capabilities, and how we can work together.'
                },
                {
                  step: '03',
                  title: 'Proposal & Agreement',
                  description: 'We\'ll create a customized partnership proposal and work together to finalize the agreement.'
                },
                {
                  step: '04',
                  title: 'Onboarding & Launch',
                  description: 'Complete the onboarding process and launch our partnership with full support from our team.'
                }
              ].map((process, index) => (
                <AnimatedSection key={process.step} animation="slideUp" delay={index * 0.1}>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#2D2F92] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                      {process.step}
                    </div>
                    <h3 className="text-xl font-bold text-[#2D2F92] mb-3">
                      {process.title}
                    </h3>
                    <p className="text-gray-600">
                      {process.description}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Partner Testimonials */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="slideUp">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#2D2F92] mb-4">
                What Our Partners Say
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Hear from our partners about their experience working with LusiTech 
                and the impact of our collaboration.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partnerTestimonials.map((testimonial, index) => (
              <AnimatedSection key={testimonial.name} animation="slideUp" delay={index * 0.1}>
                <Card className="p-6 h-full">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-bold text-[#2D2F92]">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.title}</p>
                      <p className="text-sm text-[#00ACF8]">{testimonial.company}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">
                    "{testimonial.testimonial}"
                  </p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div id="contact-form" className="bg-gradient-to-br from-[#2D2F92] to-[#00ACF8] text-white py-16">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="slideUp">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Partner with Us?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Let's start the conversation about how we can work together to build Africa's future with AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" className="bg-white text-[#2D2F92] hover:bg-gray-100">
                  <Link href="/contact">Contact Us</Link>
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#2D2F92]">
                  <a href="mailto:partnerships@lusitech.com">partnerships@lusitech.com</a>
                </Button>
              </div>
              <p className="text-blue-200 mt-6">
                Or email us directly at{' '}
                <a href="mailto:partnerships@lusitech.com" className="text-white underline hover:no-underline">
                  partnerships@lusitech.com
                </a>
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Additional Resources */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="slideUp">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#2D2F92] mb-4">
                Partnership Resources
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Access helpful resources to learn more about partnering with LusiTech.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <AnimatedSection animation="slideUp" delay={0.1}>
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-[#00ACF8] text-white rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#2D2F92] mb-3">
                  Partnership Guide
                </h3>
                <p className="text-gray-600 mb-4">
                  Download our comprehensive partnership guide to learn about opportunities and requirements.
                </p>
                <Button variant="outline" size="sm">
                  Download PDF
                </Button>
              </Card>
            </AnimatedSection>

            <AnimatedSection animation="slideUp" delay={0.2}>
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-[#00ACF8] text-white rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#2D2F92] mb-3">
                  Partnership Webinar
                </h3>
                <p className="text-gray-600 mb-4">
                  Join our monthly webinar to learn about partnership opportunities and ask questions.
                </p>
                <Button variant="outline" size="sm">
                  Register Now
                </Button>
              </Card>
            </AnimatedSection>

            <AnimatedSection animation="slideUp" delay={0.3}>
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-[#00ACF8] text-white rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#2D2F92] mb-3">
                  Partnership FAQ
                </h3>
                <p className="text-gray-600 mb-4">
                  Get answers to frequently asked questions about partnering with LusiTech.
                </p>
                <Button variant="outline" size="sm">
                  <Link href="/contact">View FAQ</Link>
                </Button>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
}