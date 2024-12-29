"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryBuilder = void 0;
const error_class_1 = require("../utils/error.class");
class QueryBuilder {
    constructor(queryModel, query) {
        this.queryModel = queryModel;
        this.query = query;
    }
    search(searchFields) {
        var _a;
        const searchTerm = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.search;
        const searchQuery = searchTerm
            ? {
                $or: searchFields.map((field) => ({
                    [field]: { $regex: searchTerm, $options: "i" },
                })),
            }
            : {};
        this.queryModel = this.queryModel.find(searchQuery);
        return this;
    }
    filter() {
        const excludeFields = [
            "search",
            "sortBy",
            "sortOrder",
            "limit",
            "page",
            "fields",
        ];
        const copiedQuery = Object.assign({}, this.query);
        excludeFields.forEach((el) => delete copiedQuery[el]);
        if (copiedQuery.filter)
            this.queryModel = this.queryModel.find({ _id: copiedQuery.filter });
        return this;
    }
    sort() {
        var _a, _b, _c;
        const sortBy = ((_a = this.query) === null || _a === void 0 ? void 0 : _a.sortBy) || "createdAt"; // Default sortBy is createdAt
        // Validate sortOrder
        const sortOrdr = (_b = this.query) === null || _b === void 0 ? void 0 : _b.sortOrder;
        if (sortOrdr && !["asc", "desc"].includes(sortOrdr)) {
            throw new error_class_1.AppError(400, "Bad Request", `Invalid sortOrder value: '${sortOrdr}'. Allowed values are 'asc' or 'desc'.`);
        }
        const sortOrder = ((_c = this.query) === null || _c === void 0 ? void 0 : _c.sortOrder) === "asc" ? 1 : -1; // Default sortOrder is descending
        const sortQuery = { [sortBy]: sortOrder };
        this.queryModel = this.queryModel.sort(sortQuery);
        return this;
    }
    paginate() {
        var _a, _b;
        const limitQuery = Number((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.limit) || 10;
        const pageQuery = Number((_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.page) || 1;
        const skipQuery = (pageQuery - 1) * limitQuery;
        this.queryModel = this.queryModel.skip(skipQuery).limit(limitQuery);
        return this;
    }
    selectFields() {
        var _a, _b;
        const fieldsQuery = ((_b = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.fields) === null || _b === void 0 ? void 0 : _b.split(",").join(" ")) ||
            "-__v -createdAt -updatedAt";
        this.queryModel = this.queryModel.select(fieldsQuery);
        return this;
    }
}
exports.QueryBuilder = QueryBuilder;
