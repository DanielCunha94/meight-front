import { describe, expect, test } from "vitest";
import {
  newAssignment,
  updateAssignmentOnCompleteOrder,
  validateAssignment,
} from "./assignment";

const validOrder = {
  id: 1,
  latitude: 45,
  longitude: 45,
  weight: 45,
  observations: "",
  assignmentID: null,
  isCompleted: false,
};

describe("Assignment Functions", () => {
  test("newAssignment should return a default assignment", () => {
    const assignment = newAssignment();
    expect(assignment).toEqual({
      id: null,
      plate: "",
      date: "",
      maxWeightCapacity: 0,
      currentWeightCapacity: 0,
      orders: [],
    });
  });

  test("validateAssignment should return errors for invalid assignments", () => {
    const invalidAssignment = {
      id: null,
      plate: "",
      date: "",
      maxWeightCapacity: 0,
      currentWeightCapacity: 0,
      orders: [],
    };

    const errors = validateAssignment(invalidAssignment);
    expect(errors).toEqual({
      plate: "Invalid plate",
      orders: "Invalid: must have at list one order",
    });
  });

  test("validateAssignment should return no errors for a valid assignment", () => {
    const validAssignment = {
      id: 1,
      plate: "ABC123",
      date: "2024-08-04",
      maxWeightCapacity: 100,
      currentWeightCapacity: 50,
      orders: [validOrder],
    };

    const errors = validateAssignment(validAssignment);
    expect(errors).toEqual({});
  });

  test("updateAssignmentOnCompleteOrder should update order completion status and capacity", () => {
    const initialAssignment = {
      id: 1,
      plate: "ABC123",
      date: "2024-08-04",
      maxWeightCapacity: 100,
      currentWeightCapacity: 50,
      orders: [validOrder],
    };

    const updatedAssignment = updateAssignmentOnCompleteOrder(
      initialAssignment,
      1
    );

    expect(updatedAssignment.orders[0].isCompleted).toBe(true);
    expect(updatedAssignment.currentWeightCapacity).toBe(5);
  });
});
