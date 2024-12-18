import { commonValidations } from "@/common/utils/commonValidation";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export type Lecturer = {
  id: string;
  name: string;
  faculty: string;
  department: string;
};

export const LecturerSchema = z.object({
  id: z.string(),
  name: z.string(),
  faculty: z.string(),
  department: z.string(),
  upVote: z.number(),
  downVote: z.number(),
});

export const GetLecturerSchema = z.object({
  params: z.object({
    id: commonValidations.id,
  }),
});

export const ShortLecturerSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    faculty: z.string(),
    department: z.string(),
    rating: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .strip();

export const DetailedLecturerSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    faculty: z.string(),
    department: z.string(),
    rating: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .strip();

export const SearchSchema = z.object({
  query: z.string().optional(),
  sort: z.enum(["department", "faculty", "createdAt"]).optional(),
  order: z.enum(["asc", "desc"]).optional(),
});
