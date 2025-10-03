import React, { useEffect, useState } from 'react';
import { CheckCircleIcon, XCircleIcon, CloseIcon } from './Icons';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true); // Trigger fade-in animation
    const timer = setTimeout(() => {
      handleClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, type]);
  
  const handleClose = () => {
      setVisible(false);
      // Allow fade-out animation to complete before calling onClose
      setTimeout(onClose, 300);
  }

  const isSuccess = type === 'success';

  const baseClasses = "fixed top-5 right-5 w-full max-w-xs p-4 rounded-lg shadow-lg text-white flex items-center gap-3 z-50 transition-all duration-300 ease-in-out";
  const typeClasses = isSuccess ? "bg-green-500" : "bg-red-500";
  const visibilityClasses = visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10";

  return (
    <div className={`${baseClasses} ${typeClasses} ${visibilityClasses}`} role="alert">
      <div className="flex-shrink-0">
        {isSuccess ? <CheckCircleIcon className="w-6 h-6" /> : <XCircleIcon className="w-6 h-6" />}
      </div>
      <div className="flex-grow text-sm font-medium">{message}</div>
      <button onClick={handleClose} className="p-1 -m-1 text-white/80 hover:text-white">
        <CloseIcon className="w-5 h-5" />
      </button>
    </div>
  );
};