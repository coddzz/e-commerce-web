import User from "../models/user.model.js"
import jwt from "jsonwebtoken";

const generateTokens = (userId) =>{
    const accessToken = jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: "15m",
    });

    const refreshToken = jwt.sign({userId}, process.env.REFRESH_TOKEN_SECRET,{
        expiresIn: "7d",
    });

    return {accessToken, refreshToken }

};

const setCookies = (res, accessToken, refreshToken) =>{
    res.cookie("accessToken", accessToken, {
        maxAge: 15*60*1000, //15minutes.
        httponly: true,     // XSS attack, cross site scripting attack.
        sameSite: "scrict", // CSRF attacks, cross site forgery attack.
        secure: process.env.NODE_ENV === "production",
    })

    res.cookie("refreshToken", refreshToken, {
        maxAge: 7*24*60*60*1000, //7 days
        httponly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
    })



} 


export const signup = async (req, res)=>{
    const { name, email, password } = req.body;
    try{
        const userExists = await User.findOne({email});
        if(userExists){
            res.status(400).json({message:"User Already"});
        }

        const user = await User.create({ name, email, password })
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        });

    } catch(error){
        console.log(`Error in Signup Controller`,error.message)
        res.status(500).json({message:error.message})
    }
}