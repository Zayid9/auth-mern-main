import axios from 'axios';
import toast from 'react-hot-toast';

let toastId = null;

const instance = axios.create({
  baseURL: 'https://fobis-auth.onrender.com/api',
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
      toastId = toast.error('Network error. Please try again later.');
    } else if (error.response?.status === 401) {
      window.location.href = '/login';
    } else if (error.response?.status === 403) {
      toastId = toast.error('Access denied. Please log in again.');
      window.location.href = '/login';
    } else if (error.response?.data?.message) {
      toastId = toast.error(error.response.data.message);
    } else {
      toastId = toast.error('An error occurred. Please try again.');
    }
    return Promise.reject(error);
  }
);

export default instance; 