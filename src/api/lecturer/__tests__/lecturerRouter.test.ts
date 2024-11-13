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

  describe("GET /lecturers", () => {
    it("should return valid response body", async () => {
      const lecturer1 = await LecturersTableTestHelper.insertLecturer({});
      const lecturer2 = await LecturersTableTestHelper.insertLecturer({});

      const response = await request(app).get("/api/lecturers");
      const responseBody: ServiceResponse = response.body;

      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.responseObject).toStrictEqual([
        {
          id: lecturer1.id,
          name: lecturer1.name,
          department: lecturer1.department,
          faculty: lecturer1.faculty,
          rating: 0,
        },
        {
          id: lecturer2.id,
          name: lecturer2.name,
          department: lecturer2.department,
          faculty: lecturer2.faculty,
          rating: 0,
        },
      ]);
    });

    it("should return not found error when no lecturers found", async () => {
      const response = await request(app).get("/api/lecturers");
      const responseBody: ServiceResponse = response.body;

      expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND);
      expect(responseBody.success).toBeFalsy();
      expect(responseBody.message).toBeDefined();
      expect(responseBody.responseObject).toBeNull();
    });
  });

  describe("GET /lecturers/search?", () => {
    it("should return valid response body", async () => {
      const lecturer = await LecturersTableTestHelper.insertLecturer({});

      const response = await request(app).get(`/api/lecturers/${lecturer.id}`);
      const responseBody: ServiceResponse = response.body;

      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.responseObject).toStrictEqual({
        id: lecturer.id,
        name: lecturer.name,
        department: lecturer.department,
        faculty: lecturer.faculty,
        rating: 0,
        createdAt: lecturer.createdAt.toISOString(),
        updatedAt: lecturer.updatedAt.toISOString(),
      });
    });

    it("should return not found error when lecturer not found", async () => {
      const response = await request(app).get("/api/lecturers/xxx");
      const responseBody: ServiceResponse = response.body;

      expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND);
      expect(responseBody.success).toBeFalsy();
      expect(responseBody.message).toBeDefined();
      expect(responseBody.responseObject).toBeNull();
    });
  });

  describe("GET /lecturers/search", () => {
    it("should return valid response body", async () => {
      const lecturer1 = await LecturersTableTestHelper.insertLecturer({ name: "John Doe" });
      const lecturer2 = await LecturersTableTestHelper.insertLecturer({ name: "John Wick" });
      const lecturer3 = await LecturersTableTestHelper.insertLecturer({ name: "Billie Elish" });
      const lecturer4 = await LecturersTableTestHelper.insertLecturer({ name: "Bill Gates" });

      const response = await request(app).get("/api/lecturers/search?query=Bill");
      const responseBody: ServiceResponse = response.body;

      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.responseObject).toStrictEqual([
        {
          id: lecturer3.id,
          name: lecturer3.name,
          department: lecturer3.department,
          faculty: lecturer3.faculty,
          rating: 0,
        },
        {
          id: lecturer4.id,
          name: lecturer4.name,
          department: lecturer4.department,
          faculty: lecturer4.faculty,
          rating: 0,
        },
      ]);
    });

    it("should return not found error when no lecturers found", async () => {
      const response = await request(app).get("/api/lecturers/search?query=xxx");
      const responseBody: ServiceResponse = response.body;

      expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND);
      expect(responseBody.success).toBeFalsy();
      expect(responseBody.message).toBeDefined();
      expect(responseBody.responseObject).toBeNull();
    });

    it("should return bad request error when query is empty string", async () => {
      const response = await request(app).get("/api/lecturers/search?query=");
      const responseBody: ServiceResponse = response.body;

      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(responseBody.success).toBeFalsy();
      expect(responseBody.message).toBeDefined();
      expect(responseBody.responseObject).toBeNull();
    });

    it("should return bad request error when no query sent", async () => {
      const response = await request(app).get("/api/lecturers/search");
      const responseBody: ServiceResponse = response.body;

      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(responseBody.success).toBeFalsy();
      expect(responseBody.message).toBeDefined();
      expect(responseBody.responseObject).toBeNull();
    });
  });
});
