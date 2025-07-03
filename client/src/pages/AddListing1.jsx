import React, { useContext, useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { listingDataContext } from "../context/ListingContext.jsx";
import { useNavigate } from "react-router-dom";
import "./signup.css";
import "../App.css";

const AddListing1 = () => {
  const navigate = useNavigate();
  const {
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
  } = useContext(listingDataContext);

  return (
    <>
      <div className="main">
        <div className="head">
          <span
            className="back-btn"
            onClick={() => {
              navigate("/");
              addListing();
            }}
          >
            <FaArrowLeft className="arrow" />
          </span>

          <div>
            <h1>Host Your Property</h1>
          </div>
        </div>

        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            navigate("/addlisting2");
          }}
        >
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

          <input type="submit" value="Next" id="submit" />
        </form>
      </div>
    </>
  );
};

export default AddListing1;
