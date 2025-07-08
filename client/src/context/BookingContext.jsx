import React, { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./AuthContext";
import { getUserContext } from "./UserContext";
import { listingDataContext } from "./ListingContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const bookingDataContext = createContext();
const BookingContext = ({ children }) => {
  let [checkIn, setCheckIn] = useState("");
  let [checkOut, setCheckOut] = useState("");
  let [total, setTotal] = useState(0);
  let [night, setNight] = useState("");
  const { serverUrl } = useContext(authDataContext);
  let { getUserData, userData } = useContext(getUserContext);
  let { getListing, listing } = useContext(listingDataContext);
  let [bookingData, setBookingData] = useState([]);
  let [bookedListing, setBookedListing] = useState([]);

  const navigate = useNavigate();

  const handleBooking = async (id) => {
    try {
      let result = await axios.post(
        serverUrl + `/api/booking/create/${id}`,
        {
          checkIn,
          checkOut,
          totalRent: total,
        },
        { withCredentials: true }
      );
      await getUserData();
      await getListing();
      setBookingData(result.data);
      console.log(result.data);
      toast.success("Booking successful")
    } catch (err) {
      toast.error(err.response.data.message)
      console.log(err);
      setBookingData(null);
    }
  };

  const handleCancel = async (id) => {
    try {
      let result = await axios.post(serverUrl + `/api/booking/cancel/${id}`, {
        withCredentials: true,
      });
      console.log(result);
      toast.success("Booking cancelled successfully")
    } catch (err) {
      toast.error(err.response.data.message)
      console.log(err);
    }
  };

  let value = {
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    total,
    setTotal,
    night,
    setNight,
    bookingData,
    setBookingData,
    handleBooking,
    handleCancel,
  };

  return (
    <>
      <bookingDataContext.Provider value={value}>
        {children}
      </bookingDataContext.Provider>
    </>
  );
};

export default BookingContext;
