import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { listingDataContext } from "../context/ListingContext";
import { getUserContext } from "../context/UserContext";
import { Navbar } from "../components/Navbar.jsx";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { LuSearch } from "react-icons/lu";
import { ImFire } from "react-icons/im";
import { PiBuildingsBold } from "react-icons/pi";
import { MdCatchingPokemon, MdOutlinePool } from "react-icons/md";
import { MdHomeWork } from "react-icons/md";
import { FaBed } from "react-icons/fa6";
import { GiWoodCabin } from "react-icons/gi";
import { BsShop } from "react-icons/bs";
import { MdOutlineBedroomParent } from "react-icons/md";
import { IoMdStarOutline } from "react-icons/io";

import { FaTreeCity } from "react-icons/fa6";
import axios from "axios";
import { authDataContext } from "../context/AuthContext.jsx";
import { bookingDataContext } from "../context/BookingContext.jsx";

const ViewCard = () => {
  const { serverUrl } = useContext(authDataContext);
  let { cardDetails } = useContext(listingDataContext);
  let { userData } = useContext(getUserContext);
  const [iAmHost, setIAmHost] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [updatePop, setUpdatePop] = useState(false);
  const [bookingPop, setBookingPop] = useState(false);
  const [mindate, setMindate] = useState("");

  let navigate = useNavigate();
  const {
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    total,
    setTotal,
    night,
    setNight,
    handleBooking,
  } = useContext(bookingDataContext);
  const {
    deleting,
    deleteListing,
    updating,
    category,
    setCategory,
    updateListing,
    addListing,
    title,
    setTitle,
    description,
    setDescription,
    landmark,
    setLandmark,
    city,
    setCity,
    rent,
    setRent,
    setBackEndImage1,
    setBackEndImage2,
    setBackEndImage3,
    backEndImage1,
    backEndImage2,
    backEndImage3,
    setFrontEndImage1,
    setFrontEndImage2,
    setFrontEndImage3,
  } = useContext(listingDataContext);
  const handleImage1 = (e) => {
    let file = e.target.files[0];
    if (!file) {
      return console.log(file);
    }
    console.log(file);
    setBackEndImage1(file);
  };
  const handleImage2 = (e) => {
    let file = e.target.files[0];
    if (!file) {
      return console.log(file);
    }
    console.log(file);
    setBackEndImage2(file);
  };
  const handleImage3 = (e) => {
    let file = e.target.files[0];
    if (!file) {
      return console.log(file);
    }
    console.log(file);
    setBackEndImage3(file);
  };
  function round(value, decimals) {
    return Number(Math.round(value + "e" + decimals) + "e-" + decimals).toFixed(
      decimals
    );
  }

  useEffect(() => {
    if (cardDetails.host === userData._id) {
      setIAmHost(true);
    }
    let today = new Date().toISOString().split("T")[0];
    setMindate(today);
  }, []);

  useEffect(() => {
    if ((checkIn, checkOut)) {
      let inDate = new Date(checkIn);
      let outDate = new Date(checkOut);
      let n = (outDate - inDate) / (24 * 60 * 60 * 1000);
      setNight(n);
      let airBNBCharge = 120 * n;
      let tax = cardDetails.rent * 0.07 * n;

      if (n > 0) {
        setTotal(cardDetails.rent * n + airBNBCharge + tax);
      } else {
        setTotal(0);
      }
    }
  }, [checkIn, checkOut]);

  useEffect(() => {
    if (cardDetails) {
      setTitle(cardDetails.title);
      setDescription(cardDetails.description);
      setCity(cardDetails.city);
      setLandmark(cardDetails.landmark);
      setRent(cardDetails.rent);
      setCategory(cardDetails.category);
    }
  }, []);
  return (
    <>
      <Navbar />
      <div className="viewcard-main">
        <div>
          {iAmHost && (
            <button
              className="card-page-btn"
              onClick={() => setUpdatePop(!updatePop)}
            >
              Edit property details
            </button>
          )}
          <h1 className="viewcard-main-header">
            {cardDetails.title.toUpperCase()} 
          </h1>
          <div className="pre">
            <div>
              <div className="pre-image-box1">
                <img src={cardDetails.image1} alt="" />
              </div>
              <div className="pre-image-box2">
                <img src={cardDetails.image2} alt="" />
                <img src={cardDetails.image3} alt="" />
              </div>
            </div>
          </div>
          <h2 className="viewcard-main-header">
            Entire {cardDetails.category} in{" "}
            {cardDetails.landmark.toUpperCase()},{" "}
            {cardDetails.city.toUpperCase()}
          </h2>
          <article className="card-page-article">
            <div>
              <p className="breakline"></p>
              <p className="extra-break"></p>
              <p className="extra-break"></p>
              <p>{`Hosted by ${cardDetails.host}`}</p>
              <p className="extra-break"></p>

              <p className="breakline"></p>

              <p>{`Category : ${cardDetails.category}`}</p>
            </div>
            <div>
              <p>Rent Rs. {cardDetails.rent}/day</p>
              <button
                className={iAmHost || cardDetails.isBooked ? "disabled" : "card-page-btn"}
                disabled={iAmHost || cardDetails.isBooked}
                onClick={() => setBookingPop(true)}
              >
                {!cardDetails.isBooked?"Reserve":"Booked"}
              </button>
            </div>
          </article>
          <p>{cardDetails.description}</p>
        </div>

        {/* Update listing page */}

        {updatePop && (
          <div className="sticky">
            <div className="updatelist-pop">
              <RxCross1
                onClick={() => setUpdatePop(!updatePop)}
                className="cross"
              />
              <form action="">
                <h3>Fill the details here</h3>
                <div>
                  <label htmlFor="">Title</label>
                  <input
                    type="text"
                    placeholder="Title..."
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  />
                </div>
                <div>
                  <label htmlFor="">Description</label>
                  <textarea
                    type="text"
                    placeholder="Description..."
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    className="description"
                  />
                </div>

                <div>
                  <label htmlFor="">City</label>
                  <input
                    type="text"
                    placeholder="City..."
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                  />
                </div>
                <div>
                  <label htmlFor="">Landmark</label>
                  <input
                    type="text"
                    placeholder="Landmark..."
                    onChange={(e) => setLandmark(e.target.value)}
                    value={landmark}
                  />
                </div>
                <div>
                  <label htmlFor="">Rent (in INR)</label>
                  <input
                    type="number"
                    placeholder="Rent..."
                    onChange={(e) => setRent(e.target.value)}
                    value={rent}
                  />
                </div>
                <p>
                  *If no new images are uploaded then old images will be
                  uploaded
                </p>
                <div>
                  <label htmlFor="">New Image 1</label>
                  <input
                    type="file"
                    name="image1"
                    placeholder="Add image 1..."
                    onChange={(e) => handleImage1(e)}
                  />
                </div>
                <div>
                  <label htmlFor="">New Image 2</label>
                  <input
                    type="file"
                    name="image2"
                    placeholder="Add image 2..."
                    onChange={(e) => handleImage2(e)}
                  />
                </div>
                <div>
                  <label htmlFor="">New Image 3</label>
                  <input
                    type="file"
                    name="image3"
                    placeholder="Add image 3..."
                    onChange={(e) => handleImage3(e)}
                  />
                </div>

                <div className="category">
                  <h1>Choose Category</h1>
                  <div>
                    <span
                      onClick={() => {
                        setCategory("Villa");
                      }}
                      className={category == "Villa" ? "category-clicked" : ""}
                    >
                      <PiBuildingsBold />
                      <p>Villa</p>
                    </span>
                    <span
                      onClick={() => {
                        setCategory("Farm House");
                      }}
                      className={
                        category == "Farm House" ? "category-clicked" : ""
                      }
                    >
                      <FaTreeCity />
                      <p>Farm House</p>
                    </span>
                    <span
                      onClick={() => {
                        setCategory("Pool House");
                      }}
                      className={
                        category == "Pool House" ? "category-clicked" : ""
                      }
                    >
                      <MdOutlinePool />
                      <p>Pool House</p>
                    </span>
                    <span
                      onClick={() => {
                        setCategory("Room");
                      }}
                      className={category == "Room" ? "category-clicked" : ""}
                    >
                      <MdOutlineBedroomParent />
                      <p>Room</p>
                    </span>
                    <span
                      onClick={() => {
                        setCategory("Flat");
                      }}
                      className={category == "Flat" ? "category-clicked" : ""}
                    >
                      <MdHomeWork />
                      <p>Flat</p>
                    </span>
                    <span
                      onClick={() => {
                        setCategory("PG");
                      }}
                      className={category == "PG" ? "category-clicked" : ""}
                    >
                      <FaBed />
                      <p>PG</p>
                    </span>
                    <span
                      onClick={() => {
                        setCategory("Cabin");
                      }}
                      className={category == "Cabin" ? "category-clicked" : ""}
                    >
                      <GiWoodCabin />
                      <p>Cabin</p>
                    </span>
                    <span
                      onClick={() => {
                        setCategory("Shop");
                      }}
                      className={category == "Shop" ? "category-clicked" : ""}
                    >
                      <BsShop />
                      <p>Shop</p>
                    </span>
                  </div>
                </div>
                <div className="btns">
                  <input
                    type="submit"
                    disabled={updating}
                    value={updating ? "Updating..." : "Update"}
                    id={updating || deleting ? "disabled" : "submit"}
                    onClick={async (e) => {
                      e.preventDefault();
                      await updateListing(cardDetails._id);
                      navigate("/");
                    }}
                  />
                  <input
                    type="submit"
                    disabled={deleting}
                    value={deleting ? "Deleting..." : "Delete"}
                    id={deleting || updating ? "disabled" : "submit"}
                    onClick={async (e) => {
                      e.preventDefault();
                      await deleteListing(cardDetails._id);
                      navigate("/");
                    }}
                  />
                </div>
              </form>
            </div>
          </div>
        )}

        {/* booking pop up page */}
        {bookingPop && (
          <div className="sticky">
            <div className="bookingPop">
              <RxCross1
                onClick={() => setBookingPop(!bookingPop)}
                className="cross-booking"
              />

              <div className="book-confirm">
                <form action="">
                  <h1 className="booking-header">Confirm and Book</h1>
                  <div>
                    <div>
                      <label htmlFor="checkIn">Check In</label>
                      <input
                        type="date"
                        name="checkIn"
                        min={mindate}
                        id="checkIn"
                        onChange={(e) => setCheckIn(e.target.value)}
                        value={checkIn}
                      />
                    </div>
                    <div>
                      <label htmlFor="checkOut">Check Out</label>
                      <input
                        type="date"
                        name="checkOut"
                        min={mindate}
                        id="checkOut"
                        onChange={(e) => setCheckOut(e.target.value)}
                        value={checkOut}
                      />
                    </div>
                  </div>
                  <input
                    type="submit"
                    value={"Book Now"}
                    id={deleting || updating ? "disabled" : "submit"}
                    onClick={async (e) => {
                      e.preventDefault();
                      navigate("/");
                      handleBooking(cardDetails._id);
                    }}
                  />
                </form>
              </div>
              <div className="book-details">
                <div className="book-details-card">
                  <img src={cardDetails.image1} alt="" />
                  <p>
                    {cardDetails.title.toUpperCase()}
                    <br />
                    Entire {cardDetails.category}
                    <br />
                    In {cardDetails.city.toUpperCase()} {", "}{" "}
                    {cardDetails.landmark.toUpperCase()}
                    <br />
                    <span className="ratings">
                      {cardDetails.ratings}
                      <IoMdStarOutline />
                    </span>
                  </p>
                </div>
                <div className="book-details-rent">
                  <h1>Total Price (₹)</h1>
                  <div>
                    <p>{`${cardDetails.rent} X ${night} nights`}</p>
                    <p>{`${cardDetails.rent * night}`}</p>
                  </div>
                  <div>
                    <p>{`Airbnb Charge`}</p>
                    <p>{`${night * 120}`}</p>
                  </div>
                  <div>
                    <p>{"Tax"}</p>
                    <p>{`${round(cardDetails.rent * 0.07 * night, 3)}`}</p>
                  </div>
                  <p className="breakline"></p>
                  <p className="extra-break"></p>
                  <article>
                    <p>{"Total Rent"}</p>
                    <p>{`${total}`}</p>
                  </article>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ViewCard;
