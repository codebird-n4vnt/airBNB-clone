import jwt from "jsonwebtoken";

export const isAuth = (req, res, next) => {
  try {
    let { token } = req.cookies;
    if (!token) {
      res.status(201).json({ message: "User doesn't exist" });
    } else {
      let verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
      if (!verifiedUser) {
        res.status(400).json({ message: "User not veified" });
      }
      req.userId = verifiedUser.userId;
      
   
      next();
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
