import express from "express";

import { deleteSingleBlogByAdmin } from "./admin.controller";

const adminRoute = express.Router();

adminRoute.delete("/blogs/:id", deleteSingleBlogByAdmin);
adminRoute.delete("/blogs/:id", deleteSingleBlogByAdmin);

export default adminRoute;
