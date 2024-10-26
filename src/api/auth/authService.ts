import { ServiceResponse } from "@/common/models/serviceResponse";
import { StatusCodes } from "http-status-codes";
import { UserRepository } from "../user/userRepository";
import { User } from "../user/userModel";
import bcrypt from "bcrypt";

export class AuthService{
    private userRepository: UserRepository;

    constructor(repository: UserRepository = new UserRepository()) {
        this.userRepository = repository;
    }

    async register(req: User){
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
            hashedPassword
          );
    
          return ServiceResponse.success("User registered successfully", newUser);
        } catch (error) {
          return ServiceResponse.failure(
            "An error occurred during registration",
            null,
            StatusCodes.INTERNAL_SERVER_ERROR
          );
        }
      }

}

export const authService = new AuthService();
