import { post } from "@/common/httpClient";
import { BASE_URL } from "@config";
import Vehicle from "@models/vehicle";

const vehicleService = {
  async create(vehicle: Vehicle) {
    try {
      const res = await post<Vehicle, { id: string }>(
        `${BASE_URL}/vehicles`,
        vehicle
      );

      return res;
    } catch (e) {
      return undefined;
    }
  },
};

export default vehicleService;
