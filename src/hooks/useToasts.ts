import { ToastContext } from "@store/toasts";
import { useContext } from "react";

const useToasts = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToasts must be used within a ToastProvider");
  }
  return context;
};

export default useToasts;
