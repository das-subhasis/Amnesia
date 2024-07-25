"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema_1 = require("./productSchema");
const UserSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        default: null
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/blackfroth/image/upload/v1720947664/free-user-icon-3296-thumb_tyhkuy.png"
    },
    cart: [{ product: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Product" }, quantity: { type: Number, default: 1 } }],
    wishList: [productSchema_1.ProductSchema]
}, {
    timestamps: true
});
const User = mongoose_1.default.model("User", UserSchema);
exports.default = User;
