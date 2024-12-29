"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = void 0;
const notFound = (req, res, next) => {
    const response = {
        success: false,
        message: "API not found",
        statusCode: 404,
        error: "The API or page you are looking for was not found.",
    };
    res.status(404).send(response);
    void next;
};
exports.notFound = notFound;
