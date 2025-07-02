import React, { useContext } from "react";
import { Navbar } from "../components/Navbar";
import Card from "../components/Card";
import { listingDataContext } from "../context/ListingContext";

const Home = () => {
  const { newListing } = useContext(listingDataContext);

  return (
    <>
      <Navbar />

      {!newListing ? "loading data..." : 
      <div className="cardbox">
          {newListing.map((list) =><Card title={list.title} description={list.description} category={list.category} city={list.city} landmark={list.landmark} image1={list.image1} image2={list.image2} image3={list.image3} rent={list.rent} key={list._id} id={list._id}/>)} 
      </div>
      } 

    </>
  );
};

export default Home;
