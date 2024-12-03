import express, { NextFunction, Request, Response } from "express";
import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";
import { productController } from "./product.controller";
import { fileUploader } from "../../helpars/fileUploader";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.VENDOR),
  fileUploader.upload.fields([{ name: "Images" }]),
  productController.createProduct
);
router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.VENDOR),
  productController.getProductIntoDB
);
router.get(
  "/:id",
  auth(UserRole.ADMIN, UserRole.VENDOR),
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