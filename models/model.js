import mongoose from "mongoose";

let userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
        unique:true,
        trim:true,
        lowercase:true,
    },
    password:{
        type:String,
        required: true,
    },
    role:{
        type:Number,
        default:0,
    }
},{timestamps:true})

export default mongoose.model("User",userSchema)