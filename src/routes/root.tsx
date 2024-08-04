import CustomNavbar from "@/components/ui/customNabbar";
import Loading from "@/components/ui/loading";
import ToastContainer from "@components/ui/toastNotifications";
import { LoadingProvider } from "@store/loading";
import { ToastProvider } from "@store/toasts";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Root = () => {
  useEffect(() => {
    const eventSource = new EventSource(
      "http://localhost:8080/events?stream=orders"
    );
    eventSource.onmessage = (event) => {
      console.log(event);
    };

    return () => eventSource.close();
  }, []);

  return (
    <ToastProvider>
      <LoadingProvider>
        <div className="bg-gray-100 min-h-screen pt-5">
          <ToastContainer />
          <CustomNavbar />
          <Outlet />
          <Loading />
        </div>
      </LoadingProvider>
    </ToastProvider>
  );
};

export default Root;
