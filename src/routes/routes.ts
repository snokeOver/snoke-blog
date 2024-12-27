import { Router } from "express";

const router = Router();

const routes = [
  {
    path: "/user",
    route: "",
  },
  {
    path: "/creator",
    route: "",
  },

  {
    path: "/admin",
    route: "",
  },
  {
    path: "/blogs",
    route: "",
  },

  {
    path: "/auth",
    route: "",
  },
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
