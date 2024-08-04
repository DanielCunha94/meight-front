import { get, patch, post } from "@/common/httpClient";
import { BASE_URL } from "@config";
import Order from "@models/order";

const orderService = {
  async create(order: Order) {
    try {
      const res = await post<Order, { id: string }>(
        `${BASE_URL}/orders`,
        order
      );

      return res;
    } catch (e) {
      return undefined;
    }
  },

  async getOrders(params?: Record<string, string>) {
    try {
      const res = await get<Order[]>(`${BASE_URL}/orders`, params);
      return res;
    } catch (e) {
      return undefined;
    }
  },

  async complete(orderID: number) {
    try {
      await post(`${BASE_URL}/orders/${orderID}/complete`);
      return true;
    } catch (e) {
      return false;
    }
  },

  async updateObservations(orderID: number, observations: string) {
    try {
      await patch(`${BASE_URL}/orders/${orderID}/observations`, {
        observations,
      });
      return true;
    } catch (e) {
      return false;
    }
  },
};

export default orderService;
