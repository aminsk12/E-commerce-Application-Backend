import express from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { userRoutes } from "../modules/user/user.routes";
import { productRoutes } from "../modules/product/product.route";
import { AdminRouter } from "../modules/admin/admin.routes";


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
    path: "/order",
    router: orderRoutes,
  },
  {
    path: "/category",
    router: CategoryRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));

export default router;