import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'


   // Configuration
   cloudinary.config({ 
    cloud_name: 'dowtim7oo', 
    api_key: '736422854727569', 
    api_secret: 'tHWB1ptjNNk_2yhJT6yTSbs35S4' // Click 'View API Keys' above to copy your API secret
});

let uploadImageOnCloudnary  = async (filePath,floderName)=>{
    try {
        let result = await cloudinary.uploader.upload(filePath,{
            folder:floderName
        });
        try {
            fs.unlinkSync(filePath);
        } catch (error) {
            console.log("Failed to delete image from server",error)
        }
        // console.log(result)
        return{
            secure_url : result.secure_url,
            public_id : result.public_id
        }
    } catch (error) {
        throw new Error(error)
    }
}
let deleteImageFromCloudnary = async(public_id)=>{
    try {
        let result = await cloudinary.uploader.destroy(public_id)
        return result 
    } catch (error) {
        throw new Error(error)
    }
}
export { uploadImageOnCloudnary,deleteImageFromCloudnary}