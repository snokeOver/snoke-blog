import express from "express";

import {
  blockSingleUserByAdmin,
  deleteSingleBlogByAdmin,
} from "./admin.controller";
import { auth } from "../../middlewares/auth";
import { USER_ROLE } from "../auth/auth.constant";

const adminRoute = express.Router();

adminRoute.delete("/blogs/:id", auth(USER_ROLE.admin), deleteSingleBlogByAdmin);

adminRoute.patch(
  "/users/:userId/block",
  auth(USER_ROLE.admin),
  blockSingleUserByAdmin
);

export default adminRoute;
