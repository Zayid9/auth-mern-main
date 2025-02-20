import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

function VerifyEmail() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/auth/send-verify-otp', {
        method: 'POST',
        credentials: 'include',
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast.success('OTP sent to your email!');
      } else {
        toast.error(data.message || 'Failed to send OTP');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/auth/verify-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp }),
        credentials: 'include',
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast.success('Email verified successfully!');
        navigate('/dashboard');
      } else {
        toast.error(data.message || 'Verification failed');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="card w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Verify Your Email</h2>
          <p className="mt-2 text-gray-600">Enter the OTP sent to your email</p>
        </div>
        
        <form onSubmit={handleVerify} className="space-y-6">
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
              OTP Code
            </label>
            <input
              id="otp"
              type="text"
              required
              className="input-field mt-1"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              maxLength={6}
            />
          </div>

          <div className="flex flex-col space-y-4">
            <button
              type="button"
              onClick={handleSendOtp}
              disabled={loading}
              className="btn-primary bg-gray-600 hover:bg-gray-700"
            >
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
            
            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="btn-primary"
            >
              {loading ? 'Verifying...' : 'Verify Email'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-primary hover:text-secondary"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail; 