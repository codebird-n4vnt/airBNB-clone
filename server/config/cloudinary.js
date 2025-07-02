import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'

const uploadOnCloudinary = async (filepath) =>{
     cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.CLOUD_API_KEY, 
        api_secret: process.env.CLOUD_API_SECRET
        });
    try {
        if(!filepath){
            return null
        }
        const uploadResult = await cloudinary.uploader.upload(filepath)
        fs.unlinkSync(filepath) // deletes the file stored in local storage and simultaneously uploads the file on cloudinary
        return uploadResult.secure_url
    } catch (err) {
        fs.unlinkSync(filepath)
        console.log(err)
    }
}


export default uploadOnCloudinary