import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from '../../services/axios';
import { motion } from 'framer-motion';
import {
  UserGroupIcon,
  ShieldCheckIcon,
  ClockIcon,
  BellIcon,
} from '@heroicons/react/24/outline';
import DashboardLayout from './DashboardLayout';

const StatCard = ({ icon: Icon, title, value, change, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6"
  >
    <div className="flex items-center">
      <div className="flex-shrink-0 p-3 rounded-lg bg-primary-50 dark:bg-primary-900/20">
        <Icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        <div className="flex items-baseline">
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
          {change && (
            <span className={`ml-2 text-sm font-medium ${
              change > 0 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-red-600 dark:text-red-400'
            }`}>
              {change > 0 ? '+' : ''}{change}%
            </span>
          )}
        </div>
      </div>
    </div>
  </motion.div>
);

const ActivityCard = ({ activity, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1 }}
    className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
  >
    <div className={`p-2 rounded-lg ${activity.iconBg}`}>
      <activity.icon className={`h-5 w-5 ${activity.iconColor}`} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
        {activity.title}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {activity.description}
      </p>
    </div>
    <div className="text-sm text-gray-500 dark:text-gray-400">
      {activity.time}
    </div>
  </motion.div>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const toastId = toast.loading('Loading profile...');
      
      try {
        const response = await axios.get('/user/data');
        if (response.data.success) {
          setUserData(response.data.userData);
          toast.success('Welcome back!', { id: toastId });
        } else {
          toast.error('Failed to load profile', { id: toastId });
          navigate('/login');
        }
      } catch (error) {
        toast.error('Unable to load profile', { id: toastId });
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = async () => {
    const toastId = toast.loading('Logging out...');
    
    try {
      await axios.post('/auth/logout');
      toast.success('Logged out successfully', { id: toastId });
      navigate('/login');
    } catch (error) {
      toast.error('Failed to logout', { id: toastId });
    }
  };

  if (loading || !userData) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="spinner" />
      </div>
    );
  }

  const stats = [
    { title: 'Total Users', value: '2,345', change: 12.5, icon: UserGroupIcon },
    { title: 'Security Score', value: '98%', change: 3.2, icon: ShieldCheckIcon },
    { title: 'Uptime', value: '99.9%', change: 0.1, icon: ClockIcon },
    { title: 'Alerts', value: '5', change: -2.3, icon: BellIcon },
  ];

  const recentActivity = [
    {
      icon: UserGroupIcon,
      iconBg: 'bg-blue-100 dark:bg-blue-900/20',
      iconColor: 'text-blue-600 dark:text-blue-400',
      title: 'New user registration',
      description: 'John Doe joined the platform',
      time: '5m ago',
    },
    {
      icon: ShieldCheckIcon,
      iconBg: 'bg-green-100 dark:bg-green-900/20',
      iconColor: 'text-green-600 dark:text-green-400',
      title: 'Security audit completed',
      description: 'All systems passed security checks',
      time: '2h ago',
    },
    {
      icon: BellIcon,
      iconBg: 'bg-yellow-100 dark:bg-yellow-900/20',
      iconColor: 'text-yellow-600 dark:text-yellow-400',
      title: 'System notification',
      description: 'Server maintenance scheduled',
      time: '1d ago',
    },
  ];

  return (
    <DashboardLayout userData={userData} onLogout={handleLogout}>
      {/* Dashboard Content */}
      <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Welcome back, {userData.name}!
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Here's what's happening with your account today.
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <StatCard key={stat.title} {...stat} delay={index * 0.1} />
            ))}
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <ActivityCard key={activity.title} activity={activity} index={index} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard; 