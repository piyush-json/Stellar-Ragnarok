import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 overflow-hidden">
      {/* Background Animation Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-green-200/30 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-green-200 rounded-full px-4 py-2 text-sm font-medium text-green-700"
          >
            <Icon name="Zap" size={16} className="text-green-600" />
            <span>Powered by Stellar Blockchain</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-5xl sm:text-6xl lg:text-8xl font-display font-extrabold text-gray-900 text-sharp"
          >
            The Future of
            <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent text-glow">
              Decentralized Work
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl sm:text-2xl text-body text-gray-600 max-w-4xl mx-auto"
          >
            Connect with global talent through secure blockchain escrow payments. 
            No intermediaries, no hidden fees - just transparent, decentralized freelancing.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <Button
              variant="default"
              size="lg"
              iconName="ArrowRight"
              iconPosition="right"
              className="w-full sm:w-auto text-lg px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <Link to="/job-marketplace">Get Started Free</Link>
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              iconName="Play"
              iconPosition="left"
              className="w-full sm:w-auto text-lg px-8 py-4 border-2 border-gray-300 hover:border-green-500 hover:text-green-600 transition-all duration-300"
            >
              Watch Demo
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-gray-500"
          >
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} className="text-green-500" />
              <span>Blockchain Secured</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Globe" size={16} className="text-green-500" />
              <span>Global Network</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Zap" size={16} className="text-yellow-500" />
              <span>Instant Payments</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center space-y-2 text-gray-400"
        >
          <span className="text-sm">Scroll to explore</span>
          <Icon name="ChevronDown" size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;