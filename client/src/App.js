import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';

// Auth Components
// import Login from './components/Auth/Login';
// import Register from './components/Auth/Register';
// import ForgotPassword from './components/Auth/ForgotPassword';
import VerificationPage from './components/Auth/VerificationPage';
import Dashboard from './components/Dashboard/Dashboard';
import ProtectedRoute from './components/Auth/ProtectedRoute';

// Landing Page Components
// import LandingPage from './components/Landing/LandingPage';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';

// New Pages
// import Features from './pages/Features';
// import About from './pages/About';
// import Contact from './pages/Contact';

// Components
import Home from './components/Home/Home';

// Layout wrapper component
const Layout = ({ children, showNavbar = true, showFooter = true }) => (
  <div className={`min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200 ${
    !showNavbar ? 'dashboard-layout' : ''
  }`}>
    {showNavbar && <Navbar />}
    <main className={`flex-grow ${showNavbar ? 'pt-16' : ''}`}>
      {children}
    </main>
    {showFooter && <Footer />}
  </div>
);

// Wrap component with Layout
const withLayout = (Component, { showNavbar = true, showFooter = true } = {}) => {
  return (props) => (
    <Layout showNavbar={showNavbar} showFooter={showFooter}>
      <Component {...props} />
    </Layout>
  );
};

function App() {
  return (
    <ThemeProvider>
      <div className="transition-colors duration-200">
        <Toaster 
          position="top-center"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            className: 'dark:bg-gray-800 dark:text-white',
            style: {
              background: 'var(--toast-bg)',
              color: 'var(--toast-color)',
            },
            // Success toast options
            success: {
              duration: 3000,
            },
            // Error toast options
            error: {
              duration: 4000,
            },
            // Loading toast options
            loading: {
              duration: Infinity,
            },
          }}
        />
        <Routes>
          {/* Public Routes */}
          <Route path="/*" element={withLayout(Home)()} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/verify" element={withLayout(VerificationPage)()} />
            <Route path="/dashboard" element={withLayout(Dashboard, { showNavbar: false, showFooter: false })()} />
          </Route>

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App; 