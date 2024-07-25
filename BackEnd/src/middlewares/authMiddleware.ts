import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { NextFunction } from "connect";
import { authToken } from "../utils/utils";
import User from "../models/userSchema";

const authenticate = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorization = req.headers.authorization;
        const token = authorization?.split(" ")[1];
        
        if (!authorization || !authorization.startsWith('Bearer') || !token) {
            res.status(401);
            throw new Error("Unauthorized access. Invalid token.");
        }

        const decoded = authToken(token);

        req.user = await User.findById(decoded._id).select('-password');
        if (!req.user) {
            res.status(401);
            throw new Error("Unauthorized access. User not found.");
        }
        next();
    } catch (error) {
        res.status(401);
        next(error);
    }
})

export default authenticate