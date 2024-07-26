"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFoundHandler = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const notFoundHandler = (req, res, next) => {
    const error = new Error(`address not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};
exports.notFoundHandler = notFoundHandler;
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack
    });
};
exports.errorHandler = errorHandler;
