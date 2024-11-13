import type { ServiceResponse } from "@/common/models/serviceResponse";
import { StatusCodes } from "http-status-codes";
import request from "supertest";

import { tokenManager } from "@/common/utils/tokenManager";
import prisma from "@/config/prisma";
import { app } from "@/server";
import { VoteType } from "@prisma/client";
import type { Module } from "../moduleModel";

import { DatabaseTestHelper } from "@/__tests__/helpers/DatabaseTestHelper";
import { LecturersTableTestHelper } from "@/__tests__/helpers/LecturersTableTestHelper";
import { ModuleVoteRecordsTableTestHelper } from "@/__tests__/helpers/ModuleVoteRecordsTableTestHelper";
import { ModulesTableTestHelper } from "@/__tests__/helpers/ModulesTableTestHelper";
import { UsersTableTestHelper } from "@/__tests__/helpers/UsersTableTestHelper";

describe("Module API Endpoints", () => {
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

  describe("GET /api/modules", () => {
    it("should return a list of modules", async () => {
      const user = await UsersTableTestHelper.insertUser({});

      const module0 = await ModulesTableTestHelper.insertModule({ userId: user.id });
      const module1 = await ModulesTableTestHelper.insertModule({ userId: user.id });
      const module2 = await ModulesTableTestHelper.insertModule({ userId: user.id });

      const response = await request(app).get("/api/modules");

      const responseBody = response.body;
      const { responseObject } = responseBody;
      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.message).toContain("Modules found");

      expect(responseObject.length).toEqual(3);

      expect(responseObject[0]).toStrictEqual({
        id: module0.id,
        title: module0.title,
        description: module0.description,
        upVote: module0.upVote,
        downVote: module0.downVote,
        createdAt: module0.createdAt.toISOString(),
        updatedAt: module0.updatedAt.toISOString(),
        user: {
          username: user.username,
        },
      });
      expect(responseObject[1]).toStrictEqual({
        id: module1.id,
        title: module1.title,
        description: module1.description,
        upVote: module1.upVote,
        downVote: module1.downVote,
        createdAt: module1.createdAt.toISOString(),
        updatedAt: module1.updatedAt.toISOString(),
        user: {
          username: user.username,
        },
      });
      expect(responseObject[2]).toStrictEqual({
        id: module2.id,
        title: module2.title,
        description: module2.description,
        upVote: module2.upVote,
        downVote: module2.downVote,
        createdAt: module2.createdAt.toISOString(),
        updatedAt: module2.updatedAt.toISOString(),
        user: {
          username: user.username,
        },
      });
    });

    it("should return not found error when no modules found", async () => {
      const response = await request(app).get("/api/modules");

      const responseBody = response.body;
      expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND);
      expect(responseBody.success).toBeFalsy();
      expect(responseBody.message).toContain("No modules found");
      expect(responseBody.responseObject).toBeNull();
    });
  });

  describe("GET /api/modules/:id", () => {
    it("should return a not found error for non-existent ID", async () => {
      const response = await request(app).get("/api/modules/xxx");

      const responseBody: ServiceResponse = response.body;
      expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND);
      expect(responseBody.success).toBeFalsy();
      expect(responseBody.message).toContain("Module not found");
      expect(responseBody.responseObject).toBeNull();
    });

    it("should return a module for a valid ID", async () => {
      const user = await UsersTableTestHelper.insertUser({});

      const module = await ModulesTableTestHelper.insertModule({ userId: user.id });

      const vote = await ModuleVoteRecordsTableTestHelper.insertVoteRecord({
        userId: user.id,
        moduleId: module.id,
        voteType: VoteType.UPVOTE,
      });

      const response = await request(app).get(`/api/modules/${module.id}`);

      const responseBody: ServiceResponse<Module> = response.body;
      const { responseObject } = responseBody;

      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.message).toContain("Module found");

      expect(responseObject).toStrictEqual({
        id: module.id,
        title: module.title,
        description: module.description,
        upVote: 1,
        downVote: 0,
        createdAt: module.createdAt.toISOString(),
        updatedAt: module.updatedAt.toISOString(),
        user: {
          username: user.username,
        },
        votes: [
          {
            id: vote.id,
            voteType: vote.voteType,
            user: {
              id: user.id,
              username: user.username,
            },
          },
        ],
      });
    });
  });

  describe("POST /api/modules/:id/upvotes", () => {
    it("should return an unauthorized error for missing JWT", async () => {
      const user = await UsersTableTestHelper.insertUser({});
      const module = await ModulesTableTestHelper.insertModule({ userId: user.id });

      const response = await request(app).post(`/api/modules/${module.id}/upvotes`);

      expect(response.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
      expect(response.body.success).toBeFalsy();
    });

    it("should return not found error for non-existent module ID", async () => {
      const user = await UsersTableTestHelper.insertUser({});
      const token = tokenManager.generateToken({
        id: user.id,
        username: user.username,
      });

      const response = await request(app).post("/api/modules/xxx/upvotes").set("Authorization", `Bearer ${token}`);

      expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND);
      expect(response.body.success).toBeFalsy();
      expect(response.body.message).toContain("Module not found");
    });

    it("should upvote a module for a valid ID with JWT", async () => {
      const user = await UsersTableTestHelper.insertUser({});
      const token = tokenManager.generateToken({
        id: user.id,
        username: user.username,
      });

      const module = await ModulesTableTestHelper.insertModule({ userId: user.id });

      const response = await request(app)
        .post(`/api/modules/${module.id}/upvotes`)
        .set("Authorization", `Bearer ${token}`);

      const responseBody: ServiceResponse = response.body;
      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.message).toContain("Module upvoted successfully");

      const responseObject: Module = response.body.responseObject;
      expect(responseObject).toStrictEqual({
        id: module.id,
        title: module.title,
        description: module.description,
        upVote: 1,
        downVote: 0,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        user: {
          username: user.username,
        },
      });
    });

    it("should unvote a module if user is already upvoted", async () => {
      const user = await UsersTableTestHelper.insertUser({});
      const token = tokenManager.generateToken({
        id: user.id,
        username: user.username,
      });

      const module = await ModulesTableTestHelper.insertModule({ userId: user.id });
      await ModuleVoteRecordsTableTestHelper.insertVoteRecord({
        userId: user.id,
        moduleId: module.id,
        voteType: VoteType.UPVOTE,
      });

      const response = await request(app)
        .post(`/api/modules/${module.id}/upvotes`)
        .set("Authorization", `Bearer ${token}`);

      const responseBody: ServiceResponse = response.body;
      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.message).toContain("Module unvoted successfully");

      const responseObject: Module = response.body.responseObject;
      expect(responseObject).toStrictEqual({
        id: module.id,
        title: module.title,
        description: module.description,
        upVote: 0,
        downVote: 0,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        user: {
          username: user.username,
        },
      });
    });

    it("should change to upvote if user is already downvoted", async () => {
      const user = await UsersTableTestHelper.insertUser({});
      const token = tokenManager.generateToken({
        id: user.id,
        username: user.username,
      });

      const module = await ModulesTableTestHelper.insertModule({ userId: user.id });
      const vote = await ModuleVoteRecordsTableTestHelper.insertVoteRecord({
        userId: user.id,
        moduleId: module.id,
        voteType: VoteType.DOWNVOTE,
      });

      const response = await request(app)
        .post(`/api/modules/${module.id}/upvotes`)
        .set("Authorization", `Bearer ${token}`);

      const responseBody: ServiceResponse = response.body;
      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.message).toContain("Module upvoted successfully");

      const responseObject: Module = response.body.responseObject;
      expect(responseObject).toStrictEqual({
        id: module.id,
        title: module.title,
        description: module.description,
        upVote: 1,
        downVote: 0,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        user: {
          username: user.username,
        },
      });
    });
  });

  describe("POST /api/modules/:id/downvotes", () => {
    it("should return an unauthorized error for missing JWT", async () => {
      const user = await UsersTableTestHelper.insertUser({});
      const module = await ModulesTableTestHelper.insertModule({ userId: user.id });

      const response = await request(app).post(`/api/modules/${module.id}/downvotes`);

      expect(response.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
      expect(response.body.success).toBeFalsy();
    });

    it("should return not found error for non-existent module ID", async () => {
      const user = await UsersTableTestHelper.insertUser({});
      const token = tokenManager.generateToken({
        id: user.id,
        username: user.username,
      });

      const response = await request(app).post("/api/modules/xxx/downvotes").set("Authorization", `Bearer ${token}`);

      expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND);
      expect(response.body.success).toBeFalsy();
      expect(response.body.message).toContain("Module not found");
    });

    it("should downvote a module for a valid ID with JWT", async () => {
      const user = await UsersTableTestHelper.insertUser({});
      const token = tokenManager.generateToken({
        id: user.id,
        username: "genics",
      });

      const module = await ModulesTableTestHelper.insertModule({ userId: user.id });

      const response = await request(app)
        .post(`/api/modules/${module.id}/downvotes`)
        .set("Authorization", `Bearer ${token}`);

      const responseBody: ServiceResponse = response.body;
      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.message).toContain("Module downvoted successfully");

      const responseObject: Module = response.body.responseObject;
      expect(responseObject).toStrictEqual({
        id: module.id,
        title: module.title,
        description: module.description,
        upVote: 0,
        downVote: 1,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        user: {
          username: user.username,
        },
      });
    });

    it("should unvote a module if user is already downvoted", async () => {
      const user = await UsersTableTestHelper.insertUser({});
      const token = tokenManager.generateToken({
        id: user.id,
        username: "genics",
      });

      const module = await ModulesTableTestHelper.insertModule({ userId: user.id });
      await ModuleVoteRecordsTableTestHelper.insertVoteRecord({
        userId: user.id,
        moduleId: module.id,
        voteType: VoteType.DOWNVOTE,
      });

      const response = await request(app)
        .post(`/api/modules/${module.id}/downvotes`)
        .set("Authorization", `Bearer ${token}`);

      const responseBody: ServiceResponse = response.body;
      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.message).toContain("Module unvoted successfully");

      const responseObject: Module = response.body.responseObject;
      expect(responseObject).toStrictEqual({
        id: module.id,
        title: module.title,
        description: module.description,
        upVote: 0,
        downVote: 0,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        user: {
          username: user.username,
        },
      });
    });

    it("should change to downvote if user is already upvoted", async () => {
      const user = await UsersTableTestHelper.insertUser({});
      const token = tokenManager.generateToken({
        id: user.id,
        username: "genics",
      });

      const module = await ModulesTableTestHelper.insertModule({ userId: user.id });
      await ModuleVoteRecordsTableTestHelper.insertVoteRecord({
        userId: user.id,
        moduleId: module.id,
        voteType: VoteType.UPVOTE,
      });

      const response = await request(app)
        .post(`/api/modules/${module.id}/downvotes`)
        .set("Authorization", `Bearer ${token}`);

      const responseBody: ServiceResponse = response.body;
      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.message).toContain("Module downvoted successfully");

      const responseObject: Module = response.body.responseObject;
      expect(responseObject).toStrictEqual({
        id: module.id,
        title: module.title,
        description: module.description,
        upVote: 0,
        downVote: 1,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        user: {
          username: user.username,
        },
      });
    });
  });

  describe("GET /api/modules/search", () => {
    it("should return matched title of modules", async () => {
      const user = await UsersTableTestHelper.insertUser({});

      const module0 = await ModulesTableTestHelper.insertModule({
        userId: user.id,
        title: "Basic programming",
        description: "e-book of basic programming",
      });
      const module1 = await ModulesTableTestHelper.insertModule({
        userId: user.id,
        title: "Database system",
        description: "e-book of database system",
      });
      const module2 = await ModulesTableTestHelper.insertModule({
        userId: user.id,
        title: "AI: Introduction",
        description: "presentation about artificial intelligence",
      });

      const response = await request(app).get("/api/modules/search?query=m");

      const responseBody = response.body;
      const { responseObject } = responseBody;
      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.message).toContain("Modules found");

      expect(responseObject.length).toEqual(2);

      expect(responseObject).toStrictEqual([
        {
          id: module0.id,
          title: module0.title,
          description: module0.description,
          upVote: module0.upVote,
          downVote: module0.downVote,
          createdAt: module0.createdAt.toISOString(),
          updatedAt: module0.updatedAt.toISOString(),
          user: {
            username: user.username,
          },
        },
        {
          id: module1.id,
          title: module1.title,
          description: module1.description,
          upVote: module1.upVote,
          downVote: module1.downVote,
          createdAt: module1.createdAt.toISOString(),
          updatedAt: module1.updatedAt.toISOString(),
          user: {
            username: user.username,
          },
        },
      ]);
    });

    it("should return matched description of modules", async () => {
      const user = await UsersTableTestHelper.insertUser({});

      const module0 = await ModulesTableTestHelper.insertModule({
        userId: user.id,
        title: "Basic programming",
        description: "e-book of basic programming",
      });
      const module1 = await ModulesTableTestHelper.insertModule({
        userId: user.id,
        title: "Database system",
        description: "e-book of database system",
      });
      const module2 = await ModulesTableTestHelper.insertModule({
        userId: user.id,
        title: "AI: Introduction",
        description: "presentation about artificial intelligence",
      });

      const response = await request(app).get("/api/modules/search?query=e-book");

      const responseBody = response.body;
      const { responseObject } = responseBody;
      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.message).toContain("Modules found");

      expect(responseObject.length).toEqual(2);

      expect(responseObject).toStrictEqual([
        {
          id: module0.id,
          title: module0.title,
          description: module0.description,
          upVote: module0.upVote,
          downVote: module0.downVote,
          createdAt: module0.createdAt.toISOString(),
          updatedAt: module0.updatedAt.toISOString(),
          user: {
            username: user.username,
          },
        },
        {
          id: module1.id,
          title: module1.title,
          description: module1.description,
          upVote: module1.upVote,
          downVote: module1.downVote,
          createdAt: module1.createdAt.toISOString(),
          updatedAt: module1.updatedAt.toISOString(),
          user: {
            username: user.username,
          },
        },
      ]);
    });

    it("should return not found error when no modules found", async () => {
      const response = await request(app).get("/api/modules/search?query=xxx");

      const responseBody = response.body;
      expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND);
      expect(responseBody.success).toBeFalsy();
      expect(responseBody.message).toContain("No modules found");
      expect(responseBody.responseObject).toBeNull();
    });

    it("should return bad request error when query is empty string", async () => {
      const response = await request(app).get("/api/modules/search?query=");
      const responseBody: ServiceResponse = response.body;

      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(responseBody.success).toBeFalsy();
      expect(responseBody.message).toBeDefined();
      expect(responseBody.responseObject).toBeNull();
    });

    it("should return bad request error when no query sent", async () => {
      const response = await request(app).get("/api/modules/search");
      const responseBody: ServiceResponse = response.body;

      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(responseBody.success).toBeFalsy();
      expect(responseBody.message).toBeDefined();
      expect(responseBody.responseObject).toBeNull();
    });
  });
});
