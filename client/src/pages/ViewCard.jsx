import React from "react";
import { useContext } from "react";
import { listingDataContext } from "../context/ListingContext";
import { getUserContext } from "../context/UserContext";
import { Navbar } from "../components/Navbar.jsx";
const ViewCard = () => {
  let { cardDetails } = useContext(listingDataContext);
  let { userData } = useContext(getUserContext);

  return (
    <>
      <Navbar />
      <div className="viewcard-main">
        
        <div>
           
        <h1>{cardDetails.title.toUpperCase()}</h1>
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
        <h2>
          Entire {cardDetails.category} in {cardDetails.landmark.toUpperCase()}, {cardDetails.city.toUpperCase()} 
        </h2>
        <article className="card-page-article">
          <div>
            <p className="breakline"></p>
            <p className="extra-break"></p>
            <p className="extra-break"></p>
          <p>
          {`Hosted by ${cardDetails.host}`}
          </p>
          <p className="extra-break"></p>
          
          <p className="breakline"></p>
          
          <p>{`Category : ${cardDetails.category}`}</p>
          
          </div>
          <div>
            <p>Rent Rs. {cardDetails.rent}/day</p>
            <button className="card-page-btn">Book Now !</button>
          </div>
        </article>
        <p>{cardDetails.description}</p>
        </div>
      </div>
    </>
  );
};

export default ViewCard;
