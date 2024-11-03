import { StatusCodes } from "http-status-codes";
import request from "supertest";

import { ModuleTestTableHelper } from "@/__test__/helpers/ModuleTableTestHelper";
import { UsersTableTestHelper } from "@/__test__/helpers/UsersTableTestHelper";
import type { ServiceResponse } from "@/common/models/serviceResponse";

import { ModuleVoteRecordTableTestHelper } from "@/__test__/helpers/ModuleVoteRecordTableTestHelper";
import { env } from "@/config/env";
import { app } from "@/server";
import jwt from "jsonwebtoken";
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
      await ModuleTestTableHelper.insertModule({ id: "1" });
      await ModuleTestTableHelper.insertModule({ id: "2" });
      await ModuleTestTableHelper.insertModule({ id: "3" });

      const response = await request(app).get("/api/modules");

      const responseBody = response.body;
      const { responseObject } = responseBody;
      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.message).toContain("Modules found");

      expect(responseBody.responseObject.length).toEqual(3);
      expect(responseObject[0].id).toEqual("1");
      expect(responseObject[1].id).toEqual("2");
      expect(responseObject[2].id).toEqual("3");
    });
  });

  describe("GET /api/modules/:id", () => {
    it("should return a module for a valid ID", async () => {
      const testId = "1";
      await ModuleTestTableHelper.insertModule({ id: testId });

      const response = await request(app).get(`/api/modules/${testId}`);

      const responseBody: ServiceResponse<Module> = response.body;
      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.message).toContain("Module found");

      expect(responseBody.responseObject.id).toEqual(testId);
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
      // Arrange
      await UsersTableTestHelper.insertUser({ id: "1", username: "genics", password: "password" });
      const token = jwt.sign(
        {
          id: "1",
          username: "genics",
        },
        env.JWT_SECRET,
        { expiresIn: "15s" },
      );

      const testId = "1";
      await ModuleTestTableHelper.insertModule({ id: testId });

      // Action
      const response = await request(app)
        .post(`/api/modules/${testId}/upvotes`)
        .set("Authorization", `Bearer ${token}`);

      // Assert
      const responseBody: ServiceResponse = response.body;
      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.message).toContain("Module upvoted successfully");
    });
  });

  describe("POST /api/modules/:id/downvotes", () => {
    it("should downvote a module for a valid ID with JWT", async () => {
      // Arrange
      await UsersTableTestHelper.insertUser({ id: "1", username: "genics", password: "password" });
      const token = jwt.sign(
        {
          id: "1",
          username: "genics",
        },
        env.JWT_SECRET as string,
        { expiresIn: "15s" },
      );

      const testId = "1";
      await ModuleTestTableHelper.insertModule({ id: testId });

      // Action
      const response = await request(app)
        .post(`/api/modules/${testId}/downvotes`)
        .set("Authorization", `Bearer ${token}`);

      // Assert
      const responseBody: ServiceResponse = response.body;
      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.message).toContain("Module downvoted successfully");
    });
  });
});
