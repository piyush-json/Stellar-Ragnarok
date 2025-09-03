import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const FooterSection = () => {
  const currentYear = new Date()?.getFullYear();

  const footerLinks = {
    platform: [
      { label: "How It Works", href: "#how-it-works" },
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Security", href: "#security" }
    ],
    resources: [
      { label: "Documentation", href: "/docs" },
      { label: "API Reference", href: "/api" },
      { label: "Help Center", href: "/help" },
      { label: "Community", href: "/community" }
    ],
    company: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Press Kit", href: "/press" },
      { label: "Contact", href: "/contact" }
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "GDPR", href: "/gdpr" }
    ]
  };

  const socialLinks = [
    { name: "Twitter", icon: "Twitter", href: "https://twitter.com/stellarlance" },
    { name: "Discord", icon: "MessageSquare", href: "https://discord.gg/stellarlance" },
    { name: "GitHub", icon: "Github", href: "https://github.com/stellarlance" },
    { name: "LinkedIn", icon: "Linkedin", href: "https://linkedin.com/company/stellarlance" },
    { name: "Telegram", icon: "Send", href: "https://t.me/stellarlance" }
  ];

  const trustBadges = [
    { name: "Stellar Network", icon: "Shield", description: "Built on Stellar" },
    { name: "Open Source", icon: "Code", description: "Fully Open Source" },
    { name: "Decentralized", icon: "Globe", description: "No Single Point of Failure" },
    { name: "Secure", icon: "Lock", description: "Blockchain Security" }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link to="/landing-page" className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10">
                  <img 
                    src="/assets/images/starlance-logo.svg" 
                    alt="StarLance Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-2xl font-bold">StarLance</span>
              </Link>
              
              <p className="text-gray-400 mb-6 leading-relaxed">
                The future of decentralized freelancing. Connect, collaborate, and get paid 
                instantly through blockchain technology.
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks?.map((social) => (
                  <a
                    key={social?.name}
                    href={social?.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-200"
                  >
                    <Icon name={social?.icon} size={18} />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(footerLinks)?.map(([category, links], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <h3 className="text-lg font-semibold mb-4 capitalize">
                  {category === 'platform' ? 'Platform' : 
                   category === 'resources' ? 'Resources' :
                   category === 'company' ? 'Company' : 'Legal'}
                </h3>
                <ul className="space-y-3">
                  {links?.map((link) => (
                    <li key={link?.label}>
                      <a
                        href={link?.href}
                        className="text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        {link?.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 pt-8 border-t border-gray-800"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges?.map((badge) => (
              <div
                key={badge?.name}
                className="flex items-center space-x-3 text-center md:text-left"
              >
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={badge?.icon} size={18} className="text-blue-400" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">{badge?.name}</div>
                  <div className="text-xs text-gray-400">{badge?.description}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} StarLance. All rights reserved. Built on Stellar blockchain.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Network Status: Online</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Zap" size={14} className="text-yellow-400" />
                <span>Powered by Stellar</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;