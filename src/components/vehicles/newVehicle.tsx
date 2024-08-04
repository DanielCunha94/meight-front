import {
  Input,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { ChangeEvent, MouseEvent, useState } from "react";
import Loading from "@components/ui/loading";
import useLoading from "@hooks/useLoading";
import {
  newVehicle,
  validateVehicle,
  VehicleValidationErrors,
} from "@models/vehicle";
import vehicleService from "@services/vehicle";
import useToasts from "@hooks/useToasts";

export function NewVehicle() {
  const { isLoading, setIsLoading } = useLoading();
  const [open, setOpen] = useState(false);
  const [vehicle, setVehicle] = useState(newVehicle());
  const [errors, setErrors] = useState<VehicleValidationErrors>({});
  const { addToast } = useToasts();

  function handleOpen() {
    setOpen(!open);
    setVehicle(newVehicle());
    setErrors({});
  }

  function handleChangePlate(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;

    setVehicle((prevVehicle) => ({
      ...prevVehicle,
      plate: value,
    }));
  }

  function handleChangeMaxCapacity(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;

    setVehicle((prevVehicle) => ({
      ...prevVehicle,
      maxWeightCapacity: +value,
    }));
  }

  async function handleSubmit(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    const errors = validateVehicle(vehicle);
    setErrors(errors);
    if (Object.keys(errors).length !== 0) {
      return;
    }

    setIsLoading(true);
    const res = await vehicleService.create(vehicle);
    if (res !== undefined) {
      addToast({ message: "Vehicle Created", type: "green" });
    } else {
      addToast({ message: "Fail to create Vehicle", type: "red" });
    }
    setIsLoading(false);
    handleOpen();
  }

  return (
    <>
      <Button className="ml-10 mt-6" onClick={handleOpen} variant="gradient">
        Create Vehicle
      </Button>
      <form className="mt-2 mb-2 ">
        <Dialog open={open} handler={handleOpen}>
          <Loading />
          <DialogHeader>Create New Vehicle</DialogHeader>
          <DialogBody>
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Plate
              </Typography>
              <Input
                onChange={handleChangePlate}
                size="lg"
                placeholder="plate"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {errors.plate && (
                <Typography variant="small" color="red" className="-mt-3 ml-2">
                  {errors.plate}
                </Typography>
              )}

              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Max weight capacity
              </Typography>

              <Input
                onChange={handleChangeMaxCapacity}
                type="number"
                size="lg"
                placeholder="Max weight capacity"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />

              {errors.maxWeightCapacity && (
                <Typography variant="small" color="red" className="-mt-3 ml-2">
                  {errors.maxWeightCapacity}
                </Typography>
              )}
            </div>
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
              disabled={isLoading}
              variant="gradient"
              color="green"
              onClick={handleSubmit}
            >
              Confirm
            </Button>
          </DialogFooter>
        </Dialog>
      </form>
    </>
  );
}
