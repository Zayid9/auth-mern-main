import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from '../../services/axios';

const VerificationPage = () => {
  const navigate = useNavigate();
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const initialOtpSent = useRef(false);

  useEffect(() => {
    const checkUser = async () => {
      const toastId = toast.loading('Checking user status...');
      
      try {
        const response = await axios.get('/user/data');
        
        if (!response.data.success) {
          toast.error('Failed to fetch user data', { id: toastId });
          navigate('/login');
          return;
        }

        const userData = response.data.userData;
        
        if (userData && userData.isAccountVerified) {
          toast.success('Account is already verified', { id: toastId });
          navigate('/dashboard');
          return;
        }
        
        setUserData(userData);
        toast.success('Ready for verification', { id: toastId });
        
        if (!initialOtpSent.current) {
          initialOtpSent.current = true;
          handleSendOtp();
        }
      } catch (error) {
        toast.error('Please login first', { id: toastId });
        navigate('/login');
      }
    };
    
    checkUser();
  }, [navigate]);

  const handleSendOtp = async () => {
    if (loading) return;
    
    const toastId = toast.loading('Sending verification code...');
    setLoading(true);
    
    try {
      await axios.post('/auth/send-verify-otp');
      setOtpSent(true);
      toast.success('Verification code sent to your email!', { id: toastId });
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Failed to send verification code',
        { id: toastId }
      );
      if (error.response?.status === 401) {
        navigate('/login');
      }
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

    if (loading) return;

    const toastId = toast.loading('Verifying account...');
    setLoading(true);

    try {
      const response = await axios.post('/auth/verify-account', { otp });
      
      if (response.data.success) {
        toast.success(response.data.message || 'Account verified successfully!', { id: toastId });
        window.location.href = '/dashboard';
      } else {
        toast.error(response.data.message || 'Verification failed. Please try again.', { id: toastId });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Failed to verify account',
        { id: toastId }
      );
    } finally {
      setLoading(false);
    }
  };

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Verify Your Account</h1>
          <p className="text-gray-600">
            Welcome {userData.name}! Please verify your account to continue.
          </p>
        </div>

        <div className="form-card animate-slide-up">
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    A verification code has been sent to your email address:{' '}
                    <span className="font-medium">{userData.email}</span>
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Verification Code
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="input-field"
                  placeholder="Enter verification code"
                  disabled={loading}
                  required
                />
              </div>

              <div className="flex flex-col space-y-4">
                <button
                  type="submit"
                  className="btn-primary w-full"
                  disabled={loading}
                >
                  {loading ? 'Verifying...' : 'Verify Account'}
                </button>

                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="btn-secondary w-full"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Resend Code'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;