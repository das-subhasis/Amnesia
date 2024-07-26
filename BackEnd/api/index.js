import express from "express";
import { PORT } from "../src/utils/utils";
import CORS from "cors"
import { errorHandler, notFoundHandler } from "../src/middlewares/errorMiddleware";
import product from "../src/routes/productRoutes";
import order from "../src/routes/orderRoutes";
import connectDB from "../src/utils/config";
import auth from "../src/routes/authRoutes";
import user from "../src/routes/userRoutes";

connectDB();

const app = express();

app.use(express.json())
app.use(CORS())

app.use('/api/auth', auth);
app.use('/api/products', product);
app.use('/api/orders', order);
app.use('/api/user', user);
app.use('/', (req, res) => res.json({ message: "Welcome to my api"}))
app.use(notFoundHandler)
app.use(errorHandler)


app.listen(3000, () => {
    console.log(`Server is running on port ${PORT}`);
})

export default app;
