import { z } from "zod";

export const commonValidations = {
  id: z.string().uuid("ID must be a valid UUID"),
};
