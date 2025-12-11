import { toast as hotToast, ToastOptions } from 'react-hot-toast';

const defaultOptions: ToastOptions = {
  duration: 3000,
  position: 'top-center',
  style: {
    background: 'rgba(15, 15, 30, 0.95)',
    backdropFilter: 'blur(20px)',
    color: '#fff',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    padding: '16px',
    fontSize: '14px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
  },
};

export function useToast() {
  const toast = {
    success: (message: string, options?: ToastOptions) => {
      hotToast.success(message, { ...defaultOptions, ...options });
    },
    
    error: (message: string, options?: ToastOptions) => {
      hotToast.error(message, { ...defaultOptions, ...options });
    },
    
    loading: (message: string, options?: ToastOptions) => {
      return hotToast.loading(message, { ...defaultOptions, ...options });
    },
    
    dismiss: (toastId?: string) => {
      hotToast.dismiss(toastId);
    },
    
    promise: <T,>(
      promise: Promise<T>,
      messages: {
        loading: string;
        success: string;
        error: string;
      },
      options?: ToastOptions
    ) => {
      return hotToast.promise(
        promise,
        messages,
        { ...defaultOptions, ...options }
      );
    },
  };

  return toast;
}
