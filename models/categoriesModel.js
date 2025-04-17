import mongoose from "mongoose";

let categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        unique : true,
        trim:true,
        lowercase:true
    },
    slug:{
        type:String,
        required: true,
        lowercase : true,
        trim : true,
        unique : true,
    },
  
},{timestamps:true})

export default mongoose.model("Category",categorySchema)