import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const HowItWorksSection = () => {
  const steps = [
    {
      id: 1,
      icon: "UserPlus",
      title: "Create Your Profile",
      description: "Sign up and connect your Stellar wallet. Set up your profile with skills, portfolio, and preferred project types.",
      details: ["Connect Freighter wallet", "Complete profile verification", "Showcase your expertise"]
    },
    {
      id: 2,
      icon: "Search",
      title: "Find Perfect Projects",
      description: "Browse decentralized job marketplace with smart filtering. Apply to projects that match your skills and interests.",
      details: ["Advanced search filters", "Real-time job notifications", "Direct client communication"]
    },
    {
      id: 3,
      icon: "Handshake",
      title: "Secure Agreement",
      description: "Client deposits XLM into smart contract escrow. Terms are locked on blockchain for complete transparency.",
      details: ["Automated escrow creation", "Milestone-based payments", "Dispute resolution system"]
    },
    {
      id: 4,
      icon: "Code",
      title: "Deliver Excellence",
      description: "Work on your project with built-in collaboration tools. Submit deliverables through our secure platform.",
      details: ["Integrated chat system", "File sharing capabilities", "Progress tracking tools"]
    },
    {
      id: 5,
      icon: "CheckCircle",
      title: "Get Paid Instantly",
      description: "Upon approval, smart contract automatically releases payment to your wallet. No delays, no intermediaries.",
      details: ["Instant XLM transfers", "Automatic tax documentation", "Payment history tracking"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
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
            How It
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Actually Works
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From profile creation to payment, every step is powered by blockchain technology 
            for maximum security and transparency.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12"
        >
          {steps?.map((step, index) => (
            <motion.div
              key={step?.id}
              variants={stepVariants}
              className={`flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12 ${
                index % 2 === 1 ? 'lg:flex-row-reverse lg:space-x-reverse' : ''
              }`}
            >
              {/* Step Content */}
              <div className="flex-1 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {step?.id}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {step?.title}
                  </h3>
                </div>
                
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {step?.description}
                </p>

                <div className="space-y-3">
                  {step?.details?.map((detail, idx) => (
                    <div key={idx} className="flex items-center justify-center lg:justify-start space-x-3">
                      <Icon name="Check" size={16} className="text-green-500 flex-shrink-0" />
                      <span className="text-gray-600">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step Visual */}
              <div className="flex-1 flex justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <div className="w-64 h-64 glassmorphism rounded-3xl flex items-center justify-center border border-blue-200/50 hover:border-blue-300/50 transition-all duration-300">
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <Icon 
                        name={step?.icon} 
                        size={48} 
                        color="white"
                      />
                    </div>
                  </div>
                  
                  {/* Connecting Line */}
                  {index < steps?.length - 1 && (
                    <div className="hidden lg:block absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-12 bg-gradient-to-b from-blue-300 to-transparent" />
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center"
        >
          <div className="glassmorphism p-6 rounded-2xl border border-blue-200/50">
            <div className="text-3xl font-bold text-blue-600 mb-2">3-5s</div>
            <div className="text-gray-600">Average Payment Time</div>
          </div>
          <div className="glassmorphism p-6 rounded-2xl border border-blue-200/50">
            <div className="text-3xl font-bold text-green-600 mb-2">0%</div>
            <div className="text-gray-600">Platform Fees</div>
          </div>
          <div className="glassmorphism p-6 rounded-2xl border border-blue-200/50">
            <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
            <div className="text-gray-600">Global Availability</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;