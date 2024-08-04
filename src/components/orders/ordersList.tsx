import { PencilIcon } from "@heroicons/react/24/outline";
import { IconButton, Tooltip, Typography } from "@material-tailwind/react";
import Order from "@models/order";

const TABLE_HEAD = ["Latitude", "Longitude", "Weight", "Observations", ""];

interface OrderListProps {
  orders: Order[];
  handleChangeObservations: (id: number) => void;
}
export function OrdersList({
  orders,
  handleChangeObservations,
}: OrderListProps) {
  if (!orders?.length) {
    return (
      <>
        <div className="flex min-w-full items-center justify-center">
          <Typography
            variant="h6"
            color="blue-gray"
            className="font-normal leading-none opacity-70"
          >
            No orders to show
          </Typography>
        </div>
      </>
    );
  }
  return (
    <table className="w-full min-w-max table-auto text-left mx-7 mt-5 bg-white">
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
        {orders.map(
          ({ latitude, longitude, weight, observations, id }, index) => {
            const isLast = index === orders.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

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
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {observations}
                  </Typography>
                </td>
                <td className={classes}>
                  <Tooltip content="Edit Observations">
                    <IconButton
                      variant="text"
                      onClick={() => {
                        handleChangeObservations(id!);
                      }}
                    >
                      <PencilIcon className="h-4 w-4" />
                    </IconButton>
                  </Tooltip>
                </td>
              </tr>
            );
          }
        )}
      </tbody>
    </table>
  );
}
