import { User as PrismaUser } from '@prisma/client';
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { commonValidations } from "@/common/utils/commonValidation";

extendZodWithOpenApi(z);

export type User = PrismaUser; 

export const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  password: z.string(),
  uploadedModules: z.array(z.unknown()),
  votes: z.array(z.unknown()),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const GetUserSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});
