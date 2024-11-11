import { commonValidations } from "@/common/utils/commonValidation";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export type Comment = {
  id: string;
  feedback: string;
  rating: number;
  userId: string;
  lecturerId: string;
  moduleId: string;
  createdAt: Date;
  updatedAt: Date;
};

export const CommentSchema = z.object({
  id: z.string(),
  feedback: z.string().min(1, { message: "Content cannot be empty" }),
  rating: z.number().int().min(1).max(5, { message: "Rating must be between 1 and 5" }),
  userId: z.string(),
  lecturerId: z.string(),
  moduleId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const DetailedCommentSchema = z.object({
  id: z.string(),
  feedback: z.string(),
  rating: z.number().int().min(1).max(5),
  userId: z.string(),
  lecturerId: z.string(),
  moduleId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  User: z
    .object({
      username: z.string(),
    })
    .nullable()
    .optional(),
});

export const GetCommentSchema = z.object({
  params: z.object({
    id: commonValidations.id,
  }),
});
