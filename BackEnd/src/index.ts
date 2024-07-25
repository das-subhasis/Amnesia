import express from "express";
import { PORT } from "./utils/utils";
import CORS from "cors"
import { errorHandler, notFoundHandler } from "./middlewares/errorMiddleware";
import product from "./routes/productRoutes";
import order from "./routes/orderRoutes";
import connectDB from "./utils/config";
import auth from "./routes/authRoutes";
import user from "./routes/userRoutes";
 
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
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

export default app;
