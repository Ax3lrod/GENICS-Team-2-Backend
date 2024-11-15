import { ServiceResponse } from "@/common/models/serviceResponse";
import { StatusCodes } from "http-status-codes";
import { DetailedLecturerSchema, type Lecturer, ShortLecturerSchema } from "./lecturerModel";
import { LecturerRepository } from "./lecturerRepository";

export class LecturerService {
  private lecturerRepository: LecturerRepository;

  constructor(repository: LecturerRepository = new LecturerRepository()) {
    this.lecturerRepository = repository;
  }

  async findAll(): Promise<ServiceResponse<Lecturer[] | null>> {
    try {
      const lecturers = await this.lecturerRepository.findAll();
      if (!lecturers || lecturers.length === 0) {
        return ServiceResponse.failure("No lecturers found", null, StatusCodes.NOT_FOUND);
      }

      const lecturersToResponse = lecturers.map((lecturer) => ShortLecturerSchema.parse(lecturer));
      return ServiceResponse.success("Lecturers found", lecturersToResponse);
    } catch (error) {
      return ServiceResponse.failure(
        "An error occurred while retrieving lecturers",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findById(id: string): Promise<ServiceResponse<Lecturer | null>> {
    try {
      const lecturer = await this.lecturerRepository.findById(id);
      if (!lecturer) {
        return ServiceResponse.failure("Lecturer not found", null, StatusCodes.NOT_FOUND);
      }

      const lecturerToResponse = DetailedLecturerSchema.parse(lecturer);
      return ServiceResponse.success<Lecturer>("Lecturer found", lecturerToResponse);
    } catch (error) {
      return ServiceResponse.failure(
        "An error occurred while retrieving the lecturer.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByQuery(query: string, sort: string, order: string): Promise<ServiceResponse<Lecturer[] | null>> {
    try {
      const lecturers = await this.lecturerRepository.findByQuery(query, sort, order);

      const lecturersToResponse = lecturers.map((lecturer) => ShortLecturerSchema.parse(lecturer));
      return ServiceResponse.success("Lecturers found", lecturersToResponse);
    } catch (error) {
      return ServiceResponse.failure(
        "An error occurred while retrieving lecturers",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

export const lecturerService = new LecturerService();
