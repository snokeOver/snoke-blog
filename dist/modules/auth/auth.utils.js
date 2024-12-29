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
exports.authenticateUser = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_model_1 = require("./auth.model");
const error_class_1 = require("../../utils/error.class");
const createToken = (jwtPayload, secret, expiresIn) => {
    return jsonwebtoken_1.default.sign(jwtPayload, secret, {
        expiresIn,
    });
};
exports.createToken = createToken;
const authenticateUser = (foundUser, iat, plainPssword) => __awaiter(void 0, void 0, void 0, function* () {
    if (!foundUser)
        throw new error_class_1.AppError(404, "Not Exist", "This user doesn't exist !");
    if (foundUser.isBlocked)
        throw new error_class_1.AppError(403, "Forbidden", "This user is blocked !");
    if (foundUser.isDeleted)
        throw new error_class_1.AppError(403, "Forbidden", "This user is deleted !");
    //Revalidate token
    if (foundUser.passwordChangedAt &&
        iat &&
        auth_model_1.UserModel.isJWTValidYet(foundUser.passwordChangedAt, iat))
        throw new error_class_1.AppError(401, "UnAuthorized", "You are not authorized !");
    // //password validation
    if (plainPssword &&
        !(yield auth_model_1.UserModel.isPasswordMatched(plainPssword, foundUser.password)))
        throw new error_class_1.AppError(403, "Forbidden", "Passoword Not matched !");
});
exports.authenticateUser = authenticateUser;
