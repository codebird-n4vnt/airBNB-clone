import React, { useContext, useState } from "react";

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
import { FaTreeCity } from "react-icons/fa6";

import { listingDataContext } from "../context/ListingContext";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import "./signup.css"
import "../App.css"



const AddListing2 = () => {
    const navigate = useNavigate();
  const { addListing,category, setCategory } = useContext(listingDataContext);
  const [clicked, setClicked] = useState(false);
  return (
    <>
    <div className="main">
      <div className="head">
        <span className="back-btn" onClick={() => navigate("/addlisting1")}>
          <FaArrowLeft className="arrow" />
        </span>
        <div>
          <h1>Host Your Property</h1>
        </div>
      </div>

      <form action="">
        <h3>Choose category here</h3>
        <div>
            <div className="category">
                    <div>
                      
                      <span onClick={()=>{setCategory("Villa");
                       
                      }} className={category == "Villa" ? "category-clicked" : ""}>
                        <PiBuildingsBold />
                        <p>Villa</p>
                      </span>
                      <span onClick={()=>{setCategory("Farm House");
                     
                      }} className={ category == "Farm House" ? "category-clicked" : ""}>
                        <FaTreeCity />
                        <p>Farm House</p>
                      </span>
                      <span onClick={()=>{setCategory("Pool House");
                      }} className={category == "Pool House" ? "category-clicked" : ""}>
                        <MdOutlinePool />
                        <p>Pool House</p>
                      </span>
                      <span onClick={()=>{setCategory("Room");
                      }} className={category == "Room" ? "category-clicked" : ""}>
                        <MdOutlineBedroomParent />
                        <p>Room</p>
                      </span>
                      <span onClick={()=>{setCategory("Flat");
                      }} className={category == "Flat" ? "category-clicked" : ""}>
                        <MdHomeWork />
                        <p>Flat</p>
                      </span>
                      <span onClick={()=>{setCategory("PG");
                      }} className={category == "PG" ? "category-clicked" : ""}>
                        <FaBed />
                        <p>PG</p>
                      </span>
                      <span onClick={()=>{setCategory("Cabin");
                      }} className={category == "Cabin" ? "category-clicked" : ""}>
                        <GiWoodCabin />
                        <p>Cabin</p>
                      </span>
                      <span onClick={()=>{setCategory("Shop");
                      }} className={category == "Shop" ? "category-clicked" : ""}>
                        <BsShop />
                        <p>Shop</p>
                      </span>
                    </div>
                  </div>
      </div>
      <input type="submit" value="Next" id="submit" onClick={(e)=>{e.preventDefault();addListing();navigate("/addlisting3")}}/>
      </form>
      </div>
    </>
  );
};

export default AddListing2;
