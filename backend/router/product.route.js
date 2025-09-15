import express from "express";
import { protectRoute, adminRoute } from "../middlewares/auth.middleware.js";
import { createProduct, 
    deleteProduct, 
    getAllProducts, 
    getFeaturedProducts, 
    getProductsByCategory, 
    getRecommendedProducts, 
    toggleFeaturedProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllProducts);
router.get("/featured", getFeaturedProducts);
router.post("/", protectRoute, adminRoute, createProduct);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);
router.get("/recommendations", getRecommendedProducts);
router.get("/category/:category", getProductsByCategory);
router.patch("/:id", protectRoute, adminRoute, toggleFeaturedProduct);


export default router;