export default interface Order {
  id: number | null;
  latitude: number | null;
  longitude: number | null;
  weight: number;
  observations: string;
  assignmentID: string | null;
  isCompleted: boolean;
}

export interface OrderValidationErrors {
  latitude?: string;
  longitude?: string;
  weight?: string;
}

export function newOrder(): Order {
  return {
    id: null,
    latitude: null,
    longitude: null,
    weight: 0,
    observations: "",
    assignmentID: null,
    isCompleted: false,
  };
}

export function validateOrder(order: Order) {
  const errors: OrderValidationErrors = {};
  if (
    order.longitude === null ||
    order.longitude < -180 ||
    order.longitude > 180
  ) {
    errors.longitude = "Invalid longitude";
  }

  if (order.latitude === null || order.latitude < -90 || order.latitude > 90) {
    errors.latitude = "Invalid latitude";
  }

  if (order.weight === null || order.weight <= 0) {
    errors.weight = "Invalid weight";
  }

  return errors;
}
