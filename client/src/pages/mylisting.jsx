import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { listingDataContext } from '../context/ListingContext'
import { getUserContext } from '../context/UserContext'
import { FaArrowLeft } from "react-icons/fa6";

import Card from '../components/Card'


const Mylisting = () => {
  const {userData, setUserData} = useContext(getUserContext);
  console.log(userData)
  
    const navigate = useNavigate()
    const {getListing} = useContext(listingDataContext);
    
  return (
    <>
      <span className="back-btn" onClick={() =>{ navigate("/")}}>
        <FaArrowLeft className="arrow" />
        </span>
      <h1>My Listings</h1>
      {userData.listing.length == 0 ? <p className='no-listing'>
        Nothing to show here <br /> <span onClick={()=>navigate('/addlisting1')} >Click here</span> to host property
      
      </p> : 
      <div className='cardbox'>
        {userData.listing.map((list)=><Card title={list.title} description={list.description} category={list.category} city={list.city} landmark={list.landmark} image1={list.image1} image2={list.image2} image3={list.image3} rent={list.rent} key={list._id}/>)}
        </div>}
    </>
  )
}

export default Mylisting;