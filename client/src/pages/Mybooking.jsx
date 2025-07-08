import React, { useContext, useEffect, useState } from "react";
import { bookingDataContext } from "../context/BookingContext";
import { useNavigate } from "react-router-dom";
import { listingDataContext } from "../context/ListingContext";
import { getUserContext } from "../context/UserContext";
import { FaArrowLeft } from "react-icons/fa6";
import Card from "../components/Card";
import { RxCross1 } from "react-icons/rx";

const Mybooking = () => {
  const { userData, setUserData } = useContext(getUserContext);

  const navigate = useNavigate();
  const { getListing } = useContext(listingDataContext);
  const { bookedData, setBookedData } = useContext(listingDataContext);
  const { listing } = useContext(listingDataContext);
  let [popup, setPopup] = useState(false);
  
  const { handleCancel } = useContext(bookingDataContext);


  const { getBookedListingData } = useContext(bookingDataContext);


  return (
    <div className="myBookings">
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
          <span onClick={() => navigate("/")}>Click here</span> to book a
          property
        </p>
      ) : (
        <div className="cardbox">
          {listing.map((list) => {
            if(userData._id === list.guest)
            {return <div className="booked-cards">
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
              <button
                type="submit"
                id="submit"
                onClick={(e) => {
                  setPopup(!popup);
                  e.preventDefault();
                }}
              >
                Cancel Booking
              </button>



              {popup && (
                <div className="popup">
                  <RxCross1
                    onClick={() => setPopup(!popup)}
                    className="cross-booking"
                  />

                  <div className="pop-cancelBooking">
                    <h3>Are you sure want to Cancel Booking ?</h3>
                    <div className="btns">
                      <button
                        className="card-page-btn"
                        onClick={() => {
                          window.location.reload()
                          handleCancel(list._id);
                        }}
                      >
                        Yes
                      </button>
                      <button
                        className="card-page-btn"
                        onClick={() => setPopup(!popup)}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>;}
          })}
        </div>
      )}

      {/* The ultimate popup */}
    </div>
  );
};

export default Mybooking;
