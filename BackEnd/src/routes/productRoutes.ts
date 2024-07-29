import { Router } from "express";
import { addProduct, addMultipleProducts, deleteProductByID, getProducts, updateProductByID, getProductByCategory } from "../controller/productController";
import authenticate from "../middlewares/authMiddleware";

const product = Router();

product.get('/:product_name', getProducts);

product.get('/c/:id', getProductByCategory);

product.get('/c/:category', getProductByCategory);

product.post('/add', authenticate, addProduct);

product.post('/add/multiple', authenticate, addMultipleProducts);

product.put('/:id', authenticate, updateProductByID);

product.post('/remove/:id', authenticate, deleteProductByID);

export default product