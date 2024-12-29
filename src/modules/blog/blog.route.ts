import express from "express";

import { validateRequest } from "../../middlewares/validateData";
import {
  blogCreationValidation,
  updateBlogValidation,
} from "./blog.validation";
import {
  createSingleBlog,
  deleteSingleBlog,
  getAlleBlogs,
  updateSingleBlog,
} from "./blog.controller";
import { auth } from "../../middlewares/auth";
import { USER_ROLE } from "../auth/auth.constant";

const blogRoute = express.Router();

blogRoute.post(
  "/",
  auth(USER_ROLE.user),
  validateRequest(blogCreationValidation),
  createSingleBlog
);

blogRoute.delete("/:id", auth(USER_ROLE.admin), deleteSingleBlog);

blogRoute.patch(
  "/:id",
  auth(USER_ROLE.user),
  validateRequest(updateBlogValidation),
  updateSingleBlog
);

blogRoute.get("/", getAlleBlogs);

export default blogRoute;
