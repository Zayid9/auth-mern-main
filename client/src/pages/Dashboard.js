import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/user/data', {
          credentials: 'include',
        });
        
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          navigate('/login');
        }
      } catch (error) {
        toast.error('Failed to fetch user data');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome, {userData?.name}!</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Email</p>
            <p className="mt-1 text-gray-900">{userData?.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Account Status</p>
            <p className="mt-1 text-gray-900">
              {userData?.isVerified ? (
                <span className="text-green-600">Verified</span>
              ) : (
                <span className="text-yellow-600">Pending Verification</span>
              )}
            </p>
          </div>
        </div>
      </div>

      {!userData?.isVerified && (
        <div className="card bg-yellow-50 border border-yellow-200">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Verification Required</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>Please verify your email address to access all features.</p>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => navigate('/verify-email')}
                  className="btn-primary bg-yellow-600 hover:bg-yellow-700"
                >
                  Verify Email
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard; 