"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("./admin.controller");
const auth_1 = require("../../middlewares/auth");
const auth_constant_1 = require("../auth/auth.constant");
const adminRoute = express_1.default.Router();
adminRoute.delete("/blogs/:id", (0, auth_1.auth)(auth_constant_1.USER_ROLE.admin), admin_controller_1.deleteSingleBlogByAdmin);
adminRoute.patch("/users/:userId/block", (0, auth_1.auth)(auth_constant_1.USER_ROLE.admin), admin_controller_1.blockSingleUserByAdmin);
exports.default = adminRoute;
