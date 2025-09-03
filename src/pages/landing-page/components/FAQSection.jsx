import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      id: 1,
      question: "What is StarLance and how does it work?",
      answer: `StarLance is a decentralized freelance marketplace built on the Stellar blockchain. Unlike traditional platforms, we use smart contracts for escrow payments, eliminating intermediaries and reducing fees. Clients deposit XLM into secure escrow, freelancers complete work, and payments are released automatically upon approval.`
    },
    {
      id: 2,
      question: "Do I need cryptocurrency experience to use StarLance?",
      answer: `Not at all! Our platform is designed for users of all technical levels. We provide step-by-step guides for setting up your Stellar wallet, and our interface makes blockchain transactions as simple as traditional payments. You'll learn as you go, with full support available.`
    },
    {
      id: 3,
      question: "How secure are my funds and personal information?",
      answer: `Your funds are protected by Stellar blockchain's cryptographic security and smart contract escrow. Personal information is encrypted and stored using industry-standard security practices. The decentralized nature means no single point of failure, making it more secure than centralized platforms.`
    },
    {
      id: 4,
      question: "What are the fees compared to traditional freelance platforms?",
      answer: `StarLance charges zero platform fees! You only pay minimal Stellar network transaction fees (typically $0.00001 per transaction). Compare this to traditional platforms that charge 5-20% in fees. More money stays in your pocket where it belongs.`
    },
    {
      id: 5,
      question: "How fast are payments processed?",
      answer: `Payments are processed in 3-5 seconds on the Stellar network. Once a client approves your work, the smart contract automatically releases funds to your wallet instantly. No waiting days or weeks for payment processing like traditional platforms.`
    },
    {
      id: 6,
      question: "Can I work with clients from any country?",
      answer: `Yes! The Stellar blockchain is global and borderless. You can work with clients from anywhere in the world without worrying about currency conversions, international transfer fees, or banking restrictions. XLM works the same everywhere.`
    },
    {
      id: 7,
      question: "What happens if there's a dispute with a client?",
      answer: `Our smart contracts include built-in dispute resolution mechanisms. If issues arise, both parties can escalate to our decentralized arbitration system. Community validators review evidence and make fair decisions, with funds released accordingly.`
    },
    {
      id: 8,
      question: "How do I get started as a freelancer or client?",
      answer: `Simply create your profile, connect a Stellar wallet (we recommend Freighter), and complete verification. Freelancers can browse jobs immediately, while clients can post projects. Our onboarding process guides you through each step with helpful tutorials.`
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about getting started with decentralized freelancing 
            on the Stellar blockchain.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs?.map((faq, index) => (
            <motion.div
              key={faq?.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="glassmorphism rounded-2xl border border-gray-200/50 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-blue-50/50 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {faq?.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <Icon 
                    name="ChevronDown" 
                    size={24} 
                    className="text-gray-500"
                  />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-0">
                      <div className="w-full h-px bg-gray-200 mb-4" />
                      <p className="text-gray-600 leading-relaxed">
                        {faq?.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center mt-16"
        >
          <div className="glassmorphism p-8 rounded-2xl border border-blue-200/50">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our community support team is here to help you get started with decentralized freelancing.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Icon name="MessageCircle" size={16} className="text-blue-500" />
                <span>24/7 Community Support</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Icon name="Book" size={16} className="text-green-500" />
                <span>Comprehensive Documentation</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Icon name="Users" size={16} className="text-purple-500" />
                <span>Active Discord Community</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;