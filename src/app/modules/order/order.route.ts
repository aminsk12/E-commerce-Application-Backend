import express from "express";
import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";
import { OrderController } from "./order.controller";

const router = express.Router();

router.post("/", auth(UserRole.CUSTOMER), OrderController.createOrder);
router.get("/", auth(UserRole.VENDOR), OrderController.getOrderByVendor);
router.get(
  "/customerOrder/:id",
  auth(UserRole.CUSTOMER),
  OrderController.getOrderByCustomerId
);
router.post(
  "/",
  auth(UserRole.CUSTOMER),
  OrderController.deleteOrderByCustomer
);

export const orderRoutes = router;