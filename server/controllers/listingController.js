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
    if(!listing)
      res.status(400).json({message: 'listing not found'})
  } catch (err) {
    res.status(500).json({message: ` unable to find listings at the moment : ${err}`})
  }
}


export const findListing = async (req,res) => {
  try {
    let {id} = req.params
    let listing = await Listing.findById(id)
    if(!listing){
      return res.status(404).json({message:"not found"})
    }
    return res.status(200).json(listing);
  } catch (err) {
    return res.status(500).json({message:` erro : ${err}`})
  }
}


export const updateListing = async (req,res)=>{
  try {
    let image1;
    let image2;
    let image3;
    let {id} = req.params; 
    let { title, description, rent, city, landmark, category } = req.body;
    if(req.files.image1) {image1 = await uploadOnCloudinary(req.files.image1[0].path);}
    if(req.files.image2) {image2 = await uploadOnCloudinary(req.files.image2[0].path);}
    if(req.files.image3) {image3 = await uploadOnCloudinary(req.files.image3[0].path);}
 
    let listing = await Listing.findByIdAndUpdate(id,{
      title,
      description,
      rent,
      city,
      landmark,
      category,
      image1,
      image2,
      image3,
  
    }, {new:true});

    return res.status(201).json(listing)
  } catch (err) {
    return res.status(500).json({message: `update error : ${err}`})
  }
}

export const deleteListing = async (req,res) =>{
  try {
    let {id} = req.params;
    let listing = await Listing.findByIdAndDelete(id)
    let user = await Client.findByIdAndUpdate(listing.host,{$pull:{listing:listing._id}},{new:true})
    if(!user){
      return res.status(400).json({message:'user not found'})
    }
    return res.status(200).json({message:`Listing deleted for user : ${user}`})
  } catch (err) {
    return res.status(500).json({message:`delete listing err :  ${err}`})
  }
}