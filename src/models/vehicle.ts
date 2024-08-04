export default interface Vehicle {
  id: number | null;
  plate: string;
  maxWeightCapacity: number;
}

export interface VehicleValidationErrors {
  plate?: string;
  maxWeightCapacity?: string;
}

export function newVehicle(): Vehicle {
  return {
    id: null,
    plate: "",
    maxWeightCapacity: 0,
  };
}

export function validateVehicle(vehicle: Vehicle) {
  const errors: VehicleValidationErrors = {};

  if (!vehicle.plate) {
    errors.plate = "Invalid plate";
  }

  if (
    vehicle.maxWeightCapacity === undefined ||
    vehicle.maxWeightCapacity <= 0
  ) {
    errors.maxWeightCapacity = "Invalid max weight capacity";
  }

  return errors;
}
