"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const __1 = require("..");
const handleZodError_1 = require("./handleZodError");
const handleValidationError_1 = require("./handleValidationError");
const handleStrictMode_1 = require("./handleStrictMode");
const handleCastError_1 = require("./handleCastError");
const handleDuplicateError_1 = require("./handleDuplicateError");
const error_class_1 = require("../utils/error.class");
const errorHandler = (err, req, res, next) => {
    let errorMsg = "Something Went Wrong!";
    let statusCode = err.statusCode || 500;
    let error = [{ path: "", message: "Something Went Wrong!" }];
    // console.log(error);
    //Check for specific error
    if (err instanceof error_class_1.AppError) {
        //Errors we throw by AppError
        statusCode = err.statusCode;
        errorMsg = err.name;
        error = [
            {
                path: "",
                message: err.message,
            },
        ];
    }
    else if (err.name === "StrictModeError") {
        //Mongoose strict mode error
        const { status, message, sources } = (0, handleStrictMode_1.handleStrictMode)(err);
        statusCode = status;
        errorMsg = message;
        error = sources;
    }
    else if (err.code === 11000) {
        // Mongoose duplicate value for unique field
        const { status, message, sources } = (0, handleDuplicateError_1.handleDuplicateError)(err);
        statusCode = status;
        errorMsg = message;
        error = sources;
    }
    else if (err.name === "ZodError") {
        //Zod validation error
        const { status, message, sources } = (0, handleZodError_1.handleZodError)(err);
        statusCode = status;
        errorMsg = message;
        error = sources;
    }
    else if (err.name === "ValidationError") {
        //Mongoose validation error
        const { status, message, sources } = (0, handleValidationError_1.handleValidationError)(err);
        statusCode = status;
        errorMsg = message;
        error = sources;
    }
    else if (err.name === "CastError") {
        //Mongoose cast error for wrong params
        const { status, message, sources } = (0, handleCastError_1.handleCastError)(err);
        statusCode = status;
        errorMsg = message;
        error = sources;
    }
    else if (err instanceof Error) {
        //Errors we throw by AppError
        errorMsg = err.message;
        error = [
            {
                path: "",
                message: err.message,
            },
        ];
    }
    else {
        errorMsg = err.message || "Server error";
    }
    const response = Object.assign(Object.assign({ success: false, message: errorMsg, statusCode,
        error }, (__1.nodeEnv === "development" && { stack: err === null || err === void 0 ? void 0 : err.stack })), { showError: err });
    res.status(statusCode).send(response);
    void next;
};
exports.errorHandler = errorHandler;
