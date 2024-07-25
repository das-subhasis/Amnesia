"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const user = (0, express_1.Router)();
user.get("/", authMiddleware_1.default, userController_1.getUser);
user.post("/update", authMiddleware_1.default, userController_1.updateUser);
user.post("/cart", authMiddleware_1.default, userController_1.updateCart);
user.post("/cart/remove", authMiddleware_1.default, userController_1.removeFromCart);
user.post("/wishlist", authMiddleware_1.default, userController_1.updateWishList);
user.post("/wishlist/remove", authMiddleware_1.default, userController_1.removeFromWishList);
exports.default = user;
