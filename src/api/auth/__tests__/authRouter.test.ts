import type { ServiceResponse } from "@/common/models/serviceResponse";
import { StatusCodes } from "http-status-codes";
import request from "supertest";

import prisma from "@/config/prisma";
import { app } from "@/server";

import { DatabaseTestHelper } from "@/__tests__/helpers/DatabaseTestHelper";
import { LecturersTableTestHelper } from "@/__tests__/helpers/LecturersTableTestHelper";
import { ModuleVoteRecordsTableTestHelper } from "@/__tests__/helpers/ModuleVoteRecordsTableTestHelper";
import { ModulesTableTestHelper } from "@/__tests__/helpers/ModulesTableTestHelper";
import { UsersTableTestHelper } from "@/__tests__/helpers/UsersTableTestHelper";
import { tokenManager } from "@/common/utils/tokenManager";

describe("Auth API Endpoints", () => {
  beforeEach(async () => {
    await DatabaseTestHelper.cleanAllTables();

    const users = await UsersTableTestHelper.findAllUsers();
    const modules = await ModulesTableTestHelper.findAllModules();
    const moduleVoteRecords = await ModuleVoteRecordsTableTestHelper.findAllVoteRecords();
    const lecturers = await LecturersTableTestHelper.findAllLecturers();

    expect(users).toHaveLength(0);
    expect(modules).toHaveLength(0);
    expect(moduleVoteRecords).toHaveLength(0);
    expect(lecturers).toHaveLength(0);
  });

  afterAll(async () => {
    await DatabaseTestHelper.cleanAllTables();

    const users = await UsersTableTestHelper.findAllUsers();
    const modules = await ModulesTableTestHelper.findAllModules();
    const moduleVoteRecords = await ModuleVoteRecordsTableTestHelper.findAllVoteRecords();
    const lecturers = await LecturersTableTestHelper.findAllLecturers();

    expect(users).toHaveLength(0);
    expect(modules).toHaveLength(0);
    expect(moduleVoteRecords).toHaveLength(0);
    expect(lecturers).toHaveLength(0);

    await prisma.$disconnect();
  });

  describe("POST /auth/register", () => {
    it("should return valid response body", async () => {
      const response = await request(app).post("/api/auth/register").send({
        email: "test@example.com",
        username: "genics",
        faculty: "SI",
        major: "FTEIC",
        password: "password",
      });
      const responseBody: ServiceResponse = response.body;

      expect(response.statusCode).toEqual(StatusCodes.CREATED);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.message).toBe("User registered successfully");
      expect(responseBody.responseObject).toStrictEqual({
        id: expect.any(String),
        email: "test@example.com",
        username: "genics",
        faculty: "SI",
        major: "FTEIC",
      });
    });

    it("should throw error when payload is invalid", async () => {
      const response = await request(app).post("/api/auth/register").send({
        faculty: "SI",
        major: "FTEIC",
        password: "password",
      });
      const responseBody: ServiceResponse = response.body;

      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(responseBody.success).toBeFalsy();
      expect(responseBody.message).toBeDefined();
      expect(responseBody.responseObject).toBeNull();
    });

    it("should throw error when username is already taken", async () => {
      const user = await UsersTableTestHelper.insertUser({});

      const response = await request(app).post("/api/auth/register").send({
        email: "test@example.com",
        username: user.username,
        faculty: "SI",
        major: "FTEIC",
        password: "password",
      });
      const responseBody: ServiceResponse = response.body;

      expect(response.statusCode).toEqual(StatusCodes.CONFLICT);
      expect(responseBody.success).toBeFalsy();
      expect(responseBody.message).toBeDefined();
      expect(responseBody.responseObject).toBeNull();
    });

    it("should throw error when email is already taken", async () => {
      const user = await UsersTableTestHelper.insertUser({});

      const response = await request(app).post("/api/auth/register").send({
        email: user.email,
        username: "test",
        faculty: "SI",
        major: "FTEIC",
        password: "password",
      });
      const responseBody: ServiceResponse = response.body;

      expect(response.statusCode).toEqual(StatusCodes.CONFLICT);
      expect(responseBody.success).toBeFalsy();
      expect(responseBody.message).toBeDefined();
      expect(responseBody.responseObject).toBeNull();
    });

    it("should throw error when password is less than 6 characters", async () => {
      const response = await request(app).post("/api/auth/register").send({
        email: "test@example.com",
        username: "test",
        faculty: "SI",
        major: "FTEIC",
        password: "123",
      });
      const responseBody: ServiceResponse = response.body;

      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(responseBody.success).toBeFalsy();
      expect(responseBody.message).toBeDefined();
      expect(responseBody.responseObject).toBeNull();
    });
  });

  describe("POST /auth/login", () => {
    it("should return valid response body", async () => {
      const user = await UsersTableTestHelper.insertUser({
        username: "genics",
        password: "password",
      });

      const response = await request(app).post("/api/auth/login").send({
        username: "genics",
        password: "password",
      });
      const responseBody: ServiceResponse = response.body;

      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.message).toBe("Login successful");
      expect(responseBody.responseObject).toStrictEqual({
        user: {
          id: user.id,
          username: user.username,
          faculty: user.faculty,
          major: user.major,
          email: user.email,
        },
        token: expect.any(String),
      });
    });

    it("should throw error when username is not found", async () => {
      const response = await request(app).post("/api/auth/login").send({
        username: "xxx",
        password: "password",
      });
      const responseBody: ServiceResponse = response.body;

      expect(response.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
      expect(responseBody.success).toBeFalsy();
      expect(responseBody.message).toBeDefined();
      expect(responseBody.responseObject).toBeNull();
    });

    it("should throw error when password is invalid", async () => {
      await UsersTableTestHelper.insertUser({
        username: "genics",
        email: "test@example.com",
      });

      const response = await request(app).post("/api/auth/login").send({
        username: "genics",
        password: "xxx",
      });
      const responseBody: ServiceResponse = response.body;

      expect(response.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
      expect(responseBody.success).toBeFalsy();
      expect(responseBody.message).toBeDefined();
      expect(responseBody.responseObject).toBeNull();
    });
  });

  describe("GET /auth/me", () => {
    it("should return valid response body", async () => {
      const user = await UsersTableTestHelper.insertUser({
        username: "genics",
        password: "password",
      });
      const token = tokenManager.generateToken({
        id: user.id,
        username: user.username,
      });

      const response = await request(app).get("/api/auth/me").set("Authorization", `Bearer ${token}`);
      const responseBody: ServiceResponse = response.body;

      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.message).toBeDefined();
      expect(responseBody.responseObject).toStrictEqual({
        id: user.id,
        username: user.username,
        email: user.email,
        faculty: user.faculty,
        major: user.major,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
        uploadedModules: [],
        votes: [],
        comments: [],
      });
    });
  });
});
