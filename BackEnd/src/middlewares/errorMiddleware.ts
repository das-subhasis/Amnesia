import express, { Request, Response, NextFunction } from "express"
import { config } from "dotenv";
config()

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`address not found - ${req.originalUrl}`);
    res.status(404)
    next(error)
};

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack
    })
}