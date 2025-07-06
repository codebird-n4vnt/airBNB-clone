import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors'

import express from 'express';
import connectWithDB from "./config/db.js"
import userRoutes from './routes/userRoutes.js'

import cookieParser from 'cookie-parser';
import authenticatedUserRoutes from './routes/authenticatedUserRoutes.js';
import listingRouter from './routes/listingRoute.js';
import bookingRouter from './routes/bookingRoute.js';

const app = express();
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(cookieParser())
app.use(express.json())


app.use("/api/auth", userRoutes)
app.use("/api/user", authenticatedUserRoutes)
app.use("/api/listing", listingRouter)
app.use("/api/booking", bookingRouter)


app.listen(process.env.PORT,()=>{
    connectWithDB();
    console.log("app is listening on port 8000")
    console.log(process.env.DB_URL)
})