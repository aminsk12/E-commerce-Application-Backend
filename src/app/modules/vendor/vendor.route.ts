import express, { NextFunction, Request, Response } from "express";

import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { VendorController } from "./vendor.controller";


const route = express.Router();

// route.get("/", auth(UserRole.ADMIN), VendorController.getVendor);
route.get("/:id", auth(UserRole.ADMIN), VendorController.getVendorById);
route.patch(
  "/:id",
  auth(UserRole.ADMIN),
  // validateRequest(update),
  VendorController.updateVendor
);
route.delete("/:id", auth(UserRole.ADMIN), VendorController.deleteVendor);

export const VendorRouter = route;