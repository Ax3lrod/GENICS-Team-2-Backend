import { ServiceResponse } from "@/common/models/serviceResponse";
import { env } from "@/config/env";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid-cjs";
import type { User } from "../user/userModel";
import { UserRepository } from "../user/userRepository";
import { EmailService } from "./emailService";

export class AuthService {
  private userRepository: UserRepository;
  private emailService: EmailService;

  private readonly JWT_SECRET = env.JWT_SECRET || "secretkeybro";
  private readonly JWT_EXPIRES_IN = "24h";

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
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return ServiceResponse.failure("Invalid username or password", null, StatusCodes.UNAUTHORIZED);
      }

      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          email: user.email,
        },
        this.JWT_SECRET,
        { expiresIn: this.JWT_EXPIRES_IN },
      );

      const { password: _, ...userWithoutPassword } = user;
      return ServiceResponse.success("Login successful", {
        user: userWithoutPassword,
        token,
      });
    } catch (error) {
      console.log("🚀 ~ AuthService ~ login ~ error:", error);
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
