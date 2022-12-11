import { toast, ToastOptions } from 'react-toastify';

export const notifyError = (msg: string, options?: ToastOptions<{}>) => {
  toast.error(msg, options);
};
