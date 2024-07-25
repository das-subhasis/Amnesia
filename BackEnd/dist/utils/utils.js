"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authToken = exports.generateToken = exports.PORT = void 0;
const dotenv_1 = require("dotenv");
const jsonwebtoken_1 = require("jsonwebtoken");
(0, dotenv_1.config)();
exports.PORT = process.env.PORT || 5000;
const generateToken = (_id) => {
    return (0, jsonwebtoken_1.sign)({ _id }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });
};
exports.generateToken = generateToken;
const authToken = (token) => {
    try {
        return (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
    }
    catch (error) {
        throw new Error("Invalid or expired token.");
    }
};
exports.authToken = authToken;
