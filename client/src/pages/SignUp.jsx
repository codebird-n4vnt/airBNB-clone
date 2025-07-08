import React, { useContext, useState } from 'react'
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import './signup.css'
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";
import axios from 'axios';

import { authDataContext } from '../context/AuthContext';
import {getUserContext} from "../context/UserContext"
import { toast } from 'react-toastify';




function SignUp() {
    
    const [show, setShow] = useState(false)
    const navigate = useNavigate();
    const {serverUrl} = useContext(authDataContext);
    const {userData, setUserData} = useContext(getUserContext)
    let [name,setName] = useState('')
    let [email,setEmail] = useState('')
    let [password,setPassword] = useState('')

    const handleSignup = async (e)=>{
      try{
        e.preventDefault()
        let result = await axios.post(serverUrl + "/api/auth/signup", {
          name,
          email,
          password
        },{withCredentials:true})
        setUserData(result.data);
        navigate("/")
        toast.success("Sign up successful")
        console.log(result)
      }catch(err){
        toast.error(err.response.data.message)
          console.log(err)
      }
    }

 
  
  return (
    <div className="main">
      <span className="back-btn" onClick={()=>navigate('/')}>< FaArrowLeft className='arrow'/></span>
      <form action="" onSubmit={handleSignup}>
        <h1>Welcome To Airbnb</h1>
        <div>
            <label htmlFor="">Username </label>
            <input type="text" id='name' placeholder='Enter Username' required onChange={(e)=>setName(e.target.value)} value={name}/>
        </div>
        <div>
            <label htmlFor="">Email </label>
            <input type="text" id='email' placeholder='Enter Email' 
            required onChange={(e)=>setEmail(e.target.value)} value={email}/>
        </div>
        <div id='pass'>
            <label htmlFor="">Password </label>
            
            <input type={ show ? "text" : "password" } id='password' placeholder='Enter password' required onChange={(e)=>setPassword(e.target.value)} value={password}/>
            {!show ? <IoMdEye className='eye' onClick={()=>setShow(!show)}/> : <IoMdEyeOff className='eye' onClick={()=>setShow(!show)}/>}
            
        </div>
        <button type="submit" id="submit">Submit</button>
        <p>Already have an account? <span onClick={()=>navigate('/login')} className="laal-btn">Login</span></p>
      </form>
    </div>
  )

}
export default SignUp
