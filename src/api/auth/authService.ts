import { ServiceResponse } from "@/common/models/serviceResponse";
import { hashManager } from "@/common/utils/hashManager";
import { tokenManager } from "@/common/utils/tokenManager";
import { env } from "@/config/env";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid-cjs";
import type { User } from "../user/userModel";
import { UserRepository } from "../user/userRepository";
import { LoginResponseSchema, RegisterResponseSchema } from "./authModel";
import { EmailService } from "./emailService";

export class AuthService {
  private userRepository: UserRepository;
  private emailService: EmailService;

  constructor(repository: UserRepository = new UserRepository(), emailService: EmailService = new EmailService()) {
    this.userRepository = repository;
    this.emailService = emailService;
  }

  async register(req: User) {
    try {
      const existingUsername = await this.userRepository.findByUsername(req.username);

      if (existingUsername) {
        return ServiceResponse.failure("Username already exists", null, StatusCodes.CONFLICT);
      }

      const existingEmail = await this.userRepository.findByEmail(req.email);

      if (existingEmail) {
        return ServiceResponse.failure("Email already exists", null, StatusCodes.CONFLICT);
      }

      const hashedPassword = await hashManager.hash(req.password);

      const newUser = await this.userRepository.createUser(
        req.username,
        req.email,
        req.faculty,
        req.department,
        hashedPassword,
      );

      const userToResponse = RegisterResponseSchema.parse(newUser);

      return ServiceResponse.success("User registered successfully", userToResponse, StatusCodes.CREATED);
    } catch (error: any) {
      return ServiceResponse.failure(
        `Registration failed: ${error.message || "Unknown error"}`,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(username: string, password: string) {
    try {
      const user = await this.userRepository.findByUsername(username);
      if (!user) {
        return ServiceResponse.failure("Invalid username or password", null, StatusCodes.UNAUTHORIZED);
      }

      // Verify password
      const isPasswordValid = await hashManager.compare(password, user.password);
      if (!isPasswordValid) {
        return ServiceResponse.failure("Invalid username or password", null, StatusCodes.UNAUTHORIZED);
      }

      const token = tokenManager.generateToken({
        id: user.id,
        username: user.username,
        email: user.email,
      });

      const userToResponse = LoginResponseSchema.parse(user);
      return ServiceResponse.success("Login successful", {
        user: userToResponse,
        token,
      });
    } catch (error) {
      return ServiceResponse.failure("An error occurred during login", null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
  async forgetPassword(email: string) {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        return ServiceResponse.failure("Email not found", null, StatusCodes.NOT_FOUND);
      }

      const resetToken = nanoid(32);
      const hashedToken = await hashManager.hash(resetToken);

      await this.userRepository.savePasswordResetToken(user.id, hashedToken);

      await this.emailService.sendPasswordResetEmail(user.email, `Your password reset token is: ${resetToken}`);

      return ServiceResponse.success("Password reset email sent", null);
    } catch (error) {
      return ServiceResponse.failure(
        "An error occurred during forget password",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async resetPassword(id: string, token: string, newPassword: string) {
    try {
      const user = await this.userRepository.findByIdAndToken(id, token);
      if (!user) {
        return ServiceResponse.failure("Invalid or expired token", null, StatusCodes.UNAUTHORIZED);
      }

      await this.userRepository.resetPassword(user.id, newPassword);
      return ServiceResponse.success("Password reset successfully", null);
    } catch (error) {
      return ServiceResponse.failure(
        "An error occurred during reset password",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAuthenticatedUser(userId: string) {
    try {
      const user = await this.userRepository.findByIdAsync(userId);
      if (!user) {
        return ServiceResponse.failure("User not found", null, StatusCodes.NOT_FOUND);
      }

      return ServiceResponse.success("User retrieved successfully", user);
    } catch (error) {
      return ServiceResponse.failure("Failed to retrieve user", null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}

export const authService = new AuthService();
