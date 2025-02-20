import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-gray-900 pt-[120px] pb-16 md:pt-[150px] md:pb-[120px]">
      <div className="container relative z-10">
        <div className="mx-auto text-center max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 heading-gradient"
          >
            Secure Authentication for Modern Web Applications
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12"
          >
            A powerful, secure, and easy-to-use authentication system built with MERN stack.
            Get started in minutes with our modern authentication solution.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/register"
              className="btn-primary px-8 py-4 text-lg"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="btn-secondary px-8 py-4 text-lg"
            >
              Sign In
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 left-1/2 transform -translate-x-1/2 w-[1000px] h-[1000px] opacity-20 dark:opacity-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default Hero; 