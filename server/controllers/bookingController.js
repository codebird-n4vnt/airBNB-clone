import Booking from "../models/bookingModel.js";
import Listing from "../models/listingModel.js";
import Client from "../models/userModel.js";
import mongoose from "mongoose";

export const createBooking = async (req, res) => {
  try {
    let { id } = req.params;
    let { checkIn, checkOut, totalRent } = req.body;

    let listing = await Listing.findById(id);
    if (!listing) {
      return res.status(402).json({ message: "Listing is not found" });
    }
    if (new Date(checkIn) >= new Date(checkOut)) {
      return res.status(400).json({ message: "invalid checkin/checkout date" });
    }
    if (listing.isBooked) {
      return res.status(400).json({ message: "Property is already booked" });
    }
    let booking = await Booking.create({
      checkIn,
      checkOut,
      totalRent,
      host: listing.host,
      guest: req.userId,
      listing: listing._id,
    });
    await booking.populate('host','email name')
    console.log(booking.host.email)
    let user = await Client.findByIdAndUpdate(
      req.userId,
      {
        $push: {
          booking: listing,
        },
      },
      { new: true }
    );
    
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    listing.guest = req.userId;
    listing.isBooked = true;
    await listing.save();
    return res.status(201).json(booking);
  } catch (err) {
    return res.status(500).json({ message: `Booking error : ${err}` });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id,{$set:{isBooked:false}});
    console.log(listing);
    if (!listing) {
      return res.status(400).json({ message: "Such booking not found" });
    }

    let booking = await Booking.findOne({listing:listing._id})
    let guest = await Client.findByIdAndUpdate(booking.guest, {
      $pull: { booking: new mongoose.Types.ObjectId(booking._id)},
    });
    console.log(guest);
    await Listing.findByIdAndUpdate(id, {
      $unset: { guest: 1},
    });
    await Booking.findByIdAndDelete(booking._id);
    if (!guest) {
      return res.status(400).json({ message: "such guest not found" });
    }
    return res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (err) {
    return res.status(500).json({ message: `cancelBooking err : ${err}` });
  }
};
