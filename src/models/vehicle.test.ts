import { describe, expect, it } from "vitest";
import { validateVehicle, VehicleValidationErrors } from "./vehicle";

describe('validateVehicle', () => {
    it('should return no errors for a valid vehicle', () => {
      const vehicle = {
        id: 1,
        plate: 'ABC123',
        maxWeightCapacity: 1000,
      };
      const errors = validateVehicle(vehicle);
      expect(errors).toEqual({});
    });
  
    it('should return errors for an invalid plate', () => {
      const vehicle = {
        id: 1,
        plate: '',
        maxWeightCapacity: 1000,
      };
      const expectedErrors: VehicleValidationErrors = {
        plate: 'Invalid plate',
      };
      const errors = validateVehicle(vehicle);
      expect(errors).toEqual(expectedErrors);
    });
  
    it('should return errors for an invalid max weight capacity', () => {
      const vehicle = {
        id: 1,
        plate: 'ABC123',
        maxWeightCapacity: -1,
      };
      const expectedErrors: VehicleValidationErrors = {
        maxWeightCapacity: 'Invalid max weight capacity',
      };
      const errors = validateVehicle(vehicle);
      expect(errors).toEqual(expectedErrors);
    });
  
    it('should return errors for both invalid plate and max weight capacity', () => {
      const vehicle = {
        id: 1,
        plate: '',
        maxWeightCapacity: -1,
      };
      const expectedErrors: VehicleValidationErrors = {
        plate: 'Invalid plate',
        maxWeightCapacity: 'Invalid max weight capacity',
      };
      const errors = validateVehicle(vehicle);
      expect(errors).toEqual(expectedErrors);
    });
  });