import { z } from "zod";

const createProductValidationSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  description: z.string({
    required_error: "description is required",
  }),
  categoryId: z.string({
    required_error: "categoryId is required",
  }),
  shopId: z.string({
    required_error: "shopId is required",
  }),
  Quantity: z.string({
    required_error: "Quantity is required",
  }),
  discount: z
    .string({
      required_error: "discount is required",
    })
    .optional(),
  price: z.string({
    required_error: "discount is required",
  }),
  offerDiscount: z
    .string({
      required_error: "offerDiscount is required",
    })
    .optional(),
  offer: z.string({
    required_error: "offer is required",
  }),
});

const updateProductValidationSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .optional(),
  description: z
    .string({
      required_error: "description is required",
    })
    .optional(),
  categoryId: z
    .string({
      required_error: "categoryId is required",
    })
    .optional(),
  shopId: z
    .string({
      required_error: "shopId is required",
    })
    .optional(),
  Quantity: z
    .string({
      required_error: "Quantity is required",
    })
    .optional(),
  discount: z
    .string({
      required_error: "discount is required",
    })
    .optional(),
  price: z
    .string({
      required_error: "discount is required",
    })
    .optional(),
  offerDiscount: z
    .string({
      required_error: "offerDiscount is required",
    })
    .optional(),
  offer: z
    .string({
      required_error: "offer is required",
    })
    .optional(),
});

export const ProductValidation = {
  createProductValidationSchema,
  updateProductValidationSchema,
};