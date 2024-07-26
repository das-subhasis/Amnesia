import asyncHandler from "express-async-handler"
import { Request, Response } from "express"
import User from "../models/userSchema";
import { generateToken } from "../utils/utils";
import bcrypt from "bcryptjs"

// @route   GET /api/user/login
// @desc    User login
// @access  Public
const login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("Invalid credentials. Check email or password.");
    }

    const existUser = await User.findOne({ email: email }).populate("cart.product");
    if (!existUser || !await bcrypt.compare(password, existUser.password)) {
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
        token: generateToken(existUser._id)
    })

})

// @route   POST /api/user/register
// @desc    User registration
// @access  Public
const register = asyncHandler(async (req: Request, res: Response) => {
    const { username, email, password, avatar } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("Invalid credentials. Check email or password.");
    }
    const existUser = await User.findOne({ email: email }).populate("cart.product");
    if (existUser) {
        res.status(400);
        throw new Error("User already exists.");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    let newUser = await User.create({
        username: username,
        email: email,
        password: hashedPassword,
        avatar: avatar || undefined
    });
    newUser = await newUser.populate("cart.product");
    res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        avatar: newUser.avatar,
        address: newUser.address,
        cart: newUser.cart,
        wishList: newUser.wishList,
        token: generateToken(newUser._id)
    })
})

export { register, login }