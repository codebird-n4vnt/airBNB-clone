import React, { useContext } from "react";
import { useState } from "react";
import { BsStarFill } from "react-icons/bs";

import { listingDataContext } from "../context/ListingContext";

const Star = ({ starValue = 5, onRate }) => {
  //agar starValue kuchh nhi di gai to wo 5 dikhayegi naki undefined (basics of js)
  let {rating,setRating} = useContext(listingDataContext);
  let [hover, setHover] = useState(0);
  return (
    <div>
      {[...Array(starValue)].map((_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= (hover || rating);

        return (
          <span
            key={starValue}
            onClick={() => {
              setRating(starValue);
              onRate && onRate(starValue);
            }}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
          >
            <BsStarFill className={`star ${isFilled ? "isFilled" : ""}`} />
          </span>
        );
      })}
    </div>
  );
};

export default Star;
