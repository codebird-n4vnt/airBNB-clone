import React, { useContext } from "react";
import { listingDataContext } from "../context/ListingContext";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import "./signup.css";
import "../App.css";

const AddListing3 = () => {
  const navigate = useNavigate();
  const {
    addListing,
    setBackEndImage1,
    setBackEndImage2,
    setBackEndImage3,
    setFrontEndImage1,
    setFrontEndImage2,
    setFrontEndImage3,
    frontEndImage1,
    frontEndImage2,
    frontEndImage3,
  } = useContext(listingDataContext);
  const handleImage1 = (e) => {
    let file = e.target.files[0];
    if(!file){console.log(file)}
    console.log(file)
    setBackEndImage1(file);
    setFrontEndImage1(URL.createObjectURL(file));
    
  };
  const handleImage2 = (e) => {
    let file = e.target.files[0];
    if(!file){console.log(file)}
    console.log(file)
    setBackEndImage2(file);
    setFrontEndImage2(URL.createObjectURL(file));
  };
  const handleImage3 = (e) => {
    let file = e.target.files[0];
    if(!file){console.log(file)}
    console.log(file)
    setBackEndImage3(file);
    setFrontEndImage3(URL.createObjectURL(file));
  };

  return (
    <div className="main">
      <div className="head">
        <span
          className="back-btn"
          onClick={() => {
            navigate("/addlisting2");
          }}
        >
          <FaArrowLeft className="arrow" />
        </span>
      </div>
      <form action="">
        <div>
          <label htmlFor="">Image 1</label>
          <input
            type="file"
            name="image1"
            placeholder="Add image 1..."
            onChange={(e) => handleImage1(e)}
          />
        </div>
        <div>
          <label htmlFor="">Image 2</label>
          <input
            type="file"
            name="image2"
            placeholder="Add image 2..."
            onChange={(e) => handleImage2(e)}
          />
        </div>
        <div>
          <label htmlFor="">Image 3</label>
          <input
            type="file"
            name="image3"
            placeholder="Add image 3..."
            onChange={(e) => handleImage3(e)}
          />
        </div>
        <input
          type="submit"
          value="Submit"
          id="submit"
          onClick={(e) => {
            e.preventDefault();
            addListing();
            navigate("/");
          }}
        />
      </form>

      <div className="pre">
        
          <div className="one">
            <img src={frontEndImage1} alt="img1" />
          </div>
          <div>
            <div className="two">
              <img src={frontEndImage2} alt="img2" />
            </div>
            <div className="three">
              <img src={frontEndImage3} alt="img3" />
            </div>
          </div>
        
        
      </div>

      hey there
    </div>
  );
};

export default AddListing3;
