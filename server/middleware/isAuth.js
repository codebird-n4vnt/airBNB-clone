import jwt from "jsonwebtoken";

export const isAuth = (req, res, next) => {
  try {
    let { token } = req.cookies;
    if (!token) {

      return res.status(400).json({ message: "isAuth err User doesn't exist" });
    }
    let verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifiedUser) {
      return res.status(400).json({ message: "isauth err : User not verified" });
    }
    req.userId = verifiedUser.userId;

    next();
  } catch (err) {
    res.status(500).json(err);
  }
};
