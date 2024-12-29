"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateData_1 = require("../../middlewares/validateData");
const blog_validation_1 = require("./blog.validation");
const blog_controller_1 = require("./blog.controller");
const auth_1 = require("../../middlewares/auth");
const auth_constant_1 = require("../auth/auth.constant");
const blogRoute = express_1.default.Router();
blogRoute.post("/", (0, auth_1.auth)(auth_constant_1.USER_ROLE.user), (0, validateData_1.validateRequest)(blog_validation_1.blogCreationValidation), blog_controller_1.createSingleBlog);
blogRoute.delete("/:id", (0, auth_1.auth)(auth_constant_1.USER_ROLE.user), blog_controller_1.deleteSingleBlog);
blogRoute.patch("/:id", (0, auth_1.auth)(auth_constant_1.USER_ROLE.user), (0, validateData_1.validateRequest)(blog_validation_1.updateBlogValidation), blog_controller_1.updateSingleBlog);
blogRoute.get("/", blog_controller_1.getAlleBlogs);
exports.default = blogRoute;
