import { commonValidations } from "@/common/utils/commonValidation";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export type Lecturer = {
  id: string;
  name: string;
  faculty: string;
  department: string;
  upvotes: number;
  downvotes: number;
};

export const LecturerSchema = z.object({
  id: z.string(),
  name: z.string(),
  faculty: z.string(),
  department: z.string(),
  upvotes: z.number(),
  downvotes: z.number(),
});

export const GetLecturerSchema = z.object({
  params: z.object({
    id: commonValidations.id,
  }),
});
