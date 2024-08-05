import { ChangeEvent, useState, MouseEvent } from "react";
import {
  Input,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea,
} from "@material-tailwind/react";
import useLoading from "@hooks/useLoading";
import { newOrder, OrderValidationErrors, validateOrder } from "@models/order";
import orderService from "@services/order";
import Loading from "@components/ui/loading";
import useToasts from "@hooks/useToasts";

interface NewOrderProps {
  onSubmit: () => void;
}

const NewOrder = ({ onSubmit }: NewOrderProps) => {
  const { isLoading, setIsLoading } = useLoading();
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState(newOrder());
  const [errors, setErrors] = useState<OrderValidationErrors>({});
  const { addToast } = useToasts();

  function handleOpen() {
    setOpen(!open);
    setOrder(newOrder());
    setErrors({});
  }

  function handleChangeLatitude(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;

    setOrder((prevOrder) => ({
      ...prevOrder,
      latitude: +value,
    }));
  }

  function handleChangeLongitude(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;

    setOrder((prevOrder) => ({
      ...prevOrder,
      longitude: +value,
    }));
  }

  function handleChangeWeight(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;

    setOrder((prevOrder) => ({
      ...prevOrder,
      weight: +value,
    }));
  }

  function handleChangeObservations(e: ChangeEvent<HTMLTextAreaElement>) {
    const { value } = e.target;

    setOrder((prevOrder) => ({
      ...prevOrder,
      observations: value,
    }));
  }

  async function handleSubmit(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    const errors = validateOrder(order);
    setErrors(errors);
    if (Object.keys(errors).length !== 0) {
      return;
    }

    setIsLoading(true);
    const res = await orderService.create(order);
    if (res !== undefined) {
      addToast({ message: "Order Created", type: "green" });
    } else {
      addToast({ message: "Fail to create Order", type: "red" });
    }
    onSubmit();
    setIsLoading(false);
    handleOpen();
  }

  return (
    <>
      <Button className="ml-10 mt-6" onClick={handleOpen} variant="gradient">
        Create Order
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <Loading />
        <DialogHeader>Create New Order</DialogHeader>
        <DialogBody>
          <form className="mt-2 mb-2  ">
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Destination
              </Typography>

              <Input
                onChange={handleChangeLatitude}
                type="number"
                size="lg"
                placeholder="latitude"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900 max-w-64"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {errors.latitude && (
                <Typography variant="small" color="red" className="-mt-3 ml-2">
                  {errors.latitude}
                </Typography>
              )}

              <Input
                onChange={handleChangeLongitude}
                type="number"
                size="lg"
                placeholder="longitude"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900 max-w-64"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {errors.longitude && (
                <Typography variant="small" color="red" className="-mt-3 ml-2">
                  {errors.longitude}
                </Typography>
              )}

              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Weight
              </Typography>
              <Input
                onChange={handleChangeWeight}
                type="number"
                size="lg"
                placeholder="weight"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900 max-w-64"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {errors.weight && (
                <Typography variant="small" color="red" className="-mt-3 ml-2">
                  {errors.weight}
                </Typography>
              )}

              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Observations
              </Typography>
              <Textarea
                value={order.observations}
                onChange={handleChangeObservations}
                size="lg"
                placeholder="observations"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
          </form>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            Cancel
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Confirm
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default NewOrder;
