import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      icon: "Coins",
      title: "Decentralized Payments",
      description: "Secure XLM transactions through Stellar blockchain with automatic escrow protection. No banks, no delays, just instant global payments.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      icon: "Shield",
      title: "Smart Contract Escrow",
      description: "Funds are held securely in blockchain escrow until project completion. Both parties are protected with transparent, automated releases.",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 3,
      icon: "Globe",
      title: "Global Accessibility",
      description: "Work with anyone, anywhere in the world. No geographic restrictions, currency conversions, or traditional banking limitations.",
      color: "from-purple-500 to-indigo-500"
    },
    {
      id: 4,
      icon: "Zap",
      title: "Lightning Fast",
      description: "Stellar network processes transactions in 3-5 seconds. Get paid instantly when milestones are completed and approved.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      id: 5,
      icon: "Users",
      title: "Peer-to-Peer Network",
      description: "Direct connections between clients and freelancers. No middleman taking cuts from your hard-earned payments.",
      color: "from-pink-500 to-rose-500"
    },
    {
      id: 6,
      icon: "Lock",
      title: "Enhanced Security",
      description: "Blockchain-level security with cryptographic verification. Your data and transactions are protected by distributed ledger technology.",
      color: "from-teal-500 to-blue-500"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

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
            Why Choose
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              StarLance?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the next generation of freelancing with blockchain technology, 
            smart contracts, and decentralized payments.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features?.map((feature) => (
            <motion.div
              key={feature?.id}
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="group relative"
            >
              <div className="glassmorphism p-8 rounded-2xl border border-gray-200/50 hover:border-blue-200/50 transition-all duration-300 h-full">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature?.color} p-4 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon 
                    name={feature?.icon} 
                    size={32} 
                    color="white" 
                    className="w-full h-full"
                  />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {feature?.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature?.description}
                </p>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50/0 to-indigo-50/0 group-hover:from-blue-50/50 group-hover:to-indigo-50/50 transition-all duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 mb-6">
            Ready to experience the future of freelancing?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Icon name="Check" size={16} className="text-green-500" />
              <span>No setup fees</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Icon name="Check" size={16} className="text-green-500" />
              <span>Start earning immediately</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Icon name="Check" size={16} className="text-green-500" />
              <span>Global payment access</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;