import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { createContext } from "react";
import { authDataContext } from "./AuthContext.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getUserContext } from "./UserContext.jsx";
import { toast } from "react-toastify";

export const listingDataContext = createContext();

const ListingContext = ({ children }) => {
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [frontEndImage1, setFrontEndImage1] = useState(null);
  let [frontEndImage2, setFrontEndImage2] = useState(null);
  let [frontEndImage3, setFrontEndImage3] = useState(null);
  let [backEndImage1, setBackEndImage1] = useState(null);
  let [backEndImage2, setBackEndImage2] = useState(null);
  let [backEndImage3, setBackEndImage3] = useState(null);
  let [rent, setRent] = useState("");
  let [city, setCity] = useState("");
  let [landmark, setLandmark] = useState("");
  let [category, setCategory] = useState("");
  let [listing, setListing] = useState([]);
  let [newListing, setNewListing] = useState([]);
  let [cardDetails, setCardDetails] = useState(null);
  let [updating, setUpdating] = useState(false);
  let [deleting, setDeleting] = useState(false);
  let [bookedData, setBookedData] = useState([]);
  let [rating, setRating] = useState(0);
  const {getUserData} = useContext(getUserContext)
  const {userData} = useContext(getUserContext)


  let navigate = useNavigate();
  const { serverUrl } = useContext(authDataContext);

  let addListing = async () => {
    try {
      let formData = new FormData();
      formData.append("title", title);
      formData.append("image1", backEndImage1);
      formData.append("image2", backEndImage2);
      formData.append("image3", backEndImage3);
      formData.append("description", description);
      formData.append("rent", rent);
      formData.append("city", city);
      formData.append("landmark", landmark);
      formData.append("category", category);

      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }
      const result = await axios.post(
        serverUrl + "/api/listing/add",
        formData,
        { withCredentials: true }
      );
      if (!result) {
        console.log("unable to fetch at the moment");
        toast.error("Something went wrong !!")
      }
      toast.success("Lisitng added successfully")
      console.log(result);
      setTitle("");
      setDescription("")
      setFrontEndImage1(null)
      setFrontEndImage2(null)
      setFrontEndImage3(null)
      setBackEndImage1(null)
      setBackEndImage2(null)
      setBackEndImage3(null)
      setRent("")
      setCity("")
      setLandmark("")
      setCategory("")
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error);
    }
  };

  const handleViewCard = async (id) => {
    try {
      let result = await axios.get(
        serverUrl + `/api/listing/findlistingbyid/${id}`,
        { withCredentials: true }
      );
      if(!result){
        console.log('error in getting card details')
        toast.error("Something went wrong !!")
      }
      setCardDetails(result.data);
      navigate("/viewcard");

    } catch (err) {

      toast.error(err.response.data.message)
      console.log(err);
    }
  };

  const getListing = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/listing/get", {
        withCredentials: true,
      });
      if(!result){
        console.log("Error in getting listing")
        toast.error("Something went wrong !!")
      }
      setListing(result.data);
      setNewListing(result.data);
    } catch (err) {
      toast.error(err.response.data.message)
      console.log(err);
    }
  };
  let rateListing = async (id) =>{
    try {
      let result = await axios.post(serverUrl + `/api/listing/rate/${id}`,{rating:rating},{withCredentials:true})
      if(!result){
        console.log('error in updating ratings')
        toast.error("Something went wrong !!")
      }
      await getListing();
      await getUserData();
      console.log(result)
      navigate('/')
      toast.success("Rated successfully")
      setRating(0)
    } catch (err) {
      toast.error(err.response.data.message)
      setRating(0)
      console.log(err)
    }
  }
  let updateListing = async (id) => {
    setUpdating(true);
    let formData = new FormData();
    formData.append("title", title);
    if (backEndImage1) {
      formData.append("image1", backEndImage1);
    }
    if (backEndImage2) {
      formData.append("image2", backEndImage2);
    }
    if (backEndImage3) {
      formData.append("image3", backEndImage3);
    }
    formData.append("description", description);
    formData.append("rent", rent);
    formData.append("city", city);
    formData.append("landmark", landmark);
    formData.append("category", category);
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
    try {
      const result = await axios.post(
        serverUrl + `/api/listing/update/${id}`,
        formData,
        { withCredentials: true }
      );
      if (!result) {
        toast.error("Something went wrong !!")
        console.log("unable to fetch at the moment");
      }
      console.log(result);
      setUpdating(false);
      toast.success("Update successful")
      setTitle("");
      setDescription("")
      setFrontEndImage1(null)
      setFrontEndImage2(null)
      setFrontEndImage3(null)
      setBackEndImage1(null)
      setBackEndImage2(null)
      setBackEndImage3(null)
      setRent("")
      setCity("")
      setLandmark("")
      setCategory("")
    } catch (error) {
      toast.error(error.response.data.message)
      setUpdating(false);
      console.log(error);
    }
  };

  let deleteListing = async (id) => {
    try {
      setDeleting(true);
      let result = await axios.delete(
        serverUrl + `/api/listing/deletelisting/${id}`,
        { withCredentials: true }
      );
      if (!result) {
        toast.error("Something went wrong !!")
        console.log("Error in deleting");
      }
      console.log(result);
      setDeleting(false);
      toast.success("Deleted successfully")
    } catch (err) {
      toast.error(err.response.data.message)
      setDeleting(false);
      console.log(err);
    }
  };



  useEffect(() => {
    getListing(); 
  }, []);

  const value = {
    deleting,
    deleteListing,
    updating,
    updateListing,
    addListing,
    getListing,
    title,
    setTitle,
    description,
    setDescription,
    frontEndImage1,
    setFrontEndImage1,
    frontEndImage2,
    setFrontEndImage2,
    frontEndImage3,
    setFrontEndImage3,
    setBackEndImage1,
    setBackEndImage2,
    setBackEndImage3,
    category,
    setCategory,
    landmark,
    setLandmark,
    city,
    setCity,
    rent,
    setRent,
    listing,
    setListing,
    newListing,
    setNewListing,
    cardDetails,
    setCardDetails,
    handleViewCard,
    bookedData,setBookedData,
    rating,setRating,rateListing
  };

  return (
    <>
      <listingDataContext.Provider value={value}>
        {children}
      </listingDataContext.Provider>
    </>
  );
};

export default ListingContext;
