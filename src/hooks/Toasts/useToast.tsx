import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ToastType } from './constants';
import ToastMessage from './ToastMessage';

export const useToast = () => {
  const showToast = (
    message: string,
    type: ToastType,
    options?: Record<string, unknown>,
  ) => {
    toast(<ToastMessage message={message} />, { type, ...options });
  };

  return { showToast };
};
