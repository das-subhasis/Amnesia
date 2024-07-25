"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const connectDB = () => {
    const mongo_uri = process.env.MONGO_URI;
    mongoose_1.default.connect(mongo_uri)
        .then(() => console.log("MongoDB Connected..."))
        .catch((err) => console.log(err));
};
exports.default = connectDB;
