import React from "react";
import { useContext } from "react";
import { getUserContext } from "../context/UserContext";
import { listingDataContext } from "../context/ListingContext";
import { useNavigate } from "react-router-dom";
import { IoMdStarOutline } from "react-icons/io";


const Card = ({
  title,
  description,
  category,
  city,
  landmark,
  image1,
  image2,
  image3,
  rent,
  id,
  ratings,
  isBooked,
  guest,
}) => {
  let navigate = useNavigate();
  let { userData } = useContext(getUserContext);
  let { handleViewCard } = useContext(listingDataContext);

  const handleClick = () => {
    if (userData) {
      handleViewCard(id);
    }
  };
  return (
    <>
      <div className="card-container" onClick={handleClick}>
        {isBooked&&<div className="isBooked" ><p>Booked</p></div>}
        <div className="card-images">
          <img src={image1} alt="" />
          <img src={image2} alt="" />
          <img src={image3} alt="" />
        </div>
        <div className="details">
          <p className="location-details">
            <span>{`${category}`} in {`${city.toUpperCase()}`}</span>
            <span className="ratings"><IoMdStarOutline/> {ratings}</span>
          </p>
          <p>{`${title}`}</p>
          <p className="category-details"> </p>
          <p className="rent-details">

            Rs. <span>{`${rent} / day`}</span>{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default Card;
