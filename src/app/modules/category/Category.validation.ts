import { z } from "zod";

const createCategoryValidationSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  offer: z.string({
    required_error: "offer is required",
  }),
});

const updateItemCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
  }),
});

export const CategoryValidation = {
  createCategoryValidationSchema,
  updateItemCategoryValidationSchema,
};