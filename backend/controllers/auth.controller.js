import User from "../models/user.model.js"

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