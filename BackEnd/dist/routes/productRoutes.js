"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controller/productController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const product = (0, express_1.Router)();
product.get('/', productController_1.getProducts);
product.get('/:product_name', productController_1.getProducts);
product.get('/c/:id', productController_1.getProductByCategory);
product.get('/c/:category', productController_1.getProductByCategory);
product.post('/add', authMiddleware_1.default, productController_1.addProduct);
product.post('/add/multiple', authMiddleware_1.default, productController_1.addMultipleProducts);
product.put('/:id', authMiddleware_1.default, productController_1.updateProductByID);
product.post('/remove/:id', authMiddleware_1.default, productController_1.deleteProductByID);
exports.default = product;
