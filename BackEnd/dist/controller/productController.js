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
exports.addMultipleProducts = exports.updateProductByID = exports.deleteProductByID = exports.addProduct = exports.getProductByCategory = exports.getProducts = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const productSchema_1 = __importDefault(require("../models/productSchema"));
// @route   GET /api/products
// @desc    Get all products
// @access  Public
const getProducts = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = req.query.category;
        if (!category) {
            const product = yield productSchema_1.default.find();
            res.json(product);
        }
        const product = yield productSchema_1.default.find({ category });
        res.json(product);
    }
    catch (error) {
        res.status(500);
        throw new Error("Internal server error.");
    }
}));
exports.getProducts = getProducts;
// @route   GET /api/products/:category
// @desc    Get a product by ID
// @access  Public
const getProductByCategory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = req.query.category;
        const product = yield productSchema_1.default.find({ category: req.query.category });
        if (!product) {
            res.status(404);
            throw new Error("Product not found.");
        }
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500);
        throw new Error("Internal server error.");
    }
}));
exports.getProductByCategory = getProductByCategory;
// @route   POST /api/products/add
// @desc    Create a new product
// @access  Private 
const addProduct = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, category, price, quantity, imageUrl } = req.body;
        const product = yield productSchema_1.default.create({ name, description, category, price: price, quantity, imageUrl });
        res.json(product);
    }
    catch (error) {
        res.status(500);
        console.log(error);
        throw new Error("Internal server error.");
    }
}));
exports.addProduct = addProduct;
// @route   POST /api/products/add/multiple
// @desc    Add multiple new products
// @access  Private 
const addMultipleProducts = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { products } = req.body;
    if (!Array.isArray(products) || products.length === 0) {
        res.status(400);
        throw new Error("No products provided");
    }
    try {
        const validProducts = products.map((product) => ({
            name: product.name || 'Unknown product',
            description: product.description || '...',
            category: product.category || 'Unknown category',
            price: product.price || 0,
            quantity: product.quantity || 0,
            imageUrl: product.imageUrl || "https://res.cloudinary.com/blackfroth/image/upload/v1720947354/image-not-found_cb2fey.jpg"
        }));
        const result = yield productSchema_1.default.insertMany(validProducts);
        res.status(201).json(result);
    }
    catch (error) {
        console.error(error);
        res.status(500);
        throw new Error("Internal server error.");
    }
}));
exports.addMultipleProducts = addMultipleProducts;
// @route   DELETE /api/products/:id
// @desc    Delete a product by ID
// @access  Private
const deleteProductByID = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = productSchema_1.default.findByIdAndDelete(req.params.id);
        if (!product) {
            res.status(404);
            throw new Error("Product not found.");
        }
        res.json(product);
    }
    catch (error) {
        console.log(error);
        res.status(500);
        throw new Error("Internal server error.");
    }
}));
exports.deleteProductByID = deleteProductByID;
// @route   PUT /api/products/:id
// @desc    Update a product by ID
// @access  Private
const updateProductByID = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const product = yield productSchema_1.default.findByIdAndUpdate(req.params.id, { $set: data }, { new: true });
        if (!product) {
            res.status(404);
            throw new Error("Product not found.");
        }
        res.json(product);
    }
    catch (error) {
        console.log(error);
        res.status(500);
        throw new Error("Internal server error.");
    }
}));
exports.updateProductByID = updateProductByID;
