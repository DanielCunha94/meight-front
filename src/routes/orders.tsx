import { NewOrder } from "@components/orders/newOrder";
import { OrdersList } from "@components/orders/ordersList";
import { UpdateObservations } from "@components/orders/updateOservations";
import Order from "@models/order";
import orderService from "@services/order";
import { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderToEdit, setOrderToEdit] = useState<Order>();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    updateOrders();
  }, []);

  async function updateOrders() {
    const res = (await orderService.getOrders()) || [];
    setOrders(res);
  }

  function handleChangeObservations(id: number) {
    const order = orders.find((o) => o.id === id);
    setOrderToEdit(order);
    setModalOpen(true);
  }

  function onSubmit() {
    updateOrders();
  }

  function handleOpen() {
    setModalOpen(!modalOpen);
  }

  return (
    <div>
      <NewOrder />
      <OrdersList
        orders={orders}
        handleChangeObservations={handleChangeObservations}
      />
      <UpdateObservations
        open={modalOpen}
        onSubmit={onSubmit}
        handleOpen={handleOpen}
        order={orderToEdit}
      />
    </div>
  );
}
