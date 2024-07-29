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
exports.login = exports.register = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userSchema_1 = __importDefault(require("../models/userSchema"));
const utils_1 = require("../utils/utils");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// @route   GET /api/user/login
// @desc    User login
// @access  Public
const login = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Invalid credentials. Check email or password.");
    }
    const existUser = yield userSchema_1.default.findOne({ email: email }).populate("cart.product");
    if (!existUser || !(yield bcryptjs_1.default.compare(password, existUser.password))) {
        res.status(400);
        throw new Error("Invalid credentials. Check email or password.");
    }
    res.status(200).json({
        _id: existUser._id,
        username: existUser.username,
        email: existUser.email,
        avatar: existUser.avatar,
        address: existUser.address,
        cart: existUser.cart,
        wishList: existUser.wishList,
        token: (0, utils_1.generateToken)(existUser._id)
    });
}));
exports.login = login;
// @route   POST /api/user/register
// @desc    User registration
// @access  Public
const register = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, avatar } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("Invalid credentials. Check email or password.");
    }
    const existUser = yield userSchema_1.default.findOne({ email: email }).populate("cart.product");
    if (existUser) {
        res.status(400);
        throw new Error("User already exists.");
    }
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
    let newUser = yield userSchema_1.default.create({
        username: username,
        email: email,
        password: hashedPassword,
        avatar: avatar || undefined
    });
    newUser = yield newUser.populate("cart.product");
    res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        avatar: newUser.avatar,
        address: newUser.address,
        cart: newUser.cart,
        wishList: newUser.wishList,
        token: (0, utils_1.generateToken)(newUser._id)
    });
}));
exports.register = register;
