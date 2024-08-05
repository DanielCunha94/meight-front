import {
  Input,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Checkbox,
} from "@material-tailwind/react";
import { ChangeEvent, MouseEvent, useState } from "react";
import Loading from "@components/ui/loading";
import useLoading from "@hooks/useLoading";
import useToasts from "@hooks/useToasts";
import {
  AssignmentValidationErrors,
  newAssignment,
  validateAssignment,
} from "@models/assignment";
import assignmentService from "@services/assignment";
import Order from "@models/order";
import orderService from "@services/order";

const TABLE_HEAD = ["Latitude", "Longitude", "Weight", "Selected"];

const NewAssignment = () => {
  const { isLoading, setIsLoading } = useLoading();
  const [open, setOpen] = useState(false);
  const [assignment, setAssignment] = useState(newAssignment());
  const [errors, setErrors] = useState<AssignmentValidationErrors>({});
  const { addToast } = useToasts();
  const [orders, setOrders] = useState<Order[]>([]);

  async function handleOpen() {
    setOpen(!open);
    if (!open) {
      const res = (await orderService.getOrders({ assignmentid: "0" })) || [];
      setOrders(res);
    }
    setAssignment(newAssignment());
    setErrors({});
  }

  function handleChangePlate(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;

    setAssignment((prevState) => ({
      ...prevState,
      plate: value,
    }));
  }

  function handleChangeDate(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;

    setAssignment((prevState) => ({
      ...prevState,
      date: value,
    }));
  }

  function handleSelectOrder(index: number) {
    let assignmentOrders = assignment.orders;

    const i = assignmentOrders.findIndex((o) => o.id === orders[index].id);
    if (i == -1) {
      assignmentOrders.push(orders[index]);
    } else {
      assignmentOrders = assignmentOrders.filter(
        (o) => o.id != orders[index].id
      );
    }

    setAssignment((prevState) => ({
      ...prevState,
      orders: [...assignmentOrders],
    }));
  }

  async function handleSubmit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const errors = validateAssignment(assignment);
    setErrors(errors);
    if (Object.keys(errors).length !== 0) {
      return;
    }

    setIsLoading(true);
    const res = await assignmentService.create(assignment);
    if (res !== undefined) {
      addToast({ message: "Assignment Created", type: "green" });
    } else {
      addToast({ message: "Fail to create Assignment", type: "red" });
    }
    setIsLoading(false);
    handleOpen();
  }

  return (
    <>
      <Button className="ml-10 mt-6" onClick={handleOpen} variant="gradient">
        Create Assignment
      </Button>
      <form className="mt-2 mb-2 ">
        <Dialog open={open} handler={handleOpen}>
          <Loading />
          <DialogHeader> Create New Assignment</DialogHeader>
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
                Date
              </Typography>

              <Input
                onChange={handleChangeDate}
                type="date"
                size="lg"
                placeholder="Max weight capacity"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {errors.date && (
                <Typography variant="small" color="red" className="-mt-3 ml-2">
                  {errors.date}
                </Typography>
              )}
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Orders
              </Typography>
              <div className="max-h-64 overflow-y-scroll">
                <table className="w-full min-w-max table-auto text-left ">
                  <thead>
                    <tr>
                      {TABLE_HEAD.map((head) => (
                        <th
                          key={head}
                          className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                        >
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal leading-none opacity-70"
                          >
                            {head}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(({ latitude, longitude, weight }, index) => {
                      const isLast = index === orders.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";

                      return (
                        <tr key={index}>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {latitude}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {longitude}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {weight}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Checkbox
                              onChange={() => {
                                handleSelectOrder(index);
                              }}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
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
};

export default NewAssignment;
