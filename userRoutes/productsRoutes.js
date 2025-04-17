import express from 'express'

import { isAdmin, isAuthorized } from '../authMiddlewares/authMiddleWares.js'
import { createProduct, deleteProducts, getAllProducts, getSingleProduct, updateSingleProduct } from '../userController/productsController.js'
import { upload } from '../authMiddlewares/multerMiddleware.js'


let productRoutes = express.Router()

productRoutes.post("/",upload.single("picture"),isAuthorized,isAdmin,createProduct)

productRoutes.get("/",getAllProducts)

productRoutes.get("/:productId",getSingleProduct)

productRoutes.put("/:productId",upload.single("picture"),updateSingleProduct)

productRoutes.delete("/:productId",isAuthorized,isAdmin,deleteProducts)

 export default productRoutes