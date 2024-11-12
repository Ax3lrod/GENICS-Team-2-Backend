import { ServiceResponse } from "@/common/models/serviceResponse";
import { VoteType } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { type DetailedModule, DetailedModuleSchema, type ShortModule, ShortModuleSchema } from "./moduleModel";
import { ModuleRepository } from "./moduleRepository";

export class ModuleService {
  constructor(private moduleRepository = new ModuleRepository()) {}

  async findAll(): Promise<ServiceResponse<ShortModule[] | null>> {
    try {
      const modules = await this.moduleRepository.findAllAsync();
      if (!modules || modules.length === 0) {
        return ServiceResponse.failure("No modules found", null, StatusCodes.NOT_FOUND);
      }

      const modulesToResponse = modules.map((module) => ShortModuleSchema.parse(module));
      return ServiceResponse.success("Modules found", modulesToResponse);
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

  async findByQuery(query: string): Promise<ServiceResponse<ShortModule[] | null>> {
    try {
      const modules = await this.moduleRepository.findByQuery(query);
      if (!modules || modules.length === 0) {
        return ServiceResponse.failure("No modules found", null, StatusCodes.NOT_FOUND);
      }

      const modulesToResponse = modules.map((module) => ShortModuleSchema.parse(module));
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
