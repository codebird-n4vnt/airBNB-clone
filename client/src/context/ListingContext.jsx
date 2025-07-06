import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { createContext } from "react";
import { authDataContext } from "./AuthContext.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  let [updating,setUpdating] = useState(false);
  let [deleting,setDeleting] = useState(false);
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
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewCard = async (id) => {
    try {
      let result = await axios.get(
        serverUrl + `/api/listing/findlistingbyid/${id}`,
        { withCredentials: true }
      );
      setCardDetails(result.data);
      navigate("/viewcard");
    } catch (err) {
      console.log(err);
    }
  };

  const getListing = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/listing/get", {
        withCredentials: true,
      });
      setListing(result.data);
      setNewListing(result.data);
      
    } catch (err) {
      console.log(err);
    }
  };
  let updateListing = async (id) => {
    setUpdating(true);
      let formData = new FormData();
        formData.append("title", title);
        if(backEndImage1){formData.append("image1", backEndImage1);}
        if(backEndImage2){formData.append("image2", backEndImage2);}
        if(backEndImage3){formData.append("image3", backEndImage3);}
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
          console.log("unable to fetch at the moment");
        }
        console.log(result);
        setUpdating(false)
      } catch (error) {
        setUpdating(false)
        console.log(error);
      }
    };
    

    let deleteListing = async (id) =>{
      try {
        setDeleting(true)
        let result = await axios.delete(serverUrl + `/api/listing/deletelisting/${id}`, {withCredentials:true})
        if(!result){
          console.log('Error in deleting')
        }
        console.log(result)
        setDeleting(false)
      } catch (err) {
        setDeleting(false)
        console.log(err);
      }
    }

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
