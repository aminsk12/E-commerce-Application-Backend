import express, { NextFunction, Request, Response } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { CategoryControllers } from "./Category.controller";
import { UserRole } from "@prisma/client";
import { fileUploader } from "../../../helpars/fileUploader";
import { CategoryValidation } from "./Category.validation";


const router = express.Router();

router.get("/", CategoryControllers.getAllItemCategories);

router.get("/:id", CategoryControllers.getItemCategoryById);

router.post(
  "/",
  auth(UserRole.ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = CategoryValidation.createCategoryValidationSchema.parse(
      JSON.parse(req.body.data)
    );
    return CategoryControllers.createItemCategory(req, res, next);
  }
  // validateRequest(ItemCategoryValidation.createItemCategoryValidationSchema),
);

router.put(
  "/:id",
  auth(UserRole.ADMIN),
  // validateRequest(ItemCategoryValidation.updateItemCategoryValidationSchema),
  CategoryControllers.updateItemCategory
);

router.delete(
  "/:id",
  auth(UserRole.ADMIN),
  CategoryControllers.deleteItemCategory
);

export const CategoryRoutes = router;