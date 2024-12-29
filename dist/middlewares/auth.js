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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const catchAsync_1 = require("../utils/catchAsync");
const error_class_1 = require("../utils/error.class");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const __1 = require("..");
const auth_utils_1 = require("../modules/auth/auth.utils");
const auth_model_1 = require("../modules/auth/auth.model");
const auth = (...userRole) => {
    return (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        //Check if token is present
        if (!token)
            throw new error_class_1.AppError(401, "UnAuthorized", "You are not authorized !");
        //Check if token is valid
        const decoded = jsonwebtoken_1.default.verify(token, __1.jwt_access_secret);
        const { role, email, iat } = decoded;
        //Check if the user has permission
        const foundUser = yield auth_model_1.UserModel.isUserExist(email);
        yield (0, auth_utils_1.authenticateUser)(foundUser, iat, undefined);
        if (userRole && !userRole.includes(role))
            throw new error_class_1.AppError(401, "UnAuthorized", "You are not authorized !");
        decoded.id = foundUser._id;
        req.user = decoded;
        next();
    }));
};
exports.auth = auth;
