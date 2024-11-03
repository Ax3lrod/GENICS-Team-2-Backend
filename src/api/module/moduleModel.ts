import { commonValidations } from "@/common/utils/commonValidation";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export type Module = {
  id: string;
  title: string;
  description: string;
  upvoteCount: number;
  downvoteCount: number;
  createdAt: Date;
  updatedAt: Date;
};

export type DetailedModule = {
  id: string;
  title: string;
  description: string;
  upvoteCount: number;
  downvoteCount: number;
  createdAt: Date;
  updatedAt: Date;
  User?: {
    username: string;
  } | null;
};

export const ModuleSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  upvoteCount: z.number(),
  downvoteCount: z.number(),
});

export const DetailedModuleSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  upvoteCount: z.number(),
  downvoteCount: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  User: z
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
