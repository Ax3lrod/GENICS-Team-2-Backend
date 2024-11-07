import { commonValidations } from "@/common/utils/commonValidation";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export type Module = {
  id: string;
  title: string;
  faculty: string;
  major: string;
  course: string;
  description: string;
  upVote: number;
  downVote: number;
  createdAt: Date;
  updatedAt: Date;
};

export type DetailedModule = {
  id: string;
  title: string;
  faculty: string;
  major: string;
  course: string;
  description: string;
  upVote: number;
  downVote: number;
  createdAt: Date;
  updatedAt: Date;
  user?: {
    username: string;
  } | null;
};

export const ModuleSchema = z.object({
  id: z.string(),
  title: z.string(),
  faculty: z.string(),
  major: z.string(),
  course: z.string(),
  description: z.string(),
  upVote: z.number(),
  downVote: z.number(),
});

export const DetailedModuleSchema = z.object({
  id: z.string(),
  title: z.string(),
  faculty: z.string(),
  major: z.string(),
  course: z.string(),
  description: z.string(),
  upVote: z.number(),
  downVote: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  user: z
    .object({
      username: z.string(),
    })
    .nullable()
    .optional(),
});

export const GetModuleSchema = z.object({
  params: z.object({
    id: commonValidations.id,
  }),
});
