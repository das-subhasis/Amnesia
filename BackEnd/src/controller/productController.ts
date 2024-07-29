import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import Product from "../models/productSchema";
import { ProductInterface } from "../models/userSchema";

// @route   GET /api/products
// @desc    Get all products
// @access  Public
const getProducts = expressAsyncHandler(async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const { product_name } = req.body;
        if (!id && !product_name) {
            const product = await Product.find();
            res.json(product);
        }
        if (!product_name) {
            const product = await Product.findById(id);
            res.json(product);
        }
        const product = await Product.find({ name: product_name });
        res.json(product);
    } catch (error) {
        res.status(500);
        throw new Error("Internal server error.")
    }
})

// @route   GET /api/products/:category
// @desc    Get a product by category
// @access  Public
const getProductByCategory = expressAsyncHandler(async (req: Request, res: Response) => {
    try {

        const category = req.params.category;
        const product = await Product.find({ category: category });
        if (!product) {
            res.status(404);
            throw new Error("Product not found.")
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500);
        throw new Error("Internal server error.")
    }
});

// @route   POST /api/products/add
// @desc    Create a new product
// @access  Private 
const addProduct = expressAsyncHandler(async (req: Request, res: Response) => {
    try {
        const { name, description, category, price, quantity, imageUrl } = req.body;
        const product = await Product.create({ name, description, category, price: price, quantity, imageUrl });
        res.json(product);
    } catch (error) {
        res.status(500);
        console.log(error);
        throw new Error("Internal server error.")
    }

})

// @route   POST /api/products/add/multiple
// @desc    Add multiple new products
// @access  Private 
const addMultipleProducts = expressAsyncHandler(async (req: Request, res: Response) => {
    const { products } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
        res.status(400);
        throw new Error("No products provided");
    }

    try {
        const validProducts = products.map((product: ProductInterface) => ({
            name: product.name || 'Unknown product',
            description: product.description || '...',
            category: product.category || 'Unknown category',
            price: product.price || 0,
            quantity: product.quantity || 0,
            imageUrl: product.imageUrl || "https://res.cloudinary.com/blackfroth/image/upload/v1720947354/image-not-found_cb2fey.jpg"
        }));

        const result = await Product.insertMany(validProducts);
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500);
        throw new Error("Internal server error.");
    }

})

// @route   DELETE /api/products/:id
// @desc    Delete a product by ID
// @access  Private
const deleteProductByID = expressAsyncHandler(async (req: Request, res: Response) => {
    try {
        const product = Product.findByIdAndDelete(req.params.id);
        if (!product) {
            res.status(404);
            throw new Error("Product not found.")
        }
        res.json(product);
    } catch (error) {
        console.log(error);
        res.status(500);
        throw new Error("Internal server error.");
    }
})

// @route   PUT /api/products/:id
// @desc    Update a product by ID
// @access  Private
const updateProductByID = expressAsyncHandler(async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const product = await Product.findByIdAndUpdate(req.params.id, { $set: data }, { new: true });
        if (!product) {
            res.status(404);
            throw new Error("Product not found.")
        }
        res.json(product);
    } catch (error) {
        console.log(error);
        res.status(500);
        throw new Error("Internal server error.")
    }
})

export { getProducts, getProductByCategory, addProduct, deleteProductByID, updateProductByID, addMultipleProducts }