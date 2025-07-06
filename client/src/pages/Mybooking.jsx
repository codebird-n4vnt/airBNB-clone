import React, { useContext, useEffect, useState } from "react";
import { bookingDataContext } from "../context/BookingContext";
import { useNavigate } from "react-router-dom";
import { listingDataContext } from "../context/ListingContext";
import { getUserContext } from "../context/UserContext";
import { FaArrowLeft } from "react-icons/fa6";
import Card from "../components/Card";

const Mybooking = () => {
  const { userData, setUserData } = useContext(getUserContext);

  const navigate = useNavigate();
  const { getListing } = useContext(listingDataContext);
  const { bookingData } = useContext(bookingDataContext);
  const { listing } = useContext(listingDataContext);
  let [bookedData,setBookedData] = useState([])
  const {handleCancel} = useContext(bookingDataContext);


  const { getBookedListingData } = useContext(bookingDataContext);
  useEffect(() => {
    setBookedData(
      listing.filter((list) => list.isBooked == true && list.guest === userData._id)
    );
    console.log(listing[0].isBooked);
  }, []);


  return (
    <>
      <span
        className="back-btn"
        onClick={() => {
          navigate("/");
        }}
      >
        <FaArrowLeft className="arrow" />
      </span>
      <h1>My Bookings </h1>
      {userData.booking.length == 0 ? (
        <p className="no-listing">
          Nothing to show here <br />{" "}
          <span onClick={() => navigate("/")}>Click here</span> to
          book a property
        </p>
      ) : (
        <div className="cardbox">
          {bookedData.map((list) => (
            <div className="booked-cards">
            <Card
              title={list.title}
              description={list.description}
              category={list.category}
              city={list.city}
              landmark={list.landmark}
              image1={list.image1}
              image2={list.image2}
              image3={list.image3}
              rent={list.rent}
              id={list._id}
              ratings={list.ratings}
              key={list._id}
            />
            <button type="submit" id="submit" onClick={(e)=>{handleCancel(list._id);e.preventDefault()}}>Cancel Booking</button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Mybooking;
