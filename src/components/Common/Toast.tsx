import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ToastProps {
  position?: 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center';
  autoClose?: number;
  hideProgressBar?: boolean;
  rtl?: boolean;
  pauseOnFocusLoss?: boolean;
  draggable?: boolean;
  pauseOnHover?: boolean;
  theme?: 'light' | 'dark' | 'colored';
}

const Toast: React.FC<ToastProps> = ({
  position = 'top-right',
  autoClose = 3000,
  hideProgressBar = false,
  rtl = false,
  pauseOnFocusLoss = true,
  draggable = true,
  pauseOnHover = true,
  theme = 'light',
}) => {
  return (
    <ToastContainer
      position={position}
      autoClose={autoClose}
      hideProgressBar={hideProgressBar}
      closeOnClick
      rtl={rtl}
      pauseOnFocusLoss={pauseOnFocusLoss}
      draggable={draggable}
      pauseOnHover={pauseOnHover}
      theme={theme}
    />
  );
};

// 알림을 트리거하는 함수
export const showToast = (message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
  toast[type](message);
};

export default Toast;
