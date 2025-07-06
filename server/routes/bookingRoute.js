import express from "express";
import { cancelBooking, createBooking } from "../controllers/bookingController.js";
import { isAuth } from "../middleware/isAuth.js";



let bookingRouter = express.Router();

bookingRouter.post("/create/:id", isAuth,createBooking)
bookingRouter.post("/cancel/:id",cancelBooking)

export default bookingRouter