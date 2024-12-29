import express from "express";

import { deleteSingleBlogByAdmin } from "./admin.controller";

const adminRoute = express.Router();

//either delete/block/both will be implemented
adminRoute.delete("/blogs/:id", deleteSingleBlogByAdmin);

export default adminRoute;
