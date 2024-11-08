import type { ServiceResponse } from "@/common/models/serviceResponse";
import { StatusCodes } from "http-status-codes";
import request from "supertest";

import { DatabaseTestHelper } from "@/__test__/helpers/DatabaseTestHelper";
import prisma from "@/config/prisma";
import { app } from "@/server";

import { LecturersTableTestHelper } from "@/__test__/helpers/LecturersTableTestHelper";
import { ModuleVoteRecordsTableTestHelper } from "@/__test__/helpers/ModuleVoteRecordsTableTestHelper";
import { ModulesTableTestHelper } from "@/__test__/helpers/ModulesTableTestHelper";
import { UsersTableTestHelper } from "@/__test__/helpers/UsersTableTestHelper";

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

  describe("GET /lecturers/:id", () => {
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
});
