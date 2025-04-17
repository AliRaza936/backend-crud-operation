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


export { createCategory,getAllCategory ,deleteCategory,updateCategory,getSingleCategory};
