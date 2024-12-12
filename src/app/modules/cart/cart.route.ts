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
router.delete(
  "/:id",
  auth(UserRole.CUSTOMER),
  CartController.deleteCartItemById
);
router.get(
  "/price/:id",
  auth(UserRole.CUSTOMER),
  CartController.totalPriceByCartId
);

export const CartRoutes = router;