import { get, post } from "@/common/httpClient";
import { BASE_URL } from "@config";
import Assignment from "@models/assignment";

const assignmentService = {
  async create(assignment: Assignment) {
    try {
      const res = await post<Assignment, { id: string }>(
        `${BASE_URL}/assignments`,
        assignment
      );
      return res;
    } catch (e) {
      return undefined;
    }
  },

  async getAssignmentByPlateAndDate(plate: string, date: string) {
    try {
      const res = await get<Assignment>(
        `${BASE_URL}/assignments/plate/${plate}/date/${date}`
      );
      return res;
    } catch (e) {
      return undefined;
    }
  },
};

export default assignmentService;
