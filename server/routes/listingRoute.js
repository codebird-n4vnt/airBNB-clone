import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import { addListing, findListing, getListing } from "../controllers/listingController.js";
import upload from "../middleware/multer.js";

let listingRouter = express.Router();

listingRouter.post(
  "/add",
  isAuth,
  upload.fields([  // to upload more than one file we use fields. For single file we use single
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),
  addListing
);


listingRouter.get('/get', getListing)
listingRouter.get('/findlistingbyid/:id',isAuth,findListing  )

export default listingRouter