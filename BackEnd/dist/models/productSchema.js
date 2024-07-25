"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.ProductSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true, },
    description: { type: String },
    category: { type: String, required: true },
    price: { type: Number, required: true, },
    quantity: { type: Number },
    imageUrl: { type: String, default: "https://res.cloudinary.com/dkzcmb58n/image/upload/v1720947354/image-not-found_cb2fey.jpg" },
}, { timestamps: true });
const Product = mongoose_1.default.model("Product", exports.ProductSchema);
exports.default = Product;
