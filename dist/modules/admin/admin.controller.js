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
exports.blockSingleUserByAdmin = exports.deleteSingleBlogByAdmin = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const admin_service_1 = require("./admin.service");
//Delete a blog by admin
exports.deleteSingleBlogByAdmin = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, admin_service_1.deleteSingleBlogByAdminFromDB)(req.params.id);
    res.status(200).send({
        success: true,
        message: "Blog deleted successfully!",
        statusCode: 200,
        data: result,
    });
}));
//Block a user by admin
exports.blockSingleUserByAdmin = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, admin_service_1.blockSingleUserByAdminIntoDB)(req.params.userId);
    res.status(200).send({
        success: true,
        message: "User Blocked successfully!",
        statusCode: 200,
        data: result,
    });
}));
