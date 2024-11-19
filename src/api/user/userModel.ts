import { commonValidations } from "@/common/utils/commonValidation";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { email } from "envalid";
import { z } from "zod";

extendZodWithOpenApi(z);

export type User = {
  id: string;
  username: string;
  email: string;
  faculty: string;
  department: string;
  password: string;
  uploadedModules?: {
    id: string;
    title: string;
  }[];
  votes?: {
    id: string;
    voteType: string;
    module: {
      id: string;
      title: string;
    };
  }[];
};

export const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  faculty: z.string(),
  department: z.string(),
  password: z.string(),
  uploadedModules: z
    .array(
      z.object({
        id: z.string(),
        title: z.string(),
      }),
    )
    .optional(),
  votes: z
    .array(
      z.object({
        id: z.string(),
        voteType: z.string(),
        module: z.object({
          id: z.string(),
          title: z.string(),
        }),
      }),
    )
    .optional(),
});

export const GetUserSchema = z.object({
  params: z.object({
    id: commonValidations.id,
  }),
});
