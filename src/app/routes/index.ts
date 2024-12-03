import express from "express";
import { userRoutes } from "../modules/Users/user.route";
import { productRoutes } from "../modules/Product/product.route";
import { AuthRoutes } from "../modules/Auth/auth.route";

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));

export default router;