import express from "express";
const authenticatedUserRouter = express.Router();
import { getCurrentUser } from "../controllers/userController.js";
import { isAuth } from "../middleware/isAuth.js";

authenticatedUserRouter.get("/userdata",isAuth, getCurrentUser)

export default authenticatedUserRouter