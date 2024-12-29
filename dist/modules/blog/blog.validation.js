"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogValidation = exports.blogCreationValidation = void 0;
const zod_1 = require("zod");
// Define blog creation validation
exports.blogCreationValidation = zod_1.z.object({
    title: zod_1.z.string({
        invalid_type_error: "Blog Title must be a string",
        required_error: "Blog Title must be required",
    }),
    content: zod_1.z.string({
        invalid_type_error: "Blog Content must be a string",
        required_error: "Blog Content must be required",
    }),
});
//Define blog update validation
exports.updateBlogValidation = exports.blogCreationValidation.partial();
