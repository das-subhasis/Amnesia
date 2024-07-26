import { Router } from "express";
import { addProduct, addMultipleProducts, deleteProductByID, getProducts, updateProductByID, getProductByCategory, getProductById } from "../controller/productController";
import authenticate from "../middlewares/authMiddleware";

const product = Router();

product.get('/', getProducts);

product.get('/:category', getProductByCategory);

product.get('/:category', getProductById);

product.post('/add', authenticate, addProduct);

product.post('/add/multiple', authenticate, addMultipleProducts);

product.put('/:id', authenticate, updateProductByID);

product.delete('/:id', authenticate, deleteProductByID);

export default product