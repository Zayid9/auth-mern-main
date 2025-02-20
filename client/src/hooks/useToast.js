import { toast } from 'react-hot-toast';
import { useState } from 'react';

export const useToast = () => {
  const [toastId, setToastId] = useState(null);

  const showToast = (message, type = 'default') => {
    // Dismiss existing toast if any
    if (toastId) {
      toast.dismiss(toastId);
    }

    // Create new toast and store its ID
    let newToastId;
    switch (type) {
      case 'success':
        newToastId = toast.success(message, {
          duration: 3000,
        });
        break;
      case 'error':
        newToastId = toast.error(message, {
          duration: 4000,
        });
        break;
      case 'loading':
        newToastId = toast.loading(message);
        break;
      default:
        newToastId = toast(message, {
          duration: 3000,
        });
    }
    setToastId(newToastId);
    return newToastId;
  };

  const updateToast = (message, type = 'default') => {
    if (toastId) {
      switch (type) {
        case 'success':
          toast.success(message, {
            id: toastId,
            duration: 3000,
          });
          break;
        case 'error':
          toast.error(message, {
            id: toastId,
            duration: 4000,
          });
          break;
        case 'loading':
          toast.loading(message, {
            id: toastId,
          });
          break;
        default:
          toast(message, {
            id: toastId,
            duration: 3000,
          });
      }
    } else {
      showToast(message, type);
    }
  };

  const dismissToast = () => {
    if (toastId) {
      toast.dismiss(toastId);
      setToastId(null);
    }
  };

  return {
    showToast,
    updateToast,
    dismissToast,
    toastId,
  };
}; 