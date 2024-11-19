import { ServiceResponse } from "@/common/models/serviceResponse";
import { StatusCodes } from "http-status-codes";
import type { User } from "./userModel";
import { UserRepository } from "./userRepository";

export class UserService {
  private userRepository: UserRepository;

  constructor(repository: UserRepository = new UserRepository()) {
    this.userRepository = repository;
  }

  async findAll(page: number, limit: number, search: string) {
    try {
      const users = await this.userRepository.findAllAsync(page, limit, search);
      if (!users || users.totalCounts === 0) {
        return ServiceResponse.failure("No users found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success("Users found", users);
    } catch (error) {
      return ServiceResponse.failure(
        "An error occurred while retrieving users",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findById(id: string) {
    try {
      const user = await this.userRepository.findByIdAsync(id);
      if (!user) {
        return ServiceResponse.failure("User not found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success("User found", user);
    } catch (error) {
      return ServiceResponse.failure(
        "An error occurred while retrieving the user",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

export const userService = new UserService();
