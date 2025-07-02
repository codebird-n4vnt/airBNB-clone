import express from "express";
const authRouter = express.Router();
import { login, logout, signUp } from "../controllers/authController.js";

authRouter.post("/signup",signUp)
authRouter.post("/login",login)
authRouter.post('/logout', logout)

export default authRouter