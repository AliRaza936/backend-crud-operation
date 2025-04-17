import express from 'express'
import { allUsers, createUser, loginPage, logoutPage, } from '../userController/userController.js'
import { isAdmin, isAuthorized } from '../authMiddlewares/authMiddleWares.js'


let userRoutes = express.Router()

userRoutes.post("/register",createUser)


userRoutes.post("/login",loginPage)

userRoutes.get("/logout",logoutPage)

userRoutes.get("/allUsers",isAuthorized,isAdmin,allUsers)
 export default userRoutes