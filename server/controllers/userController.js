
import Client from "../models/userModel.js"

export const getCurrentUser = async (req,res) =>{
    try {
        const user = await Client.findById(req.userId).select("-password").populate("listing","title image1 image2 image3 description city landmark category rent ratings isBooked guest").populate('booking','totalRent checkOut checkIn status listing guest host'); // populate makes listing's fields available //
        console.log(user)
        if(!user){
            // res.status(400).json({message:'User not found'})
            console.log('user not found')
        }
        else    
            res.status(200).json(user)
       
    } catch (error) {
        res.status(500).json({message:`getCurrentUser error ${error}`})
    }
    
}