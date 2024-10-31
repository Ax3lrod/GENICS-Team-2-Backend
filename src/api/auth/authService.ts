import { ServiceResponse } from "@/common/models/serviceResponse";
import bcrypt from "bcrypt";
import { email } from "envalid";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import type { User } from "../user/userModel";
import { UserRepository } from "../user/userRepository";

export class AuthService {
  private userRepository: UserRepository;
  private readonly JWT_SECRET = process.env.JWT_SECRET || "secretkeybro";
  private readonly JWT_EXPIRES_IN = "24h";

  constructor(repository: UserRepository = new UserRepository()) {
    this.userRepository = repository;
  }

  async register(req: User) {
    try {
      const existingUsername = await this.userRepository.findByUsername(req.username);
      // console.log('Existing username check result:', existingUsername);

      if (existingUsername) {
        return ServiceResponse.failure("Username already exists", null, StatusCodes.CONFLICT);
      }

      const existingEmail = await this.userRepository.findByEmail(req.email);
      // console.log('Existing email check result:', existingEmail);

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
      // console.log('New user created:', JSON.stringify(newUser, null, 2));

      return ServiceResponse.success("User registered successfully", newUser);
    } catch (error: any) {
      console.error("Registration error:", error);

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
      return ServiceResponse.failure("An error occurred during login", null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}

export const authService = new AuthService();
