import { ServiceResponse } from "@/common/models/serviceResponse";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import { nanoid } from "nanoid-cjs";
import type { User } from "../user/userModel";
import { UserRepository } from "../user/userRepository";
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
        return ServiceResponse.failure("Username already exist", null, StatusCodes.CONFLICT);
      }

      const existingEmail = await this.userRepository.findByEmail(req.email);
      if (existingEmail) {
        return ServiceResponse.failure("Email already exist", null, StatusCodes.CONFLICT);
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.password, salt);

      const newUser = await this.userRepository.createUser(
        req.username,
        req.email,
        req.faculty,
        req.major,
        hashedPassword,
      );

      return ServiceResponse.success("User registered successfully", newUser);
    } catch (error) {
      return ServiceResponse.failure("An error occurred during registration", null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async forgetPassword(email: string) {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        return ServiceResponse.failure("Email not found", null, StatusCodes.NOT_FOUND);
      }

      const resetToken = nanoid(32);
      const salt = await bcrypt.genSalt(10);
      const hashedToken = await bcrypt.hash(resetToken, salt);

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
}

export const authService = new AuthService();
