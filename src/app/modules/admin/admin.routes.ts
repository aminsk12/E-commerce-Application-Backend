import express, { NextFunction, Request, Response } from "express";
import { AdminController } from "./admin.controller";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { update } from "./admin.validations";
const route = express.Router();

route.get("/", auth(UserRole.ADMIN), AdminController.getAdmin);
route.get("/:id", auth(UserRole.ADMIN), AdminController.getAdminById);
route.patch(
  "/:id",
  auth(UserRole.ADMIN),
  validateRequest(update),
  AdminController.updateAdmin
);
route.delete("/:id", auth(UserRole.ADMIN), AdminController.deleteAdmin);

export const AdminRouter = route;