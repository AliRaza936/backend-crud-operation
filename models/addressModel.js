import mongoose from "mongoose";

let addressSchema = new mongoose.Schema({
    country:{
        type:String,
        required: true,
        trim:true,
        lowercase:true
    },
    name:{
        type:String,
        required: true,
        lowercase : true,
        trim : true,
        
    },
    phone:{
        type:Number,
        required: true,
        trim : true,
        
    },
    address:{
        type:String,
        required: true,
        trim : true,
        lowercase : true
        
    },
    city:{
        type:String,
        required: true,
        trim : true,
        lowercase : true
        
    },
    state:{
        type:String,
        required: true,
        trim : true,
        lowercase : true
        
    },
    zip:{
        type:Number,
        required: true,
        trim : true,
       
        
    },
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required : true,
    },
  
},{timestamps:true})

export default mongoose.model("Address",addressSchema)