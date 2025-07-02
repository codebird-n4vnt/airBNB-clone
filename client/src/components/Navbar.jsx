import logo from "../assets/airbnbFull.png";
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
import axios from "axios";
import { FaTreeCity } from "react-icons/fa6";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../context/AuthContext";
import { getUserContext } from "../context/UserContext";
import { listingDataContext } from "../context/ListingContext";

export const Navbar = () => {
  const { serverUrl } = useContext(authDataContext);
  const { userData, setUserData } = useContext(getUserContext);
  const { listing, setNewListing } = useContext(listingDataContext);
  const [showHampop, setShowHampop] = useState(false);
  const navigate = useNavigate();
  const { category, setCategory } = useContext(listingDataContext);
  
  const handleLogout = async () => {
    try {
      let result = await axios.post(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      console.log(result);
      setUserData(null);
      
    } catch (err) {
      console.log(err);
    }
  };

  const handleCategory = (categ) => {
    setCategory(categ);
    if (categ === "Trending") {
      setNewListing(listing);
    } else {
      setNewListing(listing.filter((list) => list.category === categ));
    }
  };
  return (
    <>
      <div className="Navbox">
        <div className="Navbar">
          <a href="/">
            <div className="logo">
              <img src={logo} alt="Logo" id="logo" />
            </div>
          </a>

          <div className="right">
            <p className="becomeAHost" onClick={() => navigate("addlisting1")}>
              Become a host
            </p>
            <button
              className="hamburger"
              onClick={() => setShowHampop(!showHampop)}
            >
              <span>
                <GiHamburgerMenu className="hamburger-ico" />
              </span>
              {!userData ? (
                <span>
                  <CgProfile className="profile-ico" />
                </span>
              ) : (
                <span className="myProfile">{
                  userData.name.slice(0, 1)}</span>
              )}
            </button>
            {showHampop && (
              <div className="hampop">
                {!userData? (
                  <p onClick={() => navigate("/login")}>Login</p>
                ) : (
                  <p onClick={() => handleLogout()}>Logout</p>
                )}

                <p className="breakline"></p>
                <p className="extra-break"></p>
                <p onClick={() => navigate("addlisting")}>Become a host</p>
                <p onClick={() => navigate("mylisting")}>My listings</p>
                <p>My bookings</p>
              </div>
            )}
          </div>
        </div>
        <div className="search-box">
          <div className="search">
            <input
              type="text"
              id="search"
              placeholder="Any where  |  Any location  |  Any city"
            />
            <button>
              <LuSearch className="search-ico" />
            </button>
          </div>
        </div>
        <div className="hots">
          <div>
            <span onClick={() => handleCategory("Trending")}>
              <ImFire />
              <p>Trending</p>
            </span>
            <span
              onClick={() => {
                handleCategory("Villa");
              }}
              className={category === "Villa" ? "category-clicked2" : ""}
            >
              <PiBuildingsBold />
              <p>Villa</p>
            </span>
            <span
              onClick={() => {
                handleCategory("Farm House");
              }}
              className={category === "Farm House" ? "category-clicked2" : ""}
            >
              <FaTreeCity />
              <p>Farm House</p>
            </span>
            <span
              onClick={() => {
                handleCategory("Pool House");
              }}
              className={category === "Pool House" ? "category-clicked2" : ""}
            >
              <MdOutlinePool />
              <p>Pool House</p>
            </span>
            <span
              onClick={() => {
                handleCategory("Room");
              }}
              className={category === "Room" ? "category-clicked2" : ""}
            >
              <MdOutlineBedroomParent />
              <p>Rooms</p>
            </span>
            <span
              onClick={() => {
                handleCategory("Flat");
              }}
              className={category === "Flat" ? "category-clicked2" : ""}
            >
              <MdHomeWork />
              <p>Flats</p>
            </span>
            <span
              onClick={() => {
                handleCategory("PG");
              }}
              className={category === "PG" ? "category-clicked2" : ""}
            >
              <FaBed />
              <p>PG</p>
            </span>
            <span
              onClick={() => {
                handleCategory("Cabin");
              }}
              className={category === "Cabin" ? "category-clicked2" : ""}
            >
              <GiWoodCabin />
              <p>Cabin</p>
            </span>
            <span
              onClick={() => {
                handleCategory("Shop");
              }}
              className={category === "Shop" ? "category-clicked2" : ""}
            >
              <BsShop />
              <p>Shops</p>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
