import express from "express";
import { PORT } from "../dist/utils/utils";
import CORS from "cors"
import { errorHandler, notFoundHandler } from "../dist/middlewares/errorMiddleware";
import product from "../dist/routes/productRoutes";
import order from "../dist/routes/orderRoutes";
import connectDB from "../dist/utils/config";
import auth from "../dist/routes/authRoutes";
import user from "../dist/routes/userRoutes";
 
connectDB();

const app = express();

app.use(express.json())
app.use(CORS())

app.use('/api/auth', auth);
app.use('/api/products', product);
app.use('/api/orders', order);
app.use('/api/user', user);

app.use(notFoundHandler)
app.use(errorHandler)

app.get('/', (req, res) => res.send("Hi"))
app.listen(3000, () => {
    console.log(`Server is running on port ${PORT}`);
})

module.exports = app;