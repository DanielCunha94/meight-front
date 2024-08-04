import { describe, expect, it } from "vitest";
import Order, { OrderValidationErrors, validateOrder } from "./order";

describe('validateOrder', () => {
    it('should return no errors for a valid order', () => {
      const validOrder: Order = {
        id: 1,
        latitude: 40.7128,
        longitude: -74.0060,
        weight: 10,
        observations: 'Deliver by noon',
        assignmentID: '12345',
        isCompleted: false,
      };
      const result: OrderValidationErrors = validateOrder(validOrder);
      expect(result).toEqual({});
    });
  
    it('should return an error for invalid latitude', () => {
      const invalidOrder: Order = {
        id: 2,
        latitude: 100, // Invalid latitude
        longitude: -74.0060,
        weight: 10,
        observations: 'Deliver by noon',
        assignmentID: '12345',
        isCompleted: false,
      };
      const result: OrderValidationErrors = validateOrder(invalidOrder);
      expect(result).toHaveProperty('latitude', 'Invalid latitude');
    });
  
    it('should return an error for invalid longitude', () => {
      const invalidOrder: Order = {
        id: 3,
        latitude: 40.7128,
        longitude: -200, // Invalid longitude
        weight: 10,
        observations: 'Deliver by noon',
        assignmentID: '12345',
        isCompleted: false,
      };
      const result: OrderValidationErrors = validateOrder(invalidOrder);
      expect(result).toHaveProperty('longitude', 'Invalid longitude');
    });
  
    it('should return an error for invalid weight', () => {
      const invalidOrder: Order = {
        id: 4,
        latitude: 40.7128,
        longitude: -74.0060,
        weight: -5, // Invalid weight
        observations: 'Deliver by noon',
        assignmentID: '12345',
        isCompleted: false,
      };
      const result: OrderValidationErrors = validateOrder(invalidOrder);
      expect(result).toHaveProperty('weight', 'Invalid weight');
    });
  
    it('should return multiple errors if multiple fields are invalid', () => {
      const invalidOrder: Order = {
        id: 5,
        latitude: 100, // Invalid latitude
        longitude: -200, // Invalid longitude
        weight: -5, // Invalid weight
        observations: 'Deliver by noon',
        assignmentID: '12345',
        isCompleted: false,
      };
      const result: OrderValidationErrors = validateOrder(invalidOrder);
      expect(result).toEqual({
        latitude: 'Invalid latitude',
        longitude: 'Invalid longitude',
        weight: 'Invalid weight',
      });
    });
  });