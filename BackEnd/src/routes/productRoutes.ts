import { Router } from "express";
import { addProduct, addMultipleProducts, deleteProductByID, getProducts, updateProductByID } from "../controller/productController";
import authenticate from "../middlewares/authMiddleware";

const product = Router();

product.get('/', getProducts);

product.post('/add-product', authenticate, addProduct);

product.post('/add-basket', authenticate, addMultipleProducts);

product.put('/:id', authenticate, updateProductByID);

product.delete('/:id', authenticate, deleteProductByID);

export default product