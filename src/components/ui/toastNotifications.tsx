import useEvents from "@hooks/useEvents";
import useToasts from "@hooks/useToasts";
import { Alert } from "@material-tailwind/react";
import { useEffect } from "react";

const ToastContainer = () => {
  const { toasts, removeToast } = useToasts();
  useEvents();

  useEffect(() => {
    const interval = setInterval(() => {
      if (toasts.length > 0) {
        removeToast(0);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [toasts]);

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast, index) => (
        <Toast key={index} message={toast.message} type={toast.type} />
      ))}
    </div>
  );
};

const Toast = ({
  message,
  type,
}: {
  message: string;
  type: "red" | "blue" | "green";
}) => {
  return (
    <Alert color={type} variant="gradient" className="max-w-lg">
      {message}
    </Alert>
  );
};

export default ToastContainer;
