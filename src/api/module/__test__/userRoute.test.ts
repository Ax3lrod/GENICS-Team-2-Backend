import { StatusCodes } from "http-status-codes";
import request from "supertest";

import { ModuleTestTableHelper } from "@/__test__/helpers/ModuleTableTestHelper";
import { UsersTableTestHelper } from "@/__test__/helpers/UsersTableTestHelper";
import type { ServiceResponse } from "@/common/models/serviceResponse";

import { ModuleVoteRecordTableTestHelper } from "@/__test__/helpers/ModuleVoteRecordTableTestHelper";
import { tokenManager } from "@/common/utils/tokenManager";
import { app } from "@/server";
import type { Module } from "../moduleModel";

describe("Module API Endpoints", () => {
  beforeAll(async () => {
    await ModuleVoteRecordTableTestHelper.cleanTable();
    await ModuleTestTableHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterEach(async () => {
    await ModuleVoteRecordTableTestHelper.cleanTable();
    await ModuleTestTableHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  describe("GET /api/modules", () => {
    it("should return a list of modules", async () => {
      const user = await UsersTableTestHelper.insertUser({ id: "user-123", username: "genics" });

      const module1 = await ModuleTestTableHelper.insertModule({ id: "1", userId: user.id });
      const module2 = await ModuleTestTableHelper.insertModule({ id: "2", userId: user.id });
      const module3 = await ModuleTestTableHelper.insertModule({ id: "3", userId: user.id });

      const response = await request(app).get("/api/modules");

      const responseBody = response.body;
      const { responseObject } = responseBody;
      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.message).toContain("Modules found");

      expect(responseObject.length).toEqual(3);

      expect(responseObject[0]).toStrictEqual({
        id: module1.id,
        title: module1.title,
        description: module1.description,
        upvoteCount: module1.upvoteCount,
        downvoteCount: module1.downvoteCount,
        createdAt: module1.createdAt.toISOString(),
        updatedAt: module1.updatedAt.toISOString(),
        User: {
          username: user.username,
        },
      });
    });

    it("should return an empty list when no modules exist", async () => {
      const response = await request(app).get("/api/modules");

      const responseBody = response.body;
      expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND);
      expect(responseBody.success).toBeFalsy();
      expect(responseBody.message).toContain("No modules found");
      expect(responseBody.responseObject).toBeNull();
    });
  });

  describe("GET /api/modules/:id", () => {
    it("should return a module for a valid ID", async () => {
      const user = await UsersTableTestHelper.insertUser({ id: "user-123", username: "genics" });

      const testId = "1";
      const module = await ModuleTestTableHelper.insertModule({ id: testId, userId: user.id });

      const response = await request(app).get(`/api/modules/${testId}`);

      const responseBody: ServiceResponse<Module> = response.body;
      const { responseObject } = responseBody;

      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.message).toContain("Module found");

      expect(responseObject).toStrictEqual({
        id: module.id,
        title: module.title,
        description: module.description,
        upvoteCount: module.upvoteCount,
        downvoteCount: module.downvoteCount,
        createdAt: module.createdAt.toISOString(),
        updatedAt: module.updatedAt.toISOString(),
        User: {
          username: user.username,
        },
      });
    });

    it("should return a not found error for non-existent ID", async () => {
      const nonExistentId = "99999";

      const response = await request(app).get(`/api/modules/${nonExistentId}`);

      const responseBody: ServiceResponse = response.body;
      expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND);
      expect(responseBody.success).toBeFalsy();
      expect(responseBody.message).toContain("Module not found");
      expect(responseBody.responseObject).toBeNull();
    });
  });

  describe("POST /api/modules/:id/upvotes", () => {
    it("should upvote a module for a valid ID with JWT", async () => {
      const user = await UsersTableTestHelper.insertUser({ id: "user-123", username: "genics" });
      const token = tokenManager.generateToken({ id: user.id, username: "genics" });

      const testId = "1";
      await ModuleTestTableHelper.insertModule({ id: testId, userId: user.id });

      const response = await request(app)
        .post(`/api/modules/${testId}/upvotes`)
        .set("Authorization", `Bearer ${token}`);

      const responseBody: ServiceResponse = response.body;
      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.message).toContain("Module upvoted successfully");
    });

    it("should return an unauthorized error for missing JWT", async () => {
      const user = await UsersTableTestHelper.insertUser({ id: "user-123", username: "genics" });
      const testId = "1";
      await ModuleTestTableHelper.insertModule({ id: testId, userId: user.id });

      const response = await request(app).post(`/api/modules/${testId}/upvotes`);

      expect(response.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
      expect(response.body.success).toBeFalsy();
    });

    it("should return not found error for non-existent module ID", async () => {
      const user = await UsersTableTestHelper.insertUser({ id: "user-123", username: "genics" });
      const token = tokenManager.generateToken({ id: user.id, username: "genics" });

      const response = await request(app).post("/api/modules/99999/upvotes").set("Authorization", `Bearer ${token}`);

      expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND);
      expect(response.body.success).toBeFalsy();
      expect(response.body.message).toContain("Module not found");
    });
  });

  describe("POST /api/modules/:id/downvotes", () => {
    it("should downvote a module for a valid ID with JWT", async () => {
      const user = await UsersTableTestHelper.insertUser({ id: "user-123", username: "genics" });
      const token = tokenManager.generateToken({ id: user.id, username: "genics" });

      const testId = "1";
      await ModuleTestTableHelper.insertModule({ id: testId, userId: user.id });

      const response = await request(app)
        .post(`/api/modules/${testId}/downvotes`)
        .set("Authorization", `Bearer ${token}`);

      const responseBody: ServiceResponse = response.body;
      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.message).toContain("Module downvoted successfully");
    });

    it("should return an unauthorized error for missing JWT", async () => {
      const user = await UsersTableTestHelper.insertUser({ id: "user-123", username: "genics" });
      const testId = "1";
      await ModuleTestTableHelper.insertModule({ id: testId, userId: user.id });

      const response = await request(app).post(`/api/modules/${testId}/downvotes`);

      expect(response.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
      expect(response.body.success).toBeFalsy();
    });

    it("should return not found error for non-existent module ID", async () => {
      const user = await UsersTableTestHelper.insertUser({ id: "user-123", username: "genics" });
      const token = tokenManager.generateToken({ id: user.id, username: "genics" });

      const response = await request(app).post("/api/modules/99999/downvotes").set("Authorization", `Bearer ${token}`);

      expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND);
      expect(response.body.success).toBeFalsy();
      expect(response.body.message).toContain("Module not found");
    });
  });
});
