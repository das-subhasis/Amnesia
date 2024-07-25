import { Router } from "express";
import { createOrder, deleteOrder, getOrders } from "../controller/orderController";
import authenticate from "../middlewares/authMiddleware";

const order = Router();

order.get('/', authenticate, getOrders);

order.post('/', authenticate, createOrder)

order.post('/remove', authenticate, deleteOrder);

export default order