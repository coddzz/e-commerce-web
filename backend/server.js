import express from "express";
import dotenv from "dotenv";
import authUser from "./router/auth.route.js"
import { connectDB } from "./lib/db.js";

const app = express();
dotenv.config()
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", authUser);

app.get("/", (req, res)=>{
    res.send("hello World! e-commerce")
})

app.listen(PORT, ()=>{
    console.log(`Server Running On PORT: ${PORT}`)
    connectDB();
})
