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
        throw new Error("No modules found");
      }
      return ServiceResponse.success<Module[]>("Modules found", modules);
    } catch (ex) {
      return ServiceResponse.failure(
        "An error occurred while retrieving modules.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllModules(): Promise<ServiceResponse<Module[] | null>> {
    try {
      const modules = await this.moduleRepository.findAllAsync();
      if (!modules || modules.length === 0) {
        throw new Error("No modules found");
      }
      return ServiceResponse.success<Module[]>("Modules found", modules);
    } catch (ex) {
      return ServiceResponse.failure(
        "An error occurred while retrieving modules.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

export const moduleService = new ModuleService();
