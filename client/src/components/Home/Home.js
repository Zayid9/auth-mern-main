import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Footer';
import LandingPage from '../Landing/LandingPage';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import ForgotPassword from '../Auth/ForgotPassword';
import Features from '../../pages/Features';
import About from '../../pages/About';
import Contact from '../../pages/Contact';
import ScrollToTop from '../utils/ScrollToTop';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.61, 1, 0.88, 1],
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.4,
      ease: [0.61, 1, 0.88, 1],
    },
  },
};

const Home = () => {
  const location = useLocation();
  const [isNavbarTransparent, setNavbarTransparent] = useState(true);
  const [isInitialLoad, setInitialLoad] = useState(true);

  // Handle navbar transparency based on scroll and route
  useEffect(() => {
    const handleScroll = () => {
      const isTransparent = window.scrollY < 50 && location.pathname === '/';
      setNavbarTransparent(isTransparent);
    };

    handleScroll(); // Initial check
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Handle initial page load animation
  useEffect(() => {
    if (isInitialLoad) {
      setTimeout(() => setInitialLoad(false), 500);
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col min-h-screen"
    >
      <ScrollToTop />
      {/* Navbar with dynamic transparency */}
      <Navbar 
        isTransparent={isNavbarTransparent}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isNavbarTransparent ? 'bg-transparent' : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm'
        }`}
      />

      {/* Main Content with Page Transitions */}
      <main className="flex-grow">
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <motion.div
                  initial={isInitialLoad ? "initial" : false}
                  animate="enter"
                  exit="exit"
                  variants={pageVariants}
                  className="pt-16"
                >
                  <LandingPage />
                </motion.div>
              }
            />
            <Route
              path="/login"
              element={
                <motion.div
                  initial="initial"
                  animate="enter"
                  exit="exit"
                  variants={pageVariants}
                  className="page-container"
                >
                  <Login />
                </motion.div>
              }
            />
            <Route
              path="/register"
              element={
                <motion.div
                  initial="initial"
                  animate="enter"
                  exit="exit"
                  variants={pageVariants}
                  className="page-container"
                >
                  <Register />
                </motion.div>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <motion.div
                  initial="initial"
                  animate="enter"
                  exit="exit"
                  variants={pageVariants}
                  className="page-container"
                >
                  <ForgotPassword />
                </motion.div>
              }
            />
            <Route
              path="/features"
              element={
                <motion.div
                  initial="initial"
                  animate="enter"
                  exit="exit"
                  variants={pageVariants}
                  className="pt-16"
                >
                  <Features />
                </motion.div>
              }
            />
            <Route
              path="/about"
              element={
                <motion.div
                  initial="initial"
                  animate="enter"
                  exit="exit"
                  variants={pageVariants}
                  className="pt-16"
                >
                  <About />
                </motion.div>
              }
            />
            <Route
              path="/contact"
              element={
                <motion.div
                  initial="initial"
                  animate="enter"
                  exit="exit"
                  variants={pageVariants}
                  className="pt-16"
                >
                  <Contact />
                </motion.div>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />
    </motion.div>
  );
};

export default Home; 