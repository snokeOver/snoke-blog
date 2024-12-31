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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBlogsFromDB = exports.updateSingleBlogIntoDB = exports.deleteSingleBlogFromDB = exports.createBlogIntoDB = void 0;
const error_class_1 = require("../../utils/error.class");
const blog_model_1 = require("./blog.model");
const QueryBuilder_1 = require("../../builder/QueryBuilder");
const blog_constant_1 = require("./blog.constant");
// Create a Blog data
const createBlogIntoDB = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    payload.author = user.id;
    const createdBlog = yield blog_model_1.BlogModel.create(payload);
    if (!createdBlog)
        throw new error_class_1.AppError(509, "Bad Request", "Failed to create new Blog");
    const result = yield blog_model_1.BlogModel.findById(createdBlog._id).populate("author");
    if (!result)
        throw new error_class_1.AppError(509, "Bad Request", "Failed to create new Blog");
    const _a = result.toObject(), { title, content, _id, author } = _a, restResult = __rest(_a, ["title", "content", "_id", "author"]);
    void restResult;
    return {
        _id,
        title,
        content,
        author,
    };
});
exports.createBlogIntoDB = createBlogIntoDB;
// Delete single Blog data
const deleteSingleBlogFromDB = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const isBlogExist = yield blog_model_1.BlogModel.isBlogExist(id);
    //Check ownership
    if (((_a = isBlogExist === null || isBlogExist === void 0 ? void 0 : isBlogExist.author) === null || _a === void 0 ? void 0 : _a.toString()) !== ((_b = user === null || user === void 0 ? void 0 : user.id) === null || _b === void 0 ? void 0 : _b.toString()))
        throw new error_class_1.AppError(401, "UnAuthorized", "You are not the owner of this blog !");
    const result = yield blog_model_1.BlogModel.findOneAndUpdate({ _id: id }, {
        isDeleted: true,
    }, {
        new: true,
    });
    void result;
    return null;
});
exports.deleteSingleBlogFromDB = deleteSingleBlogFromDB;
// Update single Blog data
const updateSingleBlogIntoDB = (id, payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const isBlogExist = yield blog_model_1.BlogModel.isBlogExist(id);
    if (!isBlogExist)
        throw new error_class_1.AppError(404, "Blog Not Found", "The Blog you are trying to access does not exist!");
    //Check ownership
    if (((_a = isBlogExist === null || isBlogExist === void 0 ? void 0 : isBlogExist.author) === null || _a === void 0 ? void 0 : _a.toString()) !== ((_b = user === null || user === void 0 ? void 0 : user.id) === null || _b === void 0 ? void 0 : _b.toString()))
        throw new error_class_1.AppError(401, "UnAuthorized", "You are not the owner of this blog !");
    const result = yield blog_model_1.BlogModel.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    }).populate("author");
    if (!result)
        throw new error_class_1.AppError(509, "Bad Request", "Failed to Update this Blog");
    const _c = result.toObject(), { title, content, _id, author } = _c, restResult = __rest(_c, ["title", "content", "_id", "author"]);
    void restResult;
    return {
        _id,
        title,
        content,
        author,
    };
});
exports.updateSingleBlogIntoDB = updateSingleBlogIntoDB;
// Get all blog
const getAllBlogsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const blogQuery = new QueryBuilder_1.QueryBuilder(blog_model_1.BlogModel.find().populate("author"), query)
        .search(blog_constant_1.blogSearchFields)
        .filter()
        .sort()
        .paginate()
        .selectFields();
    const result = yield blogQuery.queryModel;
    return result;
});
exports.getAllBlogsFromDB = getAllBlogsFromDB;
