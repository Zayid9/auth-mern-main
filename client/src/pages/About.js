import React from 'react';
import { motion } from 'framer-motion';
import { 
  RocketLaunchIcon,
  EyeIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';

const values = [
  {
    title: 'Mission',
    description: 'To provide secure, scalable, and user-friendly authentication solutions that empower businesses to protect their users and data with confidence.',
    icon: RocketLaunchIcon,
  },
  {
    title: 'Vision',
    description: 'To become the global standard for authentication systems, making robust security accessible to organizations of all sizes.',
    icon: EyeIcon,
  },
  {
    title: 'Values',
    description: 'We believe in transparency, security, and putting our users first. Our commitment to these values guides everything we do.',
    icon: HeartIcon,
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 heading-gradient">
            Our Story
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We're on a mission to revolutionize authentication systems, making them more secure, 
            accessible, and user-friendly for businesses worldwide.
          </p>
        </motion.div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card text-center"
            >
              <value.icon className="h-12 w-12 mx-auto text-primary-600 dark:text-primary-400 mb-4" />
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                {value.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Why Choose Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <h2 className="text-3xl font-bold mb-8 text-center heading-gradient">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Expertise & Innovation
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our team brings years of experience in cybersecurity and authentication systems,
                constantly innovating to stay ahead of emerging threats and technologies.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Customer-Centric Approach
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We prioritize our customers' needs, providing responsive support and continuously
                improving our platform based on user feedback.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Scalable Solutions
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our platform grows with your business, offering flexible solutions that adapt
                to your changing needs without compromising security.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Commitment to Security
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Security is in our DNA. We maintain the highest standards of data protection
                and regularly update our systems to address new security challenges.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About; 