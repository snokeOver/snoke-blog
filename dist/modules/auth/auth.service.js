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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSingleUserFromDB = exports.getTokenByRefreshTokenFromBackend = exports.authenticateUserLogin = exports.createUserIntoDB = void 0;
const auth_model_1 = require("./auth.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_class_1 = require("../../utils/error.class");
const auth_utils_1 = require("./auth.utils");
const __1 = require("../..");
// import { status } from "http-status";
// Create a User data
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_model_1.UserModel.create(payload);
    if (!result)
        throw new error_class_1.AppError(509, "Bad Request", "Failed to create new user");
    const _a = result.toObject(), { name, email, _id } = _a, restResult = __rest(_a, ["name", "email", "_id"]);
    void restResult;
    return {
        _id,
        name,
        email,
    };
});
exports.createUserIntoDB = createUserIntoDB;
//Authenticate User Login
const authenticateUserLogin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = yield auth_model_1.UserModel.isUserExist(payload.email);
    yield (0, auth_utils_1.authenticateUser)(foundUser, undefined, payload.password);
    const jwtPayload = {
        email: foundUser.email,
        role: foundUser.role,
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, __1.jwt_access_secret, __1.jwt_access_expire);
    const refreshToken = (0, auth_utils_1.createToken)(jwtPayload, __1.jwt_refresh_secret, __1.jwt_refresh_expire);
    return {
        accessToken,
        refreshToken,
    };
});
exports.authenticateUserLogin = authenticateUserLogin;
//Authenticate for refresh token
const getTokenByRefreshTokenFromBackend = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jsonwebtoken_1.default.verify(token, __1.jwt_refresh_secret);
    const { email, iat } = decoded;
    //Check if the user has permission
    const foundUser = yield auth_model_1.UserModel.isUserExist(email);
    yield (0, auth_utils_1.authenticateUser)(foundUser, iat, undefined);
    const jwtPayload = {
        email: foundUser.email,
        role: foundUser.role,
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, __1.jwt_access_secret, __1.jwt_access_expire);
    return { accessToken };
});
exports.getTokenByRefreshTokenFromBackend = getTokenByRefreshTokenFromBackend;
//delete a User from database
const deleteSingleUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedUser = yield auth_model_1.UserModel.findByIdAndUpdate(id, {
        isDeleted: true,
    }, {
        new: true,
    });
    return deletedUser;
});
exports.deleteSingleUserFromDB = deleteSingleUserFromDB;
