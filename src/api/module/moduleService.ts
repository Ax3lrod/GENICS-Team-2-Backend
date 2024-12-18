import { ServiceResponse } from "@/common/models/serviceResponse";
import { changeFileName, createStorage } from "@/common/utils/storageService";
import { VoteType } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { v4 as uuidv4 } from "uuid";
import {
  type DetailedModule,
  DetailedModuleSchema,
  type ModuleSearchQuery,
  type PostModule,
  type ShortModule,
  ShortModuleSchema,
} from "./moduleModel";
import { ModuleRepository } from "./moduleRepository";

export class ModuleService {
  constructor(private moduleRepository = new ModuleRepository()) {}

  async addModule(userId: string, payload: PostModule, file: Express.Multer.File) {
    try {
      const id = uuidv4();
      const newFile = changeFileName(file.path, id);
      const module = await this.moduleRepository.addModule(userId, {
        ...payload,
        id,
        filePath: `/modules/${newFile.filename}`,
      });

      const modulesToResponse = ShortModuleSchema.parse(module);
      return ServiceResponse.success("Module uploaded successfully", modulesToResponse, StatusCodes.CREATED);
    } catch (error) {
      return ServiceResponse.failure(
        "An error occured while creating modules",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(page: number, limit: number, search: string) {
    try {
      const modules = await this.moduleRepository.findAllAsync(page, limit, search);
      if (!modules || modules.totalCounts === 0) {
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

  async findById(id: string, userId = ""): Promise<ServiceResponse<DetailedModule | null>> {
    try {
      const module = await this.moduleRepository.findByIdAsync(id);
      if (!module) {
        return ServiceResponse.failure("Module not found", null, StatusCodes.NOT_FOUND);
      }

      if (userId && module.votes) {
        const userVote = module.votes.find((vote) => vote.user.id === userId)?.voteType;
        if (userVote) {
          module.voteStatus = userVote;
        }
      }

      const moduleToResponse = DetailedModuleSchema.parse(module);
      return ServiceResponse.success("Module found", moduleToResponse);
    } catch (error) {
      return ServiceResponse.failure(
        "An error occured while retrieving modules",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async upvoteModuleById(userId: string, moduleId: string) {
    return this.handleVote(userId, moduleId, VoteType.UPVOTE, "upvoted", "unvoted");
  }

  async downvoteModuleById(userId: string, moduleId: string) {
    return this.handleVote(userId, moduleId, VoteType.DOWNVOTE, "downvoted", "unvoted");
  }

  private async handleVote(
    userId: string,
    moduleId: string,
    voteType: VoteType,
    successMessage: string,
    unvoteMessage: string,
  ) {
    try {
      const module = await this.moduleRepository.findByIdAsync(moduleId);
      if (!module) {
        return ServiceResponse.failure("Module not found", null, StatusCodes.NOT_FOUND);
      }

      const existingVote = await this.moduleRepository.getVoteByUserIdAndModuleId(userId, moduleId);

      if (existingVote?.voteType === voteType) {
        await this.moduleRepository.deleteVote(userId, moduleId);
        return this.getUpdatedModuleResponse(moduleId, `Module ${unvoteMessage} successfully`);
      }

      if (existingVote) {
        await this.moduleRepository.deleteVote(userId, moduleId);
      }

      await this.moduleRepository.addVote(userId, moduleId, voteType);
      return this.getUpdatedModuleResponse(moduleId, `Module ${successMessage} successfully`);
    } catch (error) {
      return ServiceResponse.failure(
        "An error occurred while updating the vote",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByQuery(query: string, sort: string, order: string): Promise<ServiceResponse<ShortModule[] | null>> {
    try {
      const modules = await this.moduleRepository.findByQuery(query, sort, order);

      const modulesToResponse = modules.map((module: any) => ShortModuleSchema.parse(module));
      return ServiceResponse.success("Modules found", modulesToResponse);
    } catch (error) {
      return ServiceResponse.failure(
        "An error occured while retrieving modules",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async getUpdatedModuleResponse(moduleId: string, message: string) {
    const updatedModule = await this.moduleRepository.findByIdAsync(moduleId);
    if (!updatedModule) {
      return ServiceResponse.failure("Module not found", null, StatusCodes.NOT_FOUND);
    }
    return ServiceResponse.success(message, ShortModuleSchema.parse(updatedModule));
  }
}

export const moduleService = new ModuleService();
