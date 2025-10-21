import type { Metadata } from 'next';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { ContactForm } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Contact Us - LusiTech I.T Consult',
  description: 'Get in touch with LusiTech I.T Consult for AI solutions, partnerships, and inquiries. We\'re here to help build Africa\'s future with AI.',
  keywords: 'LusiTech contact, AI solutions Ghana, African AI company, technology partnerships, AI consulting',
};

export default function ContactPage() {
  return (
    <div className="bg-white pt-16 lg:pt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#2D2F92] to-[#00ACF8] text-white py-16">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="slideUp">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Get in Touch
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8">
                Ready to transform your business with AI? Let's start the conversation.
              </p>
              <p className="text-lg text-blue-200">
                Whether you're looking for AI solutions, partnerships, or just want to learn more about what we do, 
                we'd love to hear from you.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Contact Content */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <AnimatedSection animation="slideUp">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-3xl font-bold text-[#2D2F92] mb-6">
                    Send us a Message
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                  <ContactForm />
                </div>
              </AnimatedSection>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Company Info */}
              <AnimatedSection animation="slideUp" delay={0.2}>
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-[#2D2F92] mb-4">
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-[#00ACF8] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Email</p>
                        <p className="text-gray-600">info@lusitech.com</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-[#00ACF8] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Phone</p>
                        <p className="text-gray-600">+233 XX XXX XXXX</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-[#00ACF8] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Location</p>
                        <p className="text-gray-600">Accra, Ghana</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Business Hours */}
              <AnimatedSection animation="slideUp" delay={0.3}>
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-[#2D2F92] mb-4">
                    Business Hours
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monday - Friday</span>
                      <span className="font-medium">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Saturday</span>
                      <span className="font-medium">10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sunday</span>
                      <span className="font-medium">Closed</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    GMT (Greenwich Mean Time)
                  </p>
                </div>
              </AnimatedSection>

              {/* Social Links */}
              <AnimatedSection animation="slideUp" delay={0.4}>
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-[#2D2F92] mb-4">
                    Follow Us
                  </h3>
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="w-10 h-10 bg-[#2D2F92] rounded-full flex items-center justify-center text-white hover:bg-[#00ACF8] transition-colors"
                      aria-label="LinkedIn"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 bg-[#2D2F92] rounded-full flex items-center justify-center text-white hover:bg-[#00ACF8] transition-colors"
                      aria-label="Twitter"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 bg-[#2D2F92] rounded-full flex items-center justify-center text-white hover:bg-[#00ACF8] transition-colors"
                      aria-label="GitHub"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="slideUp">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-[#2D2F92] mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600">
                Quick answers to common questions about our AI solutions and services.
              </p>
            </div>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatedSection animation="slideUp" delay={0.1}>
                <div className="bg-white rounded-lg p-6">
                  <h3 className="font-bold text-[#2D2F92] mb-3">
                    What AI solutions do you offer?
                  </h3>
                  <p className="text-gray-600">
                    We offer a range of AI solutions including GOKAC, GreenAI, MediGen, VoiceGhana, and LusiLearnAI, 
                    each designed to address specific challenges in African markets.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="slideUp" delay={0.2}>
                <div className="bg-white rounded-lg p-6">
                  <h3 className="font-bold text-[#2D2F92] mb-3">
                    How can I partner with LusiTech?
                  </h3>
                  <p className="text-gray-600">
                    We welcome partnerships with organizations that share our vision. 
                    Contact us through the form above or visit our partnerships page to learn more.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="slideUp" delay={0.3}>
                <div className="bg-white rounded-lg p-6">
                  <h3 className="font-bold text-[#2D2F92] mb-3">
                    Do you provide custom AI development?
                  </h3>
                  <p className="text-gray-600">
                    Yes, we offer custom AI development services tailored to your specific business needs and requirements. 
                    Get in touch to discuss your project.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="slideUp" delay={0.4}>
                <div className="bg-white rounded-lg p-6">
                  <h3 className="font-bold text-[#2D2F92] mb-3">
                    What is your response time?
                  </h3>
                  <p className="text-gray-600">
                    We typically respond to all inquiries within 24 hours during business days. 
                    For urgent matters, please indicate this in your message.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}