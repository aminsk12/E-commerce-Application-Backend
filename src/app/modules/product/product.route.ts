import express, { NextFunction, Request, Response } from "express";
import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";
import { productController } from "./product.controller";
import { fileUploader } from "../../../helpars/fileUploader";
import { ProductValidation } from "./product.validation";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.VENDOR),
  fileUploader.upload.fields([{ name: "files" }]),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = ProductValidation.createProductValidationSchema.parse(
      JSON.parse(req.body.data)
    );
    return productController.createProduct(req, res, next);
  }
);
router.get(
  "/",

  productController.getProductIntoDB
);
router.get(
  "/:id",

  productController.getProductById
);
router.patch(
  "/:id",
  auth(UserRole.ADMIN, UserRole.VENDOR),
  // validateRequest(update),
  productController.updateProduct
);
router.delete(
  "/:id",
  auth(UserRole.ADMIN, UserRole.VENDOR),
  productController.deleteProduct
);
export const productRoutes = router;