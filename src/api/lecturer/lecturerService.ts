import { ServiceResponse } from "@/common/models/serviceResponse";
import { StatusCodes } from "http-status-codes";
import type { Lecturer } from "./lecturerModel";
import { LecturerRepository } from "./lecturerRepository";

export class LecturerService {
  private lecturerRepository = new LecturerRepository();

  // Metode untuk mendapatkan dosen berdasarkan ID
  async findById(id: string): Promise<ServiceResponse<Lecturer | null>> {
    try {
      const lecturer = await this.lecturerRepository.findById(id);
      if (!lecturer) {
        return ServiceResponse.failure("Lecturer not found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<Lecturer>("Lecturer found", lecturer);
    } catch (error) {
      return ServiceResponse.failure(
        "An error occurred while retrieving the lecturer.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
