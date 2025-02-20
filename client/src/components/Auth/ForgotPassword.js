import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import axios from '../../services/axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/send-reset-otp', { email });
      setOtpSent(true);
      toast.success('OTP sent to your email!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send OTP');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/reset-password', {
        email,
        otp,
        newPassword,
      });
      toast.success('Password reset successful!');
      window.location.href = '/login';
    } catch (error) {
      toast.error(error.response?.data?.message || 'Password reset failed');
    }
  };

  return (
    <section className="section pt-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container"
      >
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Reset your password
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Enter your email to receive a password reset code
            </p>
          </div>

          <div className="form-card">
            {!otpSent ? (
              <form className="space-y-6" onSubmit={handleSendOtp}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="input-field"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-4">
                  <button type="submit" className="btn-primary w-full">
                    Send Reset Code
                  </button>

                  <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                    Remember your password?{' '}
                    <Link 
                      to="/login" 
                      className="font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
                    >
                      Sign in instead
                    </Link>
                  </p>
                </div>
              </form>
            ) : (
              <form className="space-y-6" onSubmit={handleResetPassword}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="otp" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Reset Code
                    </label>
                    <input
                      id="otp"
                      name="otp"
                      type="text"
                      required
                      className="input-field text-center tracking-[0.5em]"
                      placeholder="Enter code"
                      maxLength="6"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    />
                  </div>

                  <div>
                    <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      New Password
                    </label>
                    <input
                      id="new-password"
                      name="new-password"
                      type="password"
                      required
                      className="input-field"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <button type="submit" className="btn-primary w-full">
                    Reset Password
                  </button>

                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="btn-secondary w-full"
                  >
                    Resend Code
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ForgotPassword; 