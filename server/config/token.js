import jwt from "jsonwebtoken"

const generateToken = (userId) =>{
    try{
       let token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:'7d'})
       return token
    }catch(err){console.log(err)}
}

export default generateToken