import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaBolt, FaUserCheck, FaLock } from 'react-icons/fa';

const features = [
  {
    icon: <FaShieldAlt className="w-6 h-6" />,
    title: 'Secure Authentication',
    description: 'Industry-standard security practices with JWT tokens and password hashing.'
  },
  {
    icon: <FaBolt className="w-6 h-6" />,
    title: 'Fast & Reliable',
    description: 'Lightning-fast authentication process with minimal latency.'
  },
  {
    icon: <FaUserCheck className="w-6 h-6" />,
    title: 'Email Verification',
    description: 'Built-in email verification system to ensure user authenticity.'
  },
  {
    icon: <FaLock className="w-6 h-6" />,
    title: 'Password Recovery',
    description: 'Secure password reset functionality with email verification.'
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="container">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white"
          >
            Powerful Features
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-400"
          >
            Everything you need for secure user authentication
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mb-4 text-primary-600 dark:text-primary-400">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features; 