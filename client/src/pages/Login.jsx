import React, { useState, useContext } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

import "./signup.css";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";
import {getUserContext} from "../context/UserContext"
import { toast } from "react-toastify";


const Login = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { serverUrl } = useContext(authDataContext);


  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const {userData, setUserData} = useContext(getUserContext)

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      let result = await axios.post(
        serverUrl + "/api/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      setUserData(result.data);
      navigate("/")
      toast.success("Login successful")
      console.log(result);
    } catch (err) {
      toast.error(err.response.data.message)
      console.log(err);
    }
  };
  return (
    <div>
      <span className="back-btn" onClick={() => navigate("/")}>
        <FaArrowLeft className="arrow" />
      </span>
      <form action="" onSubmit={handleLogin}>
        <h1>Welcome To Airbnb</h1>
        <div>
          <label htmlFor="">Email </label>
          <input
            type="text"
            id="email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div id="pass">
          <label htmlFor="">Password </label>

          <input
            type={show ? "text" : "password"}
            id="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {!show ? (
            <IoMdEye className="eye" onClick={() => setShow(!show)} />
          ) : (
            <IoMdEyeOff className="eye" onClick={() => setShow(!show)} />
          )}
        </div>
        <button type="submit" id="submit">Submit</button>
        <p>
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")} className="laal-btn">Signup</span>
        </p>
     </form>
    </div>
  );
};

export default Login;
