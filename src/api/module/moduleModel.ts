import { commonValidations } from "@/common/utils/commonValidation";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import type { VoteType } from "@prisma/client";
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
  upVote: number;
  downVote: number;
  createdAt: Date;
  updatedAt: Date;
  voteStatus?: VoteType;
  user?: {
    username: string;
  } | null;
  votes?: {
    id: string;
    voteType: VoteType;
    user: {
      id: string;
      username: string;
    };
  }[];
};

export type ShortModule = {
  id: string;
  title: string;
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
  description: z.string(),
  upvoteCount: z.number(),
  downvoteCount: z.number(),
});

export const ShortModuleSchema = z
  .object({
    id: z.string(),
    title: z.string(),
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
  })
  .strip();

export const DetailedModuleSchema = z
  .object({
    id: z.string(),
    title: z.string(),
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
    votes: z.array(
      z.object({
        id: z.string(),
        voteType: z.enum(["UPVOTE", "DOWNVOTE"]),
        user: z.object({
          id: z.string(),
          username: z.string(),
        }),
      }),
    ),
  })
  .strip();

export const SearchSchema = z.object({
  query: z
    .string({
      required_error: "Parameter 'query' harus ada",
      invalid_type_error: "Parameter 'query' harus berupa string",
    })
    .min(1, "Query tidak boleh kosong"),
});
