import { useEffect } from "react";
import useToasts from "./useToasts";

const useEvents = () => {
  const { addToast } = useToasts();
  useEffect(() => {
    const eventSource = new EventSource(
      "http://localhost:8080/events?stream=orders"
    );
    eventSource.onmessage = (event) => {
      addToast({ message: event.data, type: "blue" });
    };

    return () => eventSource.close();
  }, []);
};
export default useEvents;
