import mongoose from 'mongoose'
import colors from 'colors'
let connectDB = async()=>{
    try {
        let con = await mongoose.connect(`${process.env.MONGO_URL}`)
        console.log(`MongoDB connection with ${con.connection.host}`.yellow)
    } catch (error) {
        console.log(`Error in mongoDb Connection${error}`)
    }
}
export default connectDB