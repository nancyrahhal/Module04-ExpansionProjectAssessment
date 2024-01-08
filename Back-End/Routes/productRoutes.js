import express from "express";
import productControllers from "../Controllers/productControllers.js";
import protect from "../Middlewares/authentication.js";

const productRouter = express.Router();

//Create A New Product
productRouter.post("/:userId", productControllers.createProduct);

//get All products
productRouter.get("/", productControllers.getProducts);

//get product by id
productRouter.get("/:d", productControllers.getProductById);

//edit product
productRouter.patch("/:id", protect, productControllers.updateProduct);

//delete product
productRouter.delete("/:id", protect, productControllers.deleteProduct);

export default productRouter;
