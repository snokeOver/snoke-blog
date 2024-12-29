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
exports.blockSingleUserByAdminIntoDB = exports.deleteSingleBlogByAdminFromDB = void 0;
const auth_model_1 = require("../auth/auth.model");
const blog_model_1 = require("../blog/blog.model");
//delete a Blogs from database
const deleteSingleBlogByAdminFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedBlog = yield blog_model_1.BlogModel.findOneAndUpdate({ _id: id }, {
        isDeleted: true,
    }, {
        new: true,
    });
    return deletedBlog;
});
exports.deleteSingleBlogByAdminFromDB = deleteSingleBlogByAdminFromDB;
//Block single user from database
const blockSingleUserByAdminIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const blockedUser = yield auth_model_1.UserModel.findOneAndUpdate({ _id: id }, {
        isBlocked: true,
    }, {
        new: true,
    }).select("+isBlocked");
    return blockedUser;
});
exports.blockSingleUserByAdminIntoDB = blockSingleUserByAdminIntoDB;
