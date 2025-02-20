import React from 'react';
import { motion } from 'framer-motion';
import Hero from './Hero';
import Features from './Features';
import CTA from './CTA';

const LandingPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-900"
    >
      <Hero />
      <Features />
      <CTA />
    </motion.div>
  );
};

export default LandingPage; 