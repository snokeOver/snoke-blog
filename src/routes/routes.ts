import { Router } from "express";
import authRoute from "../modules/auth/auth.route";
import blogRoute from "../modules/blog/blog.route";
import adminRoute from "../modules/admin/admin.route";

const router = Router();

const routes = [
  // {
  //   path: "/user",
  //   route: "",
  // },
  // {
  //   path: "/creator",
  //   route: "",
  // },

  {
    path: "/admin",
    route: adminRoute,
  },
  {
    path: "/blogs",
    route: blogRoute,
  },

  {
    path: "/auth",
    route: authRoute,
  },
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
