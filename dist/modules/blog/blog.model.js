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
exports.BlogModel = void 0;
const mongoose_1 = require("mongoose");
const error_class_1 = require("../../utils/error.class");
const blogSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    isPublished: {
        type: Boolean,
        default: true,
        select: 0,
    },
    isDeleted: {
        type: Boolean,
        default: false,
        select: 0,
    },
}, {
    timestamps: true,
    strict: "throw", // prevents extra fields and throw error
});
//Pre save middleware: will work on create() and save() to encrypt password
// blogSchema.pre("save", async function () {
//   const isUserExist = await BlogModel.findOne({
//     email: this.email,
//   });
//   if (isUserExist)
//     throw new AppError(409, "Duplicate Email", "This User is already exist !");
//   this.password = await bcrypt.hash(this.password, Number(saltRound));
// });
//To check if the user id exist or not before delete
//To check if the user id exist or not before delete
blogSchema.pre("findOneAndUpdate", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const isBlogExist = yield exports.BlogModel.findOne(this.getQuery()).select("+isDeleted +isPublished");
        if (!isBlogExist)
            throw new error_class_1.AppError(404, "Blog Not Found", "The Blog you are trying to access does not exist!");
        if (isBlogExist.isDeleted)
            throw new error_class_1.AppError(404, "Blog Not Found", "The Blog you are trying to access has already been deleted!");
    });
});
//static method
blogSchema.statics.isBlogExist = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.BlogModel.findOne({
            _id: id,
        }).select("+isPublished +isDeleted");
    });
};
exports.BlogModel = (0, mongoose_1.model)("blogs", blogSchema);
