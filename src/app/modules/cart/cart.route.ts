import express from "express";
import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";
import { CartController } from "./cart.controller";

const router = express.Router();

router.post("/", auth(UserRole.CUSTOMER), CartController.createOrder);
router.get(
  "/myCard",
  auth(UserRole.CUSTOMER),
  CartController.getCartByCustomer
);
router.get("/", auth(UserRole.VENDOR), CartController.getOrderByVendor);
router.post("/", auth(UserRole.CUSTOMER), CartController.deleteCartByCustomer);

export const CartRoutes = router;