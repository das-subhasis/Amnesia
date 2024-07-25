"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const OrderSchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{ product: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Product', required: true }, quantity: { type: Number, default: 1 } }],
    totalAmount: { type: Number, required: true }
}, { timestamps: true });
const Order = mongoose_1.default.model("Order", OrderSchema);
exports.default = Order;
