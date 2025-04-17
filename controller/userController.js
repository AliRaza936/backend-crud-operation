import { encryptPassword, matchPassword } from "../helper/userHelper.js";
import userModel from "../models/model.js";
import jwt from "jsonwebtoken";

let createUser = async function (req, res) {
  try {
    let { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .send({ success: false, message: "All field required" });
    }
    let isExist = await userModel.findOne({ email });
    if (isExist) {
      return res
        .status(400)
        .send({ success: false, message: "Email is already exist" });
    }
    let hashPassword = await encryptPassword(password);

    let user = await userModel.create({ name, email, password: hashPassword });
    return res
      .status(201)
      .send({ success: true, message: "User Create successfully", user });
  } catch (error) {
    res.status(500).send({ success: false, message: "Error in createUser" });
  }
};

let loginPage = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .send({ success: false, message: "All field required" });
    }
    let user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: "Email not registered" });
    }

    let match = await matchPassword(password, user.password);
    if (!match) {
      return res
        .status(400)
        .send({ success: false, message: "Incorrect Email/Password" });
    }

    let token = await jwt.sign({ id: user._id }, process.env.JTW_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    user.password = undefined;
    return res
      .cookie("token", token, { httpOnly: true, secure: true })
      .status(201)
      .send({ success: true, message: "User Login successfully", user, token });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Error in loginPage controller" });
  }

};
let logoutPage = (req, res) => {
  return res
    .cookie("token", "", {
      httpOnly: true, 
      secure: true,
      expires: new Date(0),
    })
    .status(201)
    .send({ success: true, message: "User Logout successfully" });
};

let allUsers = async function(req,res){
    try {

        let user = await userModel.find({}).select("-password")
       return res.status(201).send({success:true,total:user.length,user})
    } catch (error) {
        res.status(400).send({success:false,message:"Error in getAllUser"})

    }
 }
// let deleteUser = async function(req,res){
//     try {
//        let {userId} = req.params

//         let user = await userModel.findByIdAndDelete(userId)
//         if(!user){
//            return res.status(400).send({success:false,message:"User not found"})

//         }
//          res.status(200).send({success:true,message:"User delete successfully",user})
//     } catch (error) {
//         res.status(400).send({success:false,message:"Error in deleteUser"})

//     }
//  }
// let getUserById = async function(req,res){
//     try {
//         let { userId } = req.params
//          // delete users from data
//         let user = await userModel.findById(userId)
//         if(!user){
//             return res.status(400).send({success:false,message:"User not exist"})

//     }
//     res.status(200).send({success:true,message:"User update successfully",user})

//        } catch (error) {

//         res.status(500).send({success:false,message:"Error in getUserById"})

//        }
//  }

// let updateUser = async function(req,res){
//     try {
//        let {userId} = req.params
//         let {name,email,password} = req.body
//         let user = await userModel.findById(userId)
//         if(!user){
//            return res.status(400).send({success:false,message:"User not found"})

//         }
//         if(name) user.name = name
//         if(email) user.email = email
//         if(password) user.password = password
//         await user.save()
//          res.status(200).send({success:true,message:"User update successfully",user})
//     } catch (error) {
//         res.status(400).send({success:false,message:"Error in updateUser"})

//     }
//  }
export { createUser, loginPage, logoutPage,allUsers };
