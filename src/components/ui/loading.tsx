import useLoading from "@hooks/useLoading";
import { Spinner } from "@material-tailwind/react";

const Loading = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;
  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
      <Spinner className="h-10 w-10" />
    </div>
  );
};

export default Loading;
