import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../../context/ThemeContext';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Features', href: '/features' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

const NavLink = ({ href, children, onClick, isActive }) => {
  const { isDarkMode } = useTheme();
  return (
    <Link
      to={href}
      onClick={onClick}
      className={`relative px-3 py-2 text-sm font-medium transition-colors ${
        isActive
          ? isDarkMode ? 'text-white' : 'text-primary-600'
          : isDarkMode 
            ? 'text-gray-300 hover:text-white' 
            : 'text-gray-700 hover:text-primary-600'
      }`}
    >
      {children}
      {isActive && (
        <motion.div
          layoutId="activeNavItem"
          className={`absolute bottom-0 left-0 right-0 h-0.5 ${
            isDarkMode ? 'bg-white' : 'bg-primary-600'
          }`}
          initial={false}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </Link>
  );
};

const Navbar = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();
  const [hasScrolled, setHasScrolled] = useState(false);

  // Update active item based on location
  useEffect(() => {
    const path = location.pathname;
    const currentItem = navigation.find(item => item.href === path);
    if (currentItem) {
      setActiveItem(currentItem.name);
    }
  }, [location.pathname]);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setHasScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navbarClasses = `
    fixed top-0 left-0 right-0 z-50
    transition-all duration-300 ease-in-out
    ${hasScrolled 
      ? isDarkMode
        ? 'bg-gray-900/85 backdrop-blur-md shadow-lg shadow-gray-900/10'
        : 'bg-white/85 backdrop-blur-md shadow-lg shadow-gray-100/10'
      : isDarkMode
        ? 'bg-gray-900/50 backdrop-blur-sm'
        : 'bg-white/50 backdrop-blur-sm'
    }
    ${className}
  `;

  const containerClasses = `
    relative z-10
    before:absolute before:inset-0
    before:bg-gradient-to-b
    ${isDarkMode
      ? 'before:from-black/20 before:to-transparent'
      : 'before:from-white/20 before:to-transparent'
    }
    before:pointer-events-none
  `;

  return (
    <nav className={navbarClasses}>
      <div className={`container ${containerClasses}`}>
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 relative">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/" 
              className="flex items-center"
              onClick={() => setActiveItem('Home')}
            >
              <span className={`text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                AuthSystem
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <NavLink 
                key={item.name} 
                href={item.href}
                isActive={activeItem === item.name}
                onClick={() => setActiveItem(item.name)}
              >
                {item.name}
              </NavLink>
            ))}
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-colors ${
                  isDarkMode
                    ? 'text-gray-300 hover:text-white hover:bg-white/10'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <SunIcon className="h-5 w-5" />
                ) : (
                  <MoonIcon className="h-5 w-5" />
                )}
              </motion.button>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/login"
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    isDarkMode
                      ? 'text-gray-300 hover:text-white'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  Sign In
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/register"
                  className={`btn-primary text-sm px-4 py-2 ${
                    isDarkMode
                      ? 'bg-primary-600 hover:bg-primary-700 text-white'
                      : 'bg-primary-600 hover:bg-primary-700 text-white'
                  }`}
                >
                  Get Started
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-2 md:hidden">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${
                isDarkMode
                  ? 'text-gray-300 hover:text-white hover:bg-white/10'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md transition-colors ${
                isDarkMode
                  ? 'text-gray-300 hover:text-white hover:bg-white/10'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className={`md:hidden border-t ${
              isDarkMode
                ? 'border-white/10 bg-gray-900/90 backdrop-blur-md'
                : 'border-gray-200/10 bg-white/90 backdrop-blur-md'
            }`}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  href={item.href}
                  onClick={() => {
                    setIsOpen(false);
                    setActiveItem(item.name);
                  }}
                  isActive={activeItem === item.name}
                >
                  {item.name}
                </NavLink>
              ))}
              <div className="mt-4 space-y-2">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className={`block w-full px-3 py-2 text-base font-medium text-center rounded-md transition-colors ${
                    isDarkMode
                      ? 'text-gray-300 hover:text-white hover:bg-white/10'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="block w-full px-3 py-2 text-base font-medium text-center text-white bg-primary-600 hover:bg-primary-700 rounded-md transition-colors"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default React.memo(Navbar); 