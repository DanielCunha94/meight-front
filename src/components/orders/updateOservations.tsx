import { ChangeEvent, useState, MouseEvent, useEffect } from "react";
import {
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea,
} from "@material-tailwind/react";
import useLoading from "@hooks/useLoading";
import Order from "@models/order";
import orderService from "@services/order";
import Loading from "@components/ui/loading";
import useToasts from "@hooks/useToasts";

interface UpdateObservations {
  order: Order | undefined;
  open: boolean;
  handleOpen: () => void;
  onSubmit: () => void;
}

export function UpdateObservations({
  order,
  handleOpen,
  onSubmit,
  open,
}: UpdateObservations) {
  const { isLoading, setIsLoading } = useLoading();
  const [observations, setObservations] = useState("");
  const { addToast } = useToasts();

  useEffect(() => {
    if (order) {
      setObservations(order?.observations);
    }
  }, [order]);

  function handleChangeObservations(e: ChangeEvent<HTMLTextAreaElement>) {
    const { value } = e.target;
    setObservations(value);
  }

  async function handleSubmit(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (!order) {
      return;
    }

    setIsLoading(true);
    const res = await orderService.updateObservations(order.id!, observations);
    if (res !== undefined) {
      addToast({ message: "Order updated", type: "green" });
    } else {
      addToast({ message: "Fail to update Order", type: "red" });
    }

    setIsLoading(false);
    onSubmit();
    handleOpen();
  }

  return (
    <>
      <Dialog open={open} handler={handleOpen}>
        <Loading />
        <DialogHeader>Edit Order Observation</DialogHeader>
        <DialogBody>
          <form className="mt-2 mb-2  ">
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Observations
              </Typography>
              <Textarea
                value={observations}
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
}
