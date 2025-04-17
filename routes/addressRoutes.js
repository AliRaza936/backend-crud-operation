import express from 'express'
// import { allUsers, createUser, loginPage, logoutPage, } from '../userController/userController.js'
import { isAdmin, isAuthorized } from '../authMiddlewares/authMiddleWares.js'
import { addAddress, deleteAddress, getAddress, getSingleAddress, updateAddress } from '../controller/addressController.js'

let addressRoutes = express.Router()

addressRoutes.post("/",isAuthorized,addAddress)

addressRoutes.get("/:addressId",getSingleAddress)

addressRoutes.get("/",isAuthorized,getAddress)
addressRoutes.delete("/:addressId",isAuthorized,deleteAddress)
addressRoutes.put("/:addressId",updateAddress)
 export default addressRoutes