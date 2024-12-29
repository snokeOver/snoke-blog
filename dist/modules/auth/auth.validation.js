"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenValidation = exports.changePassValidation = exports.userLoginValidation = exports.userRegistrationValidation = void 0;
const zod_1 = require("zod");
// Define reusable fields
const emailSchema = zod_1.z
    .string({
    invalid_type_error: "User email must be a string",
    required_error: "User email must be required",
})
    .email({
    message: "Must be a valid email",
});
const passwordSchema = zod_1.z.string({
    invalid_type_error: "User Password must be a string",
    required_error: "User Password must be required",
});
// Define user creation validation
exports.userRegistrationValidation = zod_1.z.object({
    name: zod_1.z.string({
        invalid_type_error: "User Name must be a string",
        required_error: "User Name must be required",
    }),
    password: passwordSchema,
    email: emailSchema,
});
// Define user login validation using reusable schemas
exports.userLoginValidation = zod_1.z.object({
    password: passwordSchema,
    email: emailSchema,
});
//Validation for change password
exports.changePassValidation = zod_1.z.object({
    oldPassword: zod_1.z.string({
        required_error: "Old Password is required",
    }),
    newPassword: zod_1.z.string({
        required_error: "New Password is required",
    }),
});
//Validation for retrieve token
exports.refreshTokenValidation = zod_1.z.object({
    refreshToken: zod_1.z.string({
        required_error: "Refresh Token is required",
    }),
});
