import User from "../models/user.model.js";
import jwt, { decode } from "jsonwebtoken";
import { redis } from "../lib/redis.js";

const generateTokens = (userId) =>{
    const accessToken = jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: "15m",
    });

    const refreshToken = jwt.sign({userId}, process.env.REFRESH_TOKEN_SECRET,{
        expiresIn: "7d",
    });

    return {accessToken, refreshToken }

};

const storeRefreshToken = async (userId, refreshToken) => {
	await redis.set(`refresh_token:${userId}`, refreshToken, "EX", 7 * 24 * 60 * 60); // 7days
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
};


export const signup = async (req, res)=>{
    const { name, email, password } = req.body;
    try{
        const userExists = await User.findOne({email});
        if(userExists){
            res.status(400).json({message:"User Already"});
        }

        const user = await User.create({ name, email, password });

        // authenticate
		const { accessToken, refreshToken } = generateTokens(user._id); //tokens
		await storeRefreshToken(user._id, refreshToken);  //stored in Redis/DB
		setCookies(res, accessToken, refreshToken);  // cookies

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
};

export const login = async (req,res)=>{
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if(user && (await user.comparePassword(password))){

            const {accessToken, refreshToken} = generateTokens(user._id);
            await storeRefreshToken(user._id, refreshToken);
            setCookies(req, accessToken, refreshToken);

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            })

        } else {
            res.status(400).json({message:"Invalid email or password"});
        }


    } catch(error){
        console.log(`Error in login controller:${error.message}`);
        res.status(500).json({message:error.message});
    }
};

export const logout = async (req,res)=>{
    try{
        const {refreshToken} = req.cookies.refreshToken;
        if (refreshToken){
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            await redis.del(`refresh_token:${decoded.userId}`)
        }

        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.json({message: "Logged Out Successfully!"});

    } catch(error){
        console.log(`Error in Logout Controller: ${error.message}`);
        res.status(500).json({message:error.message});
    }
};

// refresh the access token
export const refreshToken = async (req, res) =>{
    try{
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken){
            return res.status(401).json({message: "No refresh token provided!"})
        }

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const storedToken = await redis.get(`refresh_token:${decoded.userId}`);

        if(storedToken !== refreshToken){
            return res.status(401).json({message:"Invalid Refresh token"})
        }

        const accessToken = jwt.sign({userId: decoded.userId},
            process.env.ACCESS_TOKEN_SECRET,{ expiresIn:"15m" });

        res.cookie("accessToken", accessToken, {
            maxAge: 15*60*1000, //15minute
            httponly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        });
        res.json({message: "Token refreshed successfully"})

    } catch (error){
        console.log(`error in refreshToken Controller`,error.message);
        res.status(500).json({message:"Internal Server Error",error: error.message})
    }
};

export const getProfile = async (req, res) =>{
    try{
        res.json(req.user);
    } catch(error){
        res.status(500).json({message: "Server Error!",error: error.message})
    }
};