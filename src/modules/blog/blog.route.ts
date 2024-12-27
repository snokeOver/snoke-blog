import express from "express";

import { validateRequest } from "../../middlewares/validateData";
import { blogCreationValidation } from "./blog.validation";
import { createSingleBlog } from "./blog.controller";
import { auth } from "../../middlewares/auth";
import { USER_ROLE } from "../auth/auth.constant";

const blogRoute = express.Router();

blogRoute.post(
  "/",
  auth(USER_ROLE.user),
  validateRequest(blogCreationValidation),
  createSingleBlog
);

export default blogRoute;
