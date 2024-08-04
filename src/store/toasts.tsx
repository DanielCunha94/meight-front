import { createContext, ReactNode, useState } from "react";

export interface Toast {
  message: string;
  type: "green" | "red" | "blue";
}

export interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Toast) => void;
  removeToast: (index: number) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

interface ToastsProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastsProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Toast) => {
    setToasts((prevToasts) => [...prevToasts, toast]);
  };

  const removeToast = (index: number) => {
    setToasts((prevToasts) => prevToasts.filter((_, i) => i !== index));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};
