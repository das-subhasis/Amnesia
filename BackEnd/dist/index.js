"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utils_1 = require("./utils/utils");
const cors_1 = __importDefault(require("cors"));
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const config_1 = __importDefault(require("./utils/config"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
(0, config_1.default)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/auth', authRoutes_1.default);
app.use('/api/products', productRoutes_1.default);
app.use('/api/orders', orderRoutes_1.default);
app.use('/api/user', userRoutes_1.default);
app.use(errorMiddleware_1.notFoundHandler);
app.use(errorMiddleware_1.errorHandler);
app.listen(utils_1.PORT, () => {
    console.log(`Server is running on port ${utils_1.PORT}`);
});

module.exports = app;