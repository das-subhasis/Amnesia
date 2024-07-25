"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderController_1 = require("../controller/orderController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const order = (0, express_1.Router)();
order.get('/', authMiddleware_1.default, orderController_1.getOrders);
order.post('/', authMiddleware_1.default, orderController_1.createOrder);
order.post('/remove', authMiddleware_1.default, orderController_1.deleteOrder);
exports.default = order;
