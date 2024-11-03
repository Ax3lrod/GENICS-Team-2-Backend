import { ServiceResponse } from "@/common/models/serviceResponse";
import { StatusCodes } from "http-status-codes";
import type { Module } from "./moduleModel";
import { ModuleRepository } from "./moduleRepository";

export class ModuleService {
  private moduleRepository: ModuleRepository;

  constructor(repository: ModuleRepository = new ModuleRepository()) {
    this.moduleRepository = repository;
  }

  async findAll(): Promise<ServiceResponse<Module[] | null>> {
    try {
      const modules = await this.moduleRepository.findAllAsync();
      if (!modules || modules.length === 0) {
        return ServiceResponse.failure("No modules found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success("Modules found", modules);
    } catch (error) {
      return ServiceResponse.failure(
        "An error occured while retrieving modules",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findById(id: string): Promise<ServiceResponse<Module | null>> {
    try {
      const module = await this.moduleRepository.findByIdAsync(id);
      if (!module) {
        return ServiceResponse.failure("Module not found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success("Module found", module);
    } catch (error) {
      return ServiceResponse.failure(
        "An error occured while retrieving the module",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async upvoteModuleById(userId: string, moduleId: string) {
    try {
      const module = await this.moduleRepository.findByIdAsync(moduleId);

      if (!module) {
        return ServiceResponse.failure("Module not found", null, StatusCodes.NOT_FOUND);
      }

      const existingVote = await this.moduleRepository.getVoteByUserIdAndModuleId(userId, moduleId);

      if (existingVote) {
        await this.moduleRepository.deleteVote(userId, moduleId);
        return ServiceResponse.success("Module unvoted successfully", null);
      }

      await this.moduleRepository.addVote(userId, moduleId);
      return ServiceResponse.success("Module upvoted successfully", null);
    } catch (error) {
      return ServiceResponse.failure(
        "An error occured while retrieving the module",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async downvoteModuleById(userId: string, moduleId: string) {
    try {
      const module = await this.moduleRepository.findByIdAsync(moduleId);

      if (!module) {
        return ServiceResponse.failure("Module not found", null, StatusCodes.NOT_FOUND);
      }

      const existingVote = await this.moduleRepository.getVoteByUserIdAndModuleId(userId, moduleId);

      if (existingVote) {
        await this.moduleRepository.deleteVote(userId, moduleId);
        return ServiceResponse.success("Module unvoted successfully", null);
      }

      await this.moduleRepository.addVote(userId, moduleId);
      return ServiceResponse.success("Module downvoted successfully", null);
    } catch (error) {
      return ServiceResponse.failure(
        "An error occured while retrieving the module",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

export const moduleService = new ModuleService();
