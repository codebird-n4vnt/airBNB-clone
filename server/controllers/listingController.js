import uploadOnCloudinary from "../config/cloudinary.js";
import Listing from "../models/listingModel.js";
import Client from "../models/userModel.js"

export const addListing = async (req, res) => {
  try {
    let host = req.userId; // that means we must run isAuth middleware while making route for this
    let { title, description, rent, city, landmark, category } = req.body;
    let image1 = await uploadOnCloudinary(req.files.image1[0].path);
    let image2 = await uploadOnCloudinary(req.files.image2[0].path);
    let image3 = await uploadOnCloudinary(req.files.image3[0].path);

    let listing = await Listing.create({
      title,
      description,
      rent,
      city,
      landmark,
      category,
      image1,
      image2,
      image3,
      host,
    });
    console.log(listing)
    let user = await Client.findByIdAndUpdate(host, {$push:{listing:listing._id}},{new:true} )
    if(!user){
        res.status(400).json({message:"Please login first to use this feature"})
    }
    res.status(201).json(listing)
  } catch (err) {
    res.status(500).json({message:`AddListing error ${err}`})
  }
};



export const getListing = async (req,res) => {
  try {
    let listing = await Listing.find().sort({createdAt:-1});
    res.status(200).json(listing)
  } catch (err) {
    res.status(500).json({message: ` unable to find listings at the moment : ${err}`})
  }
}


export const findListing = async (req,res) => {
  try {
    let {id} = req.params
    let listing = await Listing.findById(id)
    if(!listing){
      res.status(404).json({message:"not found"})
    }
    res.status(200).json(listing);
  } catch (err) {
    res.status(500).json({message:` erro : ${err}`})
  }
}