import { Router } from "express";
import authRoute from "../modules/auth/auth.route";

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

  // {
  //   path: "/admin",
  //   route: "",
  // },
  // {
  //   path: "/blogs",
  //   route: "",
  // },

  {
    path: "/auth",
    route: authRoute,
  },
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
