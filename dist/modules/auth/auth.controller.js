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
exports.deleteSingleUser = exports.getTokenByRefreshToken = exports.loginUser = exports.createUser = void 0;
const __1 = require("../..");
const catchAsync_1 = require("../../utils/catchAsync");
const auth_service_1 = require("./auth.service");
//Create a User data
exports.createUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, auth_service_1.createUserIntoDB)(req.body);
    res.status(201).send({
        success: true,
        message: "User registered successfully!",
        statusCode: 201,
        data: result,
    });
}));
//Login user
exports.loginUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, auth_service_1.authenticateUserLogin)(req.body);
    const { accessToken, refreshToken } = result;
    res.cookie("refreshToken", refreshToken, {
        secure: __1.nodeEnv !== "development",
        httpOnly: true,
    });
    res.status(200).send({
        success: true,
        message: "Login successfull",
        statusCode: 200,
        data: {
            accessToken,
        },
    });
}));
exports.getTokenByRefreshToken = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, auth_service_1.getTokenByRefreshTokenFromBackend)(req.cookies.refreshToken);
    res.status(200).send({
        success: true,
        message: "Token by refresh token retrieve successfully",
        statusCode: 200,
        data: result,
    });
}));
//Delete a User data
exports.deleteSingleUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, auth_service_1.deleteSingleUserFromDB)(req.params.id);
    res.status(201).send({
        success: true,
        message: "User deleted successfully!",
        statusCode: 201,
        data: result,
    });
}));
