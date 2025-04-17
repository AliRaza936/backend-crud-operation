// import Model from '../models/productModels.js'
import {
  deleteImageFromCloudnary,
  uploadImageOnCloudnary,
} from "../helper/cloudnaryHelper.js";
import productModel from "../models/productModels.js";

let createProduct = async function (req, res) {
  try {
    let { title, description, category, price } = req.body;
    let picture = req.file?.fieldname;
    let picturePath = req.file?.path;
   

    if (
      !title ||
      !description ||
      !category ||
      !price ||
      !picture ||
      !picturePath
    ) {
      return res
        .status(400)
        .send({ success: true, message: "All Field Required" });
    }
    let { secure_url, public_id } = await uploadImageOnCloudnary(
      picturePath,
      "products"
    );

    if (!secure_url) {
      return res.status(400).send({
        success: false,
        message: "Error while uploading image",
        error: secure_url,
      });
    }
    let product = await productModel.create({
      title,
      description,
      category,
      price,
      user:req.user._id,
     
      picture: {
        secure_url,
        public_id,
      },
    });
    return res.status(201).send({
      success: true,
      message: "Product uploaded successfully",
      product,
    });

    // console.log(req.file)
  } catch (error) {
    return res
      .status(400)
      .send({ success: false, message: "Error in createProduct", error });
    // console.log(error)
  }
};
let getAllProducts = async function (req, res) {
  try {
    let products = await productModel
      .find({})
      .populate("user", "name")
      .populate("category", "name");

    return res.status(201).send({
      success: true,
      total: products.length,
      message: "Product fetched successfully",
      products,
    });
  } catch (error) {
    return res
      .status(400)
      .send({ success: false, message: "Error in getAllProducts", error });
  }
};
let getSingleProduct = async function (req, res) {
  try {
    let { productId } = req.params;
    let product = await productModel
      .findById(productId)
      .populate("user", "name")
      .populate("category", "name");
    if (!product) {
      return res.status(400).send({
        success: false,

        message: "Product not found",
      });
    }

    return res.status(201).send({
      success: true,

      message: "Product detail fetched successfully",
      product,
    });
  } catch (error) {
    return res
      .status(400)
      .send({ success: false, message: "Error in getSingleProduct", error });
  }
};
let updateSingleProduct = async function (req, res) {
  try {
    let { productId } = req.params;

    let { title, description, category, price } = req.body;

    let picturePath = req.file?.path;

    
    let product = await productModel
    .findById(productId)
    
    if (!product) {
      return res.status(400).send({
        success: false,
        
        message: "Product not found",
      });
    }
    if(title) product.title = title
    if(description) product.description = description
    if(category) product.category = category
    if(price) product.price = price

    if(picturePath){
      let {secure_url,public_id} = await uploadImageOnCloudnary(
        picturePath,
        "products"
      )

      if(product.picture&& product.picture.public_id){
        await deleteImageFromCloudnary(product.picture.public_id)
      }
      product.picture = {
          secure_url,public_id
      }

    }
    await product.save()

    return res.status(201).send({
      success: true,  

      message: "Product update successfully",
      product,
    });
  } catch (error) {
    return res
      .status(400)
      .send({ success: false, message: "Error in getSingleProduct", error });
  }
};
let deleteProducts = async function (req, res) {
  try {
    let { productId } = req.params;
    let product = await productModel.findById(productId);
    if (!product) {
      return res.status(400).send({
        success: false,

        message: "Product not found",
      });
    }

    if (product.picture && product.picture.public_id) {
      await deleteImageFromCloudnary(product.picture.public_id);
    }
    // console.log(await deleteImageFromCloudnary(product.picture.public_id))
    await productModel.findByIdAndDelete(productId);
    return res.status(201).send({
      success: true,
      // total: product.length,
      message: "Product deleted successfully",
      product,
    });
  } catch (error) {
    return res
      .status(400)
      .send({ success: false, message: "Error in deleteProducts", error });
  }
};
export { createProduct, getAllProducts, deleteProducts, getSingleProduct ,updateSingleProduct};
