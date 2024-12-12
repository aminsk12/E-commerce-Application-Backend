import express from "express";
import { PaymentRoutes } from "../modules/payment/payment.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { userRoutes } from "../modules/user/user.routes";
import { productRoutes } from "../modules/product/product.route";
import { AdminRouter } from "../modules/admin/admin.routes";
import { CustomerRouter } from "../modules/customer/customer.route";
import { VendorRouter } from "../modules/vendor/vendor.route";
import { shopRoutes } from "../modules/shpo/shop.route";
import { orderRoutes } from "../modules/order/order.route";
import { CartRoutes } from "../modules/cart/cart.route";
import { CategoryRoutes } from "../modules/category/Category.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    router: AuthRoutes,
  },
  {
    path: "/user",
    router: userRoutes,
  },
  {
    path: "/product",
    router: productRoutes,
  },
  {
    path: "/admin",
    router: AdminRouter,
  },
  {
    path: "/customer",
    router: CustomerRouter,
  },
  {
    path: "/vendor",
    router: VendorRouter,
  },
  {
    path: "/shop",
    router: shopRoutes,
  },
  {
    path: "/payment",
    router: PaymentRoutes,
  },
  {
    path: "/order",
    router: orderRoutes,
  },
  {
    path: "/cart",
    router: CartRoutes,
  },
  {
    path: "/category",
    router: CategoryRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));

export default router;