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
exports.removeFromWishList = exports.updateWishList = exports.removeFromCart = exports.updateCart = exports.updateUser = exports.getUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userSchema_1 = __importDefault(require("../models/userSchema"));
const productSchema_1 = __importDefault(require("../models/productSchema"));
// @route   GET /api/user/
// @desc    Get user details
// @access  Private
exports.getUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userSchema_1.default.findById(req.user._id).select("-password");
        res.json(user);
    }
    catch (error) {
        res.status(500);
        throw new Error("Failed to get user details.");
    }
}));
// @route   POST /api/user/update
// @desc    Update user details
// @access  Private
exports.updateUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    if (!data) {
        res.status(400);
        throw new Error("Invalid input.");
    }
    try {
        const updatedUser = yield userSchema_1.default.findByIdAndUpdate(req.user._id, { $set: data }, { new: true, runValidators: true }).select("-password");
        res.status(200).json(updatedUser);
    }
    catch (error) {
        console.error(error);
        res.status(500);
        throw new Error("Internal server error.");
    }
}));
// @route   POST /api/user/cart
// @desc    Update cart (add/update product in cart)
// @access  Private
exports.updateCart = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, quantity } = req.body;
    try {
        let user = yield userSchema_1.default.findOneAndUpdate({ _id: req.user._id, "cart.product": _id }, { $inc: { "cart.$.quantity": quantity } }, { new: true }).populate("cart.product").select("-password");
        if (!user) {
            user = yield userSchema_1.default.findOneAndUpdate({ _id: req.user._id }, { $addToSet: { cart: { product: _id, quantity } } }, { new: true }).populate("cart.product").select("-password");
        }
        res.json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500);
        throw new Error("Error updating cart.");
    }
}));
// @route   POST /api/user/cart/remove
// @desc    Remove product from cart
// @access  Private
exports.removeFromCart = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.body;
    const userId = req.user._id;
    try {
        const user = yield userSchema_1.default.findById(userId);
        if (!user)
            throw new Error("User not found.");
        user.cart = user.cart.filter((p) => p.product.toString() !== _id);
        const updatedUser = yield userSchema_1.default.findByIdAndUpdate(userId, { $set: { cart: user.cart } }, { new: true }).select("-password");
        res.json(updatedUser);
    }
    catch (error) {
        console.error(error);
        res.status(500);
        throw new Error("Error removing from cart.");
    }
}));
// @route   POST /api/user/wishlist
// @desc    Add product to wishlist
// @access  Private
exports.updateWishList = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user._id;
    const { _id } = req.body;
    try {
        const product = yield productSchema_1.default.findById(_id);
        if (!product) {
            res.status(404);
            throw new Error("Product not found.");
        }
        const user = yield userSchema_1.default.findOneAndUpdate({ _id: userId }, { $addToSet: { wishList: product } }, { new: true }).select("-password");
        res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500);
        throw new Error("Error updating wish list.");
    }
}));
// @route   POST /api/user/wishlist/remove
// @desc    Remove product from wishlist
// @access  Private
exports.removeFromWishList = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.body;
    const userId = req.user._id;
    try {
        const user = yield userSchema_1.default.findById(userId);
        if (!user)
            throw new Error("User not found.");
        user.wishList = user.wishList.filter((p) => p._id.toString() !== _id);
        const updatedUser = yield userSchema_1.default.findByIdAndUpdate(userId, { $set: { wishList: user.wishList } }, { new: true }).select("-password");
        res.json(updatedUser);
    }
    catch (error) {
        console.error(error);
        res.status(500);
        throw new Error("Error removing from wish list.");
    }
}));
