import express from "express";
import dotenv from "dotenv";
import authUser from "./router/auth.route.js"
import productRoute from "./router/product.route.js"
import { connectDB } from "./lib/db.js";

const app = express();
dotenv.config()
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authUser);
app.use("/api/products", productRoute);


app.listen(PORT, ()=>{
    console.log(`Server Running On PORT: ${PORT}`)
    connectDB();
})
