import type { ServiceResponse } from "@/common/models/serviceResponse";
import { StatusCodes } from "http-status-codes";
import request from "supertest";

import prisma from "@/config/prisma";
import { app } from "@/server";
import { VoteType } from "@prisma/client";

import { DatabaseTestHelper } from "@/__tests__/helpers/DatabaseTestHelper";
import { LecturersTableTestHelper } from "@/__tests__/helpers/LecturersTableTestHelper";
import { ModuleVoteRecordsTableTestHelper } from "@/__tests__/helpers/ModuleVoteRecordsTableTestHelper";
import { ModulesTableTestHelper } from "@/__tests__/helpers/ModulesTableTestHelper";
import { UsersTableTestHelper } from "@/__tests__/helpers/UsersTableTestHelper";

describe("Users API Endpoints", () => {
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

  describe("GET /users", () => {
    it("should return valid response body", async () => {
      const user1 = await UsersTableTestHelper.insertUser({});
      const user2 = await UsersTableTestHelper.insertUser({});

      const response = await request(app).get("/api/users");
      const responseBody: ServiceResponse = response.body;

      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.message).toBe("Users found");
      expect(responseBody.responseObject).toMatchObject([
        {
          id: user1.id,
          username: user1.username,
          faculty: user1.faculty,
          department: user1.department,
          email: user1.email,
        },
        {
          id: user2.id,
          username: user2.username,
          faculty: user2.faculty,
          department: user2.department,
          email: user2.email,
        },
      ]);
    });

    it("should throw not found error when no users found", async () => {
      const response = await request(app).get("/api/users");
      const responseBody: ServiceResponse = response.body;

      expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND);
      expect(responseBody.success).toBeFalsy();
      expect(responseBody.message).toBe("No users found");
      expect(responseBody.responseObject).toBeNull();
    });
  });

  describe("GET /users/:id", () => {
    it("should return valid response body", async () => {
      const user = await UsersTableTestHelper.insertUser({});

      const response = await request(app).get(`/api/users/${user.id}`);
      const responseBody: ServiceResponse = response.body;

      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.message).toBe("User found");
      expect(responseBody.responseObject).toMatchObject({
        id: user.id,
        username: user.username,
        faculty: user.faculty,
        department: user.department,
        email: user.email,
      });
    });

    it("should return uploaded modules and votes record from user", async () => {
      const user = await UsersTableTestHelper.insertUser({});
      const module = await ModulesTableTestHelper.insertModule({ userId: user.id });

      const vote = await ModuleVoteRecordsTableTestHelper.insertVoteRecord({
        userId: user.id,
        moduleId: module.id,
        voteType: VoteType.UPVOTE,
      });

      const response = await request(app).get(`/api/users/${user.id}`);
      const responseBody: ServiceResponse = response.body;

      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.message).toBe("User found");
      expect(responseBody.responseObject).toStrictEqual({
        id: user.id,
        username: user.username,
        email: user.email,
        faculty: user.faculty,
        department: user.department,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
        uploadedModules: [
          {
            id: module.id,
            title: module.title,
          },
        ],
        votes: [
          {
            id: vote.id,
            voteType: vote.voteType,
            module: {
              id: module.id,
              title: module.title,
            },
          },
        ],
        comments: [],
      });
    });

    it("should throw not found error when user id not found", async () => {
      const response = await request(app).get("/api/users/xxx");
      const responseBody: ServiceResponse = response.body;

      expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND);
      expect(responseBody.success).toBeFalsy();
      expect(responseBody.message).toBe("User not found");
      expect(responseBody.responseObject).toBeNull();
    });
  });
});
