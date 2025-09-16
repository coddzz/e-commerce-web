import express from express;
import { getCartProducts } from "../controllers/cart.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js"

const router = express.Router();


router.get("/", protectRoute, getCartProducts);


export default router;