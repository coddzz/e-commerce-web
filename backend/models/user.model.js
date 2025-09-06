import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    //name, email, password, cartItems, admin/user

    name : {
        type: String,
        required: [true, "Name is required"],
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password:{
        type: String,
        required: [true, "Password is required"],
        minlength: [6,"Password must be at least 6 letters!"]
    },
    cartItems: [{

        product:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        quantity: {
            type: Number,
            default: 1,
        },
    }],
    role:{
        type: String,
        enum: [ "customer","admin"],
        default:"customer",
    }
    
},{
    timestamps:true,
})

const user =  mongoose.model("User", userSchema)
export default user;