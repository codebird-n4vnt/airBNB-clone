import generateToken from "../config/token.js";
import Client from "../models/userModel.js";
import bcrypt from 'bcrypt'
export const signUp = async (req, res) => {
  try {
    console.log(req.body)
    let { name, email, password } = req.body;
    let existUser = await Client.findOne({ email });
    console.log(existUser)
    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    let hashPassword = await bcrypt.hash(password, 10);
    let user = await Client.create({ name, email, password: hashPassword });
    let token = generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: (process.env.NODE_ENVIRONMENT === "production"),
      // sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, //7 days is written in ms
    });
    return res.status(201).json(user);
  } catch (err) {
    return res.status(500).json({ message: `signup error ${err}` });
  }
};


export const login = async (req,res) =>{
  try {
    let { email, password } = req.body;
    let existUser = await Client.findOne({ email }).populate("listing","title image1 image2 image3 description city landmark category rent");
    console.log(existUser)
    if (!existUser) {
      
      return res.status(400).json({ message: "User not found. Please signup First" });
    }
    
    // const existingUser = await Client.findOne({password:existUser.password})
    let isMatch = await bcrypt.compare(password, existUser.password)
    if(!isMatch){return res.status(400).json({ message: "Password incorrect" });}
    let token = generateToken(existUser._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: (process.env.NODE_ENVIRONMENT === "production"),
      // sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, //7 days is written in milisecond
    });
    return res.status(201).json(existUser);
  } catch (err) {
    
    return res.status(500).json({ message: `login error ${err}` });
  }
}

export const logout = async (req, res) =>{
try {
    // res.clearCookie("token",{httpOnly: true,
    //   secure: false,
    //   sameSite: "strict",
       
    //   });  
    res.cookie("token", null, {
      httpOnly: true,
      secure: false,
      // sameSite: "strict",
      expires: new Date(0),
    });
    console.log("cookie cleared")
    return res.status(202).json({message: "Logged out successfully"});
  } catch (err) {
    return res.status(500).json({ message: `logout error ${err}` });
  }
}