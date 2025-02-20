import axios from 'axios';
import toast from 'react-hot-toast';

let toastId = null;

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:4000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Dismiss any existing toast
    if (toastId) {
      toast.dismiss(toastId);
    }

    if (error.code === 'ERR_NETWORK') {
      toastId = toast.error('Network error. Please check if the server is running on port 4000.', {
        duration: 4000
      });
    } else if (error.response?.status === 401) {
      window.location.href = '/login';
    } else if (error.response?.status === 403) {
      toastId = toast.error('Access denied. Please log in again.', {
        duration: 4000
      });
      window.location.href = '/login';
    } else if (error.response?.data?.message) {
      toastId = toast.error(error.response.data.message, {
        duration: 4000
      });
    } else {
      toastId = toast.error('An error occurred. Please try again.', {
        duration: 4000
      });
    }
    return Promise.reject(error);
  }
);

export default instance; 