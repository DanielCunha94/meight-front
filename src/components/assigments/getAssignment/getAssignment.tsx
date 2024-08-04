import { HomeIcon } from "@heroicons/react/24/outline";
import useLoading from "@hooks/useLoading";
import useToasts from "@hooks/useToasts";
import {
  Timeline,
  TimelineBody,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineItem,
  Typography,
} from "@material-tailwind/react";
import Assignment, {
  updateAssignmentOnCompleteOrder,
} from "@models/assignment";
import assignmentService from "@services/assignment";
import orderService from "@services/order";
import { ChangeEvent, useState } from "react";
import InputSection from "./inputSection";
import TimelineOrderItem from "./timelineItem";

interface SearchState {
  plate: string;
  date: string;
}

export function GetAssignment() {
  const { setIsLoading } = useLoading();
  const { addToast } = useToasts();
  const [assignment, setAssignment] = useState<Assignment | undefined>();
  const [searchParams, setSearchParams] = useState<SearchState>({
    plate: "",
    date: "",
  });

  const handleChangePlate = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchParams((prev) => ({ ...prev, plate: e.target.value }));
  };

  const handleChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchParams((prev) => ({ ...prev, date: e.target.value }));
  };

  const handleSearch = async () => {
    setIsLoading(true);
    const res = await assignmentService.getAssignmentByPlateAndDate(
      searchParams.plate,
      searchParams.date
    );
    if (!res) {
      addToast({ message: "Assignment not found", type: "red" });
    }
    setAssignment(res);
    setIsLoading(false);
  };

  const handleCompleteOrder = async (orderID: number) => {
    setIsLoading(true);
    const res = await orderService.complete(orderID);
    addToast(
      res
        ? { message: "Order completed", type: "green" }
        : { message: "Failed to complete order", type: "red" }
    );

    if (res) {
      const updatedAssignment = updateAssignmentOnCompleteOrder(
        assignment!,
        orderID
      );
      setAssignment({ ...updatedAssignment });
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center">
      <Typography variant="h6" color="blue-gray" className="ml-10 mt-6">
        Check Orders for your vehicle
      </Typography>
      <InputSection
        searchParams={searchParams}
        handleChangePlate={handleChangePlate}
        handleChangeDate={handleChangeDate}
        handleSearch={handleSearch}
      />
      {assignment?.plate && (
        <div className="w-[32rem] mt-12">
          <Typography variant="h5" color="blue-gray">
            Max Capacity / Current Capacity
          </Typography>
          <Typography variant="paragraph" color="blue-gray" className="mb-4">
            {`${assignment.maxWeightCapacity}kg /${
              assignment.maxWeightCapacity - assignment.currentWeightCapacity
            }kg`}
          </Typography>
          <Timeline>
            <TimelineItem>
              <TimelineConnector />
              <TimelineHeader>
                <TimelineIcon className="p-2">
                  <HomeIcon className="h-4 w-4" />
                </TimelineIcon>
                <Typography variant="h5" color="blue-gray">
                  Start
                </Typography>
              </TimelineHeader>
              <TimelineBody className="pb-8">
                <Typography
                  color="blue-gray"
                  className="font-normal text-gray-600"
                >
                  Meight
                </Typography>
              </TimelineBody>
            </TimelineItem>
            {assignment?.orders.map((order, index) => (
              <TimelineOrderItem
                key={index}
                order={order}
                handleCompleteOrder={handleCompleteOrder}
              />
            ))}
            <TimelineItem>
              <TimelineHeader>
                <TimelineIcon className="p-2">
                  <HomeIcon className="h-4 w-4" />
                </TimelineIcon>
                <Typography variant="h5" color="blue-gray">
                  End
                </Typography>
              </TimelineHeader>
              <TimelineBody>
                <Typography
                  color="blue-gray"
                  className="font-normal text-gray-600"
                >
                  Meight
                </Typography>
              </TimelineBody>
            </TimelineItem>
          </Timeline>
        </div>
      )}
    </div>
  );
}
