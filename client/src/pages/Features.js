import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheckIcon, 
  LockClosedIcon, 
  UserGroupIcon, 
  BellAlertIcon,
  CloudArrowUpIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const features = [
  {
    title: 'Advanced Security',
    description: 'Enterprise-grade security with end-to-end encryption and multi-factor authentication.',
    icon: ShieldCheckIcon,
  },
  {
    title: 'User Management',
    description: 'Comprehensive user roles and permissions system for granular access control.',
    icon: UserGroupIcon,
  },
  {
    title: 'Real-time Notifications',
    description: 'Instant alerts and notifications to keep your team informed and synchronized.',
    icon: BellAlertIcon,
  },
  {
    title: 'Privacy Controls',
    description: 'Full control over your data with customizable privacy settings and compliance tools.',
    icon: LockClosedIcon,
  },
  {
    title: 'Cloud Integration',
    description: 'Seamless integration with popular cloud services and storage solutions.',
    icon: CloudArrowUpIcon,
  },
  {
    title: 'Analytics Dashboard',
    description: 'Powerful analytics and reporting tools to track user engagement and system usage.',
    icon: ChartBarIcon,
  },
];

const FeatureCard = ({ feature, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card group hover:scale-105"
    >
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-200" />
        <div className="relative p-6">
          <feature.icon className="h-12 w-12 text-primary-600 dark:text-primary-400 mb-4" />
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
            {feature.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {feature.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const Features = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 heading-gradient">
            Powerful Features
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover the tools and capabilities that make our platform the perfect solution for your authentication needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features; 