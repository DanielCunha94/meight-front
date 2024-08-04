import { CheckCircleIcon, CubeIcon } from "@heroicons/react/24/outline";
import {
  Button,
  TimelineBody,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineItem,
  Typography,
} from "@material-tailwind/react";
import Order from "@models/order";

interface TimelineOrderItemProps {
  order: Order;
  handleCompleteOrder: (orderID: number) => void;
}

const TimelineOrderItem = ({
  order,
  handleCompleteOrder,
}: TimelineOrderItemProps) => (
  <TimelineItem>
    <TimelineConnector />
    <TimelineHeader>
      <TimelineIcon className="p-2">
        <CubeIcon className="h-4 w-4" />
      </TimelineIcon>
      <Typography variant="h5" color="blue-gray">
        Order
      </Typography>
    </TimelineHeader>
    <TimelineBody className="pb-8">
      <Typography variant="h6" color="blue-gray">
        Destination
      </Typography>
      <Typography color="blue-gray" className="font-normal text-gray-600">
        {`latitude: ${order.latitude}, longitude: ${order.longitude}`}
      </Typography>
      <Typography className="mt-1" variant="h6" color="blue-gray">
        Weight
      </Typography>
      <Typography color="blue-gray" className="font-normal text-gray-600">
        {order.weight} kg
      </Typography>
      <Typography className="mt-1" variant="h6" color="blue-gray">
        Observations
      </Typography>
      <Typography color="blue-gray" className="font-normal text-gray-600">
        {order.observations}
      </Typography>

      {order.isCompleted ? (
        <div className="mt-2 flex items-center gap-2">
          <CheckCircleIcon color="green" className=" h-10 w-10" />
          <Typography color="green">completed</Typography>
        </div>
      ) : (
        <Button
          variant="outlined"
          className="mt-3"
          onClick={() => handleCompleteOrder(order.id!)}
        >
          complete
        </Button>
      )}
    </TimelineBody>
  </TimelineItem>
);

export default TimelineOrderItem;
