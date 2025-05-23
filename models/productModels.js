import mongoose, { trusted } from "mongoose";

let productSchema = new mongoose.Schema({


    title:{
        type:String,
        required: true,
       trim:true,
       lowercase:true
    },
    description:{
        type:String,
        required: true,
       
    },
    category :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required : true,
    },
    price:{
        type : Number,
        required : true,
    },
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required : true,
    },
    picture:{
        secure_url:{
            type:String,
            required : true
        },
        public_id:{
            type:String,
            required:true,
            
        },
    
    }
  
},{timestamps:true})

export default mongoose.model("Product",productSchema)