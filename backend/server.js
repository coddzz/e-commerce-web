import express from "express";

const app = express();

app.get("/", (req, res)=>{
    res.send("hello World! e-commerce")
})

app.listen(5000, ()=>{
    console.log(`Server Running On PORT: 5000`)
})

