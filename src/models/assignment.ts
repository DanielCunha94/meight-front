import Order from "./order";

export default interface Assignment {
  id: number | null;
  plate: string;
  date: string;
  maxWeightCapacity: number;
  currentWeightCapacity: number;
  orders: Order[];
}

export interface AssignmentValidationErrors {
  plate?: string;
  date?: string;
  orders?: string;
}

export function newAssignment(): Assignment {
  return {
    id: null,
    date: "",
    plate: "",
    maxWeightCapacity: 0,
    currentWeightCapacity: 0,
    orders: [],
  };
}

export function validateAssignment(assignment: Assignment) {
  const errors: AssignmentValidationErrors = {};

  if (!assignment.plate) {
    errors.plate = "Invalid plate";
  }

  if (!assignment.date) {
    errors.plate = "Invalid plate";
  }

  if (assignment.orders.length < 1) {
    errors.orders = "Invalid: must have at list one order";
  }

  return errors;
}

export function updateAssignmentOnCompleteOrder(
  assignment: Assignment,
  orderID: number
) {
  const updatedAssignment = {
    ...assignment,
  };

  updatedAssignment.orders.forEach((o) => {
    if (o.id === orderID) {
      o.isCompleted = true;

      updatedAssignment.currentWeightCapacity =
        updatedAssignment.currentWeightCapacity - o.weight;
    }
  });

  return updatedAssignment;
}
