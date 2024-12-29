"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = __importDefault(require("../modules/auth/auth.route"));
const blog_route_1 = __importDefault(require("../modules/blog/blog.route"));
const admin_route_1 = __importDefault(require("../modules/admin/admin.route"));
const router = (0, express_1.Router)();
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
        route: admin_route_1.default,
    },
    {
        path: "/blogs",
        route: blog_route_1.default,
    },
    {
        path: "/auth",
        route: auth_route_1.default,
    },
];
routes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
