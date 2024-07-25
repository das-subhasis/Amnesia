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
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const utils_1 = require("../utils/utils");
const userSchema_1 = __importDefault(require("../models/userSchema"));
const authenticate = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorization = req.headers.authorization;
        const token = authorization === null || authorization === void 0 ? void 0 : authorization.split(" ")[1];
        if (!authorization || !authorization.startsWith('Bearer') || !token) {
            res.status(401);
            throw new Error("Unauthorized access. Invalid token.");
        }
        const decoded = (0, utils_1.authToken)(token);
        req.user = yield userSchema_1.default.findById(decoded._id).select('-password');
        if (!req.user) {
            res.status(401);
            throw new Error("Unauthorized access. User not found.");
        }
        next();
    }
    catch (error) {
        res.status(401);
        next(error);
    }
}));
exports.default = authenticate;
