import userModel from "../models/model.js"
import jwt from 'jsonwebtoken'


let isAuthorized = async(req,res,next)=>{
        try {
            let {token} = req.cookies;
            if(!token){
                return res.status(401).send({success:false,message:"First login to access this resource"})
            }
            let decodeToken  =jwt.verify(token,process.env.JTW_SECRET)
            req.user = await userModel.findById(decodeToken.id);
            next()
        } catch (error) {
            return res.status(401).send({success:false,message:"Error in isAuthorized middleware"})
        }
}
let isAdmin = async(req,res,next)=>{
        try {
         let user = req.user
         if(!user || user.role !== 1){
            return res.status(401).send({success:false,message:"You are not authorized to access this resource"})

         }
         next()
        } catch (error) {
            return res.status(401).send({success:false,message:"Error in isAdmin middleware"})
        }   
}




export  {isAuthorized,isAdmin}