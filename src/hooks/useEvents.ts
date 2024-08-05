import { useEffect } from "react";
import useToasts from "./useToasts";
import { BASE_URL } from "@config";

const useEvents = () => {
  const { addToast } = useToasts();
  useEffect(() => {
    const eventSource = new EventSource(`${BASE_URL}/events?stream=orders`);
    eventSource.onmessage = (event) => {
      addToast({ message: event.data, type: "blue" });
    };

    return () => eventSource.close();
  }, []);
};
export default useEvents;
