import { encryptPassword, matchPassword } from "../helper/userHelper.js";
import categoryModel from "../models/categoriesModel.js";
// import jwt from "jsonwebtoken";
import slugify from 'slugify'

let getAllCategory = async function (req, res) {
  try {
    

    let categories = await categoryModel.find({});
    return res
      .status(201)
      .send({ success: true, message: "Category fetched successfully", categories });
  } catch (error) {
    res.status(500).send({ success: false, message: "Error in getAllCategory" });
  }
};
let deleteCategory = async function (req, res) {
  try {
    let {slug} = req.params

    let category = await categoryModel.findOneAndDelete({slug});

    if(!category){
    return res.status(400).send({ success: false, message: "Category not found"});

    }
    return res
      .status(201)
      .send({ success: true, message: "Category deleted successfully" });
  } catch (error) {
   return res.status(500).send({ success: false, message: "Error in deleteCategory" });
  }
};
let createCategory = async function (req, res) {
  try {
    let { name } = req.body;
    if (!name ) {
      return res
        .status(400)
        .send({ success: false, message: "Name is required" });
    }
    let isExist = await categoryModel.findOne({ name });
    if (isExist) {
      return res
        .status(400)
        .send({ success: false, message: "Category is already Exist" });
    }
    

    let category = await categoryModel.create({ name ,slug:slugify(name,{lower:true, strict:true})});
    return res
      .status(201)
      .send({ success: true, message: "Category Created successfully", category });
  } catch (error) {
    console.log(`Error inn createCategory ${error}`)
   return res.status(500).send({ success: false, message: "Error in createCategory" });
  }
};
let getSingleCategory = async function (req, res) {
  try {
    let { slug } = req.params;
   

    let category = await categoryModel.findOne({slug});
    if(!category){
     return res.status(400).send({ success: false, message: "Category not found" });
  
      }
    return res
      .status(201)
      .send({ success: true, message: "Category fetched successfully", category });
  } catch (error) {
    return res.status(500).send({ success: false, message: "Error in getSingleCategory" });
  }
};

let updateCategory = async function (req, res) {
  try {
    let {slug} = req.params
    let{name} = req.body
    if (!name ) {
      return res
        .status(400)
        .send({ success: false, message: "Name is required" });
    }
    let category = await categoryModel.findOneAndUpdate({slug},{name , slug:slugify(name , {lowercase:true,strict:true})},{new:true});

    if(!category){
    return res.status(400).send({ success: false, message: "Category not found" });

    }
    return res
      .status(201)
      .send({ success: true, message: "Category updated successfully" });
  } catch (error) {
   return res.status(500).send({ success: false, message: "Error in updateCategory" });
  }
};

// let loginPage = async (req, res) => {
//   try {
//     let { email, password } = req.body;
//     if (!email || !password) {
//       return res
//         .status(400)
//         .send({ success: false, message: "All field required" });
//     }
//     let user = await userModel.findOne({ email });
//     if (!user) {
//       return res
//         .status(400)
//         .send({ success: false, message: "Email not registered" });
//     }

//     let match = await matchPassword(password, user.password);
//     if (!match) {
//       return res
//         .status(400)
//         .send({ success: false, message: "Incorrect Email/Password" });
//     }

//     let token = await jwt.sign({ id: user._id }, process.env.JTW_SECRET, {
//       expiresIn: process.env.JWT_EXPIRE,
//     });

//     user.password = undefined;
//     return res
//       .cookie("token", token, { httpOnly: true, secure: true })
//       .status(201)
//       .send({ success: true, message: "User Login successfully", user, token });
//   } catch (error) {
//     res
//       .status(500)
//       .send({ success: false, message: "Error in loginPage controller" });
//   }

// };
// let logoutPage = (req, res) => {
//   return res
//     .cookie("token", "", {
//       httpOnly: true,
//       secure: true,
//       expires: new Date(0),
//     })
//     .status(201)
//     .send({ success: true, message: "User Logout successfully" });
// };

// let allUsers = async function(req,res){
//     try {

//         let user = await userModel.find({}).select("-password")
//        return res.status(201).send({success:true,total:user.length,user})
//     } catch (error) {
//         res.status(400).send({success:false,message:"Error in getAllUser"})

//     }
//  }
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
export { createCategory,getAllCategory ,deleteCategory,updateCategory,getSingleCategory};
