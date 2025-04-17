import express from 'express'
// import colors from 'colors'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import morgan from 'morgan'
// import userRoutes from './userRoutes/userRoutes.js'
import userRoutes from './userRoutes/userRoutes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import categoriesRoutes from './userRoutes/categoriesRoutes.js'
import productRoutes from './userRoutes/productsRoutes.js'
import addressRoutes from './userRoutes/addressRoutes.js'
dotenv.config()
let app = express()
app.use(cors({origin:"http://localhost:5173",credentials:true}))

app.use(cookieParser())
app.use(express.json())
app.use(morgan("dev"))

connectDB()
app.use("/users",userRoutes)
app.use("/categories",categoriesRoutes)
app.use("/products",productRoutes)
app.use("/address",addressRoutes)

let PORT = process.env.PORT || 5000 
app.listen(PORT,()=>{console.log(`Server is running at ${PORT} port`.blue)})