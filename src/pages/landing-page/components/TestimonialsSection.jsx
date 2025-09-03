import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Full-Stack Developer",
      location: "Singapore",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      content: `StarLance revolutionized how I work with international clients. The instant XLM payments and transparent escrow system eliminated all the banking headaches I used to face. I've completed 15+ projects and received payments within seconds of approval.`,
      project: "E-commerce Platform Development",
      earnings: "2,450 XLM"
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "UI/UX Designer",
      location: "Mexico City",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      content: `The decentralized approach gives me complete control over my work relationships. No more platform fees eating into my earnings, and the blockchain security means I never worry about payment disputes. It's the future of freelancing.`,
      project: "Mobile App Design System",
      earnings: "1,890 XLM"
    },
    {
      id: 3,
      name: "Emily Watson",
      role: "Content Strategist",
      location: "London, UK",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      content: `As a client, I love the transparency and security. Smart contracts ensure freelancers deliver quality work, and I can release payments instantly when satisfied. The global talent pool is incredible, and the blockchain verification builds trust.`,
      project: "Content Marketing Campaign",
      earnings: "3,200 XLM"
    },
    {
      id: 4,
      name: "David Kim",
      role: "Blockchain Developer",
      location: "Seoul, South Korea",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      content: `Working on StarLance feels like being part of the Web3 revolution. The platform's technical architecture is impressive, and the Stellar integration is seamless. I've built lasting relationships with clients who appreciate blockchain innovation.`,
      project: "DeFi Protocol Development",
      earnings: "5,670 XLM"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials?.length]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials?.length) % testimonials?.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials?.length);
  };

  const handleDotClick = (index) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  const currentTestimonial = testimonials?.[currentIndex];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Trusted by
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Global Talent
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of freelancers and clients who've discovered the power of 
            decentralized work relationships.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="glassmorphism p-8 sm:p-12 rounded-3xl border border-gray-200/50"
            >
              {/* Stars */}
              <div className="flex justify-center mb-6">
                {[...Array(currentTestimonial?.rating)]?.map((_, i) => (
                  <Icon key={i} name="Star" size={24} className="text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-lg sm:text-xl text-gray-700 text-center leading-relaxed mb-8 italic">
                "{currentTestimonial?.content}"
              </blockquote>

              {/* Author Info */}
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src={currentTestimonial?.avatar}
                    alt={currentTestimonial?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="text-center sm:text-left">
                  <div className="font-semibold text-gray-900 text-lg">
                    {currentTestimonial?.name}
                  </div>
                  <div className="text-blue-600 font-medium">
                    {currentTestimonial?.role}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {currentTestimonial?.location}
                  </div>
                </div>

                <div className="hidden sm:block w-px h-12 bg-gray-300" />

                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-1">Latest Project</div>
                  <div className="font-medium text-gray-900 text-sm">
                    {currentTestimonial?.project}
                  </div>
                  <div className="text-green-600 font-semibold text-sm">
                    Earned: {currentTestimonial?.earnings}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevious}
              className="w-12 h-12 rounded-full border-2 hover:border-blue-500 hover:text-blue-600"
            >
              <Icon name="ChevronLeft" size={20} />
            </Button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {testimonials?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-blue-600 scale-125' :'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              className="w-12 h-12 rounded-full border-2 hover:border-blue-500 hover:text-blue-600"
            >
              <Icon name="ChevronRight" size={20} />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center"
        >
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">12K+</div>
            <div className="text-gray-600 text-sm">Active Freelancers</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">8K+</div>
            <div className="text-gray-600 text-sm">Happy Clients</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-2">45K+</div>
            <div className="text-gray-600 text-sm">Projects Completed</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-2">2.1M</div>
            <div className="text-gray-600 text-sm">XLM Paid Out</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;