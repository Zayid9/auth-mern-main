import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from '../../services/axios';

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const toastId = toast.loading('Checking authentication...');
      
      try {
        const response = await axios.get('/user/data');
        const userData = response.data.userData;
        
        setIsAuthenticated(true);
        toast.success('Authentication successful', { id: toastId });
      } catch (error) {
        setIsAuthenticated(false);
        toast.error('Please login to continue', { id: toastId });
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute; 