import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'


   // Configuration
   cloudinary.config({ 
    cloud_name: '', // cloud name from cloudinary
    api_key: '', // api key from cloudinary
    api_secret: '' // Click 'View API Keys' above to copy your API secret from cloudinary
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