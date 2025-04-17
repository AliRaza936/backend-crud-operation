import express from 'express'
// import { allUsers, createUser, loginPage, logoutPage, } from '../userController/userController.js'
import { isAdmin, isAuthorized } from '../authMiddlewares/authMiddleWares.js'
import { createCategory, deleteCategory, getAllCategory, getSingleCategory, updateCategory } from '../controller/categoriesController.js'


let categoriesRoutes = express.Router()


categoriesRoutes.post("/",isAuthorized,isAdmin,createCategory)

categoriesRoutes.get("/",getAllCategory)

categoriesRoutes.delete("/:slug",isAuthorized,isAdmin,deleteCategory)

categoriesRoutes.get("/:slug",isAuthorized,isAdmin,getSingleCategory)

categoriesRoutes.put("/:slug",isAuthorized,isAdmin,updateCategory)

 export default categoriesRoutes