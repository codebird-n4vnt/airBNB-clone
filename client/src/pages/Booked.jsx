import React from "react";
import { useContext } from "react";
import { bookingDataContext } from "../context/BookingContext";
import { useState } from "react";
import { useEffect } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Star from "../components/Star";
import { listingDataContext } from "../context/ListingContext";

const Booked = () => {
  const { bookingData } = useContext(bookingDataContext);
  let [star, setStar] = useState(null);
  let [inDate, setIndate] = useState(null);
  let [outDate, setOutdate] = useState(null);
  let [hostName, setHostname] = useState("");
  let {rateListing} = useContext(listingDataContext)
  const navigate = useNavigate();
  //   console.log(bookingData.host);
    
  const handleStar = async (value) =>{
    setStar(value)
    console.log('You rated  ', star)
  }

  
  useEffect(() => {
    if (bookingData?.checkIn && bookingData?.checkOut) {
      setIndate(bookingData.checkIn.slice(0, 10));
      setOutdate(bookingData.checkOut.slice(0, 10));
    }
  }, [bookingData.checkIn]);
  useEffect(() => {
    if (bookingData?.host?.email) {
      setHostname(bookingData.host.name);
    }
  }, [bookingData.host]);
  return (
    <div className="booked-container">
      <div className="booked-box">
        <h2>
          <IoMdCheckmarkCircleOutline />
        </h2>
        <h3> Property Booked Successfully </h3>

        <div>
          <span>Booking id</span> <span>{bookingData._id}</span>
        </div>
        <div>
          <span>Host Details</span> <span>{hostName}</span>
        </div>
        <div>
          <span>CheckIn</span> <span>{inDate}</span>
        </div>
        <div>
          <span>CheckOut</span> <span>{outDate}</span>
        </div>
        <div>
          <span>Total Rent</span> <span>₹ {bookingData.totalRent}</span>
        </div>
      </div>
      <div className="rate-box">
        <h4>Ratings {star? `: ${star}` : ""} out of 5</h4>
        <Star onRate={handleStar}/>
        <button type="submit" className="card-page-btn" onClick={()=>rateListing(bookingData.listing)}>Submit</button>
      </div>
    </div>
  );
};

export default Booked;
