import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axios from '../../services/axios';

const AccountVerification = ({ onVerificationSuccess }) => {
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);


  const handleSendOtp = async () => {
    try {
      setLoading(true);
      await axios.post('/auth/send-verify-otp');
      setOtpSent(true);
      toast.success('Verification code sent to your email!');
    } catch (error) {
      console.error('Failed to send OTP:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) {
      toast.error('Please enter the verification code');
      return;
    }

    try {
      setLoading(true);
      await axios.post('/auth/verify-account', { otp });
      toast.success('Account verified successfully!');
      if (onVerificationSuccess) {
        onVerificationSuccess();
      }
    } catch (error) {
      console.error('Failed to verify account:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
      <div className="flex items-center space-x-3">
        <svg
          className="h-6 w-6 text-yellow-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <h3 className="text-lg font-medium text-yellow-800">
          Verify Your Account
        </h3>
      </div>
      <div className="mt-4">
        <p className="text-sm text-yellow-700">
          Your account is currently unverified. Please verify your account to access all features.
        </p>
      </div>
      <div className="mt-6">
        {!otpSent ? (
          <button
            onClick={handleSendOtp}
            disabled={loading}
            className="btn-primary bg-yellow-600 hover:bg-yellow-700 w-full"
          >
            {loading ? 'Sending...' : 'Send Verification Code'}
          </button>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <label htmlFor="otp" className="sr-only">
                Verification Code
              </label>
              <input
                id="otp"
                name="otp"
                type="text"
                required
                className="input-field"
                placeholder="Enter verification code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary bg-yellow-600 hover:bg-yellow-700 w-full"
            >
              {loading ? 'Verifying...' : 'Verify Account'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AccountVerification; 