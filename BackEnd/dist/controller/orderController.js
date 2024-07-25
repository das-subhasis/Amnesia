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
exports.deleteOrder = exports.createOrder = exports.getOrders = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const orderSchema_1 = __importDefault(require("../models/orderSchema"));
// @route   GET /api/orders
// @desc    Get all orders for the authenticated user
// @access  Private
const getOrders = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield orderSchema_1.default.find({ user: req.user._id }).populate('user', "-password").populate('products.product');
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(500);
        throw new Error("Internal server error");
    }
}));
exports.getOrders = getOrders;
// @route   POST /api/orders
// @desc    Create a new order
// @access  Private
const createOrder = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { products, totalAmount } = req.body;
        let order = yield orderSchema_1.default.create({
            user: req.user._id,
            products: products,
            totalAmount: totalAmount
        });
        order = yield order.populate('user', "-password");
        res.json(order);
    }
    catch (error) {
        console.error(error);
        throw new Error(error);
    }
}));
exports.createOrder = createOrder;
// @route   DELETE /api/orders/remove
// @desc    Delete an order by ID
// @access  Private
const deleteOrder = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield orderSchema_1.default.findOneAndDelete({ "user": req.user._id }).select("-password");
        if (!order) {
            res.status(404);
            throw new Error("Order not found");
        }
        res.status(200).json({
            message: `Order ID: ${order._id} has been deleted successfully.`
        });
    }
    catch (error) {
        console.log(error);
        res.status(500);
        throw new Error("Internal server error.");
    }
}));
exports.deleteOrder = deleteOrder;
