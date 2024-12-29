"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAlleBlogs = exports.updateSingleBlog = exports.deleteSingleBlog = exports.createSingleBlog = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const blog_service_1 = require("./blog.service");
//Create a Blog by only user
exports.createSingleBlog = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, blog_service_1.createBlogIntoDB)(req.body, req.user);
    res.status(201).send({
        success: true,
        message: "Blog created successfully!",
        statusCode: 201,
        data: result,
    });
}));
//Delete single blog by only user the creator
exports.deleteSingleBlog = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, blog_service_1.deleteSingleBlogFromDB)(req.params.id, req.user);
    res.status(200).send({
        success: true,
        message: "Blog deleted successfully!",
        statusCode: 200,
        data: result,
    });
}));
//Update single blog by only user the creator
exports.updateSingleBlog = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, blog_service_1.updateSingleBlogIntoDB)(req.params.id, req.body, req.user);
    res.status(200).send({
        success: true,
        message: "Blog updated successfully!",
        statusCode: 200,
        data: result,
    });
}));
//Get all blogs for mango people
exports.getAlleBlogs = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, blog_service_1.getAllBlogsFromDB)(req.query);
    res.status(200).send({
        success: true,
        message: "All blogs retrieved successfully!",
        statusCode: 200,
        data: result,
    });
}));
