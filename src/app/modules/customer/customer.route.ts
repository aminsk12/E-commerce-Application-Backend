import express, { NextFunction, Request, Response } from "express";

import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { CustomerController } from "./customer.controller";
const route = express.Router();

route.get("/", auth(UserRole.ADMIN), CustomerController.getCustomer);
route.get("/:id", auth(UserRole.ADMIN), CustomerController.getCustomerById);
route.patch(
  "/:id",
  auth(UserRole.ADMIN),
  // validateRequest(update),
  CustomerController.updateCustomer
);
route.delete("/:id", auth(UserRole.ADMIN), CustomerController.deleteCustomer);

export const CustomerRouter = route;