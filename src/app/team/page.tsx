'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeInSection, SlideUpSection } from '@/components/ui/AnimatedSection';
import { Card, Button } from '@/components/ui';
import { teamApi, handleApiError } from '@/lib/api';
import { TeamMember } from '@/lib/types';

interface TeamMemberModalProps {
  member: TeamMember;
  isOpen: boolean;
  onClose: () => void;
}

const TeamMemberModal: React.FC<TeamMemberModalProps> = ({ member, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-8">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center mb-6">
              <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-[#2D2F92] to-[#00ACF8] p-1 mb-4">
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-3xl font-bold text-[#2D2F92]">
                    {member.initials}
                  </div>
                )}
              </div>
              <h2 className="text-3xl font-bold text-[#2D2F92] mb-2">{member.name}</h2>
              <p className="text-xl text-[#00ACF8] font-semibold">{member.role}</p>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
              <p className="text-gray-600 leading-relaxed">{member.bio || 'Team member bio coming soon...'}</p>
            </div>

            <div className="flex justify-center space-x-4">
              {member.social_links?.linkedin && (
                <motion.a
                  href={member.social_links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-[#2D2F92]/10 rounded-full flex items-center justify-center text-[#2D2F92] hover:bg-[#2D2F92] hover:text-white transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </motion.a>
              )}
              {member.social_links?.twitter && (
                <motion.a
                  href={member.social_links.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-[#00ACF8]/10 rounded-full flex items-center justify-center text-[#00ACF8] hover:bg-[#00ACF8] hover:text-white transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </motion.a>
              )}
              {member.social_links?.github && (
                <motion.a
                  href={member.social_links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-600/10 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-600 hover:text-white transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </motion.a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true);
        const members = await teamApi.getTeamMembers();
        setTeamMembers(members.filter(member => member.is_active !== false));
      } catch (err) {
        const apiError = handleApiError(err);
        setError(apiError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  const openMemberModal = (member: TeamMember) => {
    setSelectedMember(member);
  };

  const closeMemberModal = () => {
    setSelectedMember(null);
  };

  if (loading) {
    return (
      <div className="bg-white pt-20 lg:pt-28">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2D2F92] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading our amazing team...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white pt-20 lg:pt-28">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="text-red-500 text-xl mb-4">⚠️ Error Loading Team</div>
            <p className="text-gray-600 mb-8">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white pt-20 lg:pt-28">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <FadeInSection>
              <h1 className="text-4xl md:text-6xl font-bold text-[#2D2F92] mb-6">
                Meet Our Team
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Passionate innovators and AI experts dedicated to transforming Africa through technology.
                Our diverse team combines deep technical expertise with African market insights.
              </p>
            </FadeInSection>
          </div>

          {teamMembers.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
              {teamMembers.map((member, index) => (
                <SlideUpSection key={member.id} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="cursor-pointer"
                    onClick={() => openMemberModal(member)}
                  >
                    <Card className="h-full p-6 text-center group hover:shadow-xl transition-shadow duration-300">
                      <div className="relative mb-6">
                        <motion.div
                          className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#2D2F92] to-[#00ACF8] p-1"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {member.photo ? (
                            <img
                              src={member.photo}
                              alt={member.name}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-[#2D2F92]">
                              {member.initials}
                            </div>
                          )}
                        </motion.div>
                        <div className="absolute bottom-1 right-1/2 transform translate-x-8 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
                      </div>

                      <h3 className="text-xl font-bold text-[#2D2F92] mb-2">
                        {member.name}
                      </h3>
                      <p className="text-[#00ACF8] font-semibold mb-4">
                        {member.role}
                      </p>
                      <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                        {member.bio || 'Team member bio coming soon...'}
                      </p>

                      <div className="flex justify-center space-x-4">
                        {member.social_links?.linkedin && (
                          <motion.a
                            href={member.social_links.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 bg-[#2D2F92]/10 rounded-full flex items-center justify-center text-[#2D2F92] hover:bg-[#2D2F92] hover:text-white transition-colors duration-300"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                          </motion.a>
                        )}
                        {member.social_links?.twitter && (
                          <motion.a
                            href={member.social_links.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 bg-[#00ACF8]/10 rounded-full flex items-center justify-center text-[#00ACF8] hover:bg-[#00ACF8] hover:text-white transition-colors duration-300"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                            </svg>
                          </motion.a>
                        )}
                        {member.social_links?.github && (
                          <motion.a
                            href={member.social_links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 bg-gray-600/10 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-600 hover:text-white transition-colors duration-300"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                          </motion.a>
                        )}
                      </div>

                      <div className="mt-4 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Click to view details
                      </div>
                    </Card>
                  </motion.div>
                </SlideUpSection>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 text-6xl mb-4">👥</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Team Members Found</h3>
              <p className="text-gray-500">Team information will be available soon.</p>
            </div>
          )}

          <SlideUpSection delay={0.6}>
            <div className="bg-gradient-to-r from-[#2D2F92] to-[#00ACF8] rounded-2xl p-8 lg:p-12 text-white">
              <div className="text-center mb-8">
                <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                  Why Our Team Stands Out
                </h3>
                <p className="text-lg opacity-90">
                  Combining deep technical expertise with African market insights
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <motion.div
                    className="text-3xl lg:text-4xl font-bold mb-2"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    viewport={{ once: true }}
                  >
                    50+
                  </motion.div>
                  <p className="opacity-90">Years Combined Experience</p>
                </div>
                <div className="text-center">
                  <motion.div
                    className="text-3xl lg:text-4xl font-bold mb-2"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                    viewport={{ once: true }}
                  >
                    15+
                  </motion.div>
                  <p className="opacity-90">AI Projects Delivered</p>
                </div>
                <div className="text-center">
                  <motion.div
                    className="text-3xl lg:text-4xl font-bold mb-2"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                    viewport={{ once: true }}
                  >
                    8
                  </motion.div>
                  <p className="opacity-90">African Countries</p>
                </div>
                <div className="text-center">
                  <motion.div
                    className="text-3xl lg:text-4xl font-bold mb-2"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.4 }}
                    viewport={{ once: true }}
                  >
                    100%
                  </motion.div>
                  <p className="opacity-90">African-Focused</p>
                </div>
              </div>
            </div>
          </SlideUpSection>

          <SlideUpSection delay={0.8}>
            <div className="text-center mt-16">
              <p className="text-lg text-gray-600 mb-8">
                Want to join our mission or learn more about our team?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="primary" size="lg">
                    Join Our Team
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="outline" size="lg">
                    Contact Us
                  </Button>
                </motion.div>
              </div>
            </div>
          </SlideUpSection>
        </div>
      </div>

      <TeamMemberModal
        member={selectedMember!}
        isOpen={!!selectedMember}
        onClose={closeMemberModal}
      />
    </div>
  );
}